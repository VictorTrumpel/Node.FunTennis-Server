const path = require("path");
const fs = require("fs");
const nodeModules = {};

fs.readdirSync(path.resolve(__dirname, "node_modules"))
  .filter((x) => [".bin"].indexOf(x) === -1)
  .forEach((mod) => {
    nodeModules[mod] = `commonjs ${mod}`;
  });

module.exports = {
  mode: "development",
  entry: "./src/app.ts",
  target: "node",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "build"),
  },
  externals: nodeModules,
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        enforce: "pre",
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".ts", "tsx", ".js"],
    alias: {
      "@commonTypes": path.resolve(__dirname, "src/commonTypes/"),
      "@helpers": path.resolve(__dirname, "src/helpers/"),
      "@models": path.resolve(__dirname, "src/models/"),
      "@middleware": path.resolve(__dirname, "src/middleware/"),
      "@controllers": path.resolve(__dirname, "src/controllers/"),
      "@router": path.resolve(__dirname, "src/router/"),
      "@forms": path.resolve(__dirname, "src/forms/"),
    },
  },
};
