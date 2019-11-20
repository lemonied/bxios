const {resolve} = require('path')

module.exports = {
  entry: {
    'bxios-umd': resolve(__dirname, '../src/index.ts'),
  },
  resolve: {
    extensions: ['.js', '.ts', '.json'],
  },
  output: {
    path: resolve(__dirname, '../dist'),
    filename: '[name].js',
    libraryTarget: 'umd',
    library: 'axios',
    libraryExport: 'default'
  },
  module: {
    rules: [
      {
        test: /\.(js|tsx?)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        enforce: 'pre',
        test: /\.(js|tsx?)$/,
        exclude: /node_modules/,
        use: {
          loader: 'eslint-loader'
        }
      }
    ]
  }
}