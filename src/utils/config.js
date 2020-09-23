export default {
    getBaseUrl() {
        let baseURL = '';
        if (process.env.NODE_ENV === 'development') {
            baseURL = "http://xxx.xxx.com";
        }
        return baseURL;
    }
}
