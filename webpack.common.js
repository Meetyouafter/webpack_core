const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const TerserPlugin = require('terser-webpack-plugin');
const { merge } = require('webpack-merge');

const isDevelopment = process.env.NODE_ENV === 'development';

module.exports = {
  entry: './src/index.tsx',
  output: {
    publicPath: '/',
    path: path.resolve(__dirname, 'dist'),
  },
  cache: {
    type: 'filesystem'
  },
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    historyApiFallback: true,
    port: 8080,
    hot: true,
    open: true,
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  module: {
    rules: [
      //{
      //  exclude: /node_modules/,
      //  test: /\.(js|jsx)$/,
      //  type: 'javascript/auto',
      //  use: {
      //    loader: 'babel-loader',
      //    options: {
      //      presets: [
      //        [
      //          "@babel/preset-env",
      //          {
      //            "targets": "> 0.25%, not dead",
      //            "useBuiltIns": "entry",
      //            "corejs": "3.8"
      //          }
      //        ],
      //        ['@babel/preset-react', { development: isDevelopment }],
      //      ],
      //      plugins: [
      //        'babel-plugin-react-scoped-css',
      //      ],
      //    },
      //  },
      //},
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      { test: /\.scss$/, use: ['style-loader', 'css-loader', 'sass-loader'] },
      {
        test: /\.(png|svg|jpe?g|gif|ico)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'assets/images/[name][ext]',
        },
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'assets/fonts/[name][ext]',
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      //  favicon: './src/assets/images/favicon.jpg',
      template: path.resolve(__dirname, 'index.html'),
    }),
    new BundleAnalyzerPlugin({
      analyzerMode: process.env.STATS || 'disabled',
    }),
  ],
};
