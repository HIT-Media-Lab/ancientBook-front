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
Vue.prototype.before_http = function(object) {
    object.token = this.$store.getters.GetToken;
    let token = this.$store.getters.GetToken;
    if (object.token == '' || token == '') {
        this.$http.get('/ancient_books/getToken.action').then(function (response) {
            token = response.body.token;
        });
        this.$store.commit("change_token",token);
    }else {
        console.log("不需要更token");
    }
};


//定义的post的vue-router全局函数，以json形式传递数据
Vue.prototype.http_json = function (url, type, params, success, fail) {
    if (type.toLocaleLowerCase() == "get") {
        this.$http.get(url).then(function (response) {
            response_get(response, success)
        },function () {
            error();
        })
    } else if (type.toLocaleLowerCase() == "post") {
        //验证是否有无token
        params.token=store.getters.GetToken;
        this.before_http(params);
        params.token =this.$store.getters.GetToken;
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
            after_success(response);
            success(response);
        } else if (response.body.result == 0){
            after_success(response);
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
import  sort_book from './page/bookstore/ancientbooks.vue'

import  login from  './page/user/login/login.vue'
import  admin from  './page/admin/admin.vue'
import  notfound from './page/error/404.vue'

//用户
import  user from  './page/user/index.vue'
import  modify_info  from './component/modify-info.vue'
import  user_info  from './page/user/user_index.vue'

/**
 * 上传
 */
import  upload1 from  './page/user/upload/firststep/index.vue'
import  copy from './page/user/upload/firststep/copy.vue'
import  edition from './page/user/upload/firststep/edition.vue'
import  impression from './page/user/upload/firststep/impression.vue'
import  varieties from  './page/user/upload/firststep/varieties.vue'
import  upload2 from  './page/user/upload/secondstep/index.vue'
import  upload3 from  './page/user/upload/thirdstep/index.vue'



import  mybook from  './page/user/mybook/index.vue'
import  alupload from  './page/user/mybook/alupload/index.vue'
import  privatebook from './page/user/mybook/private/index.vue'
import  collection from  './page/user/mycollection/index.vue'
import  edit  from  './page/user/myoffer/edit/index.vue'
import  mark from  './page/user/myoffer/mark/index.vue'
import  ancientbook from  './component/ancientbook.vue'
import  comment from  './page/user/myoffer/comment/index.vue'
import  revise from  './page/user/myoffer/revise/index.vue'
import  search_index from  './page/search/index.vue'
import  search_book from './page/search/book.vue'
import  search_noumenon from './page/search/noumenom.vue'

//本体
import  noumenon from  './page/noumenon/index.vue'
//新建本体
import  build from  './page/noumenon/create/index.vue'
import  charactertwo from  './page/noumenon/create/two/character.vue'
import  characterthree from  './page/noumenon/create/three/character.vue'
import  placetwo from  './page/noumenon/create/two/place.vue'
import  placethree from  './page/noumenon/create/three/place.vue'
import  institutiontwo from  './page/noumenon/create/two/institution.vue'
import  institutionthree from  './page/noumenon/create/three/institution.vue'

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

//本体编辑
import char_edit from  './page/noumenon/character/edit.vue'
import lit_edit from './page/noumenon/literature/edit.vue'
import  off_edit from './page/noumenon/office/edit.vue'
import  pla_edit from './page/noumenon/place/edit.vue'
import  ins_edit from './page/noumenon/institution/edit.vue'
import  terms_edit from  './page/noumenon/terms/edit.vue'

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
            path: '/modify_info',
            component: modify_info,
            name: 'modify_info'
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
            path:'/user_info',
            component:user_info,
            name:'user_info',
            children: [
                {
                    path:'',
                    component:mybook,
                    name:'mybook'
                },
                {
                    path:'mybook',
                    component:mybook,
                    name:'mybook'
                },
                {
                    path:'collection/page/:pageId',
                    component:collection,
                    name:'collection'
                },
                {
                    path:'edit/:content/page/:pageId',
                    component:edit,
                    name:'edit'
                },
                {
                    path:'mark/:content/page/:pageId',
                    component:mark,
                    name:'mark'
                },
                {
                    path:'comment/:content/page/:pageId',
                    component:comment,
                    name:'comment'
                },
                {
                    path:'revise/page/:pageId',
                    component:revise,
                    name:'revise'
                },
                {
                    path:'alupload/page/:pageId',
                    component:alupload,
                    name:'alupload'
                },
                {
                    path:'privatebook/page/:pageId',
                    component:privatebook,
                    name:'privatebook'
                },
            ]
        },
        {
            path:'/search_index',
            component:search_index,
            name:'search_index',
            children:[
                {
                    path:'search_book/:content/page/:pageId',
                    component:search_book,
                    name:'search_book',
                },
                {
                    path:'search_noumenon/:content/page/:pageId',
                    component:search_noumenon,
                    name:'search_noumenon',
                },
            ]
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
                    path:'char_edit/:nouId',
                    component:char_edit,
                    name:'char_edit'
                },
                {
                    path:'institution/letter/:letterId/page/:pageId',
                    component:institution,
                    name:'institution'
                },
                {
                    path: 'institution',
                    redirect: 'institution/letter/A/page/1',
                    component: institution,
                    name: 'institution'
                },
                {
                    path:'ins_detail/:nouId',
                    component:ins_detail,
                    name:'ins_detail'
                },
                {
                    path:'ins_edit/:nouId',
                    component:ins_edit,
                    name:'ins_edit'
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
                    path:'lit_edit/:nouId',
                    component:lit_edit,
                    name:'lit_edit'
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
                    path:'off_edit/:nouId',
                    component:off_edit,
                    name:'off_edit'
                },
                {
                    path:'place/letter/:letterId/page/:pageId',
                    component:place,
                    name:'place'
                },
                {
                    path: 'place',
                    redirect: 'place/letter/A/page/1',
                    component: place,
                    name: 'place'
                },
                {
                    path:'plac_detail/:nouId',
                    component:pla_detail,
                    name:'pla_detail'
                },
                {
                    path:'plac_edit/:nouId',
                    component:pla_edit,
                    name:'pla_edit'
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
                    path:'terms_edit/:nouId',
                    component:terms_edit,
                    name:'terms_edit'
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
            path:'/platwo',
            component:placetwo,
            name:'placetwo'
        },
        {
            path:'/plathree',
            component:placethree,
            name:'placethree'
        },
        {
            path:'/instwo',
            component:institutiontwo,
            name:'institutiontwo'
        },
        {
            path:'/insthree',
            component:institutionthree,
            name:'institutionthree'
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
                    path: 'sort_book/:bu/:lei/:shu/page/:pageId',
                    component: sort_book,
                    name: 'sort_book'
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

// router.beforeEach( (to, from, next) => {
//     let admin_acl = router.app.$store.getters.ACL_admin;
//     let user_acl = router.app.$store.getters.ACL_user;
//     let guest_acl = router.app.$store.getters.ACL_guest;
//
//     router.app.$http.get('/ancient_books/get_user_info.action').then(function (response) {
//         if (router.app.$store.getters.GetToken == '') {
//             router.app.$http.get('/ancient_books/getToken.action').then(function (response) {
//                 console.log("成功得到token");
//                 console.log(response.body.token);
//                 router.app.$store.commit("change_token", response.body.token);
//                 console.log(router.app.$store.getters.GetToken + "刷新得到token");
//             }, function () {
//
//             })
//         }
//         if (response.body.result == 1) {
//             if (response.body.su == 1) {
//                 localStorage.setItem('user', JSON.stringify("admin"));
//             } else if (response.body.su == 0) {
//                 localStorage.setItem('user', JSON.stringify("user"));
//             }
//             bus.$emit('change_name', response.body.name);
//         } else if (response.body.result == 0) {
//             localStorage.setItem('user', JSON.stringify("guest"));
//             bus.$emit('change_name', '登录');
//         }
//
//         let user_id = JSON.parse(localStorage.getItem('user'));
//         let flag = false;
//         if (user_id == 'guest'){
//             for (let i = 0; i < guest_acl.length; i++) {
//                 if (to.name == guest_acl[i]) {
//                     console.log(to.name);
//                     flag = true;
//                     next();
//                     break;
//                 }
//             }
//             if (!flag) {
//                 flag = true;
//                 next('/login');
//             }
//         } else if (user_id == 'user'){
//             for (let i = 0; i < user_acl.length; i++) {
//                 if (to.name == user_acl[i]){
//                     console.log(to.name);
//                     flag = true;
//                     next();
//                     break;
//                 }
//             }
//         } else if (user_id == 'admin'){
//             for (let i = 0; i < admin_acl.length; i++){
//                 if (to.name == admin_acl[i]){
//                     console.log(to.name);
//                     flag = true;
//                     next();
//                     break;
//                 }
//             }
//         }
//         if (!flag) {
//             console.log("go to 404");
//             next('/404');
//         }
//     },function () {
//
//     });
// });

// 现在我们可以启动应用了！
// 路由器会创建一个 App 实例，并且挂载到选择符 #app 匹配的元素上。
const app = new Vue({
    router: router,
    store,
    render: h => h(App)
}).$mount('#app');
