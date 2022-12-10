const path = require("path");

// commonConfig需要
const { merge } = require("webpack-merge"); // webpack配置合并  需要 yarn add webpack-merge -D
const HtmlWebpackPlugin = require("html-webpack-plugin"); // 打包html  需要 yarn add html-webpack-plugin -D
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const BundleAnalyzerPlugin =
  require("webpack-bundle-analyzer").BundleAnalyzerPlugin; // 文件体积分析  需要 yarn add webpack-bundle-analyzer -D

const entryObj = {
  home: {
    title: "首页",
  },
  list: {
    title: "列表页",
  },
};

const getEntry = () => {
  const entry = {};
  Object.keys(entryObj).forEach(
    (v) => (entry[v] = `./src/pages/${v}/index.js`)
  );
  return entry;
};

const getHtmlWebpackPluginArr = () => {
  return Object.entries(entryObj).map(([key, val]) => {
    return new HtmlWebpackPlugin({
      title: val.title,
      filename: `${key}/index.html`,
      template: path.resolve(__dirname, "public/index.html"),
      chunks: [key, "common", "vendor"],
    });
  });
};

const commonConfig = {
  entry: getEntry(), // 入口文件配置  等价下方entry
  output: {
    filename: "[name]/index.js", // 打包文件名
    path: path.resolve(__dirname, "dist"), // 打包文件位置
    clean: true, // 每次打包前清空上次打包文件
  },
  module: {
    rules: [
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: "asset/resource",
      }, // png等文件的处理
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: "asset/resource",
      }, // 字体文件的处理
      {
        test: /\.less$/i,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          "less-loader",
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: [require("autoprefixer")],
              },
            },
          },
        ],
      }, // 处理less文件
      {
        test: /\.js$/,
        use: {
          loader: "babel-loader",
        },
        exclude: "/node_modules/",
      }, // 使用babel解析文件
    ],
  },
  plugins: [
    ...getHtmlWebpackPluginArr(), // 多页面文件打包 等价下面
    new MiniCssExtractPlugin({
      filename: "css/[name].css",
    }),
  ],
  optimization: {
    runtimeChunk: "single", // 运行时代码 // 将 runtime 代码拆分为一个单独的 chunk。将其设置为 single 来为所有 chunk 创建一个 runtime bundle
    splitChunks: {
      cacheGroups: {
        common: {
          name: "common",
          chunks: "initial",
          minSize: 1,
          priority: 0,
          minChunks: 2, // 同时引用了2次才打包
        }, // 多页面共用的文件
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: "vendors",
          chunks: "all",
        }, // node_modules的打包文件
      },
    },
  },
};

const proConfig = {
  mode: "production",
  devtool: "source-map",
  plugins: [new BundleAnalyzerPlugin()],
};

const devConfig = {
  mode: "development",
  devtool: "inline-source-map",
  devServer: {
    hot: true, // 热更新
    open: ["/home"], // 默认打开home/index.html
    client: {
      overlay: {
        errors: true, // 有错误展示弹框
        warnings: false, // 警告不展示
      },
    },
  },
};

module.exports = (env) => {
  return merge(commonConfig, env.production ? devConfig : devConfig);
};
