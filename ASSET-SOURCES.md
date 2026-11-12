# Sources and assets

Prepared from the owner's existing academic website on 12 November 2026. Scientific content, images and existing interactions are preserved while the build is adapted for GitHub Pages.

## Academic content

- Biography, education, CV and presentations: the owner's CV and cover-letter context used for the original website. Those private source documents and chat transcripts are not packaged. The CV PDF itself is the approved website download, dated 9 November 2026.
- Institutional profile: https://cosmicdawn.dk/staff/pengpei-zhu/
- ORCID: https://orcid.org/0000-0002-6768-8335
- Publications: all 19 results from the existing SciX query, checked on 12 November 2026. Exact query: `lib/publication-source.json`; individual matching records: `docs/scix-matches.json`.
- Added metadata and full author lists: https://arxiv.org/abs/2610.19146 and https://arxiv.org/abs/2610.27101. Both are preprints in the verified SciX results. Other bibliography metadata retains the existing CV entries.
- DeepDive science figure: Zhu et al. (2026), Figure 3, https://arxiv.org/html/2602.17767v2#S3.F3 . Original symbols and uncertainties are retained.

## Branding and design

- DTU logo: https://media.adm.dtu.dk/designguide/DTU_Design_Guide_Pro_User/DTU_Design_Guide_Logo/Corporate_Red/Corp_Red_RGB/Corp_Red_RGB.png
- DAWN logo: https://cosmicdawn.dk/wp-content/uploads/2020/11/DAWNlogo_1625x375.png
- Transparent source assets retain their proportions and are presented in white with CSS, with a thin border/divider over the Milky Way.
- Colour family: owner's San Marco palette. The selected values are contained in `app/globals.css`; no private palette folder is required at runtime.
- Page/index/progress inspiration: https://www.carlsbergfondet.dk/en/applicant/conferences/
- Research, presentations and photography organization references: https://jiaxuanli.me/research/ , https://jiaxuanli.me/talks/ , https://jiaxuanli.me/miscellany/photography/ . Only the owner's content/photos are included.

## Photographs

All photographs are by Pengpei Zhu. The gallery contains five approved scenes captured on 19 February 2026, 1 September 2025, 26 August 2025, 21 August 2025 and 19 August 2025. Gallery copies preserve framing, pixels, colour profiles and watermarks, with EXIF/XMP removed during the original website preparation. The hero photograph is the exact owner-selected Milky Way image, originally named `841891B8-CDB1-4740-BF61-4A57336F96B3_1_102_a.jpeg`. The selected website images were copied byte-for-byte for this repository. Two temporary photograph-selection contact sheets were excluded from the GitHub package; they are not used by the website.

## Interactive scientific pages

- `public/interactive/uvj-sed-lab.html`: owner's UVJ + SED Lab. Scientific basis: Suess, Kriek, Price & Barro (2021), ApJ 915, 87, https://doi.org/10.3847/1538-4357/abf1e4 . Source figures, filter definitions and photometry conventions are credited inside the lab.
- `public/interactive/sandage-sfh.html`: owner's Sandage SFH lab. Uses the Sandage `t exp(−t²/2τ²)` form and embedded Planck18 age table. Original scientific assumptions, limits, provenance and sources are retained inside the page.
- Both standalone files preserve their embedded data and scripts. No remote script or data download is needed for the labs. Checksums are in `docs/assets-sha256.json`.
- Metallicity and MapMyVisitors are placeholders. There is no visitor-tracking script.

## Build references

- https://nextjs.org/docs/app/guides/static-exports
- https://nextjs.org/docs/app/api-reference/config/next-config-js/basePath
- https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages
- https://github.com/actions/configure-pages

Dependencies and their licences are recorded by the npm lockfile and upstream packages.
