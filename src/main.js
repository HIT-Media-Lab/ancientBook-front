"use strict";
import Vue from 'vue'
import Vuex from 'vuex'
import VueRouter from "vue-router"
import VueResource from 'vue-resource'
import './assets/less/index.less'
import './lib/regular'
import App from './App.vue'
import store from './store'
// import './lib/route'

//开启debug模式
Vue.config.debug = true;

Vue.use(VueRouter);
Vue.use(VueResource);
Vue.use(Vuex);

//回调success前的函数
function before_success() {

}

//回调success后的函数
function after_success (response) {
//更新token
    store.commit("change_token",response.body.token);
}

//判断是否有无token
function before_http (object) {
    object.token = store.getters.GetToken;
    let token = store.getters.GetToken;
    if (object.token.length == 0 || token.length == 0) {
        this.$http.get('/ancient_books/getToken.action').then(function (response) {
            token = response.body.token;
        });
        store.commit("change_token",token);
    }else {
        console.log("不需要更token");
    }
}




//定义的post的vue-router全局函数，以json形式传递数据
Vue.prototype.http_json = function (url, type, params, success, fail) {
    params.token=store.getters.GetToken;
    if (type.toLocaleLowerCase() == "get") {
        this.$http.get(url).then(function (response) {
            response_get(response, success)
        },function () {
            error();
        })
    } else if (type.toLocaleLowerCase() == "post") {
        //验证是否有无token
        before_http(params);
        params.token =store.getters.GetToken;
        this.$http.post(url, params,
            {headers:{'Content-Type':'application/json;charset=UTF-8'}}
        ).then(function (response) {
            response_post(response,success,fail);
        },function () {
            error();
        })
    }
};

/**
 * 请求发送失败的函数
 */
function error() {

}

function response_post(response, success, fail) {
    let status = response.status;
    if (status == 200){
        if (response.body.result == 1){
            success(response);
            after_success(response);
        } else if (response.body.result == 0){
            fail(response);
        }
    } else if (status == 403){
        this.$router.push('/403');
    } else if (status == 404){
        this.$router.push('/404');
    } else if (status == 500){
        this.$router.push('/500');
    }
}

function response_get(response, success) {
    let status = response.status;
    if (status == 200){
        success(response);
    } else if (status == 403){
        this.$router.push('/403');
    } else if (status == 404){
        this.$router.push('/404');
    } else if (status == 500){
        this.$router.push('/500');
    }
}

//定义的post的vue-router全局函数，以form-data形式传递数据
Vue.prototype.http_post_form=function (url,params,success,fail) {
    params.token = store.getters.GetToken;
    this.$http.post(url, params,
        {emulateJSON: true}   //将json形式转换为form-data
    ).then(function (response) {
        response_post(response, success, fail);
    },function () {
        error();
    })
};

import  bookstore from './page/bookstore/index.vue'
import  book_recent from './page/bookstore/recent.vue'
import  book_info from './page/bookstore/ancientbooks/index.vue'
import  book_varieties from  './page/bookstore/ancientbooks/varieties.vue'
import  book_impression from './page/bookstore/ancientbooks/impression.vue'
import  book_copy from './page/bookstore/ancientbooks/copy.vue'
import  book_edition from './page/bookstore/ancientbooks/edition.vue'

import  login from  './page/user/login/login.vue'
import  admin from  './page/admin/admin.vue'
import  notfound from './page/error/404.vue'

//用户
import  user from  './page/user/index.vue'

/**
 * 上传
 */
import  upload1 from  './page/user/upload/firststep/index.vue'
import  copy from './page/user/upload/firststep/copy.vue'
import  edition from './page/user/upload/firststep/edition.vue'
import  impression from './page/user/upload/firststep/impression.vue'
import  varieties from  './page/user/upload/firststep/varieties.vue'
import  synopsis from  './page/user/upload/firststep/synopsis.vue'
import  upload2 from  './page/user/upload/secondstep/index.vue'
import  upload3 from  './page/user/upload/thirdstep/index.vue'



