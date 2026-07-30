import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

import sharp from "sharp";

import {
  CONTENT_IMAGE_ASSETS,
  MODERN_IMAGE_FORMATS,
  getModernImagePath,
} from "./image-config.mjs";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const RASTER_EXTENSION = /\.(?:jpe?g|png)$/i;
const JPEG_EXTENSION = /\.jpe?g$/i;
const PNG_EXTENSION = /\.png$/i;
const AVIF_EXTENSION = /\.avif$/i;

const assert = (condition, message) => {
  if (!condition) throw new Error(message);
};

const toFilePath = (root, publicPath) => resolve(root, `.${publicPath}`);

const optimizeModernImage = (source, extension) => {
  if (extension === "avif") {
    return sharp(source).avif({ quality: 60, effort: 4 }).toBuffer();
  }

  if (extension === "webp") {
    return sharp(source)
      .withMetadata()
      .webp({ quality: 82, effort: 6 })
      .toBuffer();
  }

  throw new Error(`Unsupported image format: ${extension}`);
};

const optimizeFallback = (source, fallbackPath) => {
  if (JPEG_EXTENSION.test(fallbackPath)) {
    return sharp(source)
      .jpeg({ quality: 82, progressive: true, mozjpeg: true })
      .toBuffer();
  }

  if (PNG_EXTENSION.test(fallbackPath)) return sharp(source).png().toBuffer();
  throw new Error(`Image fallback must be JPEG or PNG: ${fallbackPath}`);
};

const preflightSources = async (root, assets) => {
  const results = await Promise.allSettled(
    assets.map(async (asset) => {
      assert(
        RASTER_EXTENSION.test(asset.fallbackPath),
        `Configured fallback must be JPEG or PNG: ${asset.fallbackPath}`,
      );
      const sourcePath = toFilePath(root, asset.sourcePath);
      let source;
      try {
        source = await readFile(sourcePath);
      } catch (error) {
        throw new Error(
          `Canonical image source is missing or unreadable: ${asset.sourcePath} (${error.message})`,
        );
      }

      let metadata;
      try {
        metadata = await sharp(source).metadata();
      } catch (error) {
        throw new Error(
          `Canonical image source is invalid: ${asset.sourcePath} (${error.message})`,
        );
      }
      assert(
        metadata.width === asset.width && metadata.height === asset.height,
        `Canonical image source dimensions for ${asset.sourcePath} are ${metadata.width}x${metadata.height}; expected ${asset.width}x${asset.height}`,
      );
      return { asset, source };
    }),
  );

  const errors = results
    .filter(({ status }) => status === "rejected")
    .map(({ reason }) => reason.message);
  if (errors.length > 0) {
    throw new Error(`Image source preflight failed:\n- ${errors.join("\n- ")}`);
  }
  return results.map(({ value }) => value);
};

const createExpectedOutputs = async (sources) =>
  Promise.all(
    sources.map(async ({ asset, source }) => {
      const fallback = await optimizeFallback(source, asset.fallbackPath);
      const modern = await Promise.all(
        MODERN_IMAGE_FORMATS.map(async ({ extension }) => ({
          data: await optimizeModernImage(source, extension),
          extension,
          publicPath: getModernImagePath(asset.fallbackPath, extension),
        })),
      );
      return {
        asset,
        outputs: [
          { data: fallback, extension: "fallback", publicPath: asset.fallbackPath },
          ...modern,
        ],
        sourceSize: source.length,
      };
    }),
  );

const matchesExpectedOutput = async (actual, expected, publicPath) => {
  if (actual.equals(expected)) return true;
  if (!AVIF_EXTENSION.test(publicPath)) return false;

  // AVIF encoder bytes can vary between libaom builds even when their decoded
  // image is equivalent. Compare decoded samples with tight, explicit bounds
  // so parity remains portable without forcing binary churn between platforms.
  try {
    const [actualPixels, expectedPixels] = await Promise.all([
      sharp(actual).removeAlpha().raw().toBuffer({ resolveWithObject: true }),
      sharp(expected).removeAlpha().raw().toBuffer({ resolveWithObject: true }),
    ]);
    if (
      actualPixels.info.width !== expectedPixels.info.width ||
      actualPixels.info.height !== expectedPixels.info.height ||
      actualPixels.info.channels !== expectedPixels.info.channels
    ) {
      return false;
    }

    let differenceTotal = 0;
    let maximumDifference = 0;
    for (let index = 0; index < actualPixels.data.length; index += 1) {
      const difference = Math.abs(
        actualPixels.data[index] - expectedPixels.data[index],
      );
      differenceTotal += difference;
      maximumDifference = Math.max(maximumDifference, difference);
    }
    return (
      maximumDifference <= 64 &&
      differenceTotal / actualPixels.data.length <= 3
    );
  } catch {
    return false;
  }
};

const checkParity = async (root, expected) => {
  const mismatches = [];
  for (const { outputs } of expected) {
    for (const { data, publicPath } of outputs) {
      let actual;
      try {
        actual = await readFile(toFilePath(root, publicPath));
      } catch (error) {
        mismatches.push(`${publicPath}: missing or unreadable (${error.message})`);
        continue;
      }
      if (!(await matchesExpectedOutput(actual, data, publicPath))) {
        mismatches.push(`${publicPath}: content mismatch`);
      }
    }
  }
  if (mismatches.length > 0) {
    throw new Error(`Image output parity check failed:\n- ${mismatches.join("\n- ")}`);
  }
};

export const runImagePipeline = async ({
  assets = CONTENT_IMAGE_ASSETS,
  check = false,
  log = console.log,
  root = ROOT,
} = {}) => {
  // This complete preflight, followed by in-memory encoding, must finish before
  // generation is allowed to make its first output write.
  const sources = await preflightSources(root, assets);
  const expected = await createExpectedOutputs(sources);

  if (check) {
    await checkParity(root, expected);
    log(`Image output parity verified for ${expected.length} configured sources.`);
    return;
  }

  for (const { asset, outputs, sourceSize } of expected) {
    for (const { data, publicPath } of outputs) {
      const outputPath = toFilePath(root, publicPath);
      await mkdir(dirname(outputPath), { recursive: true });
      await writeFile(outputPath, data);
    }
    const outputSize = (extension) =>
      outputs.find((output) => output.extension === extension)?.data.length;
    log(
      `${asset.fallbackPath}: source ${sourceSize} B, fallback ${outputSize("fallback")} B, AVIF ${outputSize("avif")} B, WebP ${outputSize("webp")} B`,
    );
  }
};

const isMain =
  process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href;
if (isMain) {
  const args = process.argv.slice(2);
  const unsupported = args.filter((argument) => argument !== "--check");
  if (unsupported.length > 0) {
    console.error(`Image optimization failed: unknown argument ${unsupported[0]}`);
    process.exitCode = 1;
  } else {
    runImagePipeline({ check: args.includes("--check") }).catch((error) => {
      console.error(`Image optimization failed: ${error.message}`);
      process.exitCode = 1;
    });
  }
}
