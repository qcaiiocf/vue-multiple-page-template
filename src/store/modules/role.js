import { constantRoutes } from '@/router'
import { setGetters, setMutations, setComponents } from '@/utils/function.js';
import Utils from '@/common/Utils';
import roleApi from '@/api/roleApi'
const state = {
    roles: null, // 身份
    rolesMenu: [], // 后端获取的权限路由
    addRoutes: [], // 新增的路由
    routes: [] // 路由保存
}
const getters = setGetters(state);
const mutations = setMutations(state);
const actions = {
    async getInfo({ commit, dispatch }, { modules, tagName }) {
        const roles = ['admin'];
        let routes = [];
        let rolesMenu = [];
        // 获取路由权限
        const res = await dispatch('getRolesData');
        console.log('res: ', res);
        if (res && res.code == 200) {
            rolesMenu = res;
            commit('setRolesMenu', rolesMenu);
        }
        commit('setRoles', roles);
        // 本地route
        let routesLocal;
        try {
            routesLocal = require(`@/router/modules/${tagName}.js`);
        } catch (error) {
            routesLocal = null;
        }
        routesLocal = routesLocal ? routesLocal.default : [];
        // 额外route
        const routesOther = [
            { path: '/404', component: () => import('@/components/page404'), hidden: true },
            { path: '*', redirect: '/404', hidden: true }
        ]
        // 合并
        routes = [...rolesMenu, ...routesLocal, ...routesOther]
        commit('setAddRoutes', routes);
        // 合并本地无权限路由
        routes = [...constantRoutes, ...routes];
        commit('setRoutes', routes);
        // 设置component
        for (const item of routes) {
            setComponents(item, modules)
        }
        return routes;
    },
    getRolesData({ commit }) {
        return Utils.sendRequest(roleApi.getRolesData, { test: 2 }).then(res => {
            console.log('res: ', res);
        }).catch(err => {
            console.log('err: ', err);
        });
    }
};
const module = {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}
export default module;