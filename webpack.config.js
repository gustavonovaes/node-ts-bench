const path = require("path");

module.exports = {
  target: "node",
  entry: __dirname + "/src/index.ts",
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".json", ".wasm"],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: "ts-loader",
            options: {
              transpileOnly: true,
            },
          },
        ],
      },
    ],
  },
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist'),
  },
  externals: {
    heapdump: 'heapdump',
  },
};
