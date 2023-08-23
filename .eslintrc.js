module.exports = {
  root: true,
  extends: [
    'airbnb',
    'airbnb/hooks',
    'plugin:@typescript-eslint/recommended',
    'prettier',
    'plugin:prettier/recommended',
  ],
  plugins: ['@typescript-eslint', 'react', 'prettier'],
  parser: '@typescript-eslint/parser',
  rules: {
    'prettier/prettier': 'error',
    'react/jsx-filename-extension': [
      1,
      {
        extensions: ['.ts', '.tsx'],
      },
    ],
    'import/prefer-default-export': 'off',
    'jsx-quotes': ['error'],
    'no-use-before-define': 'off',
    'react/react-in-jsx-scope': 'off',
    'react/style-prop-object': 'off',
    'func-names': 'off',
    'import/no-unresolved': 'off',
    'import/extensions': 'off',
    'no-restricted-exports': 'off',
    'import/no-extraneous-dependencies': 'error',
    'react/no-unstable-nested-components': [
      'error',
      {
        allowAsProps: true,
      },
    ],
    'react/require-default-props': [
      'error',
      {
        forbidDefaultForRequired: true,
        functions: 'defaultArguments',
      },
    ],
    'react/jsx-props-no-spreading': 'off',
    'no-nested-ternary': 'off',
  },
};
