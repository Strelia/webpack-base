const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const PATHS = {
    src: path.join(__dirname, '../src'),
    dist: path.join(__dirname, '../dist'),
    assets: 'assets',
};

module.exports = {
    externals: {
        paths: PATHS,
        "react": "React",
        "react-dom": "ReactDOM"
    },

    entry: {
        app: PATHS.src
    },

    output: {
        filename: `${PATHS.assets}/js/[name].js`,
        path: PATHS.dist,
        publicPath: '/'
    },
    
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.json']
    },

    module: {
        rules: [{
            test: /\.[j|t]sx?$/,
            exclude: '/node_modules/',
            loader: 'babel-loader'
        },{
            test: /\.(jpg|svg)$/,
            loader: 'file-loader',
            options: {
                name: '[name].[ext]'
            }
        },{
            test: /\.scss$/,
            use: [
                'style-loader',
                MiniCssExtractPlugin.loader,
                {
                    loader: 'css-loader',
                    options: { sourceMap: true }
                }, {
                    loader: 'postcss-loader',
                    options: {sourceMap: true, config: {path: './config/postcss.config.js'}}
                }, {
                    loader: 'sass-loader',
                    options: {sourceMap: true}
                }
            ],
        }, { 
            test: /\.jpg$/,
            use: [ "file-loader" ] 
        }, {
            test: /\.(png|gif)$/,
            use: [
                {
                  loader: 'url-loader',
                  options: {
                    limit: 8192
                  }
                }
              ]
        }]
    },

    plugins: [
        new MiniCssExtractPlugin({
            filename: `${PATHS.assets}/css/[name].css`
        }),
        new HtmlWebpackPlugin({
            hash: false,
            template: `${PATHS.src}/index.html`,
            filename: './index.html'
        }),
        new CopyWebpackPlugin([
            {from: `${PATHS.src}/img/`, to: `${PATHS.assets}/img/`},
            {from: `${PATHS.src}/static/`, to: ''}
        ])
    ]
};