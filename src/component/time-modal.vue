<template>
        <modal :show_modal="this.time_modal" v-on:fireclose="this.close" v-model="this.add">
            <div slot="header" class="zxw-time-header">
                <span>时间本体</span>
            </div>

            <div slot="body" class="zxw-time-body">
                <label class="zxw-time-label">朝代：</label>

                <select class="zxw-select zxw-time-select" v-model="this.selected" @focus="get_menu()">
                    <option v-for="(item,index) in menu_data">{{item.chinese_name}}</option>
                </select>

                <label>年号：</label>
                <select class="zxw-select zxw-time-select" v-model="this.selected">
                    <option>人物</option>
                    <option>文献</option>
                    <option>术语</option>
                    <option>时间</option>
                    <option>机构</option>
                    <option>地名</option>
                </select>

                <label>年份：</label>
                <input type="text" class="zxw-time-select zxw-character-input">

                <label>月：</label>
                <select class="zxw-select zxw-time-select" v-model="this.selected">
                    <option>人物</option>
                    <option>文献</option>
                    <option>术语</option>
                    <option>时间</option>
                    <option>机构</option>
                    <option>地名</option>
                </select>

                <label>日：</label>
                <select class="zxw-select zxw-time-select" v-model="this.selected">
                    <option>人物</option>
                    <option>文献</option>
                    <option>术语</option>
                    <option>时间</option>
                    <option>机构</option>
                    <option>地名</option>
                </select>

                <button class="zxw-time-add">添加</button>
            </div>
        </modal>
</template>

<script>
    let Mock = require('mockjs');
    //显示用户列表
    Mock.mock('/ancient_books/get_menu_items.action?model_id=1','get', {
        "relations":[
            {"model_id|1": 1,
             "item_1_id|1-1000": 2,
             "chinese_name": "宋朝"
            },
            {"model_id|1": 1,
                "item_1_id|1-1000": 2,
                "chinese_name": "宋朝"
            },
            {"model_id|1": 1,
                "item_1_id|1-1000": 2,
                "chinese_name": "宋朝"
            }
        ]
    });
    import modal from '../component/modal.vue'
    export default{
        components:{
            modal
        },

        props:['time_modal'],

        data(){
          return{
              selected:null,
              menu_url:'/ancient_books/get_menu_items.action',
              menu_object:{},
              menu_data:[]
          }
        },

        methods:{
            close(){
                this.time_modal=false;
            },

            /*朝代下拉框*/
            success_menu(response){
                for(let i = 0; i < response.body.relations.length; i++){
                    this.menu_data.push({
                        item_1_id:response.body.relations[i].item_1_id,
                        chinese_name:response.body.relations[i].chinese_name
                    })
                }
                console.log(JSON.stringify(this.menu_data));
            },

            fail_menu(){
                console.log("朝代下拉框获取失败");
            },

            get_menu(){
                let new_menu_url = this.menu_url+'?model_id=1';
                this.http_json(new_menu_url,'get',this.menu_object,this.success_menu,this.fail_menu);
                console.log("hhh7777");
            }
        },

        computed:{
            add(){
                console.log("ccc");
                return this.time_modal;
            }
        }
    }
</script>

<style>
    .zxw-time-add{
        background-image: url("../assets/img/create-next-step.png");
        background-size: cover;
        width:80px;
        height:25px;
        color:gainsboro;
    }

    .zxw-time-header{
        color:gainsboro;
        font-size: 18px;
        text-align: center;
        background-image: url("../assets/img/弹框标题.png");
        width:400px;
        height:50px;
        padding:10px 0 0 0;
    }

    .zxw-time-select{
        width:40px;
        height:20px;
        margin:0 20px 0 0;
    }

    .zxw-time-label{
        margin:0 0 0 10px;
    }

    .zxw-time-body{
        margin:24px 0 0 0;
    }
</style>