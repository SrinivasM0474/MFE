const { merge } = require("webpack-merge");
const { ModuleFederationPlugin } = require("webpack").container;
const commonConfig = require("./webpack.common");
const packageJSON = require("../package.json");

const devConfig = {
  mode: "development",
  output: {
    publicPath: "http://localhost:8086/",
  },
  devServer: {
    port: 8086,
    historyApiFallback: {
      index: "/index.html",
    },
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "container",
      remotes: {
        marketing: "marketing@http://localhost:8085/remoteEntry.js",
      },
      shared: packageJSON.dependencies,
      // shared: ["react", "react-dev"],
    }),
  ],
};

module.exports = merge(commonConfig, devConfig);
