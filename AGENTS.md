# Website maintenance guide

## Scope and publishing status

This repository is Pengpei Zhu's academic website. On 12 November 2026, after the initial private review, the owner explicitly approved making `PengpeiZhu/pengpei-astronomy` public and publishing the website with GitHub Pages. The public website address is `https://pengpeizhu.github.io/pengpei-astronomy/`. Ordinary requested edits, builds, commits, pushes and publication to this website are permitted. The separate Sites-hosted copy retains its existing private audience.

This is a standalone Next.js static export. Do not restore Sites authentication, Cloudflare workers, connector scaffolding, database code, or `.openai/hosting.json`. Do not import private chat transcripts, cover-letter documents, local credentials, tool caches or unrelated research files into this repository.

## Update log

`UPDATES.md` is the ongoing feature and maintenance changelog. For every future feature, content, design, build or deployment change, add a dated entry at the top with the concrete change and relevant validation. Record material limitations and publication state accurately. Keep older entries as history; do not overwrite the log with a new review report. This `AGENTS.md` is the only maintenance instruction file; do not recreate a duplicate `AGENT.md`.

## Commands and validation

- Node.js 24; `npm ci` installs the pinned dependencies.
- `npm run dev` runs the editable site at `http://127.0.0.1:3100/`.
- `npm run check` validates publication membership, BibTeX and reviewed assets.
- `npm run typecheck` checks TypeScript.
- `npm run build` exports to `out/` and verifies local file references and lab/CV byte preservation.
- `npm run preview` serves that export on loopback at port 4173. It reads the saved base path.
- For a path-related change, build with `NEXT_PUBLIC_BASE_PATH=/pengpei-astronomy` as well as an empty base path. Check actual lab loading, photos and downloads under the prefixed URL.
- For visible changes, inspect desktop and a narrow mobile viewport. Check affected controls, not just the initial page image. Do not add tests that merely repeat trivial markup.

GitHub Pages builds and deploys automatically on pushes to `main`. Use the manual workflow dispatch for an on-demand redeploy. The workflow reads `base_path` and `origin` from `actions/configure-pages`. Public files and lab fetches must use `assetPath()` from `lib/site-path.ts`. The hero photograph uses the `--hero-image` body style so its path works on project Pages. Do not add root-only `/...` asset links or hard-code deployment paths in components. After pushing a website update, check the resulting Actions run and verify the live result.

## Content and design to preserve

- Personal mark: 朱 in documented Shuowen small seal script, used for the header and favicon. Preserve its glyph geometry, terracotta seal field and cream lettering; keep it visible on mobile. Provenance is in `ASSET-SOURCES.md`.
- Name: Pengpei Zhu, 朱芃佩. Contact: `penzhu@space.dtu.dk`. ORCID: `0000-0002-6768-8335`.
- Academic biography and education were sourced from the owner's CV and latest cover letter. Do not invent roles, awards, publications or dates.
- Top links: A little about me; My research; Fun Interactive projects; Astrophotos.
- Order: About, Research, Publications, Interactive projects, Talks & Posters, Astrophotos, CV, Contact, visitor-map placeholder.
- The Milky Way photograph is the hero background. Keep the smaller portrait, visible Chinese name, and compact email/CV/Contact block beneath the portrait.
- DAWN and DTU logos are transparent, rendered white with thin white dividing lines over the hero image.
- Preserve the San Marco palette, large readable body text, slightly smaller headings, contrasting section backgrounds and title/index reading-progress bars.
- Research topics have separate headings, anchors and generous spacing. Maintain the scientific figure, caption, uncertainties and attribution.
- Keep keyboard-accessible navigation, visible focus, dialog Escape support, descriptive alternatives and mobile layout.

## Publications

`lib/publications.json` is the content source; counters and year choices derive from it. `lib/publication-source.json` stores the exact SciX query and verification date. `docs/scix-matches.json` records the corresponding SciX records. The 12 November 2026 snapshot has 19 unique publications/preprints: the original 17 plus arXiv:2610.19146 and arXiv:2610.27101.

Verify authorship and publication status against SciX and original journal/arXiv records before changing metadata. Do not label all entries peer reviewed. Preserve the selected/first-author flags unless requested. The All filter follows `scixOrder`; update that order when refreshing the SciX snapshot. Run `npm run bibliography` after changing citations so `public/publications.bib` stays synchronized. Keep the full author lists in BibTeX, even when the page abbreviates them.

The current CV PDF is the owner's three-page `PengpeiZhu_Europass_CV.pdf`, supplied on 12 November 2026 with 19 papers. It is served unchanged as `public/Pengpei-Zhu-CV.pdf` so existing download links remain stable. Preserve its bytes, and only replace it when the owner supplies or requests a new version. Website bibliography updates do not authorize editing the PDF or its original source.

## Interactive labs

`public/interactive/uvj-sed-lab.html` and `public/interactive/sandage-sfh.html` are self-contained copies of the owner's scientific HTML outputs. Their calculations, embedded data, units, explanations, source citations and downloads must remain intact. Replace from a new owner-supplied source when requested; do not silently alter scientific conventions.

`app/lab-preview.tsx` fetches the same full lab and adds presentation-only CSS plus height messaging in a `sandbox="allow-scripts"` frame. Limited homepage presets are intentional. Full controls live on the linked standalone page. Keep the frame-origin/source checks and sizing constraints. Metallicity remains a placeholder until the owner supplies it.

## Media and provenance

All runtime assets are in `public/`. The five gallery photos have no visible people, preserve the owner's framing/watermarks, and use approved captions. Preserve original image bytes unless an edit is requested. The owner selected the hero image separately. Slides/posters and visitor tracking are intentionally unfilled; do not fabricate talk titles or visitor counts.

`ASSET-SOURCES.md` records credits. `docs/assets-sha256.json` records the reviewed bytes. If an authorized asset update changes a hash, document it and update the manifest deliberately. Never just refresh every hash to hide unexpected differences. No blanket open-source licence has been selected; preserve third-party notices.
