const HtmlWebpackPlugin = require('html-webpack-plugin');
const {VueLoaderPlugin} = require('vue-loader');

module.exports = (env) => {
    return {
        mode: env.mode,
        target: 'electron-renderer',
        entry: './app/main.js',

        module: {
            rules: [
                {
                    test: /\.vue$/,
                    use: 'vue-loader'
                },
                {
                    test: /\.(png|jpg|gif|svg)$/,
                    use: {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]?[hash]'
                        }
                        
                    }
                }
            ]
        },

        resolve: {
            alias: {vue: 'vue/dist/vue.js'}
        },

        plugins: [
            new HtmlWebpackPlugin({
                template: './app/index.html'
            }),
            new VueLoaderPlugin()
        ]
    };
};
