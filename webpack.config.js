const path = require('path');
const outPath = path.join(__dirname, 'public');

module.exports = {
    //Where does webpack start? here
    entry: {
        app: "./src/app.js",
        game: "./src/game.js"
    },
    output: {
        path: outPath,
        filename: "[name].js"
    },
    //Using development mode for now until things are more complete
    mode: "development",
    //Next, rules to follow for files within
    module: {
        rules: [{
            loader: 'babel-loader',
            test: /\.js$/,
            exclude: /node_modules/
        }, {
            test: /\.s?css$/,
            //'use' lets you use an array of loaders, rather than just a single one.
            use: [
                'style-loader',
                'css-loader',
                'sass-loader'
            ]
        }],
    },
    //source mapping means we can debug more easily.
    devtool: 'cheap-module-eval-source-map',
    //This makes webpack watch for changes and rebuild as necessary.
    watch: true
}