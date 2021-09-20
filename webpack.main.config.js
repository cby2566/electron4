module.exports = {
  /**
   * This is the main entry point for your application, it's the first file
   * that runs in the main process.
   * 
   * 主程序的入口文件，第一个JS
   * 在主程序中运行
   */
  entry: './src/main.js',
  // Put your normal webpack config below here
  // 主进程的配置项
  module: {
    rules: require('./webpack.rules'),
  },
};
