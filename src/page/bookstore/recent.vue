<!--最近古籍页面-->
<template>
    <div class="j-recent">
        <recent_title class="j-recent-bar" :title="this.title"></recent_title>
        <p class="j-read-none" v-show="read_none" v-model="read_none">最 近 无 古 籍 浏 览 记 录</p>
        <div v-for="item in recent_book" class="j-picture-name" >
            <img :id="item.id" class="j-picture all-link" alt="最近古籍图片" @click="push_success(item.id)" >
            <p class="j-pic-p all-link" @click="push_success(item.id)" :title="item.name">{{item.name}}</p>
        </div>
    </div>
</template>


<script>
    import recent_title from '../../component/noumenon-title.vue'
    import store from '../../store'
    export default{
        components:{
            recent_title
        },
        created() {
            /**
             *最近古籍显示逻辑
             */
            this.i = 0;
            this.get_id();
//            window.setTimeout("get_picture()", 2000);
        },
        watch:{
            $route(){
                this.i = 0;
                this.get_id();
            }
        },
        data(){
            return{
                title: '最近',
                recent_book: [],
                book_id: '',
                book_name: [],
                id_url:'/ancient_books/get_recent_ancient_book_list.action',
                picture_url: '/ancient_books/get_picture_by_id.action',
                picture_page_url: "/ancient_books/get_page_id_by_jcy.action",
                picture_id_url:'',
                book_cover:{},
                length: 0,
                i: 0,
                read_none: true
            }
        },
        methods: {
            get_id(){
                this.http_json(this.id_url, 'get',{}, this.success_id, this.fail_id);

            },
            success_id(response){
                this.recent_book = response.body;
                console.log(this.recent_book);
                this.length = response.body.length;
                console.log(this.length);
                if (this.length == 0){
                    this.read_none = true;
                }else {
                    this.read_none = false;
                    for(let j = 0; j < this.length; j++) {
                        let item = this.picture_page_url + '?book=' + '1' + '&&volume=' + '1' + '&&page=' + '1' + '&&ancient_book_id=' + this.recent_book[j].id;
                        console.log(item);
                        this.http_json(item, 'get', item, this.success_page, this.fail_id);
                    }
                }
            },
            fail_id(){

            },
            /**
             *给古籍图片附上值
             */
            success_page(response){
                this.picture_id_url = this.picture_url + '?page_id=' + response.body.id;
                document.getElementById(this.recent_book[this.i].id).setAttribute("src", this.picture_id_url);
                this.i = this.i + 1;
                console.log(this.i);
            },
            /**
             * 点击跳转
             */
            push_success(id){
                this.$route.params.ancient_book_id = id;
                this.$router.push({name: 'book_info', params: this.$route.params});
            }
        }
    }
</script>

<style>
    .j-recent{
        height: auto;
    }
    .j-recent-bar{
        margin: 0 auto;
    }
    .j-picture-name{
        margin-top: 40px;
        margin-left: 90px;
        width: 200px;
        display: inline-block;
    }
    .j-picture{
        width: 200px;
        height: 200px;
    }
    .j-pic-p{
        color: #0f0f0f;
        text-align: center;
        display: -webkit-box;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
        overflow: hidden;
    }
    .j-read-none{
        margin: 150px auto;
        width: 480px;
        font-size: 35px;
    }
</style>
