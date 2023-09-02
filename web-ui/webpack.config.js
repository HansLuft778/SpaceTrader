const path = require('path');

module.exports = {
    entry: {
        index: './src/index.ts',
        contract: './src/Contracts.ts',
        waypoint: './src/Waypoint.ts',
        fleet: './src/Fleet.ts',
    },
    devtool: 'source-map',
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },
    resolve: {
        extensions: ['.ts', '.js'],
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    },
};
