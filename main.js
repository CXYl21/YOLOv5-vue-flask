import Vue from 'vue'
import App from './App.vue'

// 设置 Axios 实例
import axios from 'axios'//导入axios
const axiosInstance = axios.create({
    baseURL: 'http://127.0.0.1:5000',
});
Vue.prototype.$axios = axiosInstance;

//导入element ui
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(ElementUI)

import VueRouter from "vue-router";//导入 vue-router
Vue.use(VueRouter) //绑定使用
import router from './router'//导入配置




Vue.config.productionTip = false


new Vue({
    router,//绑定配置
    render: h => h(App),
}).$mount('#app')
