module.exports = {
  root: true,
  env: {
    browser: true,
    es6: true
  },
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint"],
  extends: ["next/core-web-vitals", "plugin:@typescript-eslint/recommended"]
};
