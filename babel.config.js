module.exports = {
  presets: ['module:@react-native/babel-preset','@babel/preset-typescript'],
  plugins: [
    ['@babel/plugin-proposal-decorators', { legacy: true }],
    ['@babel/plugin-proposal-class-properties', { loose: true }],
  ],
};