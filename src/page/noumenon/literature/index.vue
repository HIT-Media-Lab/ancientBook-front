<template>
    <div>
        <!--文献本体标题-->
        <noumenon_title :title="this.title">
            <build_button slot="children"></build_button>
        </noumenon_title>

        <!--字母title-->
        <letter_title></letter_title>
        <!--文献列表-->
        <div class="zxw-noumenon-list">
            <button class="zxw-lit-list" @click="go_lit(index)" v-for="(item,index) in lit_data">
                {{ item.standard_name }}
            </button>
        </div>
        <!--翻页组件-->
        <paginator :max=this.total_page></paginator>
    </div>
</template>

<script>
    /*let Mock = require('mockjs');

     //显示用户列表
     Mock.mock('/ancient_books/get_literature_list_by_word.action?word=A&&page_count=1','get',{
     "result|1":1,
     "content|30":[{
     'standard_name':'诗经([西周]张馨文考订、[西周]张馨文考订)',
     'noumenon_id|1':1
     }],
     "total_page|10-20":1
     });*/

    import noumenon_title from '../../../component/noumenon-title.vue';
    import letter_title from '../../../component/letter-title.vue';
    import paginator from '../../../component/paginator.vue';
    import build_button from '../../../component/build-button.vue';
    export default{
        components:{
            paginator,
            noumenon_title,
            letter_title,
            build_button
        },

        watch:{
            '$route'(){
                this.clean_data();
                this.get_lit();
                console.log("$route");
            }
        },

        created(){
            this.get_lit();
            console.log("created");
        },

        data(){
            return{
                title:'文献本体',
                total_page:0,
                lit_data:[],
                word_url:'/ancient_books/get_literature_list_by_word.action',
                ban:true,
                it:false,
                i:['fg','fg','fg','fg','fg','fg','fg',]
            }
        },

        methods:{
            openit(){
                this.it = true;
            },
            //通过头字母显示人物本体列表
            success_get(response){
                console.log("字母显示本体列表成功");
                this.total_page = response.body.total_page;
                for (let i = 0; i < response.body.content.length; i++) {
                    this.lit_data.push(
                        response.body.content[i]
                    );
                }
            },

            fail_get(response){
                console.log("字母显示本体列表失败"+response.body);
            },

            get_lit(){
                let get_letter={};
                let new_url = this.word_url+'?word='+this.$route.params.letterId+'&&page_count='+this.$route.params.pageId;
                this.http_json(new_url,'get',get_letter,this.success_get,this.fail_get);
            },

            //跳转到人物本体详情
            go_lit(p){
                this.$router.push({name:'lit_detail',params:{nouId:this.lit_data[p].noumenon_id}});
            },

            //清空前端显示数组
            clean_data(){
                this.lit_data.splice(0, this.lit_data.length);
            }
        }

    }
</script>

<style>
    .zxw-lit-list{
        font-size: 18px;
        text-align: left;
        background-color: transparent;
        border-style: none;
        margin:0 30px 10px 0;
        width:600px;
    }
</style>