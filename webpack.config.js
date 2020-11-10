const path = require('path');
const fs = require('fs');

const PATHS = {
    src: path.join(__dirname, './src'),
    dist: path.join(__dirname, './dist'),
    /*  assets: 'assets/' */
}

const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const PAGES_DIR = `${PATHS.src}/pug/pages/`
const PAGES = fs.readdirSync(PAGES_DIR).filter(fileName => fileName.endsWith('.pug'))

module.exports = {
    entry: './src/js/index.js',
    output: {
        filename: './js/bundle.js',
    },
    devServer: {
        open: true
    },
    
    devtool: "source-map",
    module: {
        
        rules: [{
            test: /\.js$/,
            include: path.resolve(__dirname, 'src/js'),
            use: {
                loader: 'babel-loader',
                options: {
                    presets: 'env'
                }
            }
        },
        {
            test: /\.pug$/,
            loader: 'pug-loader',
            options: {
                pretty: true
            },
        },
        //scss
        {
            test: /\.scss$/,
            use: [
                'style-loader',
                MiniCssExtractPlugin.loader,
                {
                    loader: 'css-loader',
                    options: { sourceMap: true }
                }, /* {
                    loader: 'postcss-loader',
                    options: { sourceMap: true }
                }, */ {
                    loader: 'sass-loader',
                    options: { sourceMap: true }
                }
            ]
        }, {
            test: /\.css$/,
            use: [

                {
                    loader: 'css-loader',
                    options: { sourceMap: true }
                }, /* {
                    loader: 'postcss-loader',
                    options: { sourceMap: true }
                } */
            ]
        },
        // image
        {
            test: /\.(png|jpg|gif|svg)$/,
            loader: 'file-loader',
            options: {
                name: '[name].[ext]',
                /* outputPath :  '/img/', */
            }
        }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: `${PATHS.assets}css/[name].[hash].css`,
        }),

        ...PAGES.map(page => new HtmlWebpackPlugin({
            template: `${PAGES_DIR}/${page}`,
            filename: `./${page.replace(/\.pug/, '.html')}`
        }))
    ]
};