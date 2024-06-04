const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
const webpack = require("webpack");

module.exports = {
    mode: "development",
    devtool: "eval-source-map",
    entry: "./src/main.js",
    output: {
        path: path.resolve(process.cwd(), 'dist'),
        filename: "bundle.min.js"
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
                test: [/\.vert$/, /\.frag$/],
                use: "raw-loader"
            },
            {
                test: /\.(gif|png|jpe?g|svg|xml|glsl)$/i,
                use: "file-loader"
            },
            {
                test: /\.node$/,
                use: 'raw-loader'
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin({
            cleanOnceBeforeBuildPatterns: [path.join(__dirname, "dist/**/*")]
        }),
        new webpack.DefinePlugin({
            "typeof CANVAS_RENDERER": JSON.stringify(true),
            "typeof WEBGL_RENDERER": JSON.stringify(true),
            "typeof WEBGL_DEBUG": JSON.stringify(true),
            "typeof EXPERIMENTAL": JSON.stringify(true),
            "typeof PLUGIN_3D": JSON.stringify(false),
            "typeof PLUGIN_CAMERA3D": JSON.stringify(false),
            "typeof PLUGIN_FBINSTANT": JSON.stringify(false),
            "typeof FEATURE_SOUND": JSON.stringify(true)
        }),
        new HtmlWebpackPlugin({
            template: "./index.html"
        })
    ],
    resolve: {
        alias: {
            'firebase-admin': path.resolve('../../node_modules/', 'firebase-admin.js'),
        },
        fallback: {
            "http": require.resolve("stream-http"),
            "https": require.resolve("https-browserify"),
            "url": require.resolve("url/"),
            "stream": require.resolve("stream-browserify"),
            "util": require.resolve("util/"),
            "path": require.resolve("path-browserify"),
            "zlib": require.resolve("browserify-zlib"),
            "crypto": require.resolve("crypto-browserify"),
            "querystring": require.resolve("querystring-es3"),
            "os": require.resolve("os-browserify/browser"),
            "child_process": false,
            "vm": require.resolve("vm-browserify"),
            "node:events": false,
            "node:stream": false,
            "node:util": false,
            "farmhash": false
        }
    },
    externals: {
        fs: 'null' // ou outra estratégia adequada para o seu caso
    },
    plugins: [
        new webpack.ProvidePlugin({
            process: 'process/browser',
            Buffer: ['buffer', 'Buffer'],
        }),
    ],
};