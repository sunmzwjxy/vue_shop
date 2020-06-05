import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/components/Login'
import Home from '@/components/Home'
import Side from '@/components/home/Side'
import Userlist from '@/components/main/Userlist'
import Rightlist from '@/components/main/Rightlist'
import Welcome from '@/components/main/Welcome'

// 重写路由的push方法,原因：在路由中添加了相同的路由。
const routerPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
    return routerPush.call(this, location).catch(error => error)
}
Vue.use(VueRouter)

const routes = [
    { path: '/', redirect: '/login' },
    { path: '/login', name: 'login', component: Login },
    {
        path: '/home',
        name: 'home',
        redirect: '/welcome',
        component: Home,
        children: [
            {
                path: '/welcome',
                name: 'welcome',
                components: {
                    Side: Side,
                    Main: Welcome
                }
            },
            {
                path: 'userlist',
                name: 'Userlist',
                components: {
                    Side: Side,
                    Main: Userlist
                }
            },
            {
                path: 'Rightlist',
                name: 'Rightlist',
                components: {
                    Side: Side,
                    Main: Rightlist
                }
            }
        ]
    },
    {
        path: '/about',
        name: 'About',
        component: () => import('../views/About.vue')
    }
]

const router = new VueRouter({
    routes
})

router.beforeEach((to, from, next) => {
    if (to.path === '/login') {
        next()
    } else {
        const tokenstr = window.sessionStorage.getItem('token')
        if (!tokenstr) return next('/login')
        next()
    }
})

export default router
