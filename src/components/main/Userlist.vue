<template>
    <div>
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>用户管理</el-breadcrumb-item>
            <el-breadcrumb-item>用户列表</el-breadcrumb-item>
        </el-breadcrumb>

        <!-- 用户列表 -->
        <!-- 向父组件传值，兄弟组件传值 （父组件中转，也可以使用vue-bus） -->
        <UserCard ref="refusercard" v-on:fromchild="fromchild"></UserCard>

        <!-- 添加新用户对话框 子组件 -->
        <UserDlg ref="refchild" :dialogVisible.sync="dialogVisible"></UserDlg>
    </div>
</template>

<script>

import UserCard from '@/components/main/usercard'
import UserDlg from '@/components/main/userdialog'

export default {
    name: 'Userlist',
    data() {
        return {
            dialogVisible: false
        }
    },
    methods: {
        fromchild(value) {
            this.dialogVisible = value
        }
    },
    components: {
        UserDlg: UserDlg,
        UserCard: UserCard
    },
    computed: {},
    created() {}
}
</script>

<style lang="less" scope>
</style>
