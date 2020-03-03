var HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const isDevelopment = process.env.NODE_ENV === "development";
var path = require("path");

module.exports = env => {
  return {
    mode: env.MODE,
    entry: "./src/index.js",
    devtool: env.MODE === "development" ? "inline-source-map" : "none",
    devServer: {
      contentBase: "./dist"
    },
    resolve: {
      extensions: [".js", "scss", "css"]
    },
    output: {
      publicPath: "/"
    },
    output: {
      path: path.resolve(__dirname, "./dist"),
      filename: "index_bundle.js"
    },
    module: {
      rules: [
        {
          test: /\.(html)$/,
          use: {
            loader: "html-loader",
            options: {
              attrs: false
            }
          }
        }
      ]
    },
    plugins: [
      new CleanWebpackPlugin(),
      new HtmlWebpackPlugin({
        inject: "body",
        template: "public/index.html"
      })
    ]
  };
};
