const { merge } = require("webpack-merge");
const common = require("./webpack.common");

const config = {
  mode: "production",

  // optimization
  // 자주 사용되어 중복으로 import 된 모듈을 별도의 chunk 파일로 생성
  // 거대한 번들 파일들을 분리할 수 있음
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          chunks: "all",
          name: "js/vendor/libs",
        },
      },
    },
  },
};

module.exports = merge(common, config);
