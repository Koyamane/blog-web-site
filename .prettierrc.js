const fabric = require('@umijs/fabric')

module.exports = {
  ...fabric.prettier,
  printWidth: 100,
  tabWidth: 2,
  useTabs: false,
  semi: false,
  singleQuote: true,
  proseWrap: 'preserve',
  arrowParens: 'avoid',
  bracketSpacing: true,
  endOfLine: 'auto',
  eslintIntegration: false,
  htmlWhitespaceSensitivity: 'ignore',
  ignorePath: '.prettierignore',
  jsxBracketSameLine: false,
  jsxSingleQuote: true,
  requireConfig: false,
  stylelintIntegration: false,
  // "trailingComma": "es5",
  trailingComma: 'none'
}
