<template>
    <!--顶端固定不变的导航条-->
    <div id="store" class="store" v-show="show">
        <search></search>
        <router-link to="bookstore">
            <span class="bookstore">古籍库</span>
        </router-link>
        <router-link to="/noumenon_store">
            <span class="noumenon_store">本体库</span>
        </router-link>
        <router-link to="/user">
            <span class="user_name cancel">用户名</span>
        </router-link>
        <div class="cancel_word">
            <button @click="Logout" type="button" class="btn btn-default btn-lg" disabled="disabled">注销</button>
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
            }
        }

    }
</script>

<style>
    .store{
        margin-top: 0;
        margin-left: 0;
        padding: 10px;
        background-color:#dac8c8;
        height: 40px;
        width: 100%;
    }

    .bookstore{
        width: auto;
        margin-left: 10px;
        font-weight: 700;
        font-style:normal;
        font-size:16px;
        color:#999999;
    }

    .noumenon_store{
        width: auto;
        margin-left: 60px;
        right:180px;
        font-weight:700;
        font-style:normal;
        font-size:16px;
        color:#999999;
    }

    .user_name{
        width: auto;
        margin-left: 60px;
        font-weight:700;
        font-style:normal;
        font-size:16px;
        color:#999999;
        text-align:center;
    }
    .cancel_word{
        /*visibility: hidden;*/
        margin-left: 1410px;
        margin-top: 0;
        width: 50px;
    }
    .cancel:hover .cancel_word{
      visibility: visible;
    }


</style>