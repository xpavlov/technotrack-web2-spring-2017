const webpack = require('webpack');
var BundleTracker = require('webpack-bundle-tracker');

const NODE_ENV = process.env.NODE_ENV || 'development';

module.exports = {
    entry: {
        coreBundle: './index.jsx',
    },
    context: `${__dirname}/static_src`,
    output: {
        path: `${__dirname}/static/build`,
        filename: NODE_ENV === 'development' ? '[name].js' : '[name]-[hash].js',
        publicPath: '/static/build/',
        library: '[name]',
    },

    plugins: [
        //     new webpack.NoEmitOnErrorsPlugin(),
        new BundleTracker({filename: './webpack-stats.json'})
    ],

    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                include: `${__dirname}/static_src`,
                loader: 'babel-loader',
                query: {
                    plugins: ['transform-decorators-legacy' ],
                    presets: ['es2015', 'stage-1', 'react']
                },
            },
            // {
            //     test: /\.(js|jsx)$/,
            //     include: `${__dirname}/static_src`,
            //     loader: 'babel-loader?presets[]=react&presets[]=env&presets[]=stage-1',
            //     query: {
            //         plugins: ['transform-decorators-legacy' ]
            //     },
            // },
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader',
            },
            {
                test: /\.scss$/,
                loader: 'style-loader!css-loader!sass-loader?outputStyle=expanded',
            },
            {
                test: /\.(png|jpg|gif|svg|ttf|eot|woff|woff2)$/,
                loader: 'url-loader?limit=4096&name=[path][name].[ext]',
            },
        ],
    },

    resolve: {
        modules: [`${__dirname}/static_src`, 'node_modules'],
        extensions: ['.js', '.jsx'],
    },

    watch: NODE_ENV === 'development',
    watchOptions: {
        aggregateTimeout: 100,
    },

    devtool: NODE_ENV === 'development' ? 'cheap-inline-module-source-map' : false,
};


if (NODE_ENV !== 'development') {
    module.exports.plugins.push(
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false,
                drop_console: true,
                unsafe: true,
            },
        })
    );
}