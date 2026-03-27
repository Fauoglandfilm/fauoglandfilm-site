import { promises as fs } from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const LIMIT = 20;
const IMAGE_THRESHOLD_BYTES = 1024 * 1024;
const VIDEO_THRESHOLD_BYTES = 20 * 1024 * 1024;
const IGNORED_DIRS = new Set([
  ".git",
  ".next",
  ".vercel",
  ".turbo",
  ".cache",
  "coverage",
  "dist",
  "tmp",
  "temp",
  "node_modules",
]);
const IMAGE_EXTENSIONS = new Set([
  ".jpg",
  ".jpeg",
  ".png",
  ".webp",
  ".gif",
  ".svg",
  ".avif",
]);
const VIDEO_EXTENSIONS = new Set([
  ".mp4",
  ".mov",
  ".mkv",
  ".webm",
  ".m4v",
]);
const RAW_SOURCE_EXTENSIONS = new Set([
  ".psd",
  ".ai",
  ".afdesign",
  ".sketch",
  ".xcf",
  ".tif",
  ".tiff",
  ".heic",
  ".heif",
  ".zip",
  ".rar",
  ".7z",
]);

function formatBytes(bytes) {
  if (bytes < 1024) {
    return `${bytes} B`;
  }

  const units = ["KB", "MB", "GB", "TB"];
  let value = bytes;
  let unitIndex = -1;

  do {
    value /= 1024;
    unitIndex += 1;
  } while (value >= 1024 && unitIndex < units.length - 1);

  return `${value.toFixed(value >= 100 ? 0 : value >= 10 ? 1 : 2)} ${units[unitIndex]}`;
}

function getExtension(filePath) {
  return path.extname(filePath).toLowerCase();
}

function isImageAsset(filePath) {
  return IMAGE_EXTENSIONS.has(getExtension(filePath));
}

function isVideoAsset(filePath) {
  return VIDEO_EXTENSIONS.has(getExtension(filePath));
}

function isRawSourceAsset(filePath) {
  return RAW_SOURCE_EXTENSIONS.has(getExtension(filePath));
}

async function walk(dirPath, results) {
  const entries = await fs.readdir(dirPath, { withFileTypes: true });

  for (const entry of entries) {
    if (entry.name.startsWith(".DS_Store")) {
      continue;
    }

    const absolutePath = path.join(dirPath, entry.name);
    const relativePath = path.relative(ROOT, absolutePath) || ".";

    if (entry.isDirectory()) {
      if (IGNORED_DIRS.has(entry.name)) {
        continue;
      }

      await walk(absolutePath, results);
      continue;
    }

    if (!entry.isFile()) {
      continue;
    }

    const stats = await fs.stat(absolutePath);

    results.push({
      path: relativePath,
      size: stats.size,
      isImage: isImageAsset(relativePath),
      isVideo: isVideoAsset(relativePath),
      isRawSource: isRawSourceAsset(relativePath),
    });
  }
}

function printList(title, files) {
  console.log(`\n${title}`);
  console.log("-".repeat(title.length));

  if (!files.length) {
    console.log("None");
    return;
  }

  files.forEach((file, index) => {
    console.log(`${String(index + 1).padStart(2, " ")}. ${formatBytes(file.size).padStart(9, " ")}  ${file.path}`);
  });
}

async function main() {
  const files = [];

  await walk(ROOT, files);

  files.sort((left, right) => right.size - left.size);

  const topLargest = files.slice(0, LIMIT);
  const largeImages = files
    .filter((file) => file.isImage && file.size > IMAGE_THRESHOLD_BYTES)
    .sort((left, right) => right.size - left.size);
  const largeVideos = files
    .filter((file) => file.isVideo && file.size > VIDEO_THRESHOLD_BYTES)
    .sort((left, right) => right.size - left.size);
  const rawSourceFiles = files
    .filter((file) => file.isRawSource)
    .sort((left, right) => right.size - left.size);

  console.log(`Repo root: ${ROOT}`);
  console.log(`Scanned files: ${files.length}`);
  console.log(`Image threshold: ${formatBytes(IMAGE_THRESHOLD_BYTES)}`);
  console.log(`Video threshold: ${formatBytes(VIDEO_THRESHOLD_BYTES)}`);

  printList(`Top ${LIMIT} largest files`, topLargest);
  printList("Images over 1 MB", largeImages);
  printList("Videos over 20 MB", largeVideos);
  printList("Raw source or archive files", rawSourceFiles);
}

main().catch((error) => {
  console.error("Failed to scan repo for large files.");
  console.error(error);
  process.exitCode = 1;
});
