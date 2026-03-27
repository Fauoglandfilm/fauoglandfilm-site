import { promises as fs } from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const LIMIT = 20;
const MEDIA_THRESHOLD_BYTES = 5 * 1024 * 1024;
const IGNORED_DIRS = new Set([
  ".git",
  ".next",
  ".vercel",
  "node_modules",
]);
const MEDIA_EXTENSIONS = new Set([
  ".jpg",
  ".jpeg",
  ".png",
  ".webp",
  ".gif",
  ".svg",
  ".avif",
  ".mp4",
  ".mov",
  ".mkv",
  ".webm",
  ".m4v",
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

function isMediaAsset(filePath) {
  return MEDIA_EXTENSIONS.has(path.extname(filePath).toLowerCase());
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
      isMedia: isMediaAsset(relativePath),
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
  const largeMedia = files
    .filter((file) => file.isMedia && file.size > MEDIA_THRESHOLD_BYTES)
    .sort((left, right) => right.size - left.size);

  console.log(`Repo root: ${ROOT}`);
  console.log(`Scanned files: ${files.length}`);
  console.log(`Media threshold: ${formatBytes(MEDIA_THRESHOLD_BYTES)}`);

  printList(`Top ${LIMIT} largest files`, topLargest);
  printList("Image/video assets over 5 MB", largeMedia);
}

main().catch((error) => {
  console.error("Failed to scan repo for large files.");
  console.error(error);
  process.exitCode = 1;
});
