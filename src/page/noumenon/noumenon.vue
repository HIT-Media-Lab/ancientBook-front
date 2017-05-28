<template>
    <div class="zxwnoumenom-body">
        <noumenon-title :title="this.title"></noumenon-title>

        <div v-for="(item,index) in recent_noumenons">
            <p class="zxwnoumenom-row" @click="goNoumenom(index)">{{item.standard_name}}----{{item.id}}----{{item.type}}</p>
        </div>
    </div>
</template>
<script>
     /* let Mock = require('mockjs');

     //显示用户列表
     Mock.mock('/ancient_books/get_recent_noumenons.action','get',{
         "status":200,
         "result":1,
         "noumenons|10":[{
            'standard_name':'@FIRST',
            'id|100-1000':1,
            'type|1-7':1
         }]
     });*/

    import noumenonTitle from '../../component/noumenon-title.vue';
    import buildButton from '../../component/build-button.vue';
    export default{
        components:{
            noumenonTitle,
            buildButton
        },
        data(){
            return {
                title:'最近',
                recent_noumenons: [],   //本体标题信息
            }
        },
        created(){
            this.httpJson('/ancient_books/get_recent_noumenons.action','get',{},this.successRecent,this.failRecent);
        },
        methods: {
            successRecent(response){
                console.log("最近编辑请求成功！");
                for (let i = 0; i < response.body.noumenons.length; i++) {
                    this.recent_noumenons[i]=response.body.noumenons[i];
                }
            },

            failRecent(){
                console.log("没有返回数组！");
            },

            goNoumenom(p){
                console.log(p);
                let i = this.recent_noumenons[p].type;
                if( i === 1){
                    this.$router.push({name:'char_detail',params:{id:this.recent_noumenons[p].id}});
                }else if(i === 2){
                    this.$router.push({name:'lit_detail',params:{id:'literature'}});
                }else if(i === 3){
                    this.$router.push({name:'terms_detail',params:{id:'terms'}});
                }else if(i === 4){
                    this.$router.push({name:'char_detail',params:{id:'hhhhh'}});
                }else if(i === 5){
                    this.$router.push({name:'off_detail',params:{id:'office'}});
                }else if(i === 6){
                    this.$router.push({name:'ins_detail',params:{id:'institution'}});
                }else if(i === 7){
                    this.$router.push({name:'pla_detail',params:{id:'place'}});
                }
            }
        }
    }
</script>
<style>
    .zxwnoumenom-body{
        padding-left: 20px;
        padding-right: 20px;
    }

    .zxwnoumenom-row{
        margin-bottom: 15px;
        margin-left: 15px;
        font-size: 15px;
    }
</style>