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

  mode: 'production',
  devtool: "source-map",
  resolve: {
    extensions: [".ts", ".tsx", ".js"]
  }
};
