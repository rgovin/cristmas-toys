/* eslint-disable */
const path = require('path');
const { merge } = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

const baseConfig = {
    entry: path.resolve(__dirname, './src/index.ts'),
    output: {
      filename: 'index.js',
      path: path.resolve(__dirname, './dist'),
  },
    mode: 'development',
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
            },
            {
              test: /\.ts$/,
              use: 'ts-loader',
              exclude: /node_modules/,
            },
            {
              test: /\.(png|svg|jpg|jpeg|gif)$/i,
              type: 'asset/resource',
            },
            {
              test: /\.mp3$/,
              loader: 'file-loader',
            },
            {
              test: /\.(eot|ttf|woff|woff2)$/,
              use: [
                       {
                           loader: 'url-loader?limit=100000',
                       }
                   ]
          }
        ],
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx'],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, './src/index.html'),
            filename: 'index.html',
        }),
        new CleanWebpackPlugin(),
        new CopyPlugin({
          patterns: [
            { from: 'src', to: 'src' },
            { from: 'src/Assets/audio', to: 'src/Assets/audio' },
          ],
        }),
    ],
};

module.exports = ({ mode }) => {
    const isProductionMode = mode === 'prod';
    const envConfig = isProductionMode ? require('./webpack.prod.config') : require('./webpack.dev.config');

    return merge(baseConfig, envConfig);
};
