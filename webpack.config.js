const path = require('path');
const tsConfig = require(`./${process.env.TS_CONFIG}`);

module.exports = {
  context: path.resolve(__dirname, 'src'),
  entry: `./crypto-pro.ts`,
  module: {
    rules: [{
      test: /\.ts$/,
      use: [{
        loader: 'ts-loader',
        options: {
          configFile: process.env.TS_CONFIG
        },
      }],
      exclude: /node_modules/
    }]
  },
  resolve: {
    extensions: ['.ts', '.js']
  },
  output: {
    path: path.resolve(__dirname, tsConfig.compilerOptions.outDir),
    filename: process.env.NODE_ENV === 'production' ? `crypto-pro.min.js` : `crypto-pro.js`,
    libraryTarget: 'umd',
    library: 'cryptoPro',
    umdNamedDefine: true
  },
  mode: process.env.NODE_ENV || 'development',
  devtool: 'source-map'
};
