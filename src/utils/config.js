export default {
    getBaseUrl() {
        let baseURL = '';
        if (process.env.NODE_ENV === 'development') {
        baseURL = "http://chatdev.h5more.com";
        }
        // if (process.env.VUE_APP_IDENTITY && process.env.VUE_APP_IDENTITY === 'PRODUCT') {
        //     url = 'https://pm.h5more.com';
        // } else if (process.env.VUE_APP_IDENTITY && process.env.VUE_APP_IDENTITY === 'TEST') {
        //     url = 'http://chatdev.h5more.com';
        // } else if (process.env.VUE_APP_IDENTITY && process.env.VUE_APP_IDENTITY === 'LOCAL') {
        //     url = 'http://chat.dev.cn';
        // }
        // if (process.env.NODE_ENV !== 'development' && process.env.VUE_APP_IDENTITY === 'production') {
        //     url = 'https://pm.h5more.com';
        // }
        return baseURL;
    }
}
