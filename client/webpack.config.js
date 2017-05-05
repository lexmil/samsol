webpack = require('webpack');
path = require('path');

webpackConfig = {
    context: __dirname,
    entry: {
        bundle: __dirname + '/src/app.js'
    },
    output: {
        filename: 'bundle.js',
        path: __dirname + '/build'
    },
    resolve: {
        extensions: ['.js', '.jsx']
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: [/node_modules/],
                loader: "babel-loader",
                query: {
                    presets: ['es2015', 'react', 'stage-0', 'stage-1']
                }
            }
        ]
    },
    watch: true,
    watchOptions: {
        aggregateTimeout: 100
    }
};

module.exports = webpackConfig;