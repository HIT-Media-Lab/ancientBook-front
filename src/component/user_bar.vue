<template>
    <div class="j-bar-img">
        <router-link to="/user/upload1">
            <img src="../assets/img/no-use-picture/spot.png" class="j-spot" v-show="this.$route.name == 'upload1'">
            <span class="j-userbar-title">上传</span>
        </router-link>
        <img src="../assets/img/no-use-picture/spot.png" class="j-spot" v-show="this.$route.name == 'mybook' || this.$route.name =='privatebook' || this.$route.name =='alupload'">
        <select class="j-userbar-title" v-model="mybook" @change="choose_mybook">
            <option selected class="j-option">我的古籍</option>
            <option class="j-option">最近古籍</option>
            <option class="j-option">私密古籍</option>
            <option class="j-option">已上传</option>
        </select>
        <router-link to="/user_info/collection/page/1">
            <img src="../assets/img/no-use-picture/spot.png" class="j-spot" v-show="this.$route.name == 'collection'">
            <span class="j-userbar-title">我的收藏</span>
        </router-link>
        <img src="../assets/img/no-use-picture/spot.png" class="j-spot" v-show="this.$route.name == 'edit' || this.$route.name == 'mark'|| this.$route.name == 'comment'|| this.$route.name == 'revise'">
        <select class="j-userbar-title" v-model="my_collection" @change="choose_my_offer">
            <option selected class="j-option">我的贡献</option>
            <option class="j-option">本体编辑</option>
            <option class="j-option">本体标记</option>
            <option class="j-option">批注</option>
            <option class="j-option">修订</option>
        </select>
    </div>
</template>


<script>
    export default{
        data(){
            return{
                mybook: '我的古籍',
                my_collection: '我的贡献'

            }
        },
        methods:{
            choose_mybook(){
                if (this.mybook == '最近古籍'){
                    this.$router.push('/user_info/mybook');
                    this.mybook = '我的古籍';
                    this.my_collection = '我的贡献';
                }else if(this.mybook == '已上传'){
                    this.$route.params.pageId = 1;
                    this.$router.push({name: 'alupload', params: this.$route.params});
                    this.mybook = '我的古籍';
                    this.my_collection = '我的贡献';
                }else if (this.mybook == '私密古籍'){
                    this.$route.params.pageId = 1;
                    this.$router.push({name: 'privatebook', params: this.$route.params});
                    this.mybook = '我的古籍';
                    this.my_collection = '我的贡献';
                }
            },
            choose_my_offer(){
                if (this.my_collection ==  '本体编辑'){
                    this.$route.params.pageId = 1;
                    this.$route.params.content = '全部本体';
                    this.$router.push({name: 'edit', params: this.$route.params}); this.mybook = '我的古籍';
                    this.my_collection = '我的贡献';
                }else if(this.my_collection == '本体标记'){
                    this.$route.params.pageId = 1;
                    this.$route.params.content = '全部本体';
                    this.$router.push({name: 'mark', params: this.$route.params});
                    this.mybook = '我的古籍';
                    this.my_collection = '我的贡献';
                }else if (this.my_collection == '批注'){
                    this.$route.params.pageId = 1;
                    this.$route.params.content = '公开批注';
                    this.$router.push({name: 'comment', params: this.$route.params});
                    this.mybook = '我的古籍';
                    this.my_collection = '我的贡献';
                }else if (this.my_collection == '修订'){
                    this.$route.params.pageId = 1;
                    this.$router.push({name: 'revise', params: this.$route.params});
                    this.mybook = '我的古籍';
                    this.my_collection = '我的贡献';
                }
            }
        }
    }
</script>
<style>
    .j-userbar-title{
        margin:20px 110px 20px 0;
        font-size: 16px;
        color: gainsboro;
        display: inline-block;
        border: none;
    }
    .j-bar-img{
        margin: 35px auto;
        background-repeat: no-repeat;
        background-position: 50%;
        background-image: url(../assets/img/no-use-picture/navigation-bar.png);
        width: 1038px;
        height: 68px;
        padding-left: 55px;
        text-align: center;
    }
    .j-spot{
        width: 25px;
        height: 28px;
    }
</style>