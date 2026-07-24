// ──────────────────────────────────────────────────────────────
// Duotech — Prettier Config cho Node.js (Prettier 3+)
// ──────────────────────────────────────────────────────────────
// Cài: npm i -D prettier
// ──────────────────────────────────────────────────────────────

/** @type {import("prettier").Config} */
export default {
  printWidth: 100,
  tabWidth: 2,
  useTabs: false,
  semi: true,
  singleQuote: true,
  quoteProps: 'as-needed',
  trailingComma: 'all',
  bracketSpacing: true,
  arrowParens: 'always',
  endOfLine: 'lf',
};
