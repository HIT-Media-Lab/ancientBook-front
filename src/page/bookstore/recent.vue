<template>
    <div class="j-recent">
        <recent_title class="j-recent-bar" :title="this.title"></recent_title>
        <div v-for="(item,message) in recent_book">
            <!--<img src="this.recent_book">-->
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

        },
        data(){
            return{
                title: '最近',
                recent_book: [],
                id_url:'/ancient_books/get_recient_ancient_book_list.action'
            }
        },
        methods: {
            get_id(){
                this.http_json(this.id_url, 'get', '', this.success_id, this.fail_id)
            },
            success_id(response){
                for (let i = 0; i < response.body.length; i++){
                    this.recent_book
                }
            }
        }
    }
</script>

<style>
    .j-recent{
        height: auto;
    }
</style>