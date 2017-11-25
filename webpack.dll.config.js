var path = require('path');
var webpack = require('webpack');

module.exports = {
    entry: {
        vendor: ['react', 'react-dom', 'react-router']
    },
    output: {
        path: path.join(__dirname, 'build'),
        filename: '[name].js',//[name] is the entry's key
        library: '[name]_library',
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin(),
        new webpack.DllPlugin({
            path: path.join(__dirname, 'build', '[name]-manifest.json'),
            name: '[name]_library',
           // context: __dirname,
        }),
    ],
};