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

//回调success前的函数
function BeforeSuccess() {

}

//回调success后的函数
function AfterSuccess (response) {
//更新token
    this.$store.commit("change_token",response.body.token);
    console.log("更新token"+this.$store.getters.GetToken);
}

//判断是否有无token
function BeforeHttp (object) {
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
}




//定义的post的vue-router全局函数，以json形式传递数据
Vue.prototype.HttpJson = function (url, type, params, success, fail) {
    // this.BeforeHttp(params);

    params.token=this.$store.getters.GetToken;
    console.log("你猜猜token有没有 "+params.token);
    if (type.toLocaleLowerCase() == "get") {
        this.$http.get(url).then(function (response) {
            response_handle(response, success, fail)
        },function () {
            error();
        })
    } else if (type.toLocaleLowerCase() == "post") {
        //验证是否有无token
        BeforeHttp(params);
        params.token = this.$store.getters.GetToken();

        this.$http.post(url, params,
            {headers:{'Content-Type':'application/json;charset=UTF-8'}}
        ).then(function (response) {
            response_handle(response);
        },function () {
            fail()
        })
    }
};

/**
 * 请求发送失败的函数
 */
function error() {

}

function response_handle(response, success, fail) {
    let status = response.status;
    if (status == 200){
        if (response.body.result == 1){
            BeforeSuccess(response);
            success(response);
            AfterSuccess(response);
        } else if (response.body.result == 0){
            fail();
        }
    } else if (status == 403){
        this.$router.push('/403');
    } else if (status == 404){
        this.$router.push('/404');
    } else if (status == 500){
        this.$router.push('/500');
    }
}

//定义的post的vue-router全局函数，以form-data形式传递数据
Vue.prototype.HttpPostForm=function (url,params,success,fail) {
    params.token=this.$store.getters.GetToken;
    console.log("你猜猜token有没有 "+params.token);
    this.$http.post(url, params,
        {emulateJSON: true}   //将json形式转换为form-data
        ).then(function (response) {
            response_handle(response, success, fail);
    },function () {
       error();
    })
};

// 定义组件, 也可以像教程之前教的方法从别的文件引入
import  bookstore from './component/bookstore/index.vue'
import  login from  './login.vue'
import  admin from  './super_user.vue'
import  notfound from './component/share-component/404.vue'

//用户
import  user from  './component/user/index.vue'
import  upload1 from  './component/user/upload/firststep/index.vue'
import  upload2 from  './component/user/upload/secondstep/index.vue'
import  upload3 from  './component/user/upload/thirdstep/index.vue'
import  mybook from  './component/user/mybook/index.vue'
import  alupload from  './component/user/mybook/alupload/index.vue'
import  privatebook from './component/user/mybook/private_books/index.vue'
import  collection from  './component/user/mycollection/index.vue'
import  offer from  './component/user/myoffer/noumenon_edit/index.vue'
import  mark from  './component/user/myoffer/noumenon_mark/index.vue'
import  ancientbook from  './picture_word.vue'
import  comment from  './component/user/myoffer/comment/index.vue'
import  revise from  './component/user/myoffer/revise/index.vue'
import  search from  './component/search/index.vue'

//本体
import  noumenon from  './component/noumenon_store/index.vue'
//新建本体
import  build from  './component/noumenon_store/new_build/index.vue'
import  charactertwo from  './component/noumenon_store/new_build/step_two/character.vue'
import  characterthree from  './component/noumenon_store/new_build/step_three/character.vue'
//本体查看
import  institution from  './component/noumenon_store/institution/index.vue'
import  literature from './component/noumenon_store/literature/index.vue'
import  office from  './component/noumenon_store/office/index.vue'
import  place from  './component/noumenon_store/place_name/index.vue'
import  terms from  './component/noumenon_store/terms/index.vue'
import  time from  './component/noumenon_store/Time/index.vue'
import  character from './component/noumenon_store/character/index.vue'
//本体详情
import  characterM from  './component/noumenon_store/character/character.vue'
import  literatureM from './component/noumenon_store/institution/institution.vue'
import  officeM from './component/noumenon_store/institution/institution.vue'
import  placeM from './component/noumenon_store/institution/institution.vue'
import  institutionM from './component/noumenon_store/institution/institution.vue'
import  termsM from  './component/noumenon_store/terms/terms.vue'
import  timeM from  './component/noumenon_store/Time/Time_check_china.vue'


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


    // import  user from  './component/user/index.vue'
    // import  upload_step1 from  './component/user/upload/firststep/index.vue'
    // import upload_step2 from './component/user/upload/secondstep/index.vue'
    // import upload_step3 from './component/user/upload/thirdstep/index.vue'
    // import  mybook_index from  './component/user/mybook/index.vue'
    // import  alupload_index from  './component/user/mybook/alupload/index.vue'
    // import  private_books_index from './component/user/mybook/private_books/index.vue'
    // import  my_collection_index from  './component/user/mycollection/index.vue'
    // import  my_offer_index from  './component/user/myoffer/noumenon_edit/index.vue'
    // import  noumenon_mark from  './component/user/myoffer/noumenon_mark/index.vue'
    // import  picture_word from  './picture_word.vue'
    // import  comment from  './component/user/myoffer/comment/index.vue'
    // import  revise from  './component/user/myoffer/revise/index.vue'
    // import  search_index from  './component/search/index.vue'
        {
            path:'/user',
            component:user,
            name:'user',
            children:[
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

            ]
        },
        {
            path:'/alupload',
            component:alupload,
            name:'alupload'
        },
        {
            path:'/privatebook',
            component:privatebook,
            name:'privatebook'
        },
        {
            path:'/mark',
            component:mark,
            name:'mark'
        },
        {
            path:'/comment',
            component:comment,
            name:'comment'
        },
        {
            path:'/revise',
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
                {
                    path:'/noumenon/timeM/:id',
                    component:timeM,
                    name:'timeM'
                },


                {
                    path:'/noumenon/build',
                    component:build,
                    name:'build'
                },
                {
                    path:'/noumenon/buildteptwo',
                    component:charactertwo,
                    name:'charactertwo'
                },
                {
                    path:'/noumenon/characterstepthree',
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
        user_item = 'guest'
    }

    let flag = false;
    if (user_item == 'guest'){
        for (let i = 0; i < guest_acl.length; i++) {
            if (to.name == guest_acl[i]) {
                flag = true;
                next();
                continue;
            }
        }
        if (!flag) {
            flag = true;
            next('login');
        }
    } else if (user_item == 'admin'){
        for (let i = 0; i < admin_acl.length; i++){
            if (to.name == admin_acl[i]){
                console.log("admin");
                flag = true;
                next();
                continue;
            }
        }
    } else if (user_item == 'user'){
        for (let i = 0; i < user_acl.length; i++) {
            if (to.name == user_acl[i]){
                console.log('user');
                flag = true;
                next();
                continue;
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





