import { setGetters, setMutations } from '@/utils/function.js';
import Utils from '@/common/Utils';
import testApi from '@/api/testApi'
const state = {
    testData: 'test-data'
}
const getters = setGetters(state);
const mutations = setMutations(state);
const actions = {
    getTestData({ commit }) {
        return Utils.sendRequest(testApi.getTestData, { test: 1 }).then(res => {
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