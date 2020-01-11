const path = require('path');
const paths = require('./webpack.paths');
const pkg = require('./package.json');

module.exports = {
    mode: 'production',
    devtool: 'source-map',
    entry: path.resolve(paths.srcDir, 'index.js'),
    output: {
        filename: `${pkg.bundleName}.min.js`,
        path: paths.dist,
        library: 'Voxel',
        libraryTarget: 'umd',
        globalObject: 'this',
    },
    externals: {
        three: {
            root: 'THREE',
            commonjs2: 'three',
            commonjs: 'three',
            amd: 'three',
        },
    },
}