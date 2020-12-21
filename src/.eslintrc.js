module.exports = {
    extends: ['plugin:react/recommended'],
    plugins: ['react'],
    env: {
        browser: true,
    },
    globals: {
        Spotify: true,
    },
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        sourceType: 'module',
        ecmaVersion: 2020,
    },
    rules: {
        'react/react-in-jsx-scope': 0,
    },
    settings: {
        react: {
            version: 'detect',
        },
    },
};
