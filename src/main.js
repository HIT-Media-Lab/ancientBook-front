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


/**
 * 自定义的请求全局函数，以json形式传递数据
 */
Vue.prototype.http_json = function (url, type, params, success, fail) {
    if (type.toLocaleLowerCase() == "get") {
        this.$http.get(url).then(function (response) {
            response_get(response, success)
        },function () {
            error();
        })
    } else if (type.toLocaleLowerCase() == "post") {
        //验证是否有无token
        params.token = this.$store.getters.GetToken;
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

/**
 *post请求
 */
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
    }
}

/**
 *get请求
 */
function response_get(response, success) {
    let status = response.status;
    if (status == 200){
        success(response);
    } else if (status == 403){
        this.$router.push('/403');
    } else if (status == 404){
        this.$router.push('/404');
    }
}

/**
 * 古籍库
 */

import  bookstore from './page/bookstore/index.vue'
import  book_recent from './page/bookstore/recent.vue'
import  book_info from './page/bookstore/ancientbooks/index.vue'
import  sort_book from './page/bookstore/ancientbooks.vue'

import  login from  './page/user/login/login.vue'
import  admin from  './page/admin/admin.vue'
import  not_found from './page/error/404.vue'
import  no_right from './page/error/403.vue'



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


import  modify1 from  './page/user/modifyinfo/firststep/index.vue'
import  modify2 from  './page/user/modifyinfo/secondstep/index.vue'
import  modify3 from  './page/user/modifyinfo/thirdstep/index.vue'



//用户
import  user from  './page/user/index.vue'
import  modify_info  from './component/modify-info.vue'
import  user_info  from './page/user/user_index.vue'

import  mybook from  './page/user/mybook/index.vue'
import  alupload from  './page/user/mybook/alupload/index.vue'
import  privatebook from './page/user/mybook/private/index.vue'
import  collection from  './page/user/mycollection/index.vue'
import  edit  from  './page/user/myoffer/edit/index.vue'
import  mark from  './page/user/myoffer/mark/index.vue'
import  ancientbook from  './component/ancientbook.vue'
import  comment from  './page/user/myoffer/comment/index.vue'
import  revise from  './page/user/myoffer/revise/index.vue'


/**
 * 搜索
 */
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
import  termstwo from  './page/noumenon/create/two/terms.vue'
import  termsthree from  './page/noumenon/create/three/terms.vue'
import  officetwo from  './page/noumenon/create/two/office.vue'
import  officethree from  './page/noumenon/create/three/office.vue'
import  timetwo from  './page/noumenon/create/two/time.vue'
import  timethree from  './page/noumenon/create/three/time.vue'
import  literaturetwo from  './page/noumenon/create/two/literature.vue'
import  literaturethree from  './page/noumenon/create/three/literature.vue'


//本体查看
import  recent from  './page/noumenon/noumenon.vue'
import  institution from  './page/noumenon/institution/index.vue'
import  literature from './page/noumenon/literature/index.vue'
import  office from  './page/noumenon/office/index.vue'
import  place from  './page/noumenon/place/index.vue'
import  terms from  './page/noumenon/terms/index.vue'
import  time from  './page/noumenon/time/index.vue'
import  character from './page/noumenon/character/index.vue'
//本体详情
import  char_detail from  './page/noumenon/character/character.vue'
import  lit_detail from './page/noumenon/literature/literature.vue'
import  off_detail from './page/noumenon/office/office.vue'
import  pla_detail from './page/noumenon/place/place.vue'
import  ins_detail from './page/noumenon/institution/institution.vue'
import  terms_detail from  './page/noumenon/terms/terms.vue'
import  time_detail from  './page/noumenon/time/time.vue'
// import  timeM from  './page/noumenon/Time/check_china.vue'

//本体编辑
import  char_edit from  './page/noumenon/character/edit.vue'
import  lit_edit from './page/noumenon/literature/edit.vue'
import  off_edit from './page/noumenon/office/edit.vue'
import  pla_edit from './page/noumenon/place/edit.vue'
import  ins_edit from './page/noumenon/institution/edit.vue'
import  terms_edit from  './page/noumenon/terms/edit.vue'
import  time_edit from  './page/noumenon/time/edit.vue'

