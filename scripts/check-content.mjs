import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";
import { createHash } from "node:crypto";

const read = name => readFileSync(new URL(`../${name}`, import.meta.url), "utf8");
const papers = JSON.parse(read("lib/publications.json"));
const source = JSON.parse(read("lib/publication-source.json"));
const matches = JSON.parse(read("docs/scix-matches.json")).records;
assert.equal(papers.length, source.scixResultCount, "Publication count must match the dated SciX verification.");
assert.equal(new Set(papers.map(p => p.id)).size, papers.length, "Duplicate publication ID.");
assert.deepEqual(new Set(papers.map(p => p.scix)), new Set(matches.map(p => p.scix)), "SciX membership mismatch.");
for (const paper of papers) {
  assert(paper.title && paper.authors && (paper.doi || paper.arxiv), `Incomplete paper: ${paper.id}`);
  assert(paper.bib.includes(`{${paper.id},`) && paper.bib.includes("Zhu, Pengpei"), `Check BibTeX: ${paper.id}`);
}
const expectedBib = [...papers].sort((a,b) => a.scixOrder-b.scixOrder).map(p => p.bib).join("\n\n") + "\n";
assert.equal(read("public/publications.bib"), expectedBib, "Run npm run bibliography to synchronize the download.");
for (const photo of JSON.parse(read("lib/photography.json"))) {
  assert(existsSync(new URL(`../public${photo.src}`, import.meta.url)), `Missing photograph: ${photo.src}`);
}
// Asset hashes preserve the reviewed scientific labs and original image bytes.
const hashes = JSON.parse(read("docs/assets-sha256.json"));
for (const [name, expected] of Object.entries(hashes)) {
  const bytes = readFileSync(new URL(`../public/${name}`, import.meta.url));
  assert.equal(createHash("sha256").update(bytes).digest("hex"), expected, `Asset changed: ${name}. Review it and update docs/assets-sha256.json intentionally.`);
}
console.log(`Verified ${papers.length} SciX-matched records, bibliography, photographs and ${Object.keys(hashes).length} asset hashes.`);
