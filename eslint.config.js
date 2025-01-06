import globals from "globals";

import eslintPlugin from "eslint-plugin-eslint-plugin";
import js from "@eslint/js";

export default [
    js.configs.recommended,
    eslintPlugin.configs["flat/recommended"],
    {
        languageOptions: {
            globals: {
                ...globals.node,
            },
        },
    },
];
