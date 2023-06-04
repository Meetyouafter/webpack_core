const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const TerserPlugin = require('terser-webpack-plugin');
const { merge } = require('webpack-merge');

const isDevelopment = process.env.NODE_ENV === 'development';

module.exports = {
  //mode: isDevelopment ? 'development' : 'production',
  entry: './src/index.tsx',
  devtool: 'inline-source-map',
  output: {
    filename: isDevelopment ? '[name].js' : '[name].[contenthash].js',
    chunkFilename: isDevelopment ? '[name].chunk.js' : '[name].chunk.[contenthash].js',
    publicPath: '/',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
  cache: {
    type: ‘filesystem’
  },
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    historyApiFallback: true,
    port: 8080,
    compress: true,
    hot: true,
   // liveReload: false,
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
      minify: !isDevelopment,
      template: path.resolve(__dirname, 'index.html'),
    }),
    new MiniCssExtractPlugin({
      filename: isDevelopment ? '[name].css' : '[name].[contenthash].css',
      chunkFilename: isDevelopment ? '[id].css' : '[id].[contenthash].css',
    }),
    new BundleAnalyzerPlugin({
      analyzerMode: process.env.STATS || 'disabled',
    }),
  ],
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        parallel: true,
      }),
    ],
    chunkIds: 'named',
    concatenateModules: true,
    emitOnErrors: true,
    flagIncludedChunks: true,
    innerGraph: false,
    mergeDuplicateChunks: true,
    removeEmptyChunks: true,
    splitChunks: {
      cacheGroups: {
        reactVendor: {
          test: /[\\/]node_modules[\\/](react|react-dom|react-router-dom)[\\/]/,
          name: 'vendor-react',
          chunks: 'all',
        },
        corejsVendor: {
          test: /[\\/]node_modules[\\/](core-js)[\\/]/,
          name: 'vendor-corejs',
          chunks: 'all',
        },
      },
    },
  },
};
