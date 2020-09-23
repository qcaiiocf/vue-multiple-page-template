const pageMethod = require('./util/getPages.js');
const pages = pageMethod.pages(); // 引入pages
module.exports = {
	// publicPath: process.env.NODE_ENV === 'production' ? '/chat/static/titian' : '/',
	// outputDir: '../../codePhp/public/chat/static/titian/',
	pages,
	devServer: {
        disableHostCheck: true, //  新增该配置项
        port: 8081
    },
    productionSourceMap: false
}
