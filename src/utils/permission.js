import Vue from 'vue';
import router from '@/router';
import store from '@/store';
import { modulesFiles } from '@/utils/function.js';
import NProgress from 'nprogress'; // progress bar
import Common from '@/common/Common.js';
import '@/assets/css/reset.css';
import '@/assets/css/public.less';
import 'amfe-flexible';
// import Element from 'element-ui';
// import 'element-ui/lib/theme-chalk/index.css';
// import '@/assets/css/iconfont.css';
// Vue.use(Element, {
//   size: 'small' // set element-ui default size
// })
// 统一的vue注册方法(app, 模块, 标识, 配置)
export function vueRegisterFun(App, modules, tagName, option = {}) {
  modules = modulesFiles(modules)
  NProgress.configure({ showSpinner: false }) // NProgress Configuration

  router.beforeEach(async(to, from, next) => {
    if (to.meta && to.meta.title) {
      document.title = to.meta.title;
    }
    // start progress bar
    NProgress.start();
    if (to.path == 'login') {
      next();
    } else {
      const hasRole = store.getters['role/roles'];
      if (hasRole) {
        next();
      } else {
        const routes = await store.dispatch('role/getInfo', { modules, tagName, getRolesData: option.getRolesData });
        console.log('routes: ', routes);
        router.addRoutes(routes);
        next({ ...to, replace: true })
      }
    }
  })
  router.afterEach(() => {
    // finish progress bar
    NProgress.done()
  })
  Vue.config.productionTip = false;
  Vue.prototype.Common = new Common();

  if (option.vueBefore && typeof option.vueBefore === 'function') option.vueBefore(Vue, router);
  window.app = new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App)
  })
  if (option.vueAfter && typeof option.vueAfter === 'function') option.vueAfter(Vue, router);
}
