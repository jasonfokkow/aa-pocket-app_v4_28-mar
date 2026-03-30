# Aa Pocket

A mobile-first staff companion app for Aa store team members. Provides quick access to SOPs, product catalogue, and spaced-repetition flashcard reviews.

## Features

- **Flashcard Review** — Spaced repetition system (SRS) with Quick (8 cards) and Full (all cards) sessions. Cards are rated as Got it / Wasn't sure / Didn't know, and scheduled accordingly.
- **SOP Reference** — Browse all standard operating procedures by category with full content view.
- **Product Catalogue** — Evergreen product listings with specs and customer-facing notes.

## Tech Stack

- React 18 + Vite
- React Router v6
- Phosphor Icons
- CSS Modules
- Deployed on Vercel

## Data

| File | Description |
|---|---|
| `src/data/flashcards.json` | 211 specific Q&A flashcard pairs covering all 28 SOP sections |
| `src/data/sop.json` | Full SOP content with steps, headings, and summaries |
| `src/data/products.json` | Product catalogue with specs and flashcard notes |

## Getting Started

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Changelog

### v1.3.0
- Replaced generic SOP summary cards with 211 specific Q&A flashcards sourced from `aa_sop_flashcards.csv`
- Each card maps to a specific SOP topic with its correct category (operations / sales / products / logistics)
- Flashcard data extracted into standalone `src/data/flashcards.json` for easier maintenance

### v1.2.2
- Use SVG logo and reduce size to match design

### v1.2.1
- Replace Staff companion wordmark with Aa Pocket logo image

### v1.2.0
- Apply remaining Figma page 2 spacing refinements

### v1.1.0
- Resolve all 4 WCAG 2.1 AA accessibility audit findings

### v1.0.0-mvp
- MVP v1 — initial build before accessibility fixes
