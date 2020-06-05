<template>
    <el-container class="home-container">
        <!-- Header area -->
        <el-header>
            <div>
                <img src="../assets/timg.jpg" alt height="100%" width="100" border="1px solid #eee" />
                <span>Management</span>
            </div>
            <el-button type="info" @click="logoff">logoff</el-button>
        </el-header>
        <el-container>
            <!-- left Side area -->
            <router-view name="Side"></router-view>
            <!-- Main area -->
            <el-main>
                <router-view name="Main"></router-view>
            </el-main>
        </el-container>
    </el-container>
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

<style lang="less" scope>
.home-container {
    height: 100%;
}

.el-header {
    background-color: #373d41;
    display: flex;
    justify-content: space-between;
    padding-left: 0;
    align-items: center;
    color: #fff;
    font-size: 20px;
    > div {
        display: flex;
        align-items: center;
        span {
            margin-left: 15px;
        }
    }
}

.el-main {
    background-color: #eaedf1;
}
</style>
