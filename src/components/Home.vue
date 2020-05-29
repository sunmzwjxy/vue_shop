<template>
    <div>
        <el-button type="info" @click="logoff">logoff</el-button>
    </div>
</template>

<script>
export default {
    name: 'home',
    data() {
        return {}
    },
    methods: {
        logoff() {
            window.sessionStorage.clear()
            this.$router.push('/login')
        }
    }
}
</script>

<style lang="less" scope></style>>
