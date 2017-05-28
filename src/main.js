"use strict";
import Vue from 'vue'
import Vuex from 'vuex'
import VueRouter from "vue-router"
import VueResource from 'vue-resource'
import './assets/less/index.less'
import './lib/regular'
import './lib/route'

//开启debug模式
Vue.config.debug = true;

Vue.use(VueRouter);
Vue.use(VueResource);
Vue.use(Vuex);

//回调success前的函数
function beforeSuccess() {

}

//回调success后的函数
function afterSuccess (response) {
//更新token
    this.$store.commit("change_token",response.body.token);
    console.log("更新token"+this.$store.getters.GetToken);
}

//判断是否有无token
function beforeHttp (object) {
    console.log("检查超级用户是否有token " + this.$store.getters.GetToken);
    object.token = this.$store.getters.GetToken;
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
Vue.prototype.httpJson = function (url, type, params, success, fail) {
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
        beforeHttp(params);
        params.token =this.$store.getters.GetToken();

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
            beforeSuccess(response);
            success(response);
            afterSuccess(response);
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
Vue.prototype.httpPostForm=function (url,params,success,fail) {
    params.token = this.$store.getters.GetToken;
    console.log("你猜猜token有没有 "+params.token);
    this.$http.post(url, params,
        {emulateJSON: true}   //将json形式转换为form-data
        ).then(function (response) {
            response_handle(response, success, fail);
    },function () {
       error();
    })
};




