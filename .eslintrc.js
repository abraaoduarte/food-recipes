module.exports = {
  parser: 'babel-eslint',
  extends: [
    'eslint:recommended',
    'standard',
    'prettier',
  ],
  plugins: [
    'ava',
  ],
  rules: {
    'indent': ['error', 2],
    quotes: ['error', 'single'],
    semi: ['error', 'always'],
    'comma-dangle': ['error', 'always-multiline'],
    'no-else-return': ['error', { allowElseIf: false }],
    'no-console': 0,
  },
}
