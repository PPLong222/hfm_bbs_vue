const {defineConfig} = require('@vue/cli-service')
const webpack = require("webpack");

module.exports = defineConfig({
    transpileDependencies: true
})

// 导入JQuery模块
module.exports = {
    configureWebpack: {
        //支持jquery
        plugins: [
            new webpack.ProvidePlugin({
                $: "jquery",
                jQuery: "jquery",
                "windows.jQuery": "jquery"
            })
        ]
    }
}
module.exports = {
    devServer: {
        port: 8081,
        proxy: 'http://localhost:8080',
        // proxy: {
        //     '/api' : {
        //         target: "http://localhost:8080",
        //         changeOrigin: true,
        //         pathRewrite: {
        //             "^/api" : ""
        //         }
        //     }
        // }
    }

}