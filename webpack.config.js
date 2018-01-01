const path = require('path')

const config = {
  entry: {
      client: "./client/client.jsx",
      server: "./client/server.jsx"
  },
  output: {
      path: path.join(__dirname, "./public"),
      filename: "[name].js"
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/, // search for js files 
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'react'] // use es2015 and react
        }
      },
      {
        test: /\.scss$/,
        use: [
        {
            loader: "style-loader"
        },{
            loader: "css-loader?-url"
        },{
            loader: "sass-loader" 
        }]
      },
      {
        test: /\.(woff2?|ttf|otf|eot|svg|jpg)$/,
        exclude: /node_modules/,
        loader: 'file-loader',
        options: {
            name: '[path][name].[ext]'
        }
      }
    ]
  }
};

module.exports = config;