import { readFileSync, writeFileSync } from "node:fs";

const papers = JSON.parse(readFileSync(new URL("../lib/publications.json", import.meta.url), "utf8"));
const bibliography = [...papers].sort((a, b) => a.scixOrder - b.scixOrder).map(paper => paper.bib).join("\n\n") + "\n";
writeFileSync(new URL("../public/publications.bib", import.meta.url), bibliography);
console.log(`Wrote ${papers.length} BibTeX entries.`);
