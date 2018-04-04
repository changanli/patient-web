const path = require('path')

module.exports = {
    dev: {
        assetsSubDirectory: 'static',
        assetsPublicPath: '/',
        proxyTable: {
            '/g1': {
                target:'http://localhost:9090',
                changeOrigin: true
            },
            '/pv1': {
                target:'http://localhost:9090',
                changeOrigin: true
            },
            '/d1': {
                target:'http://localhost:9090',
                changeOrigin: true
            },
            '/user':{
                target:'http://localhost:9090',
                changeOrigin:true
            },
            '/static':{
                target:'http://localhost:9090',
                changeOrigin:true
            },
            '/uploads':{
                target:'http://localhost:9090',
                changeOrigin:true
            }
            //http://localhost:9090
        },
        host: 'localhost', // can be overwritten by process.env.HOST
        port: 4396, // can be overwritten by process.env.PORT, if port is in use, a free one will be determined
        autoOpenBrowser: true,
        errorOverlay: true,
        notifyOnErrors: true,

        // https://webpack.js.org/configuration/devtool/#development
        devtool: '#cheap-module-eval-source-map',
        cssSourceMap: false,
    },

    build: {
        // Template for index.html
        index: path.resolve(__dirname, '../dist/index.html'),

        // Paths
        assetsRoot: path.resolve(__dirname, '../server/dist'),
        assetsSubDirectory: 'static',
        assetsPublicPath: '',

        /**
         * Source Maps
         */

        productionSourceMap: true,
        // https://webpack.js.org/configuration/devtool/#production
        devtool: '#source-map',
    }
}