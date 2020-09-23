import axios from '@/utils/axios';

export default {
    // 获取用户信息
    getUserData(params) {
        return axios.request({
            url: '',
            method: 'POST',
            data: params
        })
    },
    // 获取权限信息
    getRolesData(params) {
        return axios.request({
            url: 'chats/workchat/group-ap',
            method: 'GET',
            params
        })
    }
}
