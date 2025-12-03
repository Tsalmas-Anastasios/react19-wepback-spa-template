import path from 'node:path';

import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import Dotenv from 'dotenv-webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';

const createWebpackConfig = (environment) => {
    return {
        entry: './src/index.tsx',
        mode: environment.NODE_ENV || 'development',
        output: {
            filename: 'bundle.[fullhash].js',
            path: path.resolve(import.meta.dirname, 'dist'),
            publicPath: '/',
        },
        plugins: [
            new CleanWebpackPlugin(),
            new HtmlWebpackPlugin({
                template: './src/index.html',
            }),
            new Dotenv({
                safe: true,
            }),
        ],
        resolve: {
            modules: [import.meta.dirname, 'src', 'node_modules'],
            alias: {
                '@': path.resolve(import.meta.dirname, 'src/'),
                '@components': path.resolve(import.meta.dirname, 'src/components'),
                '@pages': path.resolve(import.meta.dirname, 'src/pages'),
                '@assets': path.resolve(import.meta.dirname, 'src/assets'),
                '@hooks': path.resolve(import.meta.dirname, 'src/hooks'),
                '@utils': path.resolve(import.meta.dirname, 'src/utils'),
            },
            extensions: ['.tsx', '.ts', '.js', '.jsx'],
        },
        devtool: 'source-map',
        module: {
            rules: [
                {
                    test: /\.(ts|js)x?$/,
                    exclude: /node_modules/,
                    use: ['babel-loader'],
                },
                {
                    test: /\.css$/i,
                    use: ['style-loader', 'css-loader', 'postcss-loader'],
                },
                {
                    test: /\.(png|jpe?g|gif|svg)$/i,
                    exclude: /node_modules/,
                    use: ['file-loader'],
                },
            ],
        },
        devServer: {
            static: './dist',
            hot: true,
            historyApiFallback: true,
            port: 3000,
            open: true,
        },
    };
};

export default createWebpackConfig;
