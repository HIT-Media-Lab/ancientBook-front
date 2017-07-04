<template>
    <div class="j-recent">
        <recent_title class="j-recent-bar" :title="this.title"></recent_title>
        <div v-for="(item,index) in recent_book" class="j-picture-name">
            <img v-bind:id=index src="" class="j-picture" >
            <p style="color: #0f0f0f; text-align: center">{{item.standard_name}}</p>
        </div>
    </div>
</template>

<script>
    import recent_title from '../../component/noumenon-title.vue'
    export default{
        components:{
            recent_title
        },
        create: function () {
            this.get_id();
        },
        data(){
            return{
                title: '最近',
                recent_book: [],
                book_id: [],
                book_name: [],
                id_url:'/ancient_books/get_recient_ancient_book_list.action',
                picture_url: '/ancient_books/get_picture_by_id.action'
            }
        },
        methods: {
            get_id(){
                this.http_json(this.id_url, 'get',{}, this.success_id, this.fail_id);
                console.log("最近");
            },
            success_id(response){
                for (let i = 0; i < response.body.length; i++) {
                    let id_url = '';
                    console.log("获得最近古籍没问题");
                    this.recent_book[i] = response.body[i];
                    id_url = this.picture_url + '?page_id=' + response.body[i].ancient_book_id;
                    document.getElementById( i ).src = id_url;
                    console.log("得到最近成功")
                }
            },
            fail_id(){

            },
            push_success(){

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
        margin-top: 20px;
        margin-left: 60px;
        width: 200px;
        display: inline-block;
    }
    .j-picture{
        width: 200px;
        height: 200px;
    }
</style>