import  mybook from  './page/user/mybook/index.vue'
import  alupload from  './page/user/mybook/alupload/index.vue'
import  privatebook from './page/user/mybook/private/index.vue'
import  collection from  './page/user/mycollection/index.vue'
import  offer from  './page/user/myoffer/edit/index.vue'
import  mark from  './page/user/myoffer/mark/index.vue'
import  ancientbook from  './component/ancientbook.vue'
import  comment from  './page/user/myoffer/comment/index.vue'
import  revise from  './page/user/myoffer/revise/index.vue'
import  search from  './page/search/index.vue'

//本体
import  noumenon from  './page/noumenon/index.vue'
//新建本体
import  build from  './page/noumenon/create/index.vue'
import  charactertwo from  './page/noumenon/create/two/character.vue'
import  characterthree from  './page/noumenon/create/three/character.vue'
//本体查看
import  recent from  './page/noumenon/noumenon.vue'
import  institution from  './page/noumenon/institution/index.vue'
import  literature from './page/noumenon/literature/index.vue'
import  office from  './page/noumenon/office/index.vue'
import  place from  './page/noumenon/place/index.vue'
import  terms from  './page/noumenon/terms/index.vue'
import  time from  './page/noumenon/Time/index.vue'
import  character from './page/noumenon/character/index.vue'
//本体详情
import  char_detail from  './page/noumenon/character/character.vue'
import  lit_detail from './page/noumenon/literature/literature.vue'
import  off_detail from './page/noumenon/office/office.vue'
import  pla_detail from './page/noumenon/place/place.vue'
import  ins_detail from './page/noumenon/institution/institution.vue'
import  terms_detail from  './page/noumenon/terms/terms.vue'
// import  timeM from  './page/noumenon/Time/check_china.vue'

// 创建一个路由器实例
// 并且配置路由规则
const router = new VueRouter({
    mode: 'history',
    base: __dirname,
    routes: [
        {
            path:'/login',
            component:login,
            name:'login'
        },
        {
            path:'/admin/page/:pageId',
            component:admin,
            name:'admin'
        },
        {
            path:'/admin',
            redirect: '/admin/page/1',
            component:admin,
            name:'admin'
        },
        {
            path:'/user',
            component:user,
            name:'user'
        },
        {
            path:'/user/upload1',
            component:upload1,
            name:'upload1',
            children: [
                {
                    path:'',
                    component:varieties,
                    name:'varieties',
                },
                {
                    path:'edition',
                    component:edition,
                    name:'edition',
                },
                {
                    path:'impression',
                    component:impression,
                    name:'impression',
                },
                {
                    path:'copy',
                    component:copy,
                    name:'copy',
                },
            ]
        },
        {
            path:'/user/upload2',
            component:upload2,
            name:'upload2'
        },
        {
            path:'/user/upload3',
            component:upload3,
            name:'upload3'
        },
        {
            path:'/user/mybook',
            component:mybook,
            name:'mybook'
        },
        {
            path:'/user/collection',
            component:collection,
            name:'collection'
        },
        {
            path:'/user/offer',
            component:offer,
            name:'offer'
        },
        {
            path:'/user/alupload',
            component:alupload,
            name:'alupload'
        },
        {
            path:'/user/privatebook',
            component:privatebook,
            name:'privatebook'
        },
        {
            path:'/user/mark',
            component:mark,
            name:'mark'
        },
        {
            path:'/user/comment',
            component:comment,
            name:'comment'
        },
        {
            path:'/user/revise',
            component:revise,
            name:'revise'
        },
        {
            path:'/search',
            component:search,
            name:'search'
        },
        {
            path:'/ancientbook',
            component:ancientbook,
            name:'ancientbook'
        },
        {
            path:'/noumenon',
            component:noumenon,
            name:'noumenon',
            children:[
                {
                    path:'',
                    component:recent,
                    name:'recent'
                },
                {
                    path: 'character/letter/:letterId/page/:pageId',
                    component: character,
                    name: 'character'
                },
                {
                    path: 'character',
                    redirect: 'character/letter/A/page/1',
                    component: character,
                    name: 'character'
                },
                {
                    path:'char_detail/:nouId',
                    component:char_detail,
                    name:'char_detail'
                },
                {
                    path:'institution/page/:pageId/letter/:letterId',
                    component:institution,
                    name:'institution'
                },
                {
                    path:'ins_detail/:nouId',
                    component:ins_detail,
                    name:'ins_detail'
                },
                {
                    path:'literature/page/:pageId/letter/:letterId',
                    component:literature,
                    name:'literature'
                },
                {
                    path:'lit_detail/:nouId',
                    component:lit_detail,
                    name:'lit_detail'
                },
                {
                    path:'office/page/:pageId/letter/:letterId',
                    component:office,
                    name:'office'
                },
                {
                    path:'off_detail/:nouId',
                    component:off_detail,
                    name:'off_detail'
                },
                {
                    path:'place/page/:pageId/letter/:letterId',
                    component:place,
                    name:'place'
                },
                {
                    path:'plac_detail/:nouId',
                    component:pla_detail,
                    name:'pla_detail'
                },
                {
                    path:'terms/page/:pageId/letter/:letterId',
                    component:terms,
                    name:'terms'
                },
                {
                    path:'terms_detail/:nouId',
                    component:terms_detail,
                    name:'terms_detail'
                },
                {
                    path:'time/page/:pageId/letter/:letterId',
                    component:time,
                    name:'time'
                }
        ]},
        {
            path:'/build',
            component:build,
            name:'build'
        },
        {
            path:'/chartwo',
            component:charactertwo,
            name:'charactertwo'
        },
        {
            path:'/charthree',
            component:characterthree,
            name:'characterthree'
        },

        {
            path:'/bookstore',
            component:bookstore,
            name:'bookstore',
            children:[
                {
                    path: '',
                    component: book_recent,
                    name: 'book_recent'
                },
                {
                    path: 'book_info',
                    component: book_info,
                    name: 'book_info',
                    children: [
                        {
                            path: '',
                            component: book_varieties,
                            name: 'book_varieties'
                        },
                        {
                            path: 'edition',
                            component: book_edition,
                            name: 'book_edition'
                        },
                        {
                            path: 'impression',
                            component: book_impression,
                            name: 'book_impression'
                        },
                        {
                            path: 'copy',
                            component: book_copy,
                            name: 'book_copy'
                        },
                    ]
                }
            ]
        },
        {
            path:'/404',
            component:notfound,
            name:'404'
        },
        {
            path: '/',
            redirect: '/login'  //默认路由
        }
        // {
        //     path: '*',
        //     redirect: '/login' // 输入其他不存在的地址自动跳回首页
        // }

    ]
});


