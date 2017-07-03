<template>
        <modal :show_modal="this.time_modal" v-on:fireclose="this.close" class="zxw-time-modal">
            <div slot="header" class="zxw-time-header">
                <span>时间本体</span>
            </div>

            <div slot="body" class="zxw-time-body">
                <label class="zxw-time-label">朝代：</label>
                <select  class="zxw-select zxw-time-select" v-model="selected_1" @change="get_year()">
                    <option v-for="item in menu_data" v-bind:value="{id:item.item_1_id,option:item.chinese_name}"> {{item.chinese_name}}</option>
                </select>

                <label>年号：</label>
                <select class="zxw-select zxw-time-select" v-model="selected_2">
                    <option v-for="item in year_data" v-bind:value="{id:item.item_2_id,option:item.chinese_name}">{{item.chinese_name}}</option>
                </select>

                <label>年份：</label>
                <input type="text" class="zxw-time-select zxw-character-input" v-model="year_number" v-bind:disabled="selected_2.option === ''">

                <label>月：</label>
                <select  class="zxw-select zxw-time-select" v-model="selected_3">
                    <option v-for="item in month_data" v-bind:value="{id:item.item_1_id,option:item.chinese_name}" v-bind:disabled="year_number === ''">{{item.chinese_name}}</option>
                </select>

                <label>日：</label>
                <select  class="zxw-select zxw-time-select" v-model="selected_4">
                    <option v-for="item in day_data" v-bind:value="{id:item.item_1_id,option:item.chinese_name}" v-bind:disabled="selected_3.option === ''">{{item.chinese_name}}</option>
                </select>

                <button class="zxw-time-add" @click="add_time()">添加</button>
            </div>
        </modal>
</template>

