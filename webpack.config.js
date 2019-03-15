const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const fs = require('fs');
const HtmlBeautifyPlugin = require('html-beautify-webpack-plugin');

const generateHtmlPlugins = templateDir => {
  const templateFiles = fs.readdirSync(path.resolve(__dirname, templateDir));
  return templateFiles.map(item => {
    return new HtmlWebpackPlugin({
      favicon: './src/img/favicon.ico',
      filename: item,
      template: path.resolve(__dirname, `${templateDir}/${item}`),
    });
  });
};

module.exports = {
  context: __dirname,
  entry: './src/js/index.js',
  output: {
    path: path.join(__dirname, 'dist'),
    publicPath: '',
    filename: 'js/bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.(png|jpg|gif|svg|ico)$/,
        loader: 'file-loader',
        options: {
          name: 'img/[name].[ext]',
        },
      },
      {
        test: /\.(html)$/,
        use: {
          loader: 'html-loader',
          options: {
            interpolate: true,
          },
        },
      },
      {
        test: /\.(sc|sa|c)ss$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'sass-loader'],
      },
    ],
  },
  plugins: [
    new BrowserSyncPlugin({
      host: 'localhost',
      port: 4000,
      server: { baseDir: ['dist'] },
      files: ['**/*.html'],
      notify: false,
      ghostMode: false,
      open: false,
    }),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({ filename: 'css/style.css' }),
  ]
    .concat(generateHtmlPlugins('./src/templates/views'))
    .concat([
      new HtmlBeautifyPlugin({
        config: {
          html: {
            indent_size: 2,
            max_preserve_newlines: 1,
          },
        },
      }),
    ]),
};
