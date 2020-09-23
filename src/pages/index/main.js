import App from './App.vue'
import { vueRegisterFun } from '@/utils/permission';
let modules;
try {
    modules = require.context('./views', true, /\.vue$/);
} catch (error) {
    modules = null
}
vueRegisterFun(App, modules, 'index');
