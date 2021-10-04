const path = require('path');
const ESLintPlugin = require('eslint-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
  template: './src/index.html',
  filename: 'index.html',
  inject: 'body'
})

module.exports = {
  entry: './src/index.tsx',
  mode: 'development',
  output: {
    path: path.resolve('dist'),
    filename: 'index.bundle.js',
    publicPath: '/'
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  devServer: {
    historyApiFallback: true,
  },
  module: {
    rules: [
        {
            test: /\.scss$/,
            use: ["style-loader", "css-loader", "sass-loader"]
        },
        {
            test: /\.tsx?$/,
            use: 'ts-loader',
            exclude: /node_modules/,
        },
        { 
            test: /\.(jpg|jpeg|png|gif|mp3|svg)$/,
            use: ["file-loader"] 
        }
    ]
  },
  plugins: [HtmlWebpackPluginConfig, new ESLintPlugin()]
}