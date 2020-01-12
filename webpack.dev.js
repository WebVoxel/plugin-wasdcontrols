const merge = require('webpack-merge');

module.exports = merge(require('./webpack.common'), {
    mode: 'development',
    devtool: 'source-map',
    watch: true,
});