//本体标记位置查看
import char_check from './page/noumenon/character/check.vue'
import ins_check from './page/noumenon/institution/check.vue'
import lit_check from './page/noumenon/literature/check.vue'
import off_check from './page/noumenon/office/check.vue'
import pla_check from './page/noumenon/place/check.vue'
import terms_check from './page/noumenon/terms/check.vue'
import time_check from './page/noumenon/time/check.vue'

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
        // {
        //     path:'/admin',
        //     redirect: '/admin/page/1',
        //     component:admin,
        //     name:'admin'
        // },
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
                    redirect: 'varieties',
                    component:varieties,
                    name:'varieties',
                },
                {
                    path:'varieties',
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
            path:'/user/modify1/:ancient_book_id',
            component:modify1,
            name:'modify1',
        },
        {
            path:'/user/modify2/:ancient_book_id',
            component:modify2,
            name:'modify2'
        },
        {
            path:'/user/modify3/:ancient_book_id',
            component:modify3,
            name:'modify3'
        },
        {
            path:'/user_info',
            component:user_info,
            name:'user_info',
            children: [
                {
                    path:'',
                    redirect: 'mybook',
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
            path:'/ancientbook/:book_name/:book/:volume/:pageId',
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
                    redirect: 'recent',
                    component:recent,
                    name:'recent'
                },
                {
                    path:'recent',
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
                    path:'char_check/:nouId/:pageId',
                    component:char_check,
                    name:'char_check'
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
                    path:'ins_check/:nouId/:pageId',
                    component:ins_check,
                    name:'ins_check'
                },
                {
                    path:'literature/letter/:letterId/page/:pageId',
                    component:literature,
                    name:'literature'
                },
                {
                    path: 'literature',
                    redirect: 'literature/letter/A/page/1',
                    component: literature,
                    name: 'literature'
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
                    path:'lit_check/:nouId/:pageId',
                    component:lit_check,
                    name:'lit_check'
                },
                {
                    path:'office/letter/:letterId/page/:pageId',
                    component:office,
                    name:'office'
                },
                {
                    path: 'office',
                    redirect: 'place/letter/A/page/1',
                    component: office,
                    name: 'office'
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
                    path:'off_check/:nouId/:pageId',
                    component:off_check,
                    name:'off_check'
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
                    path:'pla_detail/:nouId',
                    component:pla_detail,
                    name:'pla_detail'
                },
                {
                    path:'pla_edit/:nouId',
                    component:pla_edit,
                    name:'pla_edit'
                },
                {
                    path:'pla_check/:nouId/:pageId',
                    component:pla_check,
                    name:'pla_check'
                },
                {
                    path:'terms/letter/:letterId/page/:pageId',
                    component:terms,
                    name:'terms'
                },
                {
                    path: 'terms',
                    redirect: 'terms/letter/A/page/1',
                    component: terms,
                    name: 'terms'
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
                    path:'terms_check/:nouId/:pageId',
                    component:terms_check,
                    name:'terms_check'
                },
                {
                    path:'time',
                    component:time,
                    name:'time'
                },
                {
                    path:'time_detail/:nouId',
                    component:time_detail,
                    name:'time_detail'
                },
                {
                    path: 'time_edit/:nouId',
                    component: time_edit,
                    name: 'time_edit'
                },
                {
                    path:'time_check/:nouId/:pageId',
                    component:time_check,
                    name:'time_check'
                },
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
            path:'/termstwo',
            component:termstwo,
            name:'termstwo'
        },
        {
            path:'/termsthree',
            component:termsthree,
            name:'termsthree'
        },
        {
            path:'/offtwo',
            component:officetwo,
            name:'officetwo'
        },
        {
            path:'/offthree',
            component:officethree,
            name:'officethree'
        },
        {
            path:'/timetwo',
            component:timetwo,
            name:'timetwo'
        },
        {
            path:'/timethree',
            component:timethree,
            name:'timethree'
        },
        {
            path:'/littwo',
            component:literaturetwo,
            name:'littwo'
        },
        {
            path:'/litthree',
            component:literaturethree,
            name:'litthree'
        },

        {
            path:'/bookstore',
            component:bookstore,
            name:'bookstore',
            children:[
                {
                    path: '',
                    redirect: 'book_recent',
                    component: book_recent,
                    name: 'book_recent'
                },
                {
                    path: 'book_recent',
                    component: book_recent,
                    name: 'book_recent'
                },
                {
                    path: 'sort_book/:bu/:lei/:shu/page/:pageId',
                    component: sort_book,
                    name: 'sort_book'
                },
                {
                    path: 'book_info/:ancient_book_id',
                    component: book_info,
                    name: 'book_info',
                }
            ]
        },
        {
            path:'/404',
            component:not_found,
            name:'404'
        },
        {
            path:'/403',
            component:no_right,
            name:'403'
        },
        {
            path: '/',
            component:login,
            redirect: '/login',  //默认路由
            name: '/'
        }

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

/**
 * 用户权限，以及token的更新，用户权限储存在localstorage里
 */
router.beforeEach( (to, from, next) => {
    let admin_acl = router.app.$store.getters.ACL_admin;
    let user_acl = router.app.$store.getters.ACL_user;
    let guest_acl = router.app.$store.getters.ACL_guest;

    router.app.$http.get('/ancient_books/get_user_info.action').then(function (response) {
        if (router.app.$store.getters.GetToken == '') {
            router.app.$http.get('/ancient_books/getToken.action').then(function (response) {
                router.app.$store.commit("change_token", response.body.token);
            }, function () {

            })
        }
        if (response.body.result == 1) {
            if (response.body.su == 1) {
                localStorage.setItem('user', JSON.stringify("admin"));
            } else if (response.body.su == 0) {
                localStorage.setItem('user', JSON.stringify("user"));
            }
            bus.$emit('change_name', response.body.name);
        } else if (response.body.result == 0) {
            localStorage.setItem('user', JSON.stringify("guest"));
            bus.$emit('change_name', '登录');
        }
        let user_id = JSON.parse(localStorage.getItem('user'));
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
                next('/login');
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
            console.log("go to 403");
            next('/403');
        }
    },function () {

    });
});

// 现在我们可以启动应用了！
// 路由器会创建一个 App 实例，并且挂载到选择符 #app 匹配的元素上。
const app = new Vue({
    router: router,
    store,
    render: h => h(App)
}).$mount('#app');
