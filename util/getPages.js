const glob = require('glob')
const pages = {}
module.exports.pages = function() {
  glob.sync('./src/pages/*').forEach(filepath => {
    const fileList = filepath.split('/');
    const fileName = fileList[fileList.length - 1];
    pages[fileName] = {
      entry: `src/pages/${fileName}/main.js`,
      // 模板来源
      template: `src/pages/${fileName}/index.html`,
      // 在 dist/index.html 的输出
      // filename: process.env.NODE_ENV === 'development' ? `${fileName}.html` : `${fileName}/${fileName}.html`,
      filename: `${fileName}.html`
      // 提取出来的通用 chunk 和 vendor chunk。
      // chunks: ['chunk-vendors', 'chunk-common', fileName]
    }
  })
  return pages
}
