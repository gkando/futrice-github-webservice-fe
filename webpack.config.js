var HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
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
      extensions: [".js", ".jsx", ".scss"]
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
        },
        {
          test: /\.(js|jsx|json)$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env"],
              plugins: [
                "@babel/plugin-transform-classes",
                "@babel/plugin-proposal-class-properties"
              ]
            }
          }
        },
        {
          test: /\.module\.s(a|c)ss$/,
          loader: [
            isDevelopment ? "style-loader" : MiniCssExtractPlugin.loader,
            {
              loader: "css-loader",
              options: {
                modules: true,
                sourceMap: isDevelopment
              }
            },
            {
              loader: "sass-loader",
              options: {
                sourceMap: isDevelopment
              }
            }
          ]
        },
        {
          test: /\.s(a|c)ss$/,
          exclude: /\.module.(s(a|c)ss)$/,
          loader: [
            isDevelopment ? "style-loader" : MiniCssExtractPlugin.loader,
            "css-loader",
            {
              loader: "sass-loader",
              options: {
                sourceMap: isDevelopment
              }
            }
          ]
        },
        {
          test: /\.(?:png|jpg|gif|svg)$/i,
          use: [
            {
              loader: "file-loader",
              options: {
                name: "assets/[hash].[ext]"
              }
            }
          ]
        }
      ]
    },
    plugins: [
      new CleanWebpackPlugin(),
      new HtmlWebpackPlugin({
        inject: "body",
        template: "public/index.html"
      }),
      new MiniCssExtractPlugin({
        filename: "[name].[hash].css",
        chunkFilename: "[id].[hash].css"
      })
    ]
  };
};
