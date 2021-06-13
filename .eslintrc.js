// module.exports = {
//   root: true,
//   rules: {
//     // Override our default settings just for this directory
//     semi: 'off',
//     'prettier/prettier': [
//       'error',
//       {
//         endOfLine: 'auto',
//       },
//     ],
//   },
//   extends: ['@react-native-community'],
// }

module.exports = {
  env: {
    node: true,
    es6: true,
  },

  // parser: 'babel-eslint',

  extends: ['airbnb', 'airbnb/hooks', 'prettier'],

  rules: {
    // semi: 'off',
    'linebreak-style': 'off',
  },
}
