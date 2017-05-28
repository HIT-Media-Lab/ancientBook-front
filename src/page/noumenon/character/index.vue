<template>
    <div class="zxwnoumenom">
        <div class="zxwnoumenom-body">
            <!--人物本体标题-->
            <noumenon-title :title="this.title"></noumenon-title>

            <!--字母title-->
            <letter-title v-on:letter="wordChange" :url="this.word_url" :object="this.get_letter"></letter-title>

            <!--人物列表-->
            <div class="zxwbottom-container">
                <div class="row" v-for="(item,index) in character_data">
                    <span class="col-md-6" @click="character(index)">{{item.standard_name}}----{{item.noumenon_id}}</span>
                </div>
            </div>

            <!--翻页组件-->
            <paginator :max=this.total_page :object="this.get_letter" :url="this.word_url" v-on:pre_page="prePagecount" v-on:next_page="nextPagecount" v-on:skip_page="skiPagecount"></paginator>
        </div>
    </div>
</template>

<script>
   /* let Mock = require('mockjs');

    //显示用户列表
    Mock.mock('/ancient_books/get_person_list_by_word.action?word=a&&page_count=1','get',{
        "status|200":200,
        "result|1":1,
        "content|30":[{
            'standard_name':'@FIRST',
            'noumenon_id|1-100':1
        }],
        "total_page|1-10":1
    });*/

    import noumenonTitle from '../../../component/noumenon-title.vue';
    import letterTitle from '../../../component/letter-title.vue';
    import paginator from '../../../component/paginator.vue';

    export default{
        components:{
            paginator,
            noumenonTitle,
            letterTitle,
        },

        data(){
            return{
                title:'人物本体',
                word:'',
                total_page:3,   //总页数
                page_count:1,   //当前页数
                get_letter:{},
                character_data:[],
                characterid_data:[],
                word_url:'/ancient_books/get_person_list_by_word.action'
            }
        },

        methods:{
            successGet(response){
                console.log("字母显示本体列表成功");
                this.total_page = response.body.total_page;
                for(let i = 0; i <response.body.content.length; i++){
                    this.character_data[i]= response.body.content[i];
                }
            },

            failGet(){
                console.log("字母显示本体列表失败");
            },


            character(p){
                console.log(this.character_data[p].id);
                this.$router.push({name:'char_detail',params:{id:this.character_data[p].noumenon_id}});
            },

            prePagecount(p){
                this.page_count = p;
                this.get_letter.value = '?word='+this.word+'&&page_count='+this.page_count;
            },

            nextPagecount(p){
                this.page_count = p;
                this.get_letter.value = '?word='+this.word+'&&page_count='+this.page_count;
            },

            skiPagecount(p){
                this.page_count = p;
                this.get_letter.value = '?word='+this.word+'&&page_count='+this.page_count;
            },

            cleanData(){
                console.log('hhh');
                this.character_data.splice(0, this.character_data.length);
                this.characterid_data.splice(0,this.characterid_data.length);
            },

            wordChange(p){
                this.word = p;
                console.log(this.word);
                this.get_letter.value = '?word='+this.word+'&&page_count=1';
            }
        }

    }
</script>

<style>
    .zxwbottom-container{
        width:750px;
        padding-top: 20px;
    }
</style>