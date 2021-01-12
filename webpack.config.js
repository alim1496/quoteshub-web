const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./src/index.js",
  mode: "development",
  output: {
    path: path.resolve(__dirname, "/dist"),
    filename: "js/[name].[hash].bundle.js",
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: "babel-loader",
      },
    ],
  },
  optimization: {
    splitChunks: {
      chunks: "all",
    },
  },
  devServer: {
    compress: true,
    contentBase: "./",
    port: 8000,
    filename: "bundle.js",
    disableHostCheck: true,
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
    hot: true,
    open: true,
    index: "index.html",
  },
  plugins: [new HtmlWebpackPlugin({ template: "./src/index.html" })],
};