import bus from './lib/bus'
Vue.http.interceptors.push((request, next) => {
    // console.log("你好啊");
    bus.$emit('toggleLoading', true);

    next((response) =>{
        // console.log("你好啊");
        bus.$emit('toggleLoading', false);
        return response
    })
});

router.beforeEach( (to, from, next) => {
    let admin_acl = router.app.$store.getters.ACL_admin;
    let user_acl = router.app.$store.getters.ACL_user;
    let guest_acl = router.app.$store.getters.ACL_guest;

    let user_id = JSON.parse(localStorage.getItem('user'));
    if (user_id == undefined) {
        localStorage.setItem('user',JSON.stringify("guest"));
        user_id = 'guest';
    }
    console.log(to);

    let flag = false;
    if (user_id == 'guest'){
        for (let i = 0; i < guest_acl.length; i++) {
            if (to.name == guest_acl[i]) {
                console.log(to.name);
                flag = true;
                next();
                break;
            }
        }
        if (!flag) {
            flag = true;
            next('login');
        }
    } else if (user_id == 'user'){
        for (let i = 0; i < user_acl.length; i++) {
            if (to.name == user_acl[i]){
                console.log(to.name);
                flag = true;
                next();
                break;
            }
        }
    } else if (user_id == 'admin'){
        for (let i = 0; i < admin_acl.length; i++){
            if (to.name == admin_acl[i]){
                console.log(to.name);
                flag = true;
                next();
                break;
            }
        }
    }
    if (!flag) {
        console.log("go to 404");
        next('/404');
    }
});

// 现在我们可以启动应用了！
// 路由器会创建一个 App 实例，并且挂载到选择符 #app 匹配的元素上。
const app = new Vue({
    router: router,
    store,
    render: h => h(App)
}).$mount('#app');
