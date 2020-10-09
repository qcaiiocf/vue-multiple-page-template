import App from './App.vue'
import { vueRegisterFun } from '@/utils/permission';
let modules;
try {
    modules = require.context('./views', true, /\.vue$/);
} catch (error) {
    modules = null;
}
const option = {
    getRolesData: false, // 是否通过统一的后端接口获取路由权限
    vueBefore: () => {
        console.log('实例创建前')
    },
    vueAfter: () => {
        console.log('实例创建后')
    }
}
vueRegisterFun(App, modules, 'test', option);
