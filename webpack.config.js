module.exports = {
    entry: {
        main: './ts'
    },
    output: {
        filename: 'main.js',
        path: __dirname + ''
    },
    resolve: {
        extensions: ['.ts', '.js']
    },
    module: {
        rules: [{
            test: function (modulePath) {
                return modulePath.endsWith('.ts') && !modulePath.endsWith('test.ts');
              },
            loader: 'ts-loader'
        }]
    }
}
