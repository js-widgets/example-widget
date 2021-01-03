const { POSTCSS_MODES } = require('@craco/craco');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  style: {
    postcss: {
      mode: POSTCSS_MODES.file,
    },
  },
  webpack: {
    configure: {
      optimization: {
        splitChunks: {
          cacheGroups: {
            default: false,
          },
        },
        runtimeChunk: false,
      },
      plugins: [
        new webpack.optimize.LimitChunkCountPlugin({
          maxChunks: 1,
        }),
        new MiniCssExtractPlugin({
          filename: 'css/[name].css',
        }),
      ],
      output: {
        filename: 'js/[name].js',
      },
      externals: {
        react: 'React',
        'react-dom': 'ReactDOM',
        'react-intl': 'ReactIntl',
      },
    },
  },
};
