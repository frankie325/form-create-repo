const path = require("path");

const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const { VueLoaderPlugin } = require("vue-loader");
const { merge } = require("webpack-merge");

function resolvePath(relativePath) {
    return path.resolve(process.cwd(), relativePath);
}

const CommonConfig = {
    entry: "./demo/main.js",
    output: {
        filename: "./js/[name].[chunkhash:6].js",
        path: resolvePath("./dist"),
    },
    module: {
        rules: [
            {
                test: /\.css?$/,
                use: ["style-loader", "css-loader"],
            },
            {
                test: /\.vue?$/,
                use: "vue-loader",
            },
            {
                test: /\.jsx$/,
                use: ["babel-loader"],
            },
            {
                test: /\.(ttf|woff2?|svg)/,
                type: "asset/resource",
                generator: {
                    filename: "assets/[name].[contenthash:6][ext]",
                },
            },
        ],
    },
    resolve: {
        extensions: [".vue", ".jsx", "..."],
        alias: {
            vue$: "vue/dist/vue.esm.js",
            "@": resolvePath("./src"),
            "@form-create": resolvePath("./src"),
        },
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: "FormCreate",
            template: "./demo/index.html",
        }),
        new VueLoaderPlugin(),
    ],
};

const DevConfig = {
    mode: "development",
    devtool: "cheap-source-map",
    devServer: {
        hot: true,
    },
};

const BuildConfig = {
    mode: "production",
    plugins: [
        new CleanWebpackPlugin(),
    ],
};

module.exports = (env) => {
    const isDevelopment = !!env.development;

    return isDevelopment ? merge(CommonConfig, DevConfig) : merge(CommonConfig, BuildConfig);
};
