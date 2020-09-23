/* eslint-disable no-case-declarations */
/* eslint-disable no-console */
/*
    axios统一处理
*/
import axios from 'axios';
import config from '@/utils/config';
import md5 from 'js-md5';
import AuthService from "@/common/public/AuthService";
import Utils from '@/common/Utils'
import Tools from '@/common/Tools'
const CancelTokenObject = axios.CancelToken;
class HttpRequest {
    constructor(baseUrl = config.getBaseUrl()) {
        this.baseUrl = baseUrl;
        this.queue = {}; // 请求缓存
    }
    getInsideConfig() {
        return {
            baseURL: this.baseUrl,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json;charset=UTF-8',
                Authorization: 'Bearer ' + AuthService.getToken()
            },
            withCredentials: true
        };
    }
    interceptors(instance, url, md5Token, isWriteToken) {
        // 请求拦截
        instance.interceptors.request.use(
            config => {
                // 防止post方式重复提交
                if (config.method !== 'get') {
                    if (this.queue[md5Token]) {
                        this.queue[md5Token]();
                        delete this.queue[md5Token];
                    }
                    config.cancelToken = new CancelTokenObject(c => {
                        this.queue[md5Token] = c;
                    })
                }
                return config
            },
            error => {
                return Promise.reject(error)
            }
        );
        // 响应拦截
        instance.interceptors.response.use(
            response => {
                // 更换token
                if (response.headers.chattoken && isWriteToken) {
                    Tools.codeDelayRun(function() {
                        AuthService.setToken(response.headers.chattoken);
                    }, 'updateChatToken', 5000);
                }
                if (response.data.code && response.data.code == 401) {
                    Utils.showMessage('未授权，请先登录！');
                    Utils.loginOut();
                }
                return response.data || response
            },
            error => {
                // NProgress.done(); //顶部加载条结束
                if (error.response) {
                    const status = error.response.status;
                    switch (status) {
                        case 401:
                            // 提示授权
                            Utils.showMessage('未授权，请先登录！');
                            Utils.loginOut();
                            break;
                        default:
                            console.log(error.response.data.msg || error.response.data.message)
                            break;
                    }
                    // 判断是500 错误则后台常驻并显示请求id
                } else if (error.request) {
                    Utils.showMessage('您的网络繁忙或异常,请刷新重试!')
                } else if (!error.message) {
                    throw '重复请求';
                }
                return error
            }
        )
    }
    request(options) {
        const instance = axios.create();
        const loginAuthorization = (options.params && options.params.loginAuthorization) ? options.params.loginAuthorization : '';
        options = Object.assign(this.getInsideConfig(), options);
        let isWriteToken = true; //是否可以写 token
        if (loginAuthorization) {
            options.headers.Authorization = loginAuthorization;
            options.params.loginAuthorization = null;
            isWriteToken = false;
        }
        this.interceptors(instance, options.url, md5(JSON.stringify(options)), isWriteToken);
        return instance(options).catch((res) => { throw res });
    }
}
export default HttpRequest
