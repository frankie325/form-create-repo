const path = require("path");

const HtmlWebpackPlugin = require("html-webpack-plugin");
const { VueLoaderPlugin } = require("vue-loader");

module.exports = {
    mode: "development",
    devtool: "cheap-source-map",
    entry: "./demo/main.js",
    module: {
        rules: [
            {
                test: /\.css?$/,
                use: ["style-loader", "css-loader"],
            },
            {
                // 处理.vue文件，使用vue-loader
                test: /\.vue?$/,
                use: "vue-loader",
            },
            {
                test: /\.jsx$/,
                use: ["babel-loader"],
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            // title: "webpack教程",
            template: "./demo/index.html",
        }),
        new VueLoaderPlugin(),
    ],
    resolve: {
        extensions: [".vue", ".jsx", "..."],
        alias: {
            // fs: false,
            // path: false,
            // file: false,
            // system: false,
            vue$: "vue/dist/vue.esm.js",
            "@": path.resolve(__dirname, "./src"),
        },
    },
    devServer: {
        // hot: true,
    },
};
