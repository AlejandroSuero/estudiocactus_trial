/** @type {import('prettier').Config & import('prettier-plugin-tailwindcss').PluginOptions} */
const config = {
  printWidth: 120,
  semi: true,
  singleQuote: false,
  tabWidth: 2,
  trailingComma: "es5",
  useTabs: false,
  endOfLine: "lf",
  arrowParens: "always",
  quoteProps: "consistent",
  jsxSingleQuote: false,
  plugins: ["prettier-plugin-tailwindcss"],
};

export default config;
