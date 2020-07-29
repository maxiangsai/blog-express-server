module.exports = {
  env: {
    es6: true,
    node: true
  },
  extends: 'eslint:recommended',
  rules: {
    semi: ['error', 'always'],
    quotes: ['error', 'single'],
    'no-multiple-empty-lines': ['error', {max: 1, maxBOF: 0}],
    'no-var': ['error'],
    'space-before-function-paren': ['error', 'never'],
  }
};