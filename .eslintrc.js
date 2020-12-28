module.exports = {
    extends: [
        "eslint:recommended",
        "prettier",
        "plugin:import/recommended",
        "plugin:react/recommended",
    ],
    plugins: ["prettier", "import", "react"],
    env: {
        browser: true,
    },
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        sourceType: "module",
        ecmaVersion: 2020,
    },
    rules: {
        "prettier/prettier": ["error"],
        "no-console": 0,
        "react/react-in-jsx-scope": 0,
        "max-len": [
            "error",
            {
                code: 100,
                tabWidth: 4,
                comments: 100,
                ignoreComments: false,
                ignoreTrailingComments: true,
                ignoreUrls: true,
                ignoreStrings: true,
                ignoreTemplateLiterals: true,
                ignoreRegExpLiterals: true,
            },
        ],
    },
    settings: {
        react: {
            version: "detect",
        },
    },
};
