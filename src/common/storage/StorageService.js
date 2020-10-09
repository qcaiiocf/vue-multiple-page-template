import Tools from '@/common/Tools'
export default {
    keyData: {
        local: ['topicModeIds'],
        session: []
    },
    getKey(key, id = '') {
        if (!key) return '';
        return id ? key + '_' + id : key;
    },
    getData(key, id = '', field = '') {
        const storage_key = this.getKey(key, id);
        if (!storage_key) return null;
        let data = null;
        if (this.keyData.local.indexOf(key) > -1) {
            data = localStorage.getItem(storage_key);
        }
        if (this.keyData.session.indexOf(key) > -1) {
            data = sessionStorage.getItem(storage_key);
        }
        if (field && data) {
            data = JSON.parse(data);
            return data[field] ? data[field] : '';
        }
        return data;
    },
    setData(key, data, id) {
        const storage_key = this.getKey(key, id);
        if (!storage_key) return;
        if (Tools.checkDataType(data) === 'object' || Tools.checkDataType(data) === 'array') {
            data = JSON.stringify(data);
        }
        if (this.keyData.local.indexOf(key) > -1) {
            localStorage.setItem(storage_key, data);
        }
        if (this.keyData.session.indexOf(key) > -1) {
            sessionStorage.setItem(storage_key, data);
        }
        return true;
    },
    removeData(key, data, id) {
        const dataType = Tools.checkDataType(key);
        if (dataType === 'string') {
            if (key === 'all') {
                this.keyData.local.map(item => {
                    const storage_key = this.getKey(item, id);
                    if (storage_key) {
                        localStorage.removeItem(storage_key);
                    }
                });
                this.keyData.session.map(item => {
                    const storage_key = this.getKey(item, id);
                    if (storage_key) {
                        sessionStorage.removeItem(storage_key);
                    }
                })
            } else {
                const storage_key = this.getKey(key, id);
                if (storage_key) {
                    if (this.keyData.local.indexOf(key) > -1) {
                        localStorage.removeItem(storage_key);
                    }
                    if (this.keyData.session.indexOf(key) > -1) {
                        sessionStorage.removeItem(storage_key);
                    }
                }
            }
        }
        if (Tools.checkDataType(key) === 'array') {
            key.map(item => {
                const storage_key = this.getKey(item, id);
                if (storage_key) {
                    if (this.keyData.local.indexOf(item) > -1) {
                        localStorage.removeItem(storage_key);
                    }
                    if (this.keyData.session.indexOf(item) > -1) {
                        sessionStorage.removeItem(storage_key);
                    }
                }
            })
        }
    }
}
