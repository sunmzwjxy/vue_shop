<template>
    <div>
        <el-dialog title="添加用户" :visible.sync="dialogVisible" width="50%" @close="handleClose">
            <el-form label-width="70px" :model="addform" :rules="addformrules" ref="addruleFormref">
                <el-form-item label="用户" prop="username">
                    <el-input v-model="addform.username">"name"</el-input>
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
        dialogVisible: Boolean
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
                username: '',
                password: '',
                mail: '',
                phone: ''
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
            }
        }
    },
    methods: {
        closedlg() {
            // 同步更新父组件的值
            this.$emit('update:dialogVisible', false)
        },
        submitdlg() {
            this.$refs.addruleFormref.validate(async valid => {
                if (valid === true) {
                    this.$emit('update:dialogVisible', false)

                    const res = await this.$axios.put('/users/add', this.addform)
                    console.log(res)
                }
            })
        },
        handleClose() {
            this.$refs.addruleFormref.resetFields()
        }
    }
}
</script>

<style>
</style>
