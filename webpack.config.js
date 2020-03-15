const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackMd5Hash = require('webpack-md5-hash');
const webpack = require('webpack');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const isDev = process.env.NODE_ENV === 'development';

module.exports = {
  entry: { 
    main: './src/index.js',
    saved: './src/saved-news.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name]/[name].[chunkhash].js'
  },
  module: {
    rules: [{
      test: /\.js$/,
      use: { loader: "babel-loader" },
      exclude: /node_modules/,
    },
    {
      test: /\.(woff|woff2|ttf|otf)$/i,
      loader: 'file-loader?name=./vendor/[name].[ext]'
    },
    {
      test: /\.(png|jpe?g|gif|svg|ico)$/i,
      use: [
        'file-loader?name=./images/[name].[ext]',
        {
          loader: 'image-webpack-loader',
          options: {
            mozjpeg: {
              progressive: true,
              quality: 90
            }, // optipng.enabled: false will disable optipng
            optipng: {
              enabled: false,
            },
            pngquant: {
              quality: [0.75, 0.90],
              speed: 4
            },
            gifsicle: {
              interlaced: false,
            }, // the webp option will enable WEBP
            webp: {
              quality: 90
            }
          }
        },
      ],
    },
    {
      test: /\.css$/i,
      use: [
          {
              loader: (isDev ? 'style-loader' : MiniCssExtractPlugin.loader),
              options: isDev ? {} : { publicPath: '../' }
          },
          'css-loader',
          'postcss-loader'
      ]
    },
    {
      test: /\.scss$/i,
      use: [
          {
              loader: (isDev ? 'style-loader' : MiniCssExtractPlugin.loader),
              options: isDev ? {} : { publicPath: '../' }
          },
          'css-loader',
          'postcss-loader',
          'sass-loader'
      ]
    },
    ]
  },
  devServer: {
    overlay: true
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name]/style.[contenthash].css',
    }),
    new HtmlWebpackPlugin({
      inject: false,
      template: './src/index.html',
      filename: 'index.html'
    }),
    new HtmlWebpackPlugin({
      inject: false,
      template: './src/saved-news.html',
      filename: 'saved-news.html'
    }),
    new OptimizeCssAssetsPlugin({
      assetNameRegExp: /\.css$/g,
      cssProcessor: require('cssnano'),
      cssProcessorPluginOptions: {
        preset: ['default'],
      },
      canPrint: true
    }),
    new WebpackMd5Hash(),
    new webpack.DefinePlugin({
      'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    })
  ]
};
