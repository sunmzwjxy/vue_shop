import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import './plugins/element.js'
import './assets/css/global.css'
import './assets/fonts/iconfont.css'

axios.defaults.baseURL = 'http://localhost:3000/'
// axios.defaults.headers.common.Authorization = AUTH_TOKEN
axios.defaults.headers.post['Content-Type'] =
    'application/x-www-form-urlencoded'
// axios.defaults.headers.post['Content-Type'] = 'application/json'

// Add a request interceptor
// 发送请求之前添加预处理(token)
axios.interceptors.request.use(
    function(config) {
        config.headers.Authorization = window.sessionStorage.getItem('token')
        return config
    },
    function(error) {
        // Do something with request error
        return Promise.reject(error)
    }
)

Vue.config.productionTip = false
Vue.prototype.$axios = axios

new Vue({
    router,
    render: h => h(App)
}).$mount('#app')
