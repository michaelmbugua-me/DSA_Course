# DSA Practice Library

An offline-friendly library of data structures and algorithms practice problems, with linked solutions and 19 interview-pattern study cards.

The question collection is based on [Techie Delight's 500+ DSA practice problems](https://medium.com/techie-delight/500-data-structures-and-algorithms-practice-problems-35afe8a1e222). Pattern cards are based on [14 Patterns to Ace Any Coding Interview Question](https://hackernoon.com/14-patterns-to-ace-any-coding-interview-question-c5bb3357f6ed), expanded with templates, pitfalls, and local practice problems.

## Stack

- Next.js App Router and React
- TypeScript
- Static export for Firebase Hosting
- Markdown content rendered with Marked
- Browser-local storage for theme and pattern completion progress

## Run locally

```sh
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Search questions, read the pattern cards, and check off practice problems; pattern progress is saved in the current browser.

## Build and deploy

```sh
npm run typecheck
npm run build
npm run preview
```

`next build` exports the site into `out/`, the Firebase Hosting public directory. To deploy, run `firebase deploy --only hosting` after building.

## Content layout

- `problems/` — question lists grouped by category
- `solutions/` — local solution write-ups and code
- `patterns/` — 19 pattern study cards and a cheat sheet
- `full-article.md` — saved source article from Medium
- `urls.txt` — source URLs for the collected solutions

All content pages are generated as static routes at build time. The content remains Markdown files in the repository.
