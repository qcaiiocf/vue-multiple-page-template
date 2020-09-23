// set vuex getters
export const setGetters = (state = {}) => {
    const getters = {};
    for (const key in state) {
        getters[key] = (state) => state[key];
    }
    return getters;
}
// set vuex mutations
export const setMutations = (state = {}) => {
    const mutations = {};
    for (const key in state) {
        mutations[`set${key.replace(key[0], key[0].toUpperCase())}`] = (state, data) => { state[key] = data };
    }
    return mutations;
}
// generating modules
export const modulesFiles = (files) => {
    if (!files || !files.keys() || !files.keys().length) return [];
    return files.keys().reduce((modules, modulePath) => {
        // set './app.js' => 'app'
        const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1');
        const value = files(modulePath)
        if (value.default) { // rule out yourself
            modules[moduleName] = value.default
        }
        return modules
    }, {});
}
// set components
export const setComponents = (data = {}, modules = []) => {
    const path = data.path.replace(/\//g, '')
    if (path && modules[path]) {
        data.component = modules[path];
    }
    if (data.children && data.children.length) {
        data.children.forEach(child => {
        this.setComponent(child, modules)
        })
    }
}