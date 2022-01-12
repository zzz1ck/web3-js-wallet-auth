const path = require("path");
var webpack = require("webpack");

module.exports = {
  plugins: [
    new webpack.ProvidePlugin({
      React: "react",
    }),
  ],
  entry: ["babel-polyfill", path.resolve(__dirname, "src", "index.js")],
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
  },
  module: {
    rules: [
      {
        test: /\.(jsx?)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: [
                [
                  "@babel/preset-env",
                  {
                    targets: "defaults",
                  },
                ],
                "@babel/preset-react",
              ],
            },
          },
        ],
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader", "postcss-loader"],
      },
    ],
  },
  devServer: {
    static: path.resolve(__dirname, "dist"),
    open: true,
    port: 9000,
    hot: true,
  },
};
