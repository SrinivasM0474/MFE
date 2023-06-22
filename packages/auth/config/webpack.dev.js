const { merge } = require("webpack-merge");
const HtmlWebpackPlugin = require("html-webpack-plugin");
// const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const { ModuleFederationPlugin } = require("webpack").container;
const commonConfig = require("./webpack.common");
const packageJSON = require("../package.json");

const devConfig = {
  mode: "development",
  output: {
    publicPath: "http://localhost:8087/",
  },
  devServer: {
    port: 8087,
    historyApiFallback: {
      index: "/index.html",
    },
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "auth",
      filename: "remoteEntry.js",
      exposes: {
        "./AuthApp": "./src/bootstrap",
      },
      shared: packageJSON.dependencies,
      // shared: ["react", "react-dom"],
    }),
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
  ],
};

module.exports = merge(commonConfig, devConfig);
