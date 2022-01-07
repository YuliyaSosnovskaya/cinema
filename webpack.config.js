const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  mode: "development", // don't minify all build files
  entry: './src/app.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
    filename: 'bundle.js',
    assetModuleFilename: 'img/[name][ext]', // specify how to store our images in dist
    clean: true, // to clean dist folder right before the buid process
  },
  devServer: {
    static: './dist', // for webpack-dev-server
    historyApiFallback: {
      index: 'index.html'
    }
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"], // for normalize.css
      },
      {
        test: /\.(s(a|c)ss)$/,
        use: [
          MiniCssExtractPlugin.loader, // 3. add <link> tag with our css file to HTML
          "css-loader", // 2. turn css into valid js
          "sass-loader" // 1. turn sass into valid css
        ],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({template: './src/index.html'}), // create index.html file in "dist" folder based on template and add <script> with bundle
    new MiniCssExtractPlugin() // build all our css into separate file
  ]
};