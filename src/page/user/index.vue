<template>
    <div class="user">

        <div class="">
            <router-link to="/user/upload1">
                <img src="../../assets/img/u456.png" class="upload_img">
                <span class="upload_word"> 上 传</span>
            </router-link>
        </div>
        <div>
            <router-link to="/user/mybook" >
                <img src="../../assets/img/u463.png" class="mybook_img">
                <span class="mybook_word">我的古籍</span>
            </router-link>
        </div>
        <div>
            <router-link to="/user/collection">
                <img src="../../assets/img/u468.png" class="mycollection_img">
                <span class="mycollection_word">我的收藏</span>
            </router-link>
        </div>
        <div>
            <router-link to="/user/offer">
                <img src="../../assets/img/u485.png" class="myoffer_img">
                <span class="myoffer_word">我的贡献</span>
            </router-link>
        </div>
        <!--<div id="modal">-->
            <!--<modal v-bind:show.sync="show">-->
                <!--<header class="dialog-header" slot="header">-->
                    <!--<h1 class="dialog-title">提示信息</h1>-->
                <!--</header>-->

                <!--<div class="dialog-body" slot="body">-->
                    <!--<p>你想在对话框中放什么内容都可以！</p>-->
                    <!--<p>你可以放一段文字，也可以放一些表单，或者是一些图片。</p>-->
                <!--</div>-->

                <!--<footer class="dialog-footer" slot="footer">-->
                    <!--<button class="btn" @click="closeDialog">关闭</button>-->
                <!--</footer>-->
            <!--</modal>-->
            <!--<button class="btn btn-open" @click="openDialog">打开对话框</button>-->
        <!--</div>-->
    </div>
</template>

<script>
    import store from '../../store'
    import hhh from  '../../component/modal.vue'
    export default{
        components:{
            hhh
        },

        data(){
            return{
                hhh:'',
                show: true
            }
        },
        methods:{
//            test(){
//                this.hhh=this.$store.state.Token;
//                alert(this.hhh)
//            }
        }
    }
</script>

<style>
    .user{
    }
    .upload{

    }
    .upload_img{

    }
    .upload_word{

    }
    .mybook_img{

    }
    .mybook_word{

    }
    .mycollection_img{

    }
    .mycollection_word{

    }
    .myoffer_img{

    }
    .myoffer_word{

    }
</style>