<template>
    <div class="noumenom-body">
        <div class="noumenom-header">
            <h5 class="noumenom-title">最近</h5>
            <build_noumenom></build_noumenom>
        </div>

        <div v-for="(item,index) in recent_noumenons">
            <p class="noumenom-row">{{item}}</p>
        </div>
    </div>
</template>

<script>
  /* let Mock = require('mockjs');

     //显示用户列表
     Mock.mock('/ancient_books/get_recent_noumenons.action?undefined=undefined','get',{
     "noumenons|10":[{
     'standard_name|1-100':1,
     'id|1-100':1,
     'type|1-100':1
     }]
     });*/

  import build_noumenom from '../../build_noumenom.vue';
    export default{
        components:{
            build_noumenom
        },

        data(){
            return {
                recent_noumenons: []
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
                        this.recent_noumenons[i] = response.body.noumenons[i].standard_name;
                        console.log(this.recent_noumenons[i]);
                    }
                }
            },

            failRecent(){
                console.log("最近编辑请求失败");
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
        margin-bottom: 25px;
    }

</style>