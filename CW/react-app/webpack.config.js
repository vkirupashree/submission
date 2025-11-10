const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = (env, argv) => {
    const isProd = argv.mode === 'production';
    return {
        mode: argv.mode,
        entry: './src/index.js',
        output: {
            filename: 'bundle.js',
            path: path.resolve(__dirname, 'dist'),
            clean: true,
        },
        resolve: {
            extensions: ['.ts', '.tsx', '.js', '.jsx'],
        },
        module: {
            rules: [
                {
                    test: /\.(js|jsx)$/,
                    exclude: /node_modules/,
                    loader: 'babel-loader', // ✅ just this line, no nested use
                },
                {
                    test: /\.css$/, // ✅ add a separate rule for CSS
                    use: ['style-loader', 'css-loader'],
                },
            ],
        },
        optimization: isProd
            ? {
                  minimize: true,
                  minimizer: [
                      new TerserPlugin({
                          terserOptions: {
                              compress: true,
                              mangle: true,
                              format: { comments: false },
                          },
                          extractComments: false,
                      }),
                  ],
              }
            : {},
        devtool: isProd ? false : 'source-map',
        devServer: {
            static: {
                directory: path.resolve(__dirname, 'dist'),
            },
            compress: true,
            port: 8080,
            open: true,
            hot: true,
        },
    };
};
