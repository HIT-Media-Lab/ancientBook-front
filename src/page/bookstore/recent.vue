<template>
    <div class="j-recent">
        <recent_title class="j-recent-bar" :title="this.title"></recent_title>

        <div class="j-p-1">
            <router-link to="/bookstore/book_info">
                <img src="../../assets/img/古籍封面1.jpg" class="j-shi">
                <p style="color: #0f0f0f">诗经（不详）</p>
            </router-link>
        </div>
        <div class="j-p-2">
            <router-link to="/bookstore/book_info">
                <img src="../../assets/img/古籍封面2.jpg" class="j-shan">
                <p style="color: #0f0f0f">山海经（不详）</p>
            </router-link>
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
                this.http_json(this.id_url, 'get', '', this.success_id, this.fail_id)
            },
            success_id(response){
                for (let i = 0; i < response.body.length; i++) {
                    let id_url = '';
                    this.recent_book[i] = response.body[i];
                    id_url = this.picture_url + '?page_id=' + response.body[i].ancient_book_id;
                    document.getElementById(i).src = id_url;
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
    .j-shi{
        width: 100px;
        height: 100px;
    }
    .j-shan{
        width: 100px;
        height: 100px;
    }
    .j-p-1{
        margin-top: 20px;
        margin-left: 60px;
        width: 100px;
        display: inline-block;
        /*height: 100px;*/
    }
    .j-p-2{
        display: inline-block;
        width: 100px;
        margin-left: 60px;
    }
</style>

<!--<div class="j-recent">-->
    <!--<recent_title class="j-recent-bar" :title="this.title"></recent_title>-->
    <!--<div v-for="(id,index) in recent_book">-->
        <!--<img v-bind:id=index src="" class="">-->
        <!--<p>{{item.standard_name}}</p>-->
    <!--</div>-->
<!--</div>-->