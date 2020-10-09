import Tools from './Tools';
/*
    实用函数,大多与业务相关
*/
class Utils {
  static showMessage() {
  }
  // send actions
  static sendActions(type = '', params = {}, config = {}) {
    const app = window.app;
    const configDef = {
      showLoading: false,
      msg: '加载中...'
    };
    const paramsDef = {};
    config = Tools.objectAssignDeep(configDef, config);
    params = Tools.objectAssignDeep(paramsDef, params);

    return app.$store.dispatch(type, { params, config });
  }
  static sendRequest(request, params = {}, config = {}) {
    if (!request || !params) return new Promise((reslove, reject) => {});
    // const app = window.app;
    const configDef = {
      showLoading: false,
      showSuccess: false, // 操作成功信息文案
      successMsg: '', // 显示操作成功信息
      errMsg: '',
      msg: '加载中...'
    };
    config = Tools.objectAssignDeep(configDef, config);
    // config.showLoading && app.$Loading(config.msg);
    return new Promise((reslove, reject) => {
      request(params).then(res => {
        if (res.code == 200) {
          reslove(res);
          if (config.successMsg) {
            this.showMessage(config.successMsg, 'success');
          } else if (config.showSuccess) {
            this.showMessage(res.msg || '操作成功', 'success');
          }
        } else {
          this.showMessage(config.errMsg || res.msg || '操作失败！', 'error');
          reject(res);
        }
      })
        .catch(err => {
          reject(err);
        })
        .finally(() => {
          // config.showLoading && app.$Loading.close();
        })
    })
  }
}
export default Utils;
