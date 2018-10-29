/**
 * @file ESLint Configuring
 * @description
 * Please visit [ESLint Rules]{@link https://eslint.org/docs/rules/}
 * | Date | Desc | Maintainer |
 * | :--: | :-- | :--: |
 * | 20180531 | v1.0.0 | daijinru
 * @version 1.0.0
 * @author daijinru <daijinru@weilaigongzuo.com>
 */

module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    'ecmaVersion': 6,
    'sourceType': 'module'
  },
  env: {
    browser: true,
    node: true
  },
  extends: ['eslint:recommended'],
  plugins: [
    'vue',
    'html'
  ],
  rules: {
    'no-debugger': 0,
    'no-console': 0,
    'linebreak-style': 0,
    'default-case': 1,
    'valid-jsdoc': 1,
    'no-caller': 2,
    'no-new-wrappers': 2,
    'no-new': 0, //单页面的项目需要用new关键字但不需赋予变量
    'no-self-compare': 2,
    'no-template-curly-in-string': 2,
    'array-callback-return': 2,
    'consistent-return': 0, //根据代码分支具有不同的行为
    'no-empty-function': 2,
    'no-floating-decimal': 2,
    'no-duplicate-imports': 2,
    'no-with': 2,
    'block-scoped-var': 2,
    'eqeqeq': [2, 'always', { null: 'ignore' }],
    'no-eval': 2,
    'multiline-comment-style': [1, 'starred-block'],
    'no-multi-spaces': [2, { ignoreEOLComments: true, exceptions: { Property: true, BinaryExpression: false, VariableDeclarator: true, ImportDeclaration: true } }],
    'comma-spacing': [2, { before: false, after: true }],
    'array-bracket-spacing': [2, 'never'],
    'computed-property-spacing': [2, 'never'],
    'func-call-spacing': [2, 'never'],
    'function-paren-newline': [2, 'never'],
    'lines-around-comment': [2, { beforeBlockComment: true, beforeLineComment: true, allowClassStart: false, allowObjectStart: true, allowClassStart: true }],
    'lines-between-class-members': [2, 'always'],
    'no-multiple-empty-lines': [2, { max: 2 }],
    'no-tabs': 2,
    'arrow-spacing': 2,
    'space-before-blocks': [2, 'always'],
    'space-before-function-paren': [2, 'never'],
    'spaced-comment': [2, 'always'],
    'indent': [2, 4], //修改了4个格子缩进
    'semi': [2, 'always'],
    'semi-spacing': 2,
    "no-mixed-spaces-and-tabs": 2,
  }
}
