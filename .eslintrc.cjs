module.exports = {
  extends: [
    'plugin:astro/recommended',
  ],
  overrides: [
    {
      // Define the configuration for `.astro` file.
      files: ['*.astro'],
      // Allows Astro components to be parsed.
      parser: 'astro-eslint-parser',
      // Parse the script in `.astro` as TypeScript by adding the following configuration.
      // It's the setting you need when using TypeScript.
      parserOptions: {
        parser: '@typescript-eslint/parser',
        extraFileExtensions: ['.astro'],
      },
      rules: {
        "astro/no-set-html-directive": "warn"
      },
    },
    {
      files: ['.jsx', '.tsx'],
      extends: [
        'plugin:react/recommended'
      ],
      plugins: [
        'react'
      ],
      rules: {
        'react/jsx-wrap-multilines': [2, {
          declaration: 'parens-new-line',
          assignment: 'parens-new-line',
          return: 'parens-new-line',
          arrow: 'parens-new-line',
          condition: 'ignore',
          logical: 'ignore',
          prop: 'ignore'
        }],
        'react/react-in-jsx-scope': 'off',
        'react/jsx-indent': [1, 2]
      }
    }
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: './tsconfig.json'
  },
  rules: {
    indent: 'off',
    '@typescript-eslint/indent': [1, 2],
    'no-tabs': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/no-unused-vars': 'warn',
    '@typescript-eslint/consistent-type-definitions': ['error', 'type'],
    '@typescript-eslint/naming-convention': 'off',
    '@typescript-eslint/no-floating-promises': 'off',
    '@typescript-eslint/triple-slash-reference': 'off'
  }
};
