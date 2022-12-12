<template>
    <div>
        跟着大神做
        <span>{{ msg }}</span>
        的码农
    </div>
</template>

<script>
export default {
    name: 'App',

    data() {
        return {
            msg: '有追求的',
        };
    },
};
</script>
<style lang="less" scoped>
div {
    height: 300px;
    display: flex;
    background-color: #ededed;
    border: 1px solid #333;
    border-radius: 5px;
    span {
        color: red;
    }
}
</style>
