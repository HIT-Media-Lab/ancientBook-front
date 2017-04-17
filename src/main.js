import Vue from 'vue'
import  Vuex from  'vuex'
import App from './App.vue'
import VueRouter from "vue-router";
import VueResource from 'vue-resource'
import './assets/less/index.less'

//开启debug模式
Vue.config.debug = true;

Vue.use(VueRouter);
Vue.use(VueResource);
Vue.use(Vuex);

// 定义组件, 也可以像教程之前教的方法从别的文件引入
import bookstore from './component/bookstore/index.vue'
import  noumenon_store from  './component/noumenom_store/index.vue'
import  user from  './component/user/index.vue'
// 创建一个路由器实例
// 并且配置路由规则
const router = new VueRouter({
    mode: 'history',
    base: __dirname,
    routes: [
        {
            path:'/',
            component:App
        },
        {
            path:'/noumenon_store',
            component:noumenon_store
        },
        {
            path:'/bookstore',
            component:bookstore
        },
        {
            path:'/user',
            component:user
        }

    ]
});

// 现在我们可以启动应用了！
// 路由器会创建一个 App 实例，并且挂载到选择符 #app 匹配的元素上。
const app = new Vue({
    router: router,
    render: h => h(App)
}).$mount('#app');