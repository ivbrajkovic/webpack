const path = require("path");
const TerserJSPlugin = require("terser-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
  .BundleAnalyzerPlugin;

module.exports = ({ NODE_ENV, analyze }) => {
  console.log("Boundle analyze:", analyze || false);

  /**
   * Envoirement mode
   */
  const devMode = NODE_ENV === "development";
  console.log("Development mode:", devMode);

  /**
   * Minimizer
   */
  const minimizer = devMode
    ? []
    : [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({})];

  /**
   * Plugins
   */
  const plugins = [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      filename: "./index.html",
      minify: devMode
        ? {}
        : {
            removeAttributeQuotes: true,
            collapseWhitespace: true,
            removeComments: true
          }
    })
  ];
  !devMode && plugins.unshift(new CleanWebpackPlugin());
  !devMode &&
    plugins.push(
      new MiniCssExtractPlugin({
        // Options similar to the same options in webpackOptions.output
        // both options are optional
        // filename: "[name].[contenthash].css",
        filename: "style.[contenthash].css",
        chunkFilename: "[id].[contenthash].css"
      })
    );
  analyze && plugins.push(new BundleAnalyzerPlugin());

  /**
   * Autoprefixer
   */
  const autoprefixer = {
    loader: "postcss-loader",
    options: {
      ident: "postcss",
      plugins: [require("autoprefixer")]
    }
  };

  return {
    mode: devMode ? "development" : "production",

    entry: {
      main: "./src/js/index.js",
      fa: "./src/js/fa.js",
      first: "./src/js/first.js",
      second: "./src/js/second.js"
    },

    output: {
      filename: devMode ? "[name].bundle.js" : "[name].[contentHash].js",
      path: path.resolve(__dirname, "dist")
    },

    optimization: {
      minimizer: minimizer,
      splitChunks: {
        cacheGroups: {
          react: {
            test: /[\\/]node_modules[\\/]((react).*)[\\/]/,
            name: "react",
            chunks: "all"
          },
          commons: {
            test: /[\\/]node_modules[\\/]((?!react).*)[\\/]/,
            name: "common",
            chunks: "all"
          }
        }
      }
    },

    plugins: plugins,

    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader"
          }
        },
        {
          test: /\.(html)$/,
          exclude: /node_modules/,
          use: ["html-loader"]
        },
        {
          test: /\.(sa|sc|c)ss$/i,
          exclude: /node_modules/,
          use: [
            devMode ? "style-loader" : MiniCssExtractPlugin.loader,
            "css-loader",
            autoprefixer
          ]
        },
        {
          test: /\.(svg|png|jpe?g|gif)$/i,
          exclude: /node_modules/,
          use: {
            loader: "file-loader",
            options: {
              name: "[name].[hash].[ext]",
              outputPath: "imgs"
            }
          }
        }
      ]
    }
  };
};
