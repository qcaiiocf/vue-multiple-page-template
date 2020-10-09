import StorageService from "@/common/storage/StorageService";

export default class AuthService {
    //获取token
    static getToken(uid = 0) {
        return StorageService.getData('access_token') || '8vTd9fe0786845461dp71869f7fc74e772deafdce666685f69788d4695fd561u5uvTdp615f68160117966154430400103356011761';
    }
    //设置token
    static setToken(token, uid = 0) {
        StorageService.setData('access_token', token);
    }
    //清除token
    static removeToken(uid = 0) {
        StorageService.setData('access_token', null);
    }
}
