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
Vue.prototype.response={};



//定义的post的vue-router全局函数，以json形式传递数据
Vue.prototype.HttpJson = function (url, type, params, success, fail) {
    // this.BeforeHttp(params);
    params.token=this.$store.getters.GetToken;
    console.log("你猜猜token有没有 "+params.token);
    if (type.toLocaleLowerCase() == "get") {
        this.$http.get(url).then(function (response) {
            this.response=response;
            this.BeforeSuccess(this.response);
            success(this.response);
        },function () {
            fail()
        })
    } else if (type.toLocaleLowerCase() == "post") {
        //验证是否有无token
        this.BeforeHttp(params);
        params.token = this.$store.getters.GetToken();

        this.$http.post(url, params,
            {headers:{'Content-Type':'application/json;charset=UTF-8'}}
        ).then(function (response) {
            this.response=response;
            this.BeforeSuccess(this.response);
            success(this.response);
            this.AfterSuccess(this.response);
            // console.log(JSON.stringify(response.body))
        },function () {
            fail()
        })
    }
};


//定义的post的vue-router全局函数，以form-data形式传递数据
Vue.prototype.HttpPostForm=function (url,params,success,fail) {
    // this.BeforeHttp(params);
    params.token=this.$store.getters.GetToken;
    console.log("你猜猜token有没有 "+params.token);
    this.$http.post(url, params,
        {emulateJSON: true}   //将json形式转换为form-data
        ).then(function (response) {
        this.response=response;
        this.BeforeSuccess(this.response);
        success(this.response);
        this.AfterSuccess( this.response);
    },function () {
        fail()
    })
};

//定义的get的vue-router全局函数，以json形式传递数据
// Vue.prototype.HttpGetJson=function (url,params,success,fail) {
//     //get的数据传递格式
//     this.$http.get(url).then(function (response) {
//         this.response=response;
//         this.BeforeSuccess();
//         success(this.response);
//     },function () {
//         fail()
//     })
// };
//定义的get的vue-router全局函数，以form-data形式传递数据
// Vue.prototype.HttpGetForm=function (url,object,success,fail) {
//     let new_url=url+'?'+object.key+'='+object.value;
//     this.$http.get(new_url,
//         {emulateJSON: true}).then(function (response) {
//         this.response=response;
//         this.BeforeSuccess();
//         success(this.response);
//     },function () {
//         fail()
//     })
// };

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
import  bookstore from './component/bookstore/index.vue'
import  login from  './login.vue'
import  super_user from  './super_user.vue'

//用户
import  user from  './component/user/index.vue'
import  upload_step1 from  './component/user/upload/firststep/index.vue'
import  upload_step2 from  './component/user/upload/secondstep/index.vue'
import  upload_step3 from  './component/user/upload/thirdstep/index.vue'
import  mybook_index from  './component/user/mybook/index.vue'
import  alupload_index from  './component/user/mybook/alupload/index.vue'
import  private_books_index from './component/user/mybook/private_books/index.vue'
import  my_collection_index from  './component/user/mycollection/index.vue'
import  my_offer_index from  './component/user/myoffer/noumenon_edit/index.vue'
import  noumenon_mark from  './component/user/myoffer/noumenon_mark/index.vue'
import  picture_word from  './picture_word.vue'
import  comment from  './component/user/myoffer/comment/index.vue'
import  revise from  './component/user/myoffer/revise/index.vue'
import  search_index from  './component/search/index.vue'

