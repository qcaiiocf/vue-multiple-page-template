// import StorageService from "@/utils/storage/StorageService";

export default class AuthService {
    //获取token
    static getToken(uid = 0) {
        // return window.GlobalChatToken || StorageService.getData('access_token');
        // return localStorage.getItem('access_token');
        return '8vTd9fe0786845461dp71869f7fc74e772deafdce666685f69788d4695fd561u5uvTdp615f68160117966154430400103356011761';
    }
    //设置token
    static setToken(token, uid = 0) {
        // StorageService.setData('access_token', token);
        // window.GlobalChatToken = token;
        // return token;
        localStorage.setItem('access_token', token);
    }
    //清除token
    static removeToken(uid = 0) {
        // window.GlobalChatToken = null;
        // StorageService.removeData(['access_token', 'userToken']);
        // return true;
        localStorage.setItem('access_token', null);
    }
}
