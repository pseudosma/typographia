module.exports = {
    entry: {
        main: './ts'
    },
    output: {
        filename: 'main.js',
        path: __dirname + '/js'
    },
    resolve: {
        extensions: ['.ts', '.js']
    },
    module: {
        rules: [{
            test: /\.tsx?$/,
            loader: 'ts-loader'
        }]
    }
}
