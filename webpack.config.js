module.exports = {
   entry: './src/js/app.js',
   output: {
       path: __dirname + "/dist",
       filename: "bundle.js"
   },
   watch: true,
   module: {
       loaders: [{
           test: /\.js$/,
           exclude: /node_modules/,
           loader: 'babel-loader'
       }]
   }
}