<template>
    <div class="about">
        <h1>This is an about page</h1>
        <div class="test">
            <span>字</span>
            <div class="test2">100 x 100</div>
            <div class="test3">100 x 100</div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {};
    },
    mounted() {
        const test = 1;
        console.log("test: ", test);
    }
};
</script>
<style scoped>
.test {
    font-size: 16px;
    width: 320px;
    height: 500px;
    outline: 1px solid;
    margin: auto;
}
.test2 {
    font-size: 16px;
    width: 100PX;
    height: 100PX;
    outline: 1px solid;
    margin: 20px auto;
}
</style>
