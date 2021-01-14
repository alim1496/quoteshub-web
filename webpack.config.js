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
      {
        test: /\.(css|scss)$/,
        use: [
          { loader: "style-loader" },
          { loader: "css-loader" },
          { loader: "sass-loader" },
        ],
      },
      {
        test: /\.(png|jpg|ttf|eot|woff|woff2)(\?.*)?$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[path][name].[ext]",
            },
          },
        ],
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
