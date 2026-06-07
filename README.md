# Idoialingo 粵

A beautiful, lightweight, Duolingo-style app for beginner **Cantonese** — built for one learner, installable on an iPhone home screen, fully offline after first load.

- **Romanisation:** Jyutping (tone numbers 1–6) — never Pinyin
- **Script:** Traditional Chinese
- **Audio:** your device's own Cantonese voice (`zh-HK`) via the Web Speech API — no audio files, works offline
- **Architecture:** single-page PWA. No backend, no login, no database. Progress lives in `localStorage`.

Three levels · 24 units · ~120 words of authentic colloquial Cantonese (細佬, 家姐, 屋企, 瞓覺, 食咗飯未…), with exercises generated fresh by an engine every session.

## Run it

```bash
npm install
npm run dev        # local dev at http://localhost:5173
npm run build      # static production build in dist/
npm run preview    # serve the production build locally
```

## Put it on your iPhone (GitHub Pages)

The PWA needs HTTPS hosting. One-time setup:

1. Create a new GitHub repository (e.g. `idoialingo`).
2. In the repo: **Settings → Pages → Source: GitHub Actions**.
3. Push this folder:

   ```bash
   git init
   git add -A
   git commit -m "Idoialingo v1"
   git branch -M main
   git remote add origin https://github.com/<you>/idoialingo.git
   git push -u origin main
   ```

4. The included workflow (`.github/workflows/deploy.yml`) builds with the right base path and publishes automatically. Your app appears at `https://<you>.github.io/idoialingo/`.
5. On the iPhone: open that URL in Safari → Share → **Add to Home Screen**. Done — it launches full-screen with the 粵 icon and works offline.

> Vercel/Netlify also work: just point them at the repo; no base path needed (they serve from `/`).

## Cantonese audio on iOS

iOS ships a Cantonese voice. For the nicest one: **Settings → Accessibility → Spoken Content → Voices → Chinese → Chinese (Hong Kong)** and download the enhanced voice. Flip the silent switch off to hear audio in Safari (the app reminds you once).

## Project shape

```
src/
  data/        vocabulary bank + lesson groupings (levels 1–3) + sentences
  lib/         exercise generator · SRS + progress store · speech · hues
  screens/     welcome · home path · lesson player · six exercises ·
               practise · stats · you/settings
  components/  icons · jyutping renderer · speaker buttons
design-reference/   the two HTML mockups this build matches
```

Notes on content: vocabulary is colloquial spoken Cantonese with Jyutping checked against words.hk / CC-Canto conventions; changed (colloquial) tones are used where that's what people say — e.g. 錢 cin2, 餐牌 caan1 paai2, 屋企 uk1 kei2 — with dictionary tones noted in code comments.
