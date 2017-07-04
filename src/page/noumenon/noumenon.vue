<template>
    <div>
        <noumenon_title  :title="this.title">
            <build_button slot="children"></build_button>
        </noumenon_title>

        <button class="zxwnoumenon-row" v-for="(item,index) in recent_noumenons" @click="go_noumenom(index)">{{item.standard_name}}</button>
    </div>
</template>
<script>
    /*  let Mock = require('mockjs');

     //显示用户列表
     Mock.mock('/ancient_books/get_recent_noumenons.action','get', {
         "status": 200,
         "noumenons|10": [{
             'standard_name': '@FIRST',
             'id|1': 1,
             'type|1': 1
         }]
     });*/

    import noumenon_title from '../../component/noumenon-title.vue';
    import build_button from '../../component/build-button.vue'
    export default{
        components:{
            noumenon_title,
            build_button
        },
        data(){
            return {
                title:'最近',
                recent_noumenons: [],   //本体标题信息
            }
        },
        created(){
            this.http_json('/ancient_books/get_recent_noumenons.action','get',{},this.success_recent,this.fail_recent);
        },
        methods: {
            success_recent(response){
                console.log("最近编辑请求成功！");
                for (let i = 0; i < response.body.noumenons.length; i++) {
                    this.recent_noumenons.push({
                        standard_name:response.body.noumenons[i].standard_name,
                        id:response.body.noumenons[i].id,
                        type:response.body.noumenons[i].type
                    });

                    if(response.body.noumenons[i].type === 1){

                        this.recent_noumenons[i].standard_name = this.recent_noumenons[i].standard_name+'【人物】';
                    } else if (response.body.noumenons[i].type === 2){

                        this.recent_noumenons[i].standard_name = this.recent_noumenons[i].standard_name+'【文献】';
                    } else if (response.body.noumenons[i].type === 3){

                        this.recent_noumenons[i].standard_name = this.recent_noumenons[i].standard_name+'【术语】';
                    } else if (response.body.noumenons[i].type === 4){

                        this.recent_noumenons[i].standard_name = this.recent_noumenons[i].standard_name+'【时间】';
                    } else if (response.body.noumenons[i].type === 5){

                        this.recent_noumenons[i].standard_name = this.recent_noumenons[i].standard_name+'【职官】';
                    } else if (response.body.noumenons[i].type === 6){

                        this.recent_noumenons[i].standard_name = this.recent_noumenons[i].standard_name+'【机构】';
                    } else if (response.body.noumenons[i].type === 7){

                        this.recent_noumenons[i].standard_name = this.recent_noumenons[i].standard_name+'【地名】';
                    }
                }
            },

            fail_recent(response){
                console.log("没有返回数组！");
            },

            go_noumenom(p){
                console.log(p);
                let i = this.recent_noumenons[p].type;
                if ( i === 1){
                    this.$router.push({name:'char_detail',params:{nouId:this.recent_noumenons[p].id}});

                } else if (i === 2){
                    this.$router.push({name:'lit_detail',params:{id:this.recent_noumenons[p].id}});

                } else if (i === 3){
                    this.$router.push({name:'terms_detail',params:{id:this.recent_noumenons[p].id}});

                } else if (i === 4){
                    //没有分好路由
                    this.$router.push({name:'time',params:{id:this.recent_noumenons[p].id}});

                } else if (i === 5){
                    this.$router.push({name:'off_detail',params:{id:this.recent_noumenons[p].id}});

                } else if (i === 6){
                    this.$router.push({name:'ins_detail',params:{id:this.recent_noumenons[p].id}});

                } else if (i === 7){
                    this.$router.push({name:'pla_detail',params:{id:this.recent_noumenons[p].id}});

                }
            }
        }
    }
</script>
<style>

    .zxwnoumenon-row{
        display:block;
        margin:20px 0 25px 5%;
        font-size: 14px;
        font-weight: bold;
    }
</style>