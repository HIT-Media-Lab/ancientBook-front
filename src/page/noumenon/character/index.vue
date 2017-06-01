<template>
    <div class="zxwnoumenom">
        <div class="zxwnoumenom-body">
            <p>{{$route.params.pageId}}</p>
            <p>{{$route.params.letterId}}</p>
            <!--人物本体标题-->
            <noumenon-title :title="this.title"></noumenon-title>

            <!--字母title-->
            <letter-title></letter-title>

            <!--人物列表-->
            <div class="zxwbottom-container">
                <div class="row" v-for="(item,index) in character_data">
                    <span class="col-md-6" @click="gotoCharacter(index)">{{item.standard_name}}----{{item.noumenon_id}}</span>
                    <span class="col-md-6" @click="gotoCharacter(index+1)" v-model="character_data[index+1]" >{{                    <span class="col-md-6" @click="gotoCharacter(index+1)" v-model="character_data[index+1]" >{{character_data[index+1].standard_name}}----{{character_data[index+1].noumenon_id}}</span>.standard_name}}----{{item.noumenon_id}}</span>
                </div>
            </div>

            <!--翻页组件-->
            <paginator :max=this.total_page></paginator>
        </div>
    </div>
</template>

<script>
    let Mock = require('mockjs');

    //显示用户列表
    Mock.mock('/ancient_books/get_person_list_by_word.action?word=a&&page_count=1','get',{
        "status|200":200,
        "result|1":1,
        "content|30":[{
            'standard_name':'@FIRST',
            'noumenon_id|1-100':1
        }],
        "total_page|10-20":1
    });

    Mock.mock('/ancient_books/get_person_list_by_word.action?word=a&&page_count=2','get',{
        "status|200":200,
        "result|1":1,
        "content|30":[{
            'standard_name':'@FIRST',
            'noumenon_id|1-100':1
        }],
        "total_page|10-20":1
    });

    Mock.mock('/ancient_books/get_person_list_by_word.action?word=b&&page_count=1','get',{
        "status|200":200,
        "result|1":1,
        "content|30":[{
            'standard_name':'@FIRST',
            'noumenon_id|1-100':1
        }],
        "total_page|10-20":1
    });

    Mock.mock('/ancient_books/get_person_list_by_word.action?word=b&&page_count=2','get',{
        "status|200":200,
        "result|1":1,
        "content|30":[{
            'standard_name':'@FIRST',
            'noumenon_id|1-100':1
        }],
        "total_page|10-20":1
    });

    import noumenonTitle from '../../../component/noumenon-title.vue';
    import letterTitle from '../../../component/letter-title.vue';
    import paginator from '../../../component/paginator.vue';

    export default{
        components:{
            paginator,
            noumenonTitle,
            letterTitle,
        },

        watch:{
            $route(){
                this.getCharacter();
            }
        },

        created(){
            this.getCharacter();
        },

        data(){
            return{
                title:'人物本体',
               // word:'',
                total_page:3,   //总页数
                //page_count:1,   //当前页数
                get_letter:{},
                character_data:[],
                word_url:'/ancient_books/get_person_list_by_word.action'
            }
        },

        methods:{

            //通过头字母显示人物本体列表
            successGet(response){
                console.log("字母显示本体列表成功");
                this.total_page = response.body.total_page;
                for(let i = 0; i <response.body.content.length; i++){
                    this.character_data[i]= response.body.content[i];
                }
            },

            failGet(response){
                console.log("字母显示本体列表失败");
            },

            getCharacter(){
                this.get_letter.value = '?word='+this.$route.params.word+'&&page_count='+this.$route.params.page;
                let new_url = this.word_url+this.get_letter.value;
                this.cleanData();
                this.httpJson(new_url,'get',this.get_letter,this.successGet,this.failGet);
            },

            //跳转到人物本体详情
            gotoCharacter(p){
                console.log(this.character_data[p].noumenon_id);
                this.$router.push({name:'char_detail',params:{id:this.character_data[p].noumenon_id}});
            },

            //清空前端显示数组
            cleanData(){
                this.character_data.splice(0, this.character_data.length);
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