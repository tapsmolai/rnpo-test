# Connect+Funda — Partnership Landing Pages

A reusable React + TypeScript + Tailwind landing-page engine for Connect+Funda's
partner-facing pages. Two complete audience pages ship in this project:
**NPO / Foundation / CSR** and **Tertiary / SRC**. The same components power both,
and adding a third (e.g. Schools, Government) is one config file away.

---


## The idea: one engine, many audiences

Every landing page is the **same set of components** rendering a different **config object**.

```
src/
├─ config/
│  ├─ brand.ts            # colour tokens + contact details
│  ├─ npo.config.tsx      # AudienceConfig type + NPO data
│  └─ tertiary.config.tsx # Tertiary & SRC data (second instance)
├─ components/
│  ├─ LandingPage.tsx     # ALL sections, driven entirely by config prop
│  └─ Icon.tsx            # inline SVG icon set
├─ store/
│  └─ registerStore.ts    # Zustand store for the register-interest form
├─ assets/
│  ├─ cf-logo.png
│  ├─ hero.jpg
│  ├─ partnership.jpg     # NPO closing banner (photo)
│  └─ campus-banner.jpg   # Tertiary closing banner (graphic illustration)
├─ App.tsx                # switches between configs via URL hash
└─ main.tsx
```

`LandingPage` reads a single `AudienceConfig` and renders, in order:
**nav → hero → pillars → stats → why → videos → how → [optional SRC spotlight]
→ models → plans & bundles → quote → who → comparison table → impact strip
→ register form → closing banner → partner strip → footer**.

The SRC spotlight section renders only when `config.srcSpotlight` is present
(currently only Tertiary).

---

## Run it

```bash
npm install        # or: npm ci (faster, uses package-lock)
npm run dev        # local dev server
npm run build      # type-check (tsc -b) + production build to dist/
npm run preview    # serve the production build
```

> **Verified:** `npm ci && npx tsc -b && npx vite build` passes cleanly —
> 54 modules transformed, no TS errors.

### Preview both audiences

After `npm run dev` (or in the built preview), use the URL hash to switch:

- `http://localhost:5173/#/npo` — NPO page (default)
- `http://localhost:5173/#/tertiary` — Tertiary & SRC page

`src/App.tsx` shows the recommended `react-router` pattern for production
multi-route deployment.

---

## Editing content

All copy and data live in `src/config/*.config.tsx`. Common edits:

- **Videos** — `<audience>Config.videos.items`. Each item has `tag`, `tagStyle`
  (`'primary'` for orange tag, `'partner'` for neutral), `title`, `sub`, and
  optional `src` URL. When `src` is set, clicking the card opens it in a new
  tab. **The Intro videos currently have `src: undefined` — replace with the
  Dropbox/Vimeo URLs once available.**
- **Plans & Bundles** — `<audience>Config.plans`. The `pills` array drives the
  product chips. `catalogueUrl` points to the full Connect+Funda plans page
  (currently `https://connect-and-funda.vercel.app/#plans`).
- **Closing banner** — `<audience>Config.closingBanner`. Swap the image by
  replacing `src/assets/<name>.jpg` (keep the filename) and edit copy in the config.
- **Comparison table / features / tiers / who-can-partner / form fields** —
  all live as arrays in the config file.
- **SRC spotlight (Tertiary only)** — `tertiaryConfig.srcSpotlight`. Delete the
  whole property to remove the section from the Tertiary page.

---

## Adding a new audience (e.g. Schools, Government)

1. **Copy a config:** duplicate `tertiary.config.tsx` → `schools.config.tsx`,
   rename the export `tertiaryConfig` → `schoolsConfig`.
2. **Edit the copy:** change `hero`, `stats`, `tiers`, `who`, etc. The
   `AudienceConfig` type guides every field — TypeScript flags anything missing
   or wrong.
3. **Optional sections:** include `srcSpotlight` only if SRCs are an audience
   for this page. Include `partners` and `footerTag` for audience-specific
   labels; omit to fall back to defaults.
4. **Render it:** point a route at it. Drop-in multi-route pattern (already
   sketched in `App.tsx`):

   ```tsx
   import { Routes, Route } from 'react-router-dom';
   <Routes>
     <Route path="/schools"  element={<LandingPage config={schoolsConfig} />} />
     <Route path="/npo"      element={<LandingPage config={npoConfig} />} />
     <Route path="/tertiary" element={<LandingPage config={tertiaryConfig} />} />
   </Routes>
   ```

No new components needed.

---

## Wiring the form to the backend

`src/store/registerStore.ts` holds the form state. In `LandingPage.tsx` →
`RegisterSection` → `onSubmit`, there is a marked `TODO`: POST the `values`
object to the Laravel API (e.g. `POST /api/partnership-leads`) before flipping
`submitted`. Until then the form runs client-side with a success confirmation.

See the **Developer Handover** document (`connectfunda-partnership-pages-handover.md`)
for the full Laravel endpoint contract and lead-routing details.

---

## Brand & assets

- Palette and fonts live in `tailwind.config.js` (`cf.*` colours, Sora + Plus
  Jakarta Sans) and `src/config/brand.ts`. Change them in those two places only.
- All images are in `src/assets/`. Swap files (keep the names) to re-skin.

---

## Also in this delivery

- `connectfunda-npo-landing.html` — standalone single-file NPO page (all assets
  inlined as base64). Open in any browser; no build step needed.
- `connectfunda-tertiary-landing.html` — same for the Tertiary & SRC page.
- `connectfunda-partnership-pages-handover.md` — full developer handover
  covering both audience pages, the engine, the AudienceConfig contract,
  form-to-Laravel wiring, DevOps recommendations and known TODOs.
