const path = require('path');
const wp = require('webpack');

module.exports = {
  plugins: [
    new wp.ProvidePlugin({
      React: 'react',
    }),
  ],
  entry: path.join(__dirname, 'src/index.tsx'),
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  resolve: { extensions: ['.tsx', '.ts', '.js'] },
  module: {
    rules: [
      {
        test: /\.[jt]sx?$/,
        exclude: /node_modules/,
        loader: require.resolve('babel-loader'),
      },
    ],
  },
  optimization: {
    minimizer: [new (require('terser-webpack-plugin'))({ extractComments: false })],
  },
  devServer: {
    static: path.resolve(__dirname, 'dist'),
    // @: if `true` - open new tab with app on start
    open: false,
    port: 9000,
    hot: true,
  },
};
