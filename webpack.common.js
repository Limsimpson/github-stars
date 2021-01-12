const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");

module.exports = {
  // entry
  entry: {
    "js/index": ["./src/index.ts"],
  },

  // output
  // name = entry key
  // __dirname : node 파일의 경로를 담고있는 변수
  // path는 절대경로로 설정
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].js",
  },

  // .js를 넣은 이유는 node_modules의 js까지 포함하기 위함
  resolve: {
    extensions: [".ts", ".js", ".css"],
  },

  // module
  module: {
    rules: [
      // css
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
        exclude: /node_modules/,
      },
      {
        test: /\.ts$/,
        loader: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },

  // plugin
  // template: build 전 사용되는 템플릿
  // filename: build 후 생성 될 파일 명
  // OptimizeCSSAssetsPlugin: css minify
  plugins: [
    new HtmlWebpackPlugin({
      template: "index.html",
      filename: "index.html",
      minify: {
        collapseWhitespace: true,
        useShortDoctype: true,
      },
    }),
    new MiniCssExtractPlugin({
      filename: "css/style.css",
    }),
    new OptimizeCSSAssetsPlugin({}),
  ],
};
