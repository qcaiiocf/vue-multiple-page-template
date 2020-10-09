<template>
    <div class="index">
        <div>字体</div>
        <div>{{ testData }}</div>
    </div>
</template>
<script>
import { mapGetters } from 'vuex'
import Utils from '@/common/Utils';
export default {
    data() {
        return {}
    },
    computed: {
        ...mapGetters({
            testData: 'test/testData'
        })
    },
    mounted() {
        this.init();
    },
    methods: {
        init() {
            this.getData();
        },
        getData() {
            Utils.sendActions('test/getTestData', {}).then(res => {
                console.log('res: ', res);
            })
        }
    }
}
</script>
<style lang="less" scoped>
</style>