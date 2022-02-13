const path = require("path");

const HtmlWebpackPlugin = require("html-webpack-plugin");
const { VueLoaderPlugin } = require("vue-loader");

module.exports = {
    mode: "development",
    entry: "./demo/main.js",
    module: {
        rules: [
            {
                // 处理.vue文件，使用vue-loader
                test: /\.vue?$/,
                use: "vue-loader",
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
        alias: {
            vue$: "vue/dist/vue.esm.js",
            "@": path.resolve(__dirname, "./src"),
        },
    },
    devServer: {
        // hot: true,
    },
};