//本体
import  noumenon_store from  './component/noumenon_store/index.vue'
//新建本体
import  build_noumenon from  './component/noumenon_store/new_build/index.vue'
import  build_character_steptwo from  './component/noumenon_store/new_build/step_two/character.vue'
import  build_character_stepthree from  './component/noumenon_store/new_build/step_three/character.vue'
//本体查看
import  institution_noumenon from  './component/noumenon_store/institution/index.vue'
import  literature_noumenon from './component/noumenon_store/literature/index.vue'
import  office_noumenon from  './component/noumenon_store/office/index.vue'
import  place_noumenon from  './component/noumenon_store/place_name/index.vue'
import  terms_noumenon from  './component/noumenon_store/terms/index.vue'
import  time_noumenon from  './component/noumenon_store/Time/index.vue'
import  charater_noumenon from './component/noumenon_store/character/index.vue'
//本体详情
import  charater_message from  './component/noumenon_store/character/character.vue'
import  literature_message from './component/noumenon_store/institution/institution.vue'
import  office_message from './component/noumenon_store/institution/institution.vue'
import  place_message from './component/noumenon_store/institution/institution.vue'
import  institution_message from './component/noumenon_store/institution/institution.vue'
import  terms_message from  './component/noumenon_store/terms/terms.vue'
import  time_message from  './component/noumenon_store/Time/Time_check_china.vue'


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
            children:[
                {
                    path:'/user/upload_step1',
                    component:upload_step1
                },
                {
                    path:'/user/upload_step2',
                    component:upload_step2
                },
                {
                    path:'/user/upload_step3',
                    component:upload_step3
                },

                {
                    path:'/user/mybook_index',
                    component:mybook_index,
                },
                {
                    path:'/user/my_collection_index',
                    component:my_collection_index
                },
                {
                    path:'/user/my_offer_index',
                    component:my_offer_index
                },

            ]
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
            path:'/picture_word',
            component:picture_word
        },
        {
            path:'/noumenon_store',
            component:noumenon_store,
            children:[
                {
                    path:'/noumenon_store/charater_noumenon',
                    component:charater_noumenon
                },
                {
                    path:'/noumenon_store/charater_message/:id',
                    component:charater_message
                },
                {
                    path:'/noumenon_store/institution_noumenon',
                    component:institution_noumenon
                },
                {
                    path:'/noumenon_store//institution_message/:id',
                    component:institution_message
                },
                {
                    path:'/noumenon_store/literature_noumenon',
                    component:literature_noumenon
                },
                {
                    path:'/noumenon_store/literature_message/:id',
                    component:literature_message
                },
                {
                    path:'/noumenon_store/office_noumenon',
                    component:office_noumenon,
                },
                {
                    path:'/noumenon_store/office_message/:id',
                    component:office_message
                },
                {
                    path:'/noumenon_store/place_noumenon',
                    component:place_noumenon
                },
                {
                    path:'/noumenon_store/place_message/:id',
                    component:place_message
                },
                {
                    path:'/noumenon_store/terms_noumenon',
                    component:terms_noumenon
                },
                {
                    path:'/noumenon_store/terms_message/:id',
                    component:terms_message
                },
                {
                    path:'/noumenon_store/time_noumenon',
                    component:time_noumenon
                },
                {
                    path:'/noumenon_store/time_message/:id',
                    component:time_message
                },


                {
                    path:'/noumenon_store/build_noumenon',
                    component:build_noumenon
                },
                {
                    path:'/noumenon_store/build_character_steptwo',
                    component:build_character_steptwo
                },
                {
                    path:'/noumenon_store/build_character_stepthree',
                    component:build_character_stepthree
                },

            ]
        },






        {
            path:'/bookstore',
            component:bookstore
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
    // 模拟登陆状态

    let admin_router = router.app.$store.getters.ACL_admin;
    let user_router = router.app.$store.getters.ACL_user;
    let guest_router = router.app.$store.getters.ACL_guest;

    let user_item = JSON.parse(localStorage.getItem('user'));
    if (user_item == undefined) {
        localStorage.setItem('user',JSON.stringify("guest"));
        user_item = 'guest'
    }

    let flag = false;
    if (user_item == 'guest'){
        for (let i = 0; i < guest_router.length; i++){
            if (to.path == guest_router[i]){
                console.log("guest");
                flag = true;
                next ();
                continue;
            }
        }

    } else if (user_item == 'admin'){
        for (let i = 0; i < admin_router.length; i++){
            if (to.path == admin_router[i]){
                console.log("admin");
                flag = true;
                next();
                continue;
            }
        }
    } else if (user_item == 'user'){
        for (let i = 0; i < user_router.length; i++) {
            if (to.path == user_router[i]){
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





