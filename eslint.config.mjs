import eslint from "@eslint/js";
import importPlugin from "eslint-plugin-import";
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";
import tseslint from "typescript-eslint";

export default tseslint.config(
  {
    // might be able to find a way to not ignore some of these but i just ignore them
    ignores: ["**/dist"],
  },
  {
    languageOptions: {
      parserOptions: {
        project: ["./tsconfig.json"], // <-- this file exists in vite projects, otherwise just use tsconfig.json
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  // ...tseslint.configs.stylisticTypeChecked,
  // ...tseslint.configs.strictTypeChecked, // <-- most important line, max strictness. if any of th rules don't work for your codebase as being too strict, disable them one by one, but it is worth trying to crank up strictness to max
  importPlugin.flatConfigs.recommended,
  eslintPluginPrettierRecommended,
  {
    rules: {
      "prettier/prettier": [
        "error",
        {
          printWidth: 80,
          tabWidth: 2,
          singleQuote: false,
          trailingComma: "all",
          arrowParens: "always",
          semi: true,
          endOfLine: "auto",
        },
      ],
      "@typescript-eslint/no-unsafe-assignment": "off",
      "@typescript-eslint/no-unused-vars": "off",
      // allow console.warn and console.error, but not console.log. personal pref
      "no-console": [
        "warn",
        {
          allow: ["error", "warn", "log"],
        },
      ],

      // force use of curly brackts on if statements
      curly: "error",

      // force space after comments
      "spaced-comment": [
        "error",
        "always",
        {
          markers: ["/"],
        },
      ],

      // prefer template strings over string appends
      "prefer-template": "error",

      // take it or leave it, it sorts and organizes import statements
      // there might be other ways but this prevents me from manually fiddling with order
      "import/no-unresolved": "off",
      "import/order": [
        "error",
        {
          named: true,
          "newlines-between": "always",
          alphabetize: {
            order: "asc",
          },
          groups: [
            "builtin",
            ["external", "internal"],
            ["parent", "sibling", "index", "object"],
            "type",
          ],
        },
      ],
    },
  },
);
