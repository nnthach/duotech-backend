// ──────────────────────────────────────────────────────────────
// Duotech — ESLint Flat Config cho Node.js / backend (ESLint 9+)
// ──────────────────────────────────────────────────────────────
// Cài deps:
//   npm i -D eslint @eslint/js typescript-eslint \
//            eslint-plugin-import eslint-config-prettier
//
// Triết lý: lint = correctness + an toàn. Formatting để Prettier lo.
// ──────────────────────────────────────────────────────────────

import js from '@eslint/js';
import prettier from 'eslint-config-prettier';
import importPlugin from 'eslint-plugin-import';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  { ignores: ['dist/**', 'build/**', 'coverage/**', 'node_modules/**'] },

  js.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked,

  {
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    plugins: { import: importPlugin },
    rules: {
      // ── Correctness / an toàn ──
      'no-console': 'off', // backend log ra console là hợp lệ (dùng logger thật ở prod)
      'no-debugger': 'error',
      '@typescript-eslint/no-floating-promises': 'error',
      '@typescript-eslint/no-misused-promises': 'error',
      '@typescript-eslint/await-thenable': 'error',
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],
      '@typescript-eslint/consistent-type-imports': [
        'error',
        { prefer: 'type-imports', fixStyle: 'inline-type-imports' },
      ],

      // ── Tổ chức import ──
      'import/order': [
        'error',
        {
          groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index', 'type'],
          'newlines-between': 'always',
          alphabetize: { order: 'asc', caseInsensitive: true },
          pathGroups: [{ pattern: '@/**', group: 'internal', position: 'before' }],
        },
      ],

      // ── Kỷ luật ──
      eqeqeq: ['error', 'always'],
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            { group: ['../../*'], message: 'Dùng alias @/ thay vì đường dẫn ../../ sâu.' },
          ],
        },
      ],
    },
  },

  // File config / script (ngoài src/, không nằm trong tsconfig) — tắt type-check
  {
    files: ['**/*.config.{js,mjs,ts}', 'scripts/**'],
    extends: [tseslint.configs.disableTypeChecked],
    rules: { '@typescript-eslint/no-explicit-any': 'off' },
  },

  prettier, // PHẢI để cuối
);
