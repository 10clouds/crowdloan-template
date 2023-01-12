module.exports = {
    extends: ['plugin:astro/recommended'],
    overrides: [
      {
        // Define the configuration for `.astro` file.
        files: ['*.astro'],
        plugins: ['astro'],
        env: {
          // Enables global variables available in Astro components.
          node: true,
          'astro/astro': true,
          es2020: true,
        },
        // Allows Astro components to be parsed.
        parser: 'astro-eslint-parser',
        // Parse the script in `.astro` as TypeScript by adding the following configuration.
        // It's the setting you need when using TypeScript.
        parserOptions: {
          parser: '@typescript-eslint/parser',
          extraFileExtensions: ['.astro'],
          sourceType: 'module',
        },
        rules: {
          'astro/no-set-html-directive': 'warn',
          'astro/no-unused-define-vars-in-style': 'warn',
        },
      },
      {
        // Define the configuration for `<script>` tag.
        // Script in `<script>` is assigned a virtual file name with the `.js` extension.
        files: ['**/*.astro/*.js', '*.astro/*.js'],
        env: {
          browser: true,
          es2020: true,
        },
        parserOptions: {
          sourceType: 'module',
        },
        rules: {
          // override/add rules settings here, such as:
          'no-unused-vars': 'warn',
        },
      },
      {
        files: ['.jsx', '.tsx'],
        extends: ['plugin:react/recommended'],
        plugins: ['react'],
        rules: {
          'react/jsx-wrap-multilines': [
            2,
            {
              declaration: 'parens-new-line',
              assignment: 'parens-new-line',
              return: 'parens-new-line',
              arrow: 'parens-new-line',
              condition: 'ignore',
              logical: 'ignore',
              prop: 'ignore',
            },
          ],
          'react/react-in-jsx-scope': 'off',
          'react/jsx-indent': [1, 2],
        },
      },
    ],
  };
  