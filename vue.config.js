module.exports = {
    devServer: {
        disableHostCheck: true,
        host: 'localhost',   // 通过ipconfig查看本机IP
        port: 8036,
        proxy: {
            '/api': {
                target: 'http://localhost:8080',
                // secure: false, // 如果是https接口，需要配置这个参数
                changeOrigin: true,
                pathRewrite: {
                    '^/api': ''
                }
            },
        }
    },
    lintOnSave: false
}