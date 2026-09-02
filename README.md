# R1 AI — landing page

Vite + React + Tailwind CSS landing page pro R1 AI (AI recepční pro autoservisy).

## Lokální spuštění

```bash
npm install
npm run dev
```

Web poběží na `http://localhost:5173`.

## Build

```bash
npm run build
```

Vygeneruje statickou verzi do složky `dist/`.

## Nasazení na Vercel

1. Nahraj tento projekt do repozitáře na GitHubu.
2. Na [vercel.com](https://vercel.com) klikni na **Add New Project** a vyber tento repozitář.
3. Vercel framework (Vite) rozpozná automaticky — build command `npm run build`, output `dist`.
4. Klikni **Deploy**.

## Kde upravit obsah

- `src/App.jsx` — veškerý text, sekce, kontakt, CTA odkazy (`MAILTO`, `PHONE`, `EMAIL` proměnné nahoře v souboru).
- `index.html` — titulek stránky a meta description pro SEO.
