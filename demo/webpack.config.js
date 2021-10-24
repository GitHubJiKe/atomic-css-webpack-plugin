const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const AtomicCSSWebpackPlugin = require('atomic-css-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: path.resolve(__dirname, './app.js'),
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: "bundle.[hash].js",
        clean: true
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: "Atomic CSS Webpack Plugin",
            minify: 'auto'
        }),
        // new AtomicCSSWebpackPlugin(),
        new AtomicCSSWebpackPlugin({ config: path.resolve(__dirname, './myconfig.js') })
    ],
}