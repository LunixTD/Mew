module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
        alias: {
          '@redux': './src/redux/',
          '@container': './src/container/',
          '@components': './src/components/',
          '@config': './src/config/',
          '@common': './src/common/',
          '@navigator': './src/navigator/',
          '@services': './src/services/',
          '@assets': './src/assets/',
        },
      },
    ],
  ],
}
