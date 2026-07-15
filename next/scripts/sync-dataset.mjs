import { cp, mkdir, readFile } from "node:fs/promises";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const sourceRoot = resolve(projectRoot, "../dataset");
const targetRoot = join(projectRoot, "generated/dataset");
const manifest = JSON.parse(await readFile(join(sourceRoot, "manifest.json"), "utf8"));

await mkdir(targetRoot, { recursive: true });
for (const filename of ["manifest.json", ...manifest.files]) {
  await cp(join(sourceRoot, filename), join(targetRoot, filename));
}

console.log(`Synced ${manifest.files.length + 1} validated dataset files into /next.`);
