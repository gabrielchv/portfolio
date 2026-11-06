#!/usr/bin/env node
// sync-projects.mjs — refresh src/data/projects.verified.json from gabrielchv/prova.
//
// Every project in the catalog has been verified there: each claim cites a file
// that exists in the repository at a recorded commit. Consuming that file instead
// of hand-maintaining project entries is what stops this site from claiming
// things the repositories no longer support.
//
// Sources, in order:
//   1. PROVA_CATALOG=<path>            explicit override
//   2. ../prova/catalog/projects.json  a sibling checkout, for local work
//   3. the raw GitHub URL             for CI and standalone clones
//
// Usage: npm run sync:projects

import { readFile, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";

const REMOTE =
  "https://raw.githubusercontent.com/gabrielchv/prova/main/catalog/projects.json";
const OUTPUT = path.join(process.cwd(), "src", "data", "projects.verified.json");
const LOCAL_SIBLING = path.join(process.cwd(), "..", "prova", "catalog", "projects.json");

const REQUIRED = [
  "id",
  "name",
  "repo",
  "tagline",
  "tagline_pt",
  "stack",
  "claim_count",
  "verified_commit",
];

function validate(catalog) {
  if (!catalog || !Array.isArray(catalog.projects)) {
    throw new Error("catalog has no projects array");
  }
  const seen = new Set();
  for (const project of catalog.projects) {
    for (const key of REQUIRED) {
      if (project[key] === undefined || project[key] === null || project[key] === "") {
        throw new Error(`project "${project.id ?? "?"}" is missing ${key}`);
      }
    }
    if (seen.has(project.id)) throw new Error(`duplicate project id ${project.id}`);
    seen.add(project.id);
    if (!/^[^/]+\/[^/]+$/.test(project.repo)) {
      throw new Error(`project "${project.id}" has a malformed repo: ${project.repo}`);
    }
  }
  return catalog;
}

async function load() {
  if (process.env.PROVA_CATALOG) {
    return {
      source: process.env.PROVA_CATALOG,
      text: await readFile(process.env.PROVA_CATALOG, "utf8"),
    };
  }
  if (existsSync(LOCAL_SIBLING)) {
    return { source: LOCAL_SIBLING, text: await readFile(LOCAL_SIBLING, "utf8") };
  }
  const response = await fetch(REMOTE);
  if (!response.ok) {
    throw new Error(`${REMOTE} -> HTTP ${response.status}`);
  }
  return { source: REMOTE, text: await response.text() };
}

const { source, text } = await load();
const catalog = validate(JSON.parse(text));

await writeFile(OUTPUT, JSON.stringify(catalog, null, 2) + "\n", "utf8");

const claims = catalog.projects.reduce((total, project) => total + project.claim_count, 0);
console.log(
  `synced ${catalog.projects.length} verified projects (${claims} cited claims) ` +
    `from ${source.replace(process.cwd(), ".")}`,
);
