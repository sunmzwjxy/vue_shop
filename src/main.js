import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import Bus from './assets/js/bus'
import store from './store/index'
import './plugins/element.js'
import './assets/css/global.css'
import './assets/fonts/iconfont.css'

// 配置请求的根路径
axios.defaults.baseURL = 'http://localhost:3000/'
// axios.defaults.headers.common.Authorization = AUTH_TOKEN
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
// axios.defaults.headers.post['Content-Type'] = 'application/json'

// Add a request interceptor
// 发送请求之前添加预处理(token)
axios.interceptors.request.use(
    function(config) {
        config.headers.Authorization = window.sessionStorage.getItem('token') + ' ' + window.sessionStorage.getItem('username')
        return config
    },
    function(error) {
        // Do something with request error
        return Promise.reject(error)
    }
)

Vue.config.productionTip = false
// 挂载axios到Vue上
Vue.prototype.$axios = axios
// 挂载Bus到Vue上
Vue.prototype.$bus = Bus

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
