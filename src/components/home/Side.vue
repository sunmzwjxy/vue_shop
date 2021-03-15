<template>
    <div>
        <el-aside :width="!isCollapse ? '200px' : '64px'">
            <div class="toggle-button" @click="isCollapse = !isCollapse">|||</div>
            <el-menu
                :router="true"
                :default-active="menuactive"
                background-color="#333744"
                text-color="#fff"
                active-text-color="#ffd04b"
                :unique-opened="true"
                :collapse="isCollapse"
                :collapse-transition="false"
            >
                <el-submenu v-for="item in data" :key="item.id" :index="item.id.toString()">
                    <template slot="title">
                        <i :class="iconsobj[item.id]"></i>
                        <span>{{ item.authName }}</span>
                    </template>
                    <el-menu-item
                        v-for="subitem in item.children"
                        :key="subitem.id"
                        :index="subitem.path"
                    >
                        <template slot="title">
                            <i class="el-icon-menu"></i>
                            <span>{{ subitem.authName }}</span>
                        </template>
                    </el-menu-item>
                </el-submenu>
            </el-menu>
        </el-aside>
    </div>
</template>

<script>
export default {
    name: 'side',
    data() {
        return {
            data: [],
            iconsobj: {
                101: 'iconfont icon-yonghuming',
                102: 'iconfont icon-quanxian',
                103: 'iconfont icon-shangpinbiaoqian',
                104: 'iconfont icon-icon',
                105: 'iconfont icon-tongji'
            },
            menuactive: '/home/userlist',
            isCollapse: false
        }
    },
    methods: {
        async getmenulist() {
            const res = await this.$axios.get('/menus')
            if (res.status !== 200) {
                this.$message({
                    showClose: true,
                    message: 'Load menu list data failed from Server!',
                    type: 'error'
                })
                return
            } else {
                if (res.data.status === 403) {
                    this.$message({
                        showClose: true,
                        message: res.data.msg,
                        type: 'error'
                    })
                    return
                }
            }
            this.data = res.data
        },
        getactivedmenu() {
            this.menuactive = this.$route.path
        }
    },
    created() {
        // Get data from server
        this.getmenulist()
        this.getactivedmenu()
    }
}
</script>

<style lang="less" scope>
.el-aside {
    height: 100%;
    background-color: #333744;
    .el-menu {
        border-right: none;
    }
}

.iconfont {
    margin-right: 10px;
}

.toggle-button {
    background-color: #4a5064;
    font-size: 10px;
    line-height: 24px;
    color: #fff;
    text-align: center;
    letter-spacing: 0.2em;
    cursor: pointer;
}
</style>
