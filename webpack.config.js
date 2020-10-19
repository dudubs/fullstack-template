const path = require("path");
module.exports = {
  mode: "development",
  output: {
    path: path.join(__dirname, "bundle"),
  },
  watch: true,
  watchOptions: {
    ignored: ["node_modules/**"]
  },
  entry: {
    browser: path.join(__dirname, "src/browser/index"),
  },
  stats: {
    warnings: false,
  },
  devtool: "inline-source-map",
  optimization: {
    runtimeChunk: "single",
    splitChunks: {
      chunks: "all",
      name: "vendor",
    },
  },
  resolve: {
    modules: [path.resolve("node_modules")],
    extensions: [".ts", ".tsx", ".js"],
  },
  module: {
    rules: [
      {
        test: /\.m?js/,
        type: "javascript/auto",
        resolve: {
          fullySpecified: false,
        },
      },
      {
        test: /\.tsx?$/,
        loader: "ts-loader",
        exclude: /node_modules/,
        options: {
          allowTsInNodeModules: true,
          transpileOnly: true,
          configFile:path.resolve(__dirname,"src/browser/tsconfig.json"),
          compilerOptions: {
            noEmit: false,
          },
        },
      },
    ],
  },
};
