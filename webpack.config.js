const config = {
  entry: "./src/index.ts",
  output: {
    publicPath: "/bark-engine",
    path: "/dist",
  },
  plugins: [
  ],
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/i,
        loader: "ts-loader",
        exclude: ["/node_modules/"],
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
        type: "asset",
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".jsx", ".js", "..."],
  },
};

module.exports = () => {
  config.mode = process.env.NODE_ENV || "development";
  return config;
};
