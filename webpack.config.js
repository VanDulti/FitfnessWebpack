const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path')

module.exports = {
  entry: './src/index.ts',
  mode: "development",
  module: {
    rules: [
      {
        test: /\.ts?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  output: {
    filename: 'bundle_[hash].js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: "/"
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "Fitfness Webpack"
    })
  ],
  devtool: "cheap-source-map",
  devServer: {
    static: {
      directory: path.join(__dirname, '/'),
    },
    compress: true,
    port: 4200,
    historyApiFallback: true
  }
}