var path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = (env) => {
  const isProduction = env === 'production';

  console.log('env', env);
  return {
    mode: isProduction ? 'production' : 'development',
    entry: './src/app.js',
    output: {
      path: path.join(__dirname, 'public', 'dist'),
      filename: 'bundle.js'
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader"
          }
        },
        {
          test: /\.s?css$/,
          use: [
            MiniCssExtractPlugin.loader,
            {
              loader: 'css-loader',
              options: {sourceMap: true},
            },
            {
              loader: 'sass-loader',
              options: {sourceMap: true},
            },
          ]
        }
      ]
    },
    devtool: isProduction ? 'source-map' : 'inline-source-map',
    devServer: {
      contentBase: path.join(__dirname, 'public'),
      host: '0.0.0.0',
      port: 9000,
      historyApiFallback: true,
      publicPath: '/dist/'
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: 'style.css',
      })
    ]
  }
};
