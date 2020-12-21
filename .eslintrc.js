module.exports = {
    extends: [
        'eslint:recommended',
        'prettier',
        'plugin:import/recommended',
        'plugin:jest/recommended',
    ],
    plugins: ['prettier', 'jest', 'import'],
    parserOptions: {
        ecmaVersion: 2020,
    },
    rules: {
        'prettier/prettier': ['error'],
        'no-underscore-dangle': 0,
        'class-methods-use-this': 0,
        'no-console': 0,
        'max-len': [
            'error',
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
};
