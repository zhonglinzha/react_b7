// module.exports = {
//   env: {
//     browser: true,
//     es6: true,
//   },
//   extends: [
//     'airbnb',
//   ],
//   globals: {
//     Atomics: 'readonly',
//     SharedArrayBuffer: 'readonly',
//   },
//   parserOptions: {
//     ecmaFeatures: {
//       jsx: true,
//     },
//     ecmaVersion: 2018,
//     sourceType: 'module',
//   },
//   plugins: [
//     'react',
//   ],
//   rules: {
//   },
// };

module.exports = {
  root: true,
  env: {
    browser: true,
    commonjs: true,
    es6: true,
  },
  extends: 'airbnb',
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parser: 'babel-eslint',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: ['react','import','jsx-a11y'],
  rules: {
    'import/no-unresolved': 0,
    'import/extensions': 0,
    'import/prefer-default-export': 0,

    'react/prop-types': 0,
    'react/jsx-filename-extension': 0,
    'react/prefer-stateless-function': 0,
    'react/jsx-indent': [2, 'tab'],
    'react/jsx-indent-props': [2, 'tab'],
    'react/require-default-props': 0,
    // // @off 同构应用需要在 didMount 里写 setState
    'react/no-did-mount-set-state': 0,

    'jsx-a11y/anchor-is-valid': 0,
    'jsx-a11y/click-events-have-key-events': 0,
    'jsx-a11y/mouse-events-have-key-events': 0,
    'jsx-a11y/no-noninteractive-element-interactions': 0,
    'jsx-a11y/no-static-element-interactions': 0,

    'no-return-assign': 0,
    'no-console': 0,
    // 0、1、2分别表示不开启检查、警告、错误
    indent: [2, 'tab', { SwitchCase: 1 }], // tab缩进
    // 圈复杂度
    complexity: [2, 9],
    'max-params': [2, 7],
    'max-depth': [2, 4],
    'max-len': [
      'error',
      {
        code: 150,
        tabWidth: 4,
        ignoreComments: true,
        ignoreUrls: true,
        ignoreStrings: true,
        ignoreTemplateLiterals: true,
        ignoreRegExpLiterals: true,
      },
    ],
    'no-tabs': 0,
    'object-curly-newline': [
      0,
      {
        ObjectExpression: 'always',
        ObjectPattern: { multiline: true },
        ImportDeclaration: 'never',
        ExportDeclaration: {
        multiline: true,
        },
      },
    ],
    'object-curly-spacing': 0,

    'arrow-parens': [2, 'as-needed'],
    // 最大回调层数
    'max-nested-callbacks': [2, 3],
    'no-unused-vars': [
      2,
      {
        argsIgnorePattern: '^React',
        varsIgnorePattern: '[Rr]eact|[Ss]tyle',
      },
    ],
    'no-extra-boolean-cast': 0,
    'array-callback-return': 0,
    'no-param-reassign': 0,
    'jsx-quotes': [0, 'prefer-double'], //强制在JSX属性（jsx-quotes）中一致使用双引号
    'no-underscore-dangle': 0,
    'quote-props': 0,
  },
};

