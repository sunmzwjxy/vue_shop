<template>
    <div>
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>权限管理</el-breadcrumb-item>
            <el-breadcrumb-item>权限列表</el-breadcrumb-item>
        </el-breadcrumb>

        <el-card>
            <el-table :data="rightlist" border stripe>
                <el-table-column type="index" label="#"></el-table-column>
                <el-table-column prop="name" label="权限名称"></el-table-column>
                <el-table-column prop="path" label="路径"></el-table-column>
                <el-table-column prop="lever" label="级别">
                    <template slot-scope="scope">
                        <el-tag v-if="scope.row.lever === 1">Lever 1</el-tag>
                        <el-tag type="success" v-else-if="scope.row.lever === 2">Lever 2</el-tag>
                        <el-tag type="warning" v-else>Lever 3</el-tag>
                    </template>
                </el-table-column>
            </el-table>
        </el-card>
    </div>
</template>

<script>
export default {
    data() {
        return {
            rightlist: []
        }
    },
    methods: {
        async getRightList() {
            const res = await this.$axios.get('/right')
            if (res.status !== 200) {
                this.$message.error('获取权限列表失败!')
                return
            }
            this.rightlist = res.data
        }
    },
    created() {
        this.getRightList()
    }
}
</script>

<style lang="less" scope></style>
