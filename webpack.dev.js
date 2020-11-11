const { merge } = require("webpack-merge");
const common = require("./webpack.common");

const config = {
  mode: "development",

  // dev server
  // hot loading 적용
  devServer: {
    port: 9000,
    open: true,
    hot: true,
  },

  // devtool
  devtool: "eval-cheap-source-map",
};

module.exports = merge(common, config);
