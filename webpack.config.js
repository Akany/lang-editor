const HtmlWebpackPlugin = require('html-webpack-plugin');
const {VueLoaderPlugin} = require('vue-loader');

module.exports = (env) => {
    return {
        mode: env.mode,
        target: 'electron-renderer',
        entry: {
            app: './app/main.js'
        },

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
                },
                {
                    test: /\.scss$/,
                    use: [
                        'style-loader',
                        'css-loader',
                        'sass-loader'
                    ]
                },
                {
                    test: /\.css$/,
                    use: [
                        'style-loader',
                        'css-loader'
                    ]
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
