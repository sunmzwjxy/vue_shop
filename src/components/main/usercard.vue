<template>
    <div>
        <el-card>
            <el-row :gutter="20">
                <el-col :span="6">
                    <el-input
                        placeholder="请输入内容"
                        v-model="queryinfo.query"
                        :clearable="true"
                        @clear="getusers"
                    >
                        <el-button slot="append" icon="el-icon-search" @click="getusers"></el-button>
                    </el-input>
                </el-col>
                <el-col :span="6">
                    <el-button type="primary" @click="changedlg">添加用户</el-button>
                </el-col>
            </el-row>

            <el-table
                :data="userlist"
                style="width: 100%"
                height="350"
                :border="true"
                :stripe="true"
            >
                <el-table-column type="index" label="#"></el-table-column>
                <el-table-column prop="name" label="Name" width="180"></el-table-column>
                <el-table-column prop="mail" label="E-mail" width="180"></el-table-column>
                <el-table-column prop="phone" label="Phone" width="180"></el-table-column>
                <el-table-column prop="role" label="Role" width="180"></el-table-column>
                <el-table-column label="Status" width="180">
                    <template v-slot:default="scope">
                        <el-switch
                            v-model="scope.row.status"
                            :active-value="1"
                            :inactive-value="0"
                            active-color="#13ce66"
                            inactive-color="#ff4949"
                            @change="userstatus(scope.row)"
                        ></el-switch>
                    </template>
                </el-table-column>
                <el-table-column label="Operation" width="180">
                    <template slot-scope="scope">
                        <el-button
                            type="primary"
                            icon="el-icon-edit"
                            size="mini"
                            @click="editrow(scope.row)"
                        ></el-button>
                        <el-button
                            type="danger"
                            icon="el-icon-delete"
                            size="mini"
                            @click="deleterow(scope.row)"
                        ></el-button>
                        <el-tooltip
                            effect="dark"
                            content="分配角色"
                            placement="top-start"
                            :enterable="false"
                        >
                            <el-button
                                type="warning"
                                icon="el-icon-setting"
                                size="mini"
                                @click="settingrow(scope.row)"
                            ></el-button>
                        </el-tooltip>
                    </template>
                </el-table-column>
            </el-table>

            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="queryinfo.pagenum"
                :page-sizes="[1, 2, 5, 10]"
                :page-size="queryinfo.pagesize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total"
            ></el-pagination>
        </el-card>
    </div>
</template>

<script>
export default {
    name: 'usercard',
    props: {
        dialogVisible: Boolean
    },
    data() {
        return {
            queryinfo: {
                query: '',
                pagenum: 1,
                pagesize: 2
            },
            userlist: [],
            total: 0
        }
    },
    methods: {
        async getusers() {
            const resdata = await this.$axios.get('/users/userlist', {
                params: this.queryinfo
            })
            if (resdata.status !== 200) {
                this.$message({
                    showClose: true,
                    message: 'Load menu list data failed from Server!',
                    type: 'error'
                })
                return
            }
            this.userlist = resdata.data.users
            this.total = resdata.data.total
        },
        editrow(row) {},
        deleterow(row) {},
        settingrow(row) {},
        handleSizeChange(val) {
            this.queryinfo.pagesize = val
            this.getusers()
        },
        handleCurrentChange(val) {
            this.queryinfo.pagenum = val
            this.getusers()
        },
        async userstatus(row) {
            // send put message to server
            const res = await this.$axios.put(
                `/users/user/${row.id}/state/${row.status}`
            )
            if (res.status !== 200) {
                return this.$message({
                    showClose: true,
                    message: 'updated user state failed!',
                    type: 'error'
                })
            } else {
                return this.$message({
                    showClose: true,
                    message: 'updated user state success!',
                    type: 'success'
                })
            }
        },
        changedlg() {
            this.$emit('fromchild', true)
        }
    },
    created() {
        this.getusers()
    }
}
</script>

<style>
</style>
