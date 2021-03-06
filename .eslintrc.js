const fs = require('fs');

const prettierOptions = JSON.parse(fs.readFileSync('./.prettierrc', 'utf8'));

module.exports = {
  parser: 'babel-eslint',
  extends: ['airbnb-base', 'prettier'],
  plugins: ['flowtype', 'prettier', 'jest'],
  rules: {
    'prettier/prettier': ['error', prettierOptions],
    'flowtype/define-flow-type': 1,
  },
  env: {
    'jest/globals': true,
  },
};
