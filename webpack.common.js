const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  target: "web",
  entry: "./src/index.js", //Todo: Change this to .ts file when Typescript conversion for it is done
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx"],
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        {
          from: "*.{png,json,txt}", //Get all files except .ico:s (favicon.ico) and .html:s (index.html) from public folder
          context: path.resolve(__dirname, "public"), //Move to public folder
          to: "", //Move all files to the root of dist folder
        },
      ], //Copy all contents of public except index.html because it is handled by HtmlWebpackPlugin
    }),
    new HtmlWebpackPlugin({
      template: "./public/index.html",
      filename: "index.html",
      favicon: "./public/favicon.ico",
    }),
    new MiniCssExtractPlugin(),
  ],
  module: {
    rules: [
      //Typescript requirements
      {
        test: /\.(t|j)sx?$/,
        use: { loader: "ts-loader" },
        exclude: /node_modules/,
      },

      {
        enforce: "pre",
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "source-map-loader",
      },
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: "asset/resource",
      },
    ],
  },
  externals: {
    react: "React",
    "react-dom": "ReactDOM",
  },
};
