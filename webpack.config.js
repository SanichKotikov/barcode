const path = require('path');
const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const MODE = process.env.NODE_ENV;
const IS_PROD = MODE === 'production';

const OUTPUT_PATH = path.resolve(__dirname, 'build');

module.exports = {
  mode: MODE || 'development',
  devtool: 'source-map',
  entry: './examples/index',
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
    modules: [
      'node_modules',
      'packages',
      'src',
    ],
  },
  output: {
    path: OUTPUT_PATH,
    filename: IS_PROD ? '[name].[contenthash:8].js' : 'bundle.js',
  },
  module: {
    strictExportPresence: true,
    rules: [
      {
        parser: {
          requireEnsure: false,
        },
      },
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
      },
    ],
  },
  plugins: [
    IS_PROD && new CleanWebpackPlugin(),
    IS_PROD && new webpack.HashedModuleIdsPlugin({
      hashFunction: 'sha256',
      hashDigest: 'hex',
      hashDigestLength: 6,
    }),
    new HtmlWebpackPlugin({
      inject: true,
      template: 'examples/index.html',
    }),
  ].filter(Boolean),
  performance: false,
  stats: {
    assetsSort: '!size',
    children: false,
    modules: false,
    entrypoints: false,
  },
  devServer: {
    contentBase: path.resolve(__dirname, 'examples'),
    compress: true,
    host: '0.0.0.0',
    port: 3000,
    hot: true,
    open: 'Google Chrome',
  }
};
