import Vue from 'vue'
import Vuex from 'vuex'
import { modulesFiles } from '@/utils/function.js';
Vue.use(Vuex)

const modules = modulesFiles(require.context('./modules', true, /\.js$/));

const store = new Vuex.Store({
  modules
})
export default store;