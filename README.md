# EDA Dashboard Demo

This repository hosts a single-purpose Next.js application that renders an exploratory data analysis (EDA) dashboard. The UI is fed by a static JSON report and showcases the kinds of summaries a data team might review before modeling.

## Features
- Server-rendered dashboard at `/eda` detailing dataset metadata, descriptive statistics, data-quality checks, correlations, feature insights, and histogram distributions.
- Mock EDA payload stored on disk (`data/eda-report.json`) that can be edited without touching the codebase.
- Lightweight root route that redirects straight to the dashboard experience.
- Zero external APIs or server actions—everything required to render lives in the app and data folder.

## Getting Started
Install dependencies and start the local dev server:

```bash
npm install
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to view the dashboard. The home route immediately redirects to `/eda`.

### Data refresh
Update `data/eda-report.json` to change the dashboard contents. The file is loaded at request time, so edits become visible after saving.

## Project Structure
- `src/app/layout.tsx` – Root layout that wires up fonts, metadata, and global styles.
- `src/app/page.tsx` – Minimal entrypoint that redirects to the dashboard route.
- `src/app/eda/page.tsx` – Main dashboard implementation; reads the EDA report and renders every section.
- `src/lib/eda.ts` – Strongly-typed helper used to read and validate the mock report JSON.
- `data/eda-report.json` – Mock data source powering the UI.

## Scripts
- `npm run dev` – Start the Next.js development server.
- `npm run build` – Create an optimized production bundle.
- `npm run start` – Run the production build locally.
- `npm run lint` – Check the codebase with ESLint.

## Customization ideas
- Extend the JSON schema with additional visualization inputs (e.g., box plots, cohort tables) and mirror them in the dashboard UI.
- Wire the loader to a real data source or API endpoint once backend services are available.
- Drop in charting libraries for richer visualization beyond the current CSS-based histograms.
