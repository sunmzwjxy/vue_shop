<template>
    <div>
        <el-dialog title="添加用户" :visible.sync="copyDialogVisable" :close-on-click-modal="false" width="50%" @close="handleClose">
            <el-form label-width="70px" :model="addform" :rules="addformrules" ref="addruleFormref">
                <el-form-item label="用户" prop="username">
                    <el-input v-model="addform.username" :disabled="!isAdd">"name"</el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input v-model="addform.password" type="password"></el-input>
                </el-form-item>
                <el-form-item label="邮箱" prop="mail">
                    <el-input v-model="addform.mail"></el-input>
                </el-form-item>
                <el-form-item label="电话" prop="phone">
                    <el-input v-model="addform.phone"></el-input>
                </el-form-item>
            </el-form>
            <!--  -->
            <span slot="footer" class="dialog-footer">
                <el-button @click="closedlg">Cancel</el-button>
                <el-button @click="submitdlg" type="primary">OK</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
export default {
    name: 'userdlg',
    props: {
        // 父组件帮从兄弟组件传来的值
        // dialogVisible: Boolean
    },
    data() {
        // 验证邮箱地址
        var checkmail = (rule, value, callback) => {
            var re = /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/

            if (re.test(value)) {
                return callback()
            }

            callback(new Error('请输入正确的邮箱地址！'))
        }

        // 验证手机号
        var checkphone = (rule, value, callback) => {
            var re = /^1[3456789]\d{9}$/

            if (re.test(value)) {
                return callback()
            }

            callback(new Error('请输入正确的手机号码！'))
        }
        return {
            addform: {
                id: '1',
                username: '',
                password: '',
                mail: '',
                phone: '',
                type: 1,
                role: 'Operater',
                status: 0
            },
            addformrules: {
                username: [
                    {
                        required: true,
                        message: 'user name is not empty',
                        trigger: 'blur'
                    },
                    {
                        min: 3,
                        max: 10,
                        message: 'user name long must be 3-10',
                        trigger: 'blur'
                    }
                ],
                password: [
                    {
                        required: true,
                        message: 'password is not empty',
                        trigger: 'blur'
                    },
                    {
                        min: 6,
                        max: 15,
                        message: 'password long must be 6-15',
                        trigger: 'blur'
                    }
                ],
                mail: [
                    {
                        required: true,
                        message: 'mail is not empty',
                        trigger: 'blur'
                    },
                    { validator: checkmail, trigger: 'blur' }
                ],
                phone: [
                    {
                        required: true,
                        message: 'phone is not empty',
                        trigger: 'blur'
                    },
                    { validator: checkphone, trigger: 'blur' }
                ]
            },
            copyDialogVisable: false,
            isAdd: false
        }
    },
    watch: {
        // 监听父组件值的变化
        // dialogVisible(newVal, oldVal) {
        // 使用一个copy来实现子组件更新父组件的值
        // this.copyDialogVisable = newVal
        // }
    },
    methods: {
        closedlg() {
            this.copyDialogVisable = false
            // this.$emit('DialogVisable', false) // update parent's value
        },
        submitdlg() {
            this.$refs.addruleFormref.validate(async valid => {
                if (valid === true) {
                    this.copyDialogVisable = false
                    // this.$emit('DialogVisable', false)

                    const data = {
                        id: this.addform.id,
                        username: this.addform.username,
                        password: this.addform.password,
                        mail: this.addform.mail,
                        phone: this.addform.phone,
                        type: this.addform.type,
                        role: this.addform.role,
                        status: this.addform.status
                    }
                    let res = null
                    if (this.isAdd === true) {
                        res = await this.$axios.post('users/add', data)
                    } else {
                        res = await this.$axios.put('users/edit', data)
                    }
                    if (res.status === 200) {
                        this.$message({
                            showClose: true,
                            message: 'Add or update user successful',
                            type: 'success'
                        })

                        // Bus总线通知兄弟组件传值并刷新页面
                        this.$bus.$emit('updateData', data)
                    } else {
                        this.$message({
                            showClose: true,
                            message: 'Add or update user failed',
                            type: 'error'
                        })
                    }
                }
            })
        },
        handleClose() {
            this.copyDialogVisable = false
            // this.$emit('DialogVisable', false)
            this.$refs.addruleFormref.resetFields()
        }
    },
    mounted() {
        this.$bus.$off('EditRow')
        this.$bus.$on('EditRow', value => {
            console.log(value)
            this.copyDialogVisable = value.dialogvisale
            this.isAdd = value.isAdd
            this.addform = value.rowdata
        })

        this.$bus.$off('dialogvisale')
        this.$bus.$on('dialogvisale', value => {
            console.log(value)
            this.copyDialogVisable = value.dialogvisale
            this.isAdd = value.isAdd
        })
    }
}
</script>

<style></style>
