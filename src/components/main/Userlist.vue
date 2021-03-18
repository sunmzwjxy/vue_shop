<template>
    <div>
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>用户管理</el-breadcrumb-item>
            <el-breadcrumb-item>用户列表</el-breadcrumb-item>
        </el-breadcrumb>

        <!-- UserCard -> parent -> UserDlg -> back to parent -->
        <!-- 用户列表 -->
        <!-- 向父组件传值，兄弟组件传值 （父组件中转，也可以使用vue-bus），这里使用常规模式 -->
        <!-- v-on:fromchild是监控来自子组件的值，fromchild必须和子组件的标识符保持一致 -->
        <!-- fromchild 方法名，可以自定义 -->
        <!-- <UserCard ref="refusercard" v-on:fromchild="fromchild"></UserCard> -->

        <!-- 添加新用户对话框 子组件 -->
        <!-- :dialogVisible必须和子组件的props保持一致 -->
        <!-- dialogVisible就是要传给子组件的值 -->
        <!-- v-on:DialogVisable是监控来自子组件的值，DialogVisable必须和子组件的标识符保持一致 -->
        <!-- fromchild 方法名，不需要重写 -->
        <!-- <UserDlg ref="refchild" :dialogVisible.sync="dialogVisible" v-on:DialogVisable="fromchild"></UserDlg> -->

        <UserCard ref="refusercard"></UserCard>
        <UserDlg ref="refchild"></UserDlg>
    </div>
</template>

<script>
// 导入子组件
import UserCard from '@/components/main/usercard'
import UserDlg from '@/components/main/userdialog'

export default {
    name: 'Userlist',
    data() {
        return {
            // dialogVisible: false
        }
    },
    methods: {
        // 方法名，父组件接收从子组件传来的值，value就是值
        // fromchild(value) {
        // this.dialogVisible = value
        // }
    },
    components: {
        // 子组件
        UserDlg: UserDlg,
        UserCard: UserCard
    },
    computed: {},
    created() {},
    beforeDestroy() {}
}
</script>

<style lang="less" scope></style>
