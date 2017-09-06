<template>
    <div>
        <!--机构本体标题-->
        <noumenon_title :title="this.title">
            <build_button slot="children"></build_button>
        </noumenon_title>

        <!--字母title-->
        <letter_title></letter_title>

        <!--机构列表-->
        <div class="zxw-noumenon-list">
            <button class="zxw-chadail" @click="go_terms(index)" v-for="(item,index) in terms_data">
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
    Mock.mock('/ancient_books/get_technical_list_by_word.action?word=A&&page_count=1','get',{
        "result|1":1,
        "content|30":[{
            'standard_name':'术语本体',
            'noumenon_id|1':1
        }],
        "total_page|10-20":1
    });

    Mock.mock('/ancient_books/get_technical_list_by_word.action?word=A&&page_count=2','get',{
        "result|1":1,
        "content|2":[{
            'standard_name':'@FIRST',
            'noumenon_id|100-1000':1
        }],
        "total_page|10-20":1
    });

    Mock.mock('/ancient_books/get_technical_list_by_word.action?word=B&&page_count=1','get',{
        "result|1":1,
        "content|10":[{
            'standard_name':'@FIRST',
            'noumenon_id|1-100':1
        }],
        "total_page|10-20":1
    });

    Mock.mock('/ancient_books/get_institution_list_by_word.action?word=Q&&page_count=1','get',{
        "result|1":1,
        "content":[{
            'standard_name':'@FIRST',
            'noumenon_id|1-100':1
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
                this.get_terms();
                console.log("$route");
            }
        },

        created(){
            this.get_terms();
            console.log("created");
        },

        data(){
            return{
                title:'术语本体',
                total_page:1,   //总页数
                terms_data:[],
                word_url:'/ancient_books/get_technical_list_by_word.action',
                ban:true
            }
        },

        methods:{

            //通过头字母显示人物本体列表
            success_get(response){
                console.log("字母显示本体列表成功");
                this.total_page = response.body.total_page;
                for (let i = 0; i < response.body.content.length; i++) {
                    this.terms_data.push(
                        response.body.content[i]
                    );
                }
                console.log('response.body.content.length:'+response.body.content.length);
                console.log('this.terms_data:'+JSON.stringify(this.terms_data));
            },

            fail_get(response){
                console.log("字母显示本体列表失败"+response.body);
            },

            get_terms(){
                let get_letter={};
                let new_url = this.word_url+'?word='+this.$route.params.letterId+'&&page_count='+this.$route.params.pageId;
                this.http_json(new_url,'get',get_letter,this.success_get,this.fail_get);
            },

            //跳转到术语本体详情
            go_terms(p){
                console.log(this.terms_data[p].noumenon_id);
                this.$router.push({name:'terms_detail',params:{nouId:this.terms_data[p].noumenon_id}});
            },

            //清空前端显示数组
            clean_data(){
                this.terms_data.splice(0, this.terms_data.length);
            }
        }

    }
</script>