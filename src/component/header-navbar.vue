<template xmlns:v-on="http://www.w3.org/1999/xhtml">
    <!--顶端固定不变的导航条-->
    <div id="store" class="store">
        <button class="bookstore">
            <router-link to="/bookstore" style="color: white">
                古籍库
            </router-link>
        </button>
        <button class="noumenon-store">
            <router-link to="/noumenon" style="color: white">
                本体库
            </router-link>
        </button>
        <div class="search">
            <input placeholder=" 请输入你要搜索的内容" class="search-input" v-model="sort_box" v-on:keydown.enter="enter">
        </div>
        <div>
            <router-link to="/user">
            <span class="user-name" onmouseover=" document.getElementById('Logout').style.visibility='visible'"
                  onmouseout=" document.getElementById('Logout').style.visibility='hidden';
             document.getElementById('Logout').style.transition='all ease 3s'">用户名</span>
            </router-link>
        </div>
        <div class="down-box" @click="hide" v-show="sort_box.length!=0">
            <ul>
                <li class="sort-box1">
                    <router-link to="/search_index" >
                        搜古籍：{{sort_box}}
                    </router-link>
                </li>
                <li class="sort-box2">
                    <router-link to="/search_index">
                        搜本体：{{sort_box}}
                    </router-link>
                </li>
            </ul>
        </div>
        <div>
        <button @click="test1()">有用户权限</button>
        <button @click="test2()">有超级用户权限</button>
        <button @click="test3()">没用权限</button>
        </div>
    </div>
</template>

<script type="text/javascript">
    import store from '../store/index'
    export default{
        data(){
            return{
                sort_box:'',
                url: '/ancient_books/logout.action',
            }
        },
        methods:{
            //注销
            Logout:function () {
                this.$http.get(this.url).then(function () {
                    alert("注销成功");
                    localStorage.setItem('user',JSON.stringify("guest"));
                    this.$router.push({path: '/login'});
                },function () {
                    alert("error")
                })
            },
            hide:function () {
                this.sort_box = ''
            },
            enter:function () {
                this.sort_box = '';
                this.$router.push({path: '/search'});
            },
            test1(){
                localStorage.setItem('user',JSON.stringify("user"));
            },
            test2(){
                localStorage.setItem('user',JSON.stringify("admin"));
            },
            test3(){
                localStorage.setItem('user',JSON.stringify("guest"));
            }
        },
    }
</script>

<style>
    .store{
        margin-top: 25px;
        height: 40px;
        width: 100%;
    }
    .two-store{
    }
    .bookstore{
        margin-left: 550px;
        background-image: url("../assets/img/墨点按钮.png");
        /*background-size: 50% ;*/
        /*background-repeat:no-repeat ;*/
        /*background-position: center;*/
        border: none;
        background-color: transparent;
        width: 135px;
        height: 56px;
        display: inline;
    }
    .noumenon-store{
        margin-left: 47px;
        background-image: url("../assets/img/墨点按钮.png");
        border: none;
        background-color: transparent;
        width: 135px;
        height: 56px;
        display: inline;
    }
    .search{
        display: inline;
        margin-left: 45px;
        background-image: url("../assets/img/搜索框小.png");
    }

    .user-name{
        padding: 20px;
        width:100px;
        height: 13px;
        font-weight:700;
        font-style:normal;
        font-size:16px;
        color:#999999;
        text-align:center;
    }
    .down-box{
        position: absolute;
        background-color: white;
        margin-left: 1050px;
        margin-top: -7px;
        border-style:solid;
        border-width: 1px;
        border-color: gainsboro;
        width: 188px;
    }
    .search-input{
        padding-left: 10px;

        width: 280px;
        height: 50px;
    }
    .sort-box1{
        /*display: inline;*/
        margin-left: -30px;
        list-style: none;
        width: 178px;
    }
    .sort-box2{
        margin-left: -30px;
        list-style: none;
        width: 178px;
    }
</style>