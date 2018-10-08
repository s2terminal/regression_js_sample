module.exports = {
  module: {
    rules: [
      {
        test: /\.ts(x?)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "ts-loader"
          }
        ]
      }
    ]
  },

  mode: 'development',
  devtool: "source-map",
  resolve: {
    extensions: [".ts", ".tsx"]
  },
  externals: {
    "react": "React",
    "react-dom": "ReactDOM"
  }
};
