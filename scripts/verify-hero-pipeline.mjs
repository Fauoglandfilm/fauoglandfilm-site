import { promises as fs } from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const HERO_DIR = path.join(ROOT, "public", "media", "hero");
const ALLOWED_HERO_FILES = new Set([
  "fau-land-hero-source-lock-20260329-v1.mp4",
  "fau-land-hero-source-lock-20260329-v1-poster.webp",
]);
const FORBIDDEN_HERO_TOKENS = [
  "fau-land-winter",
  "FL-Bakgrunn",
  "home-hero-mobile",
  "hero-nature-desktop-poster",
  "fau-land-hero-single-source-20260328-final",
  "fau-land-hero-approved-20260328",
  "fau-land-hero-mobile-reset-20260328-v2",
];
const SCAN_DIRS = ["src", "public", "scripts", ".next"];
const SCAN_FILES = ["next.config.ts", "package.json", "package-lock.json", "ASSET-STRUCTURE.md"];
const TEXT_EXTENSIONS = new Set([
  ".ts",
  ".tsx",
  ".js",
  ".jsx",
  ".mjs",
  ".cjs",
  ".json",
  ".css",
  ".md",
  ".txt",
  ".html",
  ".xml",
  ".svg",
  ".map",
]);

function isTextFile(filePath) {
  return TEXT_EXTENSIONS.has(path.extname(filePath).toLowerCase());
}

async function walk(directory) {
  const entries = await fs.readdir(directory, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const absolutePath = path.join(directory, entry.name);

    if (entry.isDirectory()) {
      files.push(...(await walk(absolutePath)));
      continue;
    }

    if (entry.isFile()) {
      files.push(absolutePath);
    }
  }

  return files;
}

async function collectScanTargets() {
  const targets = [];

  for (const relativeDir of SCAN_DIRS) {
    const absoluteDir = path.join(ROOT, relativeDir);

    try {
      const stats = await fs.stat(absoluteDir);

      if (stats.isDirectory()) {
        targets.push(...(await walk(absoluteDir)));
      }
    } catch {}
  }

  for (const relativeFile of SCAN_FILES) {
    const absoluteFile = path.join(ROOT, relativeFile);

    try {
      const stats = await fs.stat(absoluteFile);

      if (stats.isFile()) {
        targets.push(absoluteFile);
      }
    } catch {}
  }

  return targets;
}

async function verifyHeroDirectory() {
  const entries = await fs.readdir(HERO_DIR, { withFileTypes: true });
  const files = entries.filter((entry) => entry.isFile()).map((entry) => entry.name);
  const unexpectedFiles = files.filter((fileName) => !ALLOWED_HERO_FILES.has(fileName));
  const missingFiles = [...ALLOWED_HERO_FILES].filter((fileName) => !files.includes(fileName));

  if (unexpectedFiles.length || missingFiles.length) {
    const parts = [];

    if (missingFiles.length) {
      parts.push(`missing hero files: ${missingFiles.join(", ")}`);
    }

    if (unexpectedFiles.length) {
      parts.push(`unexpected hero files: ${unexpectedFiles.join(", ")}`);
    }

    throw new Error(parts.join(" | "));
  }
}

async function verifyForbiddenReferences() {
  const targets = await collectScanTargets();
  const violations = [];

  for (const absolutePath of targets) {
    const relativePath = path.relative(ROOT, absolutePath);
    const isVerifierFile = relativePath === path.join("scripts", "verify-hero-pipeline.mjs");

    for (const token of FORBIDDEN_HERO_TOKENS) {
      if (relativePath.includes(token)) {
        violations.push(`${relativePath} (path contains "${token}")`);
      }
    }

    if (isVerifierFile || !isTextFile(absolutePath)) {
      continue;
    }

    const content = await fs.readFile(absolutePath, "utf8");

    for (const token of FORBIDDEN_HERO_TOKENS) {
      if (content.includes(token)) {
        violations.push(`${relativePath} (content contains "${token}")`);
      }
    }
  }

  if (violations.length) {
    throw new Error(`forbidden hero references detected:\n- ${violations.join("\n- ")}`);
  }
}

async function main() {
  await verifyHeroDirectory();
  await verifyForbiddenReferences();
  console.log("Hero pipeline verification passed.");
  console.log(`Approved hero files: ${[...ALLOWED_HERO_FILES].join(", ")}`);
}

main().catch((error) => {
  console.error("Hero pipeline verification failed.");
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
});
