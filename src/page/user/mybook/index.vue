`<template>
    <div>
        <recent_title class="j-mybook-bar" :title="this.title"></recent_title>
        <div class="j-mybook">
            <p class="j-mybook-recent-name">最近</p>
            <div class="j-mybook-recent-img">
                <div class="j-mybook-recent-div" v-for="item in recent_mybook">
                    <img :id = "item.id" class="j-mybook-recent-img1" @click="go_to_bookinfo">
                    <p class="j-mybook-p" @click="go_to_bookinfo">{{}}</p>
                </div>
            </div>
            <p class="j-mybook-recent-name">已上传</p>
            <div class="j-mybook-al-img">
                <div class="j-mybook-recent-div" v-for="item in al_up_book">
                    <img :id = "item.id" class="j-mybook-recent-img1" @click="go_to_bookinfo">
                    <p class="j-mybook-p" @click="go_to_bookinfo">{{}}</p>
                </div>
                <div class="j-mybook-morelink">
                    <span class="j-mybook-more" @click="">更多</span>
                    <img src="../../../assets/img/更多标.png" @click="">
                </div>
            </div>
            <p class="j-mybook-recent-name">私密古籍</p>
            <div class="j-mybook-al-img">
                <div class="j-mybook-recent-div" v-for="item in private_book">
                    <img :id = "item.id" class="j-mybook-recent-img1" @click="go_to_bookinfo">
                    <p class="j-mybook-p" @click="go_to_bookinfo">{{}}</p>
                </div>
                <div class="j-mybook-morelink">
                    <span class="j-mybook-more" @click="">更多</span>
                    <img src="../../../assets/img/更多标.png"  @click="">
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import recent_title from '../../../component/noumenon-title.vue'
    export default{
        components: {
            recent_title
        },
        created(){

        },
        data(){
            return{
                title: '我的古籍'
            }
        },
        methods: {
            go_to_bookinfo(){
                this.$router.push({path: '/bookstore/book_info'});
            }
        }
    }
</script>

<style>
    .j-mybook-bar{
        margin: -65px auto;
    }
    .j-mybook{
        margin: 80px auto;
        width: 900px ;
        height: auto ;
    }
    .j-mybook-recent-name{
        margin-left: 60px;
        width: 70px;
        font-weight:700;
        font-style:normal;
        font-size:16px;
        color: black;
    }
    .j-mybook-recent-img{
        margin-top: 10px;
        width: auto;
        height: 198px;
    }
    .j-mybook-recent-img1{
        width: 120px;
        height: 170px;
    }
    .j-mybook-recent-div{
        float: left;
        margin-left: 60px;
        width: 120px;
        height: auto;
    }
    .j-mybook-p{
        margin-top: 3px;
        text-align: center;
    }
    .j-mybook-al-img{
        margin-top: 10px;
        width: auto;
        height: 198px;
    }
    .j-mybook-more{
        font-weight: 600;
        font-style:normal;
        font-size:18px;
        color: black;
    }
    .j-mybook-morelink{
        height: 30px;
        display: inline-block;
        margin-top: 80px;
        margin-left: 80px;
    }
</style>