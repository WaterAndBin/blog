module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  extends: [
    '@nuxtjs',
    '@nuxtjs/eslint-config-typescript',
    '@unocss',
    'eslint:recommended',
    'plugin:vue/vue3-essential',
    'prettier',
    'plugin:nuxt/recommended',
    'plugin:vue/vue3-recommended',
    'plugin:prettier/recommended',
    'plugin:promise/recommended',
    'plugin:import/recommended',
    'standard-with-typescript'
  ],
  parser: 'vue-eslint-parser',
  parserOptions: {
    ecmaVersion: 13,
    sourceType: 'module',
    project: ['./tsconfig.json'],
    extraFileExtensions: ['.vue']
  },
  plugins: ['prettier', '@typescript-eslint', 'nuxt', 'promise', 'import', 'vue'],
  rules: {
    'prettier/prettier': 'error',
    'vue/multi-word-component-names': 'off', // 禁用对 组件名字检查
    '@typescript-eslint/no-unused-vars': ['off'], // 禁用对 js 的 var 检查
    '@typescript-eslint/semi': 'off', // 禁用对函数最后的 ; 检查
    '@typescript-eslint/space-before-function-paren': 'off', // 禁用对 函数前面空一格检查
    'no-console': 'off', // 禁用对 console 的检查
    '@typescript-eslint/member-delimiter-style': 'off', // 禁用对 ; 检查
    "@typescript-eslint/no-floating-promises": "off", // 禁用每个方法都需要async await
    "@typescript-eslint/strict-boolean-expressions": "off" // 禁用不能直接 undefined
  },
  overrides: [
    {
      files: ['./src/**/*.{js,ts,vue}', './src/*.{js,ts,vue}'],
      rules: {
        'vue/multi-word-component-names': 'off'
      }
    }
  ]
};
