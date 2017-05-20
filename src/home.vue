<template>
    <!--顶端固定不变的导航条-->
<<<<<<< HEAD
    <div id="store" class="store">
        <div class="search">
            <input placeholder=" 请输入你要搜索的内容" class="search-input" v-model="sort_box" v-on:keydown.enter="enter">
        </div>
        <div class="three-link">
            <router-link to="bookstore" class="a">
                <span class="bookstore">古籍库</span>
=======
    <div id="store" class="store" v-show="show">
        <search></search>
        <div>
            <router-link to="bookstore">
            <p class="bookstore">古籍库</p>
>>>>>>> 4974a85eaeb9d26aa5ed3e6651c5661fab0e5324
            </router-link>
        </div>
        <div>
            <router-link to="/noumenon_store">
            <p class="noumenon_store">本体库</p>
            </router-link>
        </div>
        <div class="cancel">
            <router-link to="/user">
                <p class="user_name">用户名</p>
            </router-link>
            <button class="cancel_word" @click="Logout">注销</button>
        </div>
    </div>
</template>

<script type="text/javascript">
    import store from './store/index'
    import  search from  './component/search/search.vue'

    export default{
        components:{
            search
        },

        data(){
            return{
                url: '/ancient_books/logout.action',
//                show:false
            }
        },
        methods:{
            //注销
            Logout:function () {
                this.$http.get(this.url).then(function () {
                    alert("注销成功");
                    this.$router.push({path: '/login'});
                },function () {
                    alert("error")
                })
            }
<<<<<<< HEAD
        },
//        watch:{
//            Show(){
//                this.show = this.$store.getters.GetShow
//            }
//        }
=======
        }

>>>>>>> 4974a85eaeb9d26aa5ed3e6651c5661fab0e5324
    }
</script>

<style>
    .store{
        position: absolute;
        z-index:1;
        top: 0;
        left: 0;
        padding: 10px;
        background-color:#dac8c8;
        height: 40px;
        width: 100%;
    }
<<<<<<< HEAD
    .three-link{
        padding: 10px;
        margin-left:1250px;
        margin-top: -35px;
        width: 300px;
        height: 40px;
=======
>>>>>>> 4974a85eaeb9d26aa5ed3e6651c5661fab0e5324

    .bookstore{
        position:absolute;
        margin: 0;
        right: 300px;
        font-weight:700;
        font-style:normal;
        font-size:16px;
        color:#999999;
    }

    .noumenon_store{
        margin: 0;
        position:absolute;
        right:180px;
        font-weight:700;
        font-style:normal;
        font-size:16px;
        color:#999999;
    }

    .user_name{
        margin: 0;
        position:absolute;
        right: 70px;
        font-weight:700;
        font-style:normal;
        font-size:16px;
        color:#999999;
        text-align:center;
    }
    .cancel_word{
<<<<<<< HEAD
        visibility: hidden;
        margin-left: 165px;
        margin-top: 0;
        width: 50px;
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
    .search{
        display: inline;
        width: auto;
        margin-left: 1050px;
    }
    .search-input{
        padding-left: 10px;
    }
    .sort_box1{
        /*display: inline;*/
        margin-left: -30px;
        list-style: none;
        width: 178px;
=======
        display: none;
        position: absolute;
        right: 70px;
        margin-top: 20px;
        width: 50px;
>>>>>>> 4974a85eaeb9d26aa5ed3e6651c5661fab0e5324
    }
    .cancel:hover .cancel_word{
        display: inline-block;
    }


</style>