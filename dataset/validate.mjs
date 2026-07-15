import { readFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = dirname(fileURLToPath(import.meta.url));
const read = async (name) => JSON.parse(await readFile(join(root, name), "utf8"));
const [manifest, plays, episodes, appearances, playbookAppearances, sources] = await Promise.all([
  read("manifest.json"),
  read("plays.json"),
  read("episodes.json"),
  read("play-appearances.json"),
  read("playbook-appearances.json"),
  read("sources.json"),
]);

const errors = [];
const fail = (message) => errors.push(message);
const unique = (items, key, label) => {
  const values = items.map((item) => item[key]);
  if (new Set(values).size !== values.length) fail(`${label} contains duplicate ${key} values.`);
};

const expected = manifest.expectedCounts;
for (const [key, actual] of Object.entries({
  plays: plays.length,
  playAppearances: appearances.length,
  episodes: episodes.length,
  playbookAppearances: playbookAppearances.length,
})) {
  if (actual !== expected[key]) fail(`${key}: expected ${expected[key]}, received ${actual}.`);
}

unique(plays, "id", "plays");
unique(plays, "slug", "plays");
unique(episodes, "id", "episodes");
unique(episodes, "code", "episodes");
unique(appearances, "id", "play appearances");
unique(playbookAppearances, "id", "Playbook appearances");
unique(sources, "id", "sources");

const playIds = new Set(plays.map((item) => item.id));
const episodeIds = new Set(episodes.map((item) => item.id));
const sourceIds = new Set(sources.map((item) => item.id));
const statuses = new Set(["used", "featured", "mentioned", "demonstrated", "entire-episode", "revealed", "briefly-visible", "implied-success"]);

for (const play of plays) {
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(play.id) || play.slug !== play.id) fail(`Invalid id/slug for ${play.title}.`);
  if (!play.title?.trim() || !play.summary?.trim()) fail(`Missing title or summary for ${play.id}.`);
  if (!Array.isArray(play.steps) || play.steps.length < 6 || play.steps.length > 15) fail(`${play.id} must contain 6–15 steps.`);
  play.steps?.forEach((item, index) => {
    if (item.order !== index + 1 || !item.text?.trim()) fail(`${play.id} has an invalid step at position ${index + 1}.`);
  });
  if (!["transcribed", "reconstructed"].includes(play.contentKind)) fail(`${play.id} has an invalid content kind.`);
  for (const sourceId of play.sourceIds ?? []) if (!sourceIds.has(sourceId)) fail(`${play.id} references missing source ${sourceId}.`);
}

for (const item of appearances) {
  if (!playIds.has(item.playId)) fail(`${item.id} references missing play ${item.playId}.`);
  if (!episodeIds.has(item.episodeId)) fail(`${item.id} references missing episode ${item.episodeId}.`);
  if (!statuses.has(item.status)) fail(`${item.id} has invalid status ${item.status}.`);
}

for (const item of playbookAppearances) if (!episodeIds.has(item.episodeId)) fail(`${item.id} references missing episode ${item.episodeId}.`);

const intervention = episodes.find((item) => item.title === "Intervention");
if (intervention?.code !== "S04E04") fail("Intervention must be normalized to S04E04.");
const ashtray = episodes.find((item) => item.title === "The Ashtray");
if (ashtray?.code !== "S08E17") fail("The Ashtray must be normalized to S08E17.");

const robin = plays.find((item) => item.id === "the-robin");
if (robin?.contentKind !== "transcribed" || robin?.steps.length !== 15) fail("The Robin must contain the 15 transcribed source steps.");
const wishes = appearances.filter((item) => item.playId === "my-penis-grants-wishes");
if (wishes.length !== 3) fail("My Penis Grants Wishes must resolve to one play with three appearances.");

if (errors.length) {
  console.error("Dataset validation failed:\n" + errors.map((error) => `  - ${error}`).join("\n"));
  process.exit(1);
}

console.log("Dataset validation passed.");
console.log(`  ${plays.length} unique plays`);
console.log(`  ${appearances.length} play appearances`);
console.log(`  ${episodes.length} normalized episodes`);
console.log(`  ${playbookAppearances.length} Playbook-object appearances`);
