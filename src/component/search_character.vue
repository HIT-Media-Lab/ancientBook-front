<template>
    <modal :show_modal="this.character_modal" v-on:fireclose="this.close">
        <div slot="header" class="zxw-time-header">
            <span>添加关系属性</span>
        </div>
        <div slot="body" class="zxw-time-body">
            <div class="zxw-search-header">
                <input class="zxw-search-input" type="text" v-model="search_content">
                <button class="zxw-search-icon" @click="search_character()"></button>
            </div>
            <p class="zxw-search-tip">请在输入框中输入本体规范名称进行搜索</p>
        </div>

        <div slot="footer" class="zxw-search-footer">
            <button class="zxw-prebtn zxw-search-create">创建</button>
            <button class="zxwnoumenom-button zxw-search-cancel">取消</button>
        </div>
    </modal>
</template>

<script>
    import modal from "../component/modal.vue";
    export default{
        components:{
            modal
        },
        props:['character_modal'],

        data(){
            return {
                search_content:'',
                search_url:'/ancient_books/get_person_list_by_name.action',
                search_result:[]
            }
        },

        methods:{
            close(){
                this.$emit('close_modal',close);
            },

            success_search(response){
                for(let i = 0;i < response.body.content.length;i++){
                    this.search_result.push({
                        standrad_name:response.body.content.standrad_name,
                        noumenon_id:response.body.content.noumenon_id
                    })
                }

            },

            fail_search(){

            },

            search_character(){
                let new_url;
                let search_object = {};
                new_url = this.search_url+'?name='+this.search_content+'&&page_count=1';
                this.http_json(new_url,'get',search_object,this.success_search,this.fail_search);
            }
        }
    }
</script>

<style>
    .zxw-search-header{
        border:2px solid;
        width:300px;
        height:35px;
        margin:0 0 0 50px;
    }
    .zxw-search-input{
        background-color: transparent;
        border:none;
        font-size:15px;
        width:260px;
        height:35px;
        float:left;
    }

    .zxw-search-icon{
        background-image: url("../assets/img/big-mirror.png");
        background-repeat: no-repeat;
        background-position: center;
        background-size: 100%;
        width:20px;
        height:20px;
        margin:5px 10px 0 0;
        float: right;
    }

    .zxw-search-tip{
        width:220px;
        margin:80px auto;
        font-size:12px;
    }

    .zxw-search-create{
        width:80px;
        height:50px;
    }

    .zxw-search-cancel{
        width:80px;
        height:50px;
        background-size: 80px 40px;
    }

    .zxw-search-footer{
        /*float:right;*/
        margin: 0 20px -100px 0;
        /*margin-bottom: 80px;*/
    }
</style>