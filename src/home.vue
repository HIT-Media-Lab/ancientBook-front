<template>
    <div id="store" class="store" v-show="show">
        <div>
            <router-link to="/ancientbooks/bookstore">
            <p class="bookstore">古籍库</p>
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
            <button class="cancel_word" @click="logout">注销</button>
        </div>
    </div>
</template>

<script type="text/javascript">
//    import store from './store/index'

    export default{
        data(){
            return{
                url:'/ancient_books/logout.action',
//                show:store.state.show
                show:true
            }
        },
        methods:{
            Show() {
                this.$emit('show_bar',this.show);
            },
            logout:function () {
                this.show=false;
//                this.$http.get(this.url).then(function () {
//                    alert("注销成功");
//                    this.$router.push({path: '/login'})
//                },function () {
//                    alert("error")
//                })
            }
        }
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
        display: none;
        position: absolute;
        right: 70px;
        margin-top: 20px;
        width: 50px;
    }
    .cancel:hover .cancel_word{
        display: inline-block;
    }


</style>