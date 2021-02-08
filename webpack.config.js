const path = require('path');
const PATH_TO_PUBLIC = path.resolve(__dirname, 'public');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: PATH_TO_PUBLIC,
  },
  devServer: {
    contentBase: PATH_TO_PUBLIC,
    open: true,
    port: 1337,
    historyApiFallback: true,
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  devtool: 'source-map',
};
