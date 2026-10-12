# Sylvain Decombe, online CV

Bilingual (English / French) CV built with Vue 3, TypeScript and Vite. Live at <https://sylvaindce.github.io>.

## Getting started

Needs Node 20 or later.

```sh
npm install
npm run dev       # dev server
npm run build     # type-check (vue-tsc) + production build into dist/
npm run preview   # serve the production build
```

There is no linter or test runner; `npm run build` is the only static check.

## Editing the content

- **CV content**: `src/data/cv.json`. Fields shown in both languages are `{ "en": "…", "fr": "…" }`; plain strings (companies, schools, tech names) are shared.
  - `personalInfo.openToWork`: shows or hides the "Looking for a job" line in the footer.
  - `skills[].items[].duration`: a number of months. Whole years are shown as years.
  - `references[].url`: a file name (a PDF in `public/documents/`) or a full `http(s)` URL.
- **UI labels** (section titles, buttons, units): `src/data/lang.json`.
- **Language**: picked from `?lang=en|fr` in the URL, defaulting to English; the FR / EN button in the header switches it.
- Descriptions are rendered with `v-html`, so keep `cv.json` trusted.

## Static files

Everything in `public/` is served as is: `images/` (photo, background), `documents/` (PDFs linked from the references).

## PDF export

The "Download resume" button calls `window.print()`; choose "Save as PDF" in the print dialog. The result is vector with selectable text, styled by the `@media print` block at the end of `src/style.css`. In Chrome, untick "Headers and footers" for a clean first page.

## Deployment

`.github/workflows/deploy.yml` builds the site and publishes `dist/` to GitHub Pages on every push to `main`. In the repository settings, set Pages → Source to "GitHub Actions". The site is served from the root, so no `base` is set in `vite.config.ts`; a repository with another name needs `base: '/<repo>/'`.

## Structure

- `src/views/Cv.vue`: page layout and the print button.
- `src/components/`: one component per section (`CvAbout`, `CvEducation`, `CvWorkExperience`, `CvSkills`, `CvInterests`, `CvReferences`, `CvContact`, `CvFooter`), plus `CvHeader`, `CvNav` and the `CvSection` wrapper.
- `src/composables/useLanguage.ts`: shared language state and the `t()` helper.
- `src/style.css`: all styling, on top of Bootstrap 5. Titles, separators and the timeline "cut through" the white card to show the SVG background.
