module.exports = {
    env: {
        browser: true,
        commonjs: true,
        es2021: true,
    },
    extends: [
        'plugin:vue/essential',
        'standard',
        // 新增，必须放在最后面
        'plugin:prettier/recommended',
    ],
    parserOptions: {
        ecmaVersion: 'latest',
    },
    plugins: ['vue'],
    rules: {},
};
