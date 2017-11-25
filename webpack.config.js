const path    = require('path');
const webpack = require('webpack');

module.exports = {
    entry:[path.resolve(__dirname, 'src/index.jsx')],
    output: {
        path: path.join(__dirname, 'build'),
        filename: 'bundle.js'
    },
    module: {
        loaders: [
            {
                test: /\.jsx$/,
                loader: 'babel-loader',
                query: {presets:['react', 'es2015']},
                exclude: /node_modules/
            }]
    },
    plugins: [
        // new webpack.optimize.UglifyJsPlugin({
        //     compress: {
        //         warnings: false
        //     }
        // }),
        new webpack.DllReferencePlugin({
            context: __dirname,
            manifest: require('./build/vendor-manifest.json')
        })
    ]
};