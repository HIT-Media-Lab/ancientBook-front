<template>
    <div class="noumenom-body">
        <div class="noumenom-header">
            <h5 class="noumenom-title">最近</h5>
            <build_noumenom></build_noumenom>
        </div>

       <div v-for="(item,index) in recent_noumenoms">
            <button class="noumenom-row" @click="goNoumenom(index)">{{item.standard_name}}</button>
        </div>
    </div>
</template>

<script>
     let Mock = require('mockjs');

     //显示用户列表
     Mock.mock('/ancient_books/get_recent_noumenons.action','get',{
     "noumenons|10":[{
     'standard_name|1-100':1,
     'id|1-100':1,
     'type|1':1
     }]
     });

  import build_noumenom from '../../build_noumenom.vue';
    export default{
        components:{
            build_noumenom
        },

        data(){
            return {
                recent_noumenoms: []
            }
        },
        created(){
            this.HttpJson('/ancient_books/get_recent_noumenons.action','get',{},this.successRecent,this.failRecent);
        },
        methods: {
            successRecent(response){
                console.log("最近编辑请求成功！");
                if (response.body.noumenons.length === 0) {
                    console.log("没有返回数组！");
                } else {
                    for (let i = 0; i < response.body.noumenons.length; i++) {
                        this.recent_noumenoms[i]=response.body.noumenons[i];
                    }
                }
            },

            failRecent(){
                console.log("最近编辑请求失败");
            },

            goNoumenom(p){
                console.log(p);
                let i = this.recent_noumenoms[p].type;
                if( i === 1){
                    this.$router.push({path:'/charater_noumenon_check'});
                }else if(i === 2){

                } else if(i === 3){

                }else if(i === 4){

                }else if(i === 5){

                }else if(i === 6){

                }else if(i === 7){

                }
            }
        }
    }

</script>

<style>
    .noumenom-body{
        padding-left: 20px;
        padding-right: 20px;
    }

    .noumenom-header{
        padding: 30px 0 5px 0;
        margin: 0 0 30px 0;
        border-bottom: 2px solid black;
    }

    .noumenom-title{
        margin:0;
        display:inline-block;
    }


    .noumenom-row{
        margin-bottom: 15px;
        background-color: transparent;
        border-color: transparent;
        font-size: 15px;
        width:300px;
        text-align: left;
    }

</style>