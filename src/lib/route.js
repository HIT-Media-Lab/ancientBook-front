// 定义组件, 也可以像教程之前教的方法从别的文件引入
"use strict";

import Vue from 'vue'
import App from '../App.vue'
import VueRouter from "vue-router"
import VueResource from 'vue-resource'
import store from '../store'
import Vuex from 'vuex'

Vue.use(VueRouter);
Vue.use(VueResource);
Vue.use(Vuex);

import  bookstore from '../page/bookstore/index.vue'
import  login from  '../page/user/login/login.vue'
import  admin from  '../page/admin/admin.vue'
import  notfound from '../page/error/404.vue'

//用户
import  user from  '../page/user/index.vue'
import  upload1 from  '../page/user/upload/firststep/index.vue'
import  upload2 from  '../page/user/upload/secondstep/index.vue'
import  upload3 from  '../page/user/upload/thirdstep/index.vue'
import  mybook from  '../page/user/mybook/index.vue'
import  alupload from  '../page/user/mybook/alupload/index.vue'
import  privatebook from '../page/user/mybook/private/index.vue'
import  collection from  '../page/user/mycollection/index.vue'
import  offer from  '../page/user/myoffer/edit/index.vue'
import  mark from  '../page/user/myoffer/mark/index.vue'
import  ancientbook from  '../component/ancientbook.vue'
import  comment from  '../page/user/myoffer/comment/index.vue'
import  revise from  '../page/user/myoffer/revise/index.vue'
import  search from  '../page/search/index.vue'

//本体
import  noumenon from  '../page/noumenon/index.vue'
//新建本体
import  build from  '../page/noumenon/create/index.vue'
import  charactertwo from  '../page/noumenon/create/two/character.vue'
import  characterthree from  '../page/noumenon/create/three/character.vue'
//本体查看
import  recent from  '../page/noumenon/noumenon.vue'
import  institution from  '../page/noumenon/institution/index.vue'
import  literature from '../page/noumenon/literature/index.vue'
import  office from  '../page/noumenon/office/index.vue'
import  place from  '../page/noumenon/place/index.vue'
import  terms from  '../page/noumenon/terms/index.vue'
import  time from  '../page/noumenon/Time/index.vue'
import  character from '../page/noumenon/character/index.vue'
//本体详情
import  characterM from  '../page/noumenon/character/character.vue'
import  literatureM from '../page/noumenon/institution/institution.vue'
import  officeM from '../page/noumenon/institution/institution.vue'
import  placeM from '../page/noumenon/institution/institution.vue'
import  institutionM from '../page/noumenon/institution/institution.vue'
import  termsM from  '../page/noumenon/terms/terms.vue'
// import  timeM from  '../page/noumenon/Time/check_china.vue'

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
            path:'/admin',
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
            name:'upload1'
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
                    path:'/',
                    component:recent,
                    name:'recent'
                },
                {
                    path:'/noumenon/character',
                    component:character,
                    name:'character'
                },
                {
                    path:'/noumenon/characterM/:id',
                    component:characterM,
                    name:'characterM'
                },
                {
                    path:'/noumenon/institution',
                    component:institution,
                    name:'institution'
                },
                {
                    path:'/noumenon/institutionM/:id',
                    component:institutionM,
                    name:'institutionM'
                },
                {
                    path:'/noumenon/literature',
                    component:literature,
                    name:'literature'
                },
                {
                    path:'/noumenon/literatureM/:id',
                    component:literatureM,
                    name:'literatureM'
                },
                {
                    path:'/noumenon/office',
                    component:office,
                    name:'office'
                },
                {
                    path:'/noumenon/officeM/:id',
                    component:officeM,
                    name:'officeM'
                },
                {
                    path:'/noumenon/place',
                    component:place,
                    name:'place'
                },
                {
                    path:'/noumenon/placeM/:id',
                    component:placeM,
                    name:'placeM'
                },
                {
                    path:'/noumenon/terms',
                    component:terms,
                    name:'terms'
                },
                {
                    path:'/noumenon/termsM/:id',
                    component:termsM,
                    name:'termsM'
                },
                {
                    path:'/noumenon/time',
                    component:time,
                    name:'time'
                },
                // {
                //     path:'/noumenon/timeM/:id',
                //     component:timeM,
                //     name:'timeM'
                // },
                {
                    path:'/noumenon/build',
                    component:build,
                    name:'build'
                },
                {
                    path:'/noumenon/chartwo',
                    component:charactertwo,
                    name:'charactertwo'
                },
                {
                    path:'/noumenon/charthree',
                    component:characterthree,
                    name:'characterthree'
                },

            ]
        },
        {
            path:'/bookstore',
            component:bookstore,
            name:'bookstore'
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

router.beforeEach( (to, from, next) => {
    let admin_acl = router.app.$store.getters.ACL_admin;
    let user_acl = router.app.$store.getters.ACL_user;
    let guest_acl = router.app.$store.getters.ACL_guest;

    let user_item = JSON.parse(localStorage.getItem('user'));
    if (user_item == undefined) {
        localStorage.setItem('user',JSON.stringify("guest"));
        user_item = 'guest';
    }

    let flag = false;
    if (user_item == 'guest'){
        for (let i = 0; i < guest_acl.length; i++) {
            if (to.name == guest_acl[i]) {
                flag = true;
                next();
                break;
            }
        }
        if (!flag) {
            flag = true;
            next('login');
        }
    } else if (user_item == 'user'){
        for (let i = 0; i < user_acl.length; i++) {
            if (to.name == user_acl[i]){
                console.log('user');
                flag = true;
                next();
                break;
            }
        }
    } else if (user_item == 'admin'){
        for (let i = 0; i < admin_acl.length; i++){
            if (to.name == admin_acl[i]){
                console.log("admin");
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