<script>
    /*let Mock = require('mockjs');
    Mock.mock('/ancient_books/get_menu_items.action?model_id=25&&item_1_id=0&&item_2_id=0','get', {
        "g":[
            {"model_id|1": 1,
             "item_1_id|1": 1,
             "chinese_name": "宋朝"
            },
            {"model_id|1": 1,
                "item_1_id|2": 2,
                "chinese_name": "元朝"
            },
            {"model_id|1": 1,
                "item_1_id|3": 3,
                "chinese_name": "明朝"
            }
        ]
    });

    Mock.mock('/ancient_books/get_menu_items.action?model_id=25&&item_1_id=1&&item_2_id=0','get', {
        "g":[
            {"model_id|1": 1,
                "item_1_id|1": 1,
                "item_2_id|2":2,
                "chinese_name": "gy"
            },
            {
                "model_id|1": 1,
                "item_1_id|1": 1,
                "item_2_id|3": 3,
                "chinese_name": "-"
            },
            {
                "model_id|1": 1,
                "item_1_id|1": 1,
                "item_2_id|4": 4,
                "chinese_name": "xy"
            }
        ]
    });

    Mock.mock('/ancient_books/get_menu_items.action?model_id=26&&item_1_id=1&&item_2_id=0','get', {
    "":[{"model_id|1": 1,
                "item_1_id|0": 0,
                "item_2_id|1": 1,
                "chinese_name": "宋朝hh"},
        {"model_id|1": 1,
            "item_1_id|0": 0,
            "item_2_id|2": 2,
            "chinese_name": "宋朝hh"}]
    });



    Mock.mock('/ancient_books/get_time_by_chinese_name.action','post', {
        "status|200":200,
        "id|100":100,
    });

    Mock.mock('/ancient_books/getToken.action','get', {
        "token|100":100,
    });*/

    import modal from '../component/modal.vue'
    export default{
        created(){
            this.get_menu();
            this.get_month();
            this.get_day();
        },
        components:{
            modal
        },

        props:['time_modal'],

        data(){
          return{
              selected_1:{
                  id:0,
                  option:''
              },
              selected_2:{
                  id:0,
                  option:''
              },
              selected_3:{
                  id:0,
                  option:''
              },
              selected_4:{
                  id:0,
                  option:''
              },
              year_number:'',
              menu_url:'/ancient_books/get_menu_items.action',
              time_url:'/ancient_books/get_time_by_chinese_name.action',
              menu_data:[],
              year_data:[],
              month_data:[],
              day_data:[],
              time_object:{},
              time_data:{}
          }
        },

        methods:{
            close(){
                this.$emit('close_modal',close);
            },

            /*朝代下拉框*/
            success_menu(response){
                for(let i = 0; i < response.body.length; i++){
                    this.menu_data.push({
                        item_1_id:response.body[i].item_1_id,
                        chinese_name:response.body[i].chinese_name,
                    })
                }
                console.log('this.menu_data:'+JSON.stringify(this.menu_data));
            },

            fail_menu(){
                console.log("朝代下拉框获取失败");
            },

            get_menu(){
                let new_menu_url = this.menu_url+'?model_id=25&&item_1_id=0&&item_2_id=0';
                let menu_object = {};
                this.http_json(new_menu_url,'get',menu_object,this.success_menu,this.fail_menu);
            },

            /*年号下拉框*/
            success_year(response){
                for(let i = 0; i < response.body.length; i++){
                    this.year_data.push({
                        item_2_id:response.body[i].item_2_id,
                        chinese_name:response.body[i].chinese_name
                    })
                }
                console.log('this.year_data:'+JSON.stringify(this.year_data));
            },

            fail_year(){
                console.log("获取年份失败");
            },

            get_year(){
                let new_year_url = this.menu_url+'?model_id=25'+'&&item_1_id='+this.selected_1.id+'&&item_2_id=0';
                let year_object = {};
                this.http_json(new_year_url,'get',year_object,this.success_year,this.fail_year)
            },

            /*月份下拉框*/
            success_month(response){
                for(let i = 0; i <response.body.length; i++){
                    this.month_data.push({
                        item_1_id:response.body[i].item_1_id,
                        chinese_name:response.body[i].chinese_name
                    })
                }
                console.log('this.month_data:'+JSON.stringify(this.month_data));
            },

            fail_month(response){
                console.log("获取月份失败");
            },

            get_month(){
                let new_month_url = this.menu_url+'?model_id=26&&item_1_id=0&&item_2_id=0';
                let month_object = {};
                this.http_json(new_month_url,'get',month_object,this.success_month,this.fail_month);
            },

            /*日期下拉框*/
            success_day(response){
                for(let i = 0; i <response.body.length; i++){
                    this.day_data.push({
                        item_1_id:response.body[i].item_1_id,
                        chinese_name:response.body[i].chinese_name
                    })
                }
                console.log('this.day_data:'+JSON.stringify(this.day_data));
            },

            fail_day(response){
                console.log("获取日期失败");
            },

            get_day(){
                //日期ID
                let new_day_url = this.menu_url+'?model_id=27&&item_1_id=0&&item_2_id=0';
                let day_object = {};
                this.http_json(new_day_url,'get',day_object,this.success_day,this.fail_day);
            },

            /*关联时间本体*/
            success_time(response){
                this.time_data.time_id = response.body.id;
                this.time_data.standard_name = this.time_object.standard_name;
                this.$emit('success_time',this.time_data);
                console.log('this.time_data:'+JSON.stringify(this.time_data));
             },

            fail_time(){
                console.log("关联时间本体失败");
            },

            add_time(){
                if(this.selected_1.option !== ''){
                    if(this.selected_2.option === '-'){
                        this.time_object.standard_name = this.selected_1.option+this.year_number+this.selected_3.option+this.selected_4.option;
                    } else {
                        this.time_object.standard_name = this.selected_1.option+this.selected_2.option+this.year_number+this.selected_3.option+this.selected_4.option;
                    }
                    this.time_object.chaodai = this.selected_1.id;
                    this.time_object.nianhao = this.selected_2.id;
                    this.time_object.nianfen = this.year_number;
                    this.time_object.yue = this.selected_3.id;
                    this.time_object.ri = this.selected_4.id;
                    console.log('this.time_object:'+JSON.stringify( this.time_object));
                    this.http_json(this.time_url,'post',this.time_object,this.success_time,this.fail_time);
                }
            }
        }
    }
</script>

<style>
    .zxw-time-add{
        background-image: url("../assets/img/create-next-step.png");
        background-color: transparent;
        background-size: 100%;
        border: none;
        width:70px;
        height:30px;
        color:gainsboro;
    }

    .zxw-time-header{
        color:gainsboro;
        font-size: 18px;
        text-align: center;
        background-image: url("../assets/img/弹框标题.png");
        background-size: contain;
        background-color: transparent;
        width:750px;
        height:40px;
        padding:10px 0 0 0;
    }

    .zxw-time-select{
        font-size: 10px;
        width:50px;
        height:20px;
        margin:0 20px 0 0;
    }

    .zxw-time-label{
        margin:0 0 0 10px;
    }

    .zxw-time-body{
        margin:24px auto;
        width:700px;
    }

    .zxw-time-modal{
        width:750px;
        height:150px;
        background-repeat: no-repeat;
        background-size: 750px 150px;
        margin:auto;
    }
</style>