const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const { merge } = require('webpack-merge');

module.exports = {
  entry: './src/index.tsx',
  entry: ["./src/styles/reset_styles.scss", "./src/index.tsx"],
  output: {
    publicPath: '/',
    path: path.resolve(__dirname, '../dist'),
    clean: true,
  },
  cache: {
    type: 'filesystem'
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.scss'],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
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
      //  title: 'Webpack',
      //  favicon: './src/assets/images/favicon.jpg',
      template: path.resolve(__dirname, '../index.html'),
      minify: true,
    }),
    new BundleAnalyzerPlugin({
      analyzerMode: process.env.STATS || 'disabled',
    }),
  ],
};
