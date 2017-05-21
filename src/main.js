"use strict";

import Vue from 'vue'
import App from './App.vue'
import  Vuex from  'vuex'
import VueRouter from "vue-router";
import VueResource from 'vue-resource'
import './assets/less/index.less'
import store from './store'
import './RegularExpression'

//开启debug模式
Vue.config.debug = true;

Vue.use(VueRouter);
Vue.use(VueResource);
Vue.use(Vuex);


//定义的全局变量
// Vue.prototype.Token='';
Vue.prototype.response={};



//定义的post的vue-router全局函数，以json形式传递数据
Vue.prototype.HttpPostJson=function (url,object,success,fail) {
    this.BeforeHttp(object);
    this.$http.post(url, object,).then(function (response) {
        this.response=response;
        this.BeforeSuccess();
        success(this.response);
        this.AfterSuccess(this.response);
        // console.log(JSON.stringify(response.body))
    },function () {
        fail()
    })
};

//定义的post的vue-router全局函数，以form-data形式传递数据
Vue.prototype.HttpPostForm=function (url,object,success,fail) {
    this.BeforeHttp(object);
    object.token=this.$store.getters.GetToken;
    console.log("你猜猜token有没有 "+object.token);
    this.$http.post(url, object,
        {emulateJSON: true},   //将json形式转换为form-data
        {headers:{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'}}).then(function (response) {
        this.response=response;
        this.BeforeSuccess();
        success(this.response);
        this.AfterSuccess( this.response);
    },function () {
        fail()
    })
};

//定义的get的vue-router全局函数，以json形式传递数据
Vue.prototype.HttpGetJson=function (url,object,success,fail) {
    let new_url=url+'?'+object.key+'='+object.value;  //get的数据传递格式
    this.$http.get(new_url).then(function (response) {
        this.response=response;
        this.BeforeSuccess();
        success(this.response);
    },function () {
        fail()
    })
};
//定义的get的vue-router全局函数，以form-data形式传递数据
Vue.prototype.HttpGetForm=function (url,object,success,fail) {
    let new_url=url+'?'+object.key+'='+object.value;
    this.$http.get(new_url,
        {emulateJSON: true}).then(function (response) {
        this.response=response;
        this.BeforeSuccess();
        success(this.response);
    },function () {
        fail()
    })
};

//判断是否有无token
Vue.prototype.BeforeHttp=function (object) {
    console.log("检查超级用户是否有token "+this.$store.getters.GetToken);
    object.token=this.$store.getters.GetToken;
    console.log("object"+object.token);
    let token = this.$store.getters.GetToken;
    if (object.token.length == 0 || token.length == 0) {
        this.$http.get('/ancient_books/getToken.action').then(function (response) {
            token = response.body.token;
            console.log("检测token成功"+token );
        });
        this.$store.commit("change_token",token);
    }else {
        console.log("不需要更token");
    }
};

//回调success前的函数
Vue.prototype.BeforeSuccess=function () {

};

//回调success后的函数
Vue.prototype.AfterSuccess=function (response) {
//更新token
        this.$store.commit("change_token",response.body.token);
        console.log("更新token"+this.$store.getters.GetToken);
};

// Vue.prototype.CheckToken=function () {
//     this.$http.get('/ancient_books/getToken.action').then(function (response) {
//         this.Token = response.body.token;
//         console.log("检测token成功"+this.Token );
//     })
// };

// 定义组件, 也可以像教程之前教的方法从别的文件引入
import bookstore from './component/bookstore/index.vue'
import  noumenon_store from  './component/noumenom_store/index.vue'
import  user from  './component/user/index.vue'
import  login from  './login.vue'
import  super_user from  './super_user.vue'
import  upload_step1 from  './component/user/upload/firststep/index.vue'
import mybook_index from  './component/user/mybook/index.vue'
import  alupload_index from  './component/user/mybook/alupload/index.vue'
import  private_books_index from './component/user/mybook/private_books/index.vue'
import  my_collection_index from  './component/user/mycollection/index.vue'
import my_offer_index from  './component/user/myoffer/noumenon_edit/index.vue'
import noumenon_mark from  './component/user/myoffer/noumenon_mark/index.vue'
import  comment from  './component/user/myoffer/comment/index.vue'
import  revise from  './component/user/myoffer/revise/index.vue'
import  search_index from  './component/search/index.vue'
// 创建一个路由器实例
// 并且配置路由规则
const router = new VueRouter({
    mode: 'history',
    base: __dirname,
    routes: [
        {
            path:'/login',
            component:login
        },
        {
            path:'/super_user',
            component:super_user
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
        },
        {
            path:'/upload_step1',
            component:upload_step1
        },
        {
            path:'/mybook_index',
            component:mybook_index,
            name:mybook_index
        },
        {
            path:'/alupload_index',
            component:alupload_index
        },
        {
            path:'/private_books_index',
            component:private_books_index
        },
        {
            path:'/my_collection_index',
            component:my_collection_index
        },
        {
            path:'/my_offer_index',
            component:my_offer_index
        },
        {
            path:'/noumenon_mark',
            component:noumenon_mark
        },
        {
            path:'/comment',
            component:comment
        },
        {
            path:'/revise',
            component:revise
        },
        {
            path:'/search_index',
            component:search_index
        },
        {
            path: '/',
            redirect: '/login'  //默认路由
        },
        {
            path: '*',
            redirect: '/login' // 输入其他不存在的地址自动跳回首页
        }

    ]
});


// 现在我们可以启动应用了！
// 路由器会创建一个 App 实例，并且挂载到选择符 #app 匹配的元素上。
const app = new Vue({
    router: router,
    store,
    render: h => h(App)
}).$mount('#app');

router.beforeEach( (to, from, next) => {
    // 模拟登陆状态
    let iflogin = router.app.$store.getters.IfLogin;
    if (iflogin == 0) {
        alert("还没有登录");
        next({path:'/login'})
    } else if (iflogin == 1) {
        alert("超级管理员只能在当前页面");
        next({path:'/super_user'})
    } else if (iflogin == 2) {
        if (to.path == '/login' || to.path == '/super_user') {
            alert("无法跳转,请先注销");
        }else {
            next();
        }
    }
});



