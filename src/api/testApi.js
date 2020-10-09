import axios from '@/utils/axios';

export default {
    // 获取用户信息
    getTestData(params) {
        return axios.request({
            url: 'test-api',
            method: 'POST',
            data: params
        })
    }
}
