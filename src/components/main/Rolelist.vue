<template>
    <div>
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>权限管理</el-breadcrumb-item>
            <el-breadcrumb-item>角色列表</el-breadcrumb-item>
        </el-breadcrumb>

        <el-card>
            <el-row>
                <el-button type="primary" @click="AddRole">添加角色</el-button>
            </el-row>
            <el-table :data="rolelist" border stripe>
                <el-table-column type="expand">
                    <template slot-scope="scope">
                        <el-row :class="['vcenter', 'bdbottom', i1 === 0 ? 'bdtop' : '']" v-for="(item1, i1) in scope.row.children" :key="item1.id">
                            <!-- 一级 -->
                            <el-col :span="5">
                                <el-tag closable :disable-transitions="false" @close="handleClose(item1)">{{ item1.name }}</el-tag>
                                <i class="el-icon-caret-right"></i>
                            </el-col>
                            <!-- 二级 -->
                            <el-col :span="19">
                                <el-row :class="[i2 === 0 ? '' : 'bdtop', 'vcenter']" v-for="(item2, i2) in item1.children" :key="item2.id">
                                    <el-col :span="6">
                                        <el-tag type="success" closable :disable-transitions="false" @close="handleClose(item2)">{{ item2.name }}</el-tag>
                                        <i class="el-icon-caret-right"></i>
                                    </el-col>
                                    <!-- 三级 -->
                                    <el-col :span="18">
                                        <el-tag type="warning" closable :disable-transitions="false" @close="handleClose(item3)" v-for="item3 in item2.children" :key="item3.id">{{
                                            item3.name
                                        }}</el-tag>
                                    </el-col>
                                </el-row>
                            </el-col>
                        </el-row>
                    </template>
                </el-table-column>
                <el-table-column type="index" label="#"></el-table-column>
                <el-table-column prop="value" label="角色名称"></el-table-column>
                <el-table-column prop="comments" label="角色描述"></el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button type="primary" icon="el-icon-edit" size="mini" @click="EditRole(scope.row)"></el-button>
                        <el-button type="danger" icon="el-icon-delete" size="mini" @click="DeleteRoel(scope.row)"></el-button>
                        <el-tooltip effect="dark" content="分配权限" placement="top-start">
                            <el-button type="warning" icon="el-icon-setting" size="mini" @click="SettingRoel(scope.row)"></el-button>
                        </el-tooltip>
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
            rolelist: []
        }
    },
    methods: {
        async getRolelist() {
            const res = await this.$axios.get('/role')
            if (res.status !== 200) {
                this.$message.error('获取角色列表错误!')
                return
            }
            this.rolelist = res.data
        },
        AddRole() {},
        EditRole(row) {},
        DeleteRoel(row) {},
        SettingRoel(row) {},
        async handleClose(item) {
            const confirmed = await this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                confirmButtonText: 'OK',
                cancelButtonText: 'Cancel',
                type: 'warning'
            }).catch(err => err)
            if (confirmed !== 'confirm') {
                return this.$message.info('已取消删除!')
            }

            console.log(item)
        }
    },
    created() {
        this.getRolelist()
    }
}
</script>

<style lang="less" scoped>
.el-tag {
    margin: 7px;
}
.bdtop {
    border-top: 1px solid #eee;
}
.bdbottom {
    border-bottom: 1px solid #eee;
}
.vcenter {
    display: flex;
    align-items: center;
}
</style>
