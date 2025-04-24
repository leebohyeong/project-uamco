const path = require('node:path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const deviceOptions = {
    pc: {
        entry: {
            app: [
                './js/pc/app',
                './scss/pc/app'
            ],
        },
        plugins: [
            new MiniCssExtractPlugin({
                filename: 'assets/css/[name].css'
            })
        ]
    },
    mobile: {
        entry: {
            app: [
                './js/mobile/app',
                './scss/mobile/app'
            ],
        },
        plugins: [
            new MiniCssExtractPlugin({
                filename: 'm/assets/css/[name].css'
            })
        ]
    }
};

const config = (env, options) => {
    const isProduction = options.mode === 'production';
    const device = env?.device ?? 'pc';

    const config = {
        mode: env?.mode ?? 'development',
        devtool: isProduction ? false : 'inline-source-map',
        resolve: {
            modules: ['node_modules'],
            extensions: ['.js', '.scss'],
        },
        entry: deviceOptions[device]['entry'],
        output: {
            path: path.resolve(__dirname, '../src/main/resources/static/'),
            filename: `${device === 'pc' ? '' : 'm/'}assets/js/[name].js`
        },
        module: {
            rules: [
                {
                    test: /\.jsx?$/,
                    loader: 'babel-loader'
                },
                {
                    test: /\.(sa|sc|c)ss$/,
                    use: [
                        MiniCssExtractPlugin.loader,
                        {
                            loader: 'css-loader',
                            options: {
                                sourceMap: true,
                                importLoaders: 2,
                                url: false,
                            }
                        },
                        {
                            loader: 'postcss-loader',
                            options: {
                                postcssOptions: {
                                    plugins: [
                                        [
                                            'autoprefixer'
                                        ],
                                    ],
                                },
                                sourceMap: true,
                            }
                        },
                        {
                            loader: 'sass-loader',
                            options: {
                                sassOptions: {
                                    outputStyle: 'expanded',
                                },
                                sourceMap: true
                            }
                        },
                    ]
                }
            ]
        },
        plugins: [
            new webpack.LoaderOptionsPlugin({
                minimize: true
            }),
        ],
        optimization: {
            splitChunks: {
                cacheGroups: {
                    defaultVendors: {
                        chunks: 'initial',
                        name: 'vendors',
                        test: /[\\/]node_modules[\\/]/,
                        enforce: true,
                    },
                    default: {
                        minChunks: 2,
                        priority: -20,
                        reuseExistingChunk: true
                    }
                },
            }
        },
        target: ['web', 'es5']
    };

    if (deviceOptions[device]['output']) {
        config.output = Object.assign({}, config.output, deviceOptions[device]['output']);
    }

    if (deviceOptions[device]['plugins']) {
        config.plugins = (config.plugins || []).concat(deviceOptions[device]['plugins']);
    }

    if (isProduction) {
        config.optimization.minimizer = [
            new CssMinimizerPlugin(),
            new TerserPlugin({
                terserOptions: {
                    compress: {
                        drop_console: true
                    }
                }
            })
        ]
    }

    return config;
};
module.exports = config;