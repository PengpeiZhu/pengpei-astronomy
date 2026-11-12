# Pengpei Zhu · Astronomy

Personal academic website for Pengpei Zhu (朱芃佩), with research, publications, interactive astronomy labs, talks and posters, astrophotographs, a downloadable CV, and contact information.

This website includes **19 publications and preprints**, matched to the existing SciX search. The website is published at **[pengpeizhu.github.io/pengpei-astronomy](https://pengpeizhu.github.io/pengpei-astronomy/)**, with source in the public [PengpeiZhu/pengpei-astronomy repository](https://github.com/PengpeiZhu/pengpei-astronomy). Feature and maintenance history is recorded in [UPDATES.md](UPDATES.md).

## Review locally

For a fresh clone, install Node.js 24, then run `npm ci` and `npm run build` to create `out/`. Built files and dependencies are intentionally excluded from Git.

The accompanying local review ZIP includes a built copy in `out/`. On macOS, **double-click `Preview.command`** to open that copy in your browser. Keep its terminal window open while reviewing; press Ctrl+C to stop. This uses Python 3 and does not install anything.

Alternatively, with Node.js 24 installed, run:

```sh
npm run preview
```

Open the address printed in the terminal, normally **http://127.0.0.1:4173/**. Stop the preview with Ctrl+C. This previews the actual static files intended for hosting, including both full interactive labs. Do not open `out/index.html` directly using `file://`: browser restrictions would prevent lab previews from loading.

For changes or a clean checkout:

```sh
npm ci
npm run check
npm run typecheck
npm run dev
```

The development address is **http://127.0.0.1:3100/**. Build a new review copy with:

```sh
npm run build
npm run preview
```

## What is included

| File or folder | Purpose |
| --- | --- |
| `app/page.tsx` | All homepage sections, publications, gallery, downloads and contact details |
| `app/globals.css` | San Marco colours, typography, responsive layout and progress bars |
| `app/interactive-projects.tsx` | Left-hand lab selector and full-page links |
| `app/lab-preview.tsx` | Limited previews using the original lab scripts in isolated frames |
| `lib/publications.json` | The 19 records, individual BibTeX citations and SciX order |
| `lib/publication-source.json` | SciX query and last verification date |
| `lib/presentations.ts` | Talks and posters, with slide areas intentionally empty |
| `lib/photography.json` | Gallery captions, image dimensions and dates |
| `public/` | All photographs, logos, science figure, CV, bibliography and lab HTML files |
| `docs/scix-matches.json` | One-to-one match between all 19 website records and SciX |
| `docs/assets-sha256.json` | Checksums for the reviewed asset set |
| `AGENTS.md` | Maintenance instructions and established content/design decisions |
| `UPDATES.md` | Dated feature and maintenance history |
| `.github/workflows/pages.yml` | Manual GitHub Pages publication workflow |

The website is exported as ordinary HTML, CSS and JavaScript using Next.js. It requires no application server, database, ChatGPT account, Sites credentials, or API keys. All assets needed to display the site are included. Publication searches, institutional profiles and source-paper links lead to their respective external websites.

## Publications

The count and year menu are derived from the data. The two additions are [SQuIGGLE radio AGN](https://arxiv.org/abs/2610.19146) and [Leviathan](https://arxiv.org/abs/2610.27101), both currently listed as preprints. The All filter follows the order returned by SciX. Selected retains the existing editorial selection.

After editing publication data, run `npm run bibliography` to regenerate the downloadable BibTeX file. Update the dated SciX match and affected checksum when intentionally changing the verified list. `npm run check` detects duplicate records, mismatched membership, stale bibliography downloads and changed assets.

The downloadable CV is the original **9 November 2026, four-page PDF**. It still contains the earlier 17-paper list; this update changes the website bibliography, not the underlying CV document.

## GitHub Pages

The repository and website are public, as approved by the owner on 12 November 2026. Pages uses the existing GitHub Actions workflow. To publish an update:

1. Push the reviewed changes to `main`.
2. Run **Actions → Publish website to GitHub Pages → Run workflow**, using `main`.
3. Wait for the build and deployment to succeed, then check the live website.

Publication is manual. Merely pushing changes does not trigger the workflow. **Settings → Pages → Source** is configured as **GitHub Actions**. The workflow reads the actual Pages URL and configures both the public asset prefix and sharing metadata automatically, including the `/pengpei-astronomy/` project path.

To test a project path locally:

```sh
NEXT_PUBLIC_BASE_PATH=/pengpei-astronomy NEXT_PUBLIC_SITE_URL=https://example.github.io npm run build
npm run preview
```

The preview server reads the build's base path and prints the matching address. Run `npm run build` without those variables to return to a domain-root build. Optional `.env.local` settings can be based on `.env.example` and are ignored by Git. `NEXT_PUBLIC_SITE_URL` is the origin only; the path goes in `NEXT_PUBLIC_BASE_PATH`.

The workflow follows [GitHub's custom Pages workflow documentation](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages) and [Next.js static export support](https://nextjs.org/docs/app/guides/static-exports). See [UPDATES.md](UPDATES.md) for publication and validation records.

## Preserved placeholders and credits

The metallicity explorer, presentation media and visitor map remain placeholders. No visitor tracking has been installed. UVJ + SED and Sandage SFH are fully included. See [ASSET-SOURCES.md](ASSET-SOURCES.md) for provenance and [RIGHTS.md](RIGHTS.md) for attribution and reuse notes.
