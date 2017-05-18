<template>
    <!--顶端固定不变的导航条-->
    <div id="store" class="store" v-show="show">
        <input placeholder=" 请输入你要搜索的内容" class="search-input" v-model="sort_box" v-on:keydown.enter="enter">
            <!--<router-link to="/search_index">-->
            <!--<span class="sort_box1" v-show="sort_box.length!=0" @click="hide">搜古籍：{{sort_box}}</span>-->
            <!--</router-link>-->
            <!--<router-link to="/search_index">-->
            <!--<span class="sort_box2" v-show="sort_box.length!=0" @click="hide">搜本体：{{sort_box}}</span>-->
            <!--</router-link>-->
        <div class="three-link">
            <router-link to="bookstore">
                <span class="bookstore">古籍库</span>
            </router-link>
            <router-link to="/noumenon_store" >
                <span class="noumenon_store">本体库</span>
            </router-link>
            <router-link to="/user">
            <span class="user_name" onmouseover=" document.getElementById('Logout').style.visibility='visible'"
                  onmouseout=" document.getElementById('Logout').style.visibility='hidden';
             document.getElementById('Logout').style.transition='all ease 3s'">用户名</span>
            </router-link>
            <div class="cancel_word">
                <button @click="Logout" id="Logout">注销</button>
            </div>
        </div>
    </div>
</template>

<script type="text/javascript">
    import store from './store/index'
    export default{
        data(){
            return{
                sort_box:'',
                url: '/ancient_books/logout.action',
                show: this.$store.getters.GetShow
            }
        },
        methods:{
            //注销
            Logout:function () {
                alert(this.$store.getters.GetShow);
                this.$http.get(this.url).then(function () {
                    alert("注销成功");
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
                this.$router.push({path: '/search_index'});
            }
        }
    }
</script>

<style>
    .store{
        /*margin-top: 0;*/
        /*margin-left: 0;*/
        /*padding: 10px;*/
        background-color:#dac8c8;
        height: 40px;
        width: 100%;
    }
    .three-link{
        /*display: inline-block;*/
        width: 300px;
        height: 40px;

    }
    .bookstore{
        width:100px;
        height: 13px;
        font-weight: 700;
        font-style:normal;
        font-size:16px;
        color:#999999;
    }

    .noumenon_store{
        width:100px;
        height: 13px;
        font-weight:700;
        font-style:normal;
        font-size:16px;
        color:#999999;
    }

    .user_name{
        width:100px;
        height: 13px;
        font-weight:700;
        font-style:normal;
        font-size:16px;
        color:#999999;
        text-align:center;
    }
    .cancel_word{
        visibility: hidden;
        margin-left: 1410px;
        margin-top: 0;
        width: 50px;
    }
    .search{
        width: 220px;
        margin-left: 950px;
    }
    .down-box{
        display: inline-block;
    }
    .search-input{
        display: inline-block;
        width: 220px;
    }
    .sort_box1{
        float: left;
        margin-top:30px;
    }
    .sort_box2{
        float: left;
        margin-top:50px;
    }
</style>