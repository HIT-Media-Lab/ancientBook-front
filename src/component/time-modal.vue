<template>
        <modal :show_modal="this.time_modal" v-on:fireclose="this.close" class="zxw-time-modal">
            <div slot="header" class="zxw-time-header">
                <span>时间本体</span>
            </div>

            <div slot="body" class="zxw-time-body">
                <label class="zxw-time-label zxw-font-sixteen">朝代：</label>
                <select  class="zxw-time-select" v-bind:class="{'zxw-input-chinese':show_chaodai}" v-model="selected_1" @change="get_year()">
                    <option v-for="item in menu_data" v-bind:value="{id:item.item_1_id,option:item.chinese_name}"> {{item.chinese_name}}</option>
                </select>

                <label class="zxw-font-sixteen">年号：</label>
                <select class="zxw-time-select" v-bind:class="{'zxw-input-chinese':show_nianhao}" v-model="selected_2" @click="chaodai_tip()" @change="nianhao_tip()">
                    <option v-for="item in year_data" v-bind:value="{id:item.item_2_id,option:item.chinese_name}">{{item.chinese_name}}</option>
                </select>

                <label class="zxw-font-sixteen">年份：</label>
                <input type="text" id="year" class="zxw-time-select zxw-time-input" v-bind:class="{'zxw-input-chinese':show_year}" v-model="year_number" @focus="nianhao_tip()" v-bind="get_month">

                <label class="zxw-font-sixteen">月：</label>
                <select  class="zxw-time-select" v-model="selected_3" v-bind:class="{'zxw-input-chinese':show_month}" @click="year_tip()" @change="get_day()">
                    <option v-for="item in month_data" v-bind:value="{id:item.item_1_id,option:item.chinese_name}">{{item.chinese_name}}</option>
                </select>

                <label class="zxw-font-sixteen">日：</label>
                <select  class="zxw-time-select" v-model="selected_4" @click="month_tip()">
                    <option v-for="item in day_data" v-bind:value="{id:item.item_1_id,option:item.chinese_name}">{{item.chinese_name}}</option>
                </select>

                <button class="zxw-time-add" v-bind:disabled="selected_1.option === ''" @click="add_time()">添加</button>
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
                "item_2_id|1": 1,
                "chinese_name": "天宝"
            },
            {"model_id|1": 1,
                "item_2_id|2": 2,
                "chinese_name": "元包"
            },
            {"model_id|1": 1,
                "item_2_id|3": 3,
                "chinese_name": "明朝"
            },
            {"model_id|1": 1,
                "item_2_id|4": 4,
                "chinese_name": "-"
            }
        ]
    });

    Mock.mock('/ancient_books/get_menu_items.action?model_id=25&&item_1_id=2&&item_2_id=0','get', {
        "g":[
            {"model_id|1": 1,
                "item_2_id|1": 1,
                "chinese_name": "好"
            },
            {"model_id|1": 1,
                "item_2_id|2": 2,
                "chinese_name": "的"
            },
            {"model_id|1": 1,
                "item_2_id|3": 3,
                "chinese_name": "好"
            }
        ]
    });

    Mock.mock('/ancient_books/get_menu_items.action?model_id=26&&item_1_id=0&&item_2_id=0','get', {
        "g":[
            {"model_id|1": 1,
                "item_1_id|1": 1,
                "chinese_name": "一月"
            },
            {"model_id|1": 1,
                "item_1_id|2": 2,
                "chinese_name": "二月"
            },
            {"model_id|1": 1,
                "item_1_id|3": 3,
                "chinese_name": "三月"
            },
            {"model_id|1": 1,
                "item_1_id|4": 3,
                "chinese_name": "-"
            }
        ]
    });

    Mock.mock('/ancient_books/get_menu_items.action?model_id=27&&item_1_id=0&&item_2_id=0','get', {
        "g":[
            {"model_id|1": 1,
                "item_1_id|1": 1,
                "chinese_name": "1"
            },
            {"model_id|1": 1,
                "item_1_id|2": 2,
                "chinese_name": "2"
            },
            {"model_id|1": 1,
                "item_1_id|3": 3,
                "chinese_name": "3"
            },
            {"model_id|1": 1,
                "item_1_id|4": 3,
                "chinese_name": "-"
            }
        ]
    });

    Mock.mock('/ancient_books/get_time_by_chinese_name.action','post', {
        "status|200":200,
        "result|1":1,
        "id|100":100,
    });

     Mock.mock('/ancient_books/getToken.action','get', {
        "token|100":100,
    });*/

    import modal from '../component/modal.vue'
    export default{
        created(){
            this.get_menu();
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
              time_data:{},
              time_object:{},
              chaodai_data:'',
              show_chaodai:false,
              show_nianhao:false,
              show_year:false,
              show_month:false
          }
        },

        watch:{
            'time_modal':function(){
                if(this.time_modal === false){
                    this.selected_1.option = '';
                    this.selected_1.id = 0;
                    this.selected_2.option = '';
                    this.selected_2.id = 0;
                    this.selected_3.option = '';
                    this.selected_3.id = 0;
                    this.selected_4.option = '';
                    this.selected_4.id = 0;
                    this.year_number = '';
                    this.year_data.splice(0,this.year_data.length);
                    this.time_object = {};
                } else{
                    this.$store.commit('change_fork',true);
                }
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
                if(this.selected_1.option !== ''){
                    this.show_chaodai=false;
                    this.year_data.splice(0,this.year_data.length);
                    let new_year_url = this.menu_url+'?model_id=25'+'&&item_1_id='+this.selected_1.id+'&&item_2_id=0';
                    let year_object = {};
                    this.http_json(new_year_url,'get',year_object,this.success_year,this.fail_year)
                }
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
                if(this.selected_3.option !== ''&& this.day_data.length===0){
                    //日期id
                    let new_day_url = this.menu_url+'?model_id=27&&item_1_id=0&&item_2_id=0';
                    let day_object = {};
                    this.http_json(new_day_url,'get',day_object,this.success_day,this.fail_day);
                }else if(this.selected_3.option === '-'){
                    this.selected_4.id=0;
                    this.selected_4.option='';
                    this.day_data.splice(0,this.day_data.length);
                }
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
                let time_object = {};
                if(this.selected_3.option === '-'){
                    this.selected_3.option = '';
                    this.selected_3.id = 0;
                    this.month_data.splice(0,this.month_data.length);
                }

                if(this.selected_4.option === '-'){
                    this.selected_4.option = '';
                    this.selected_4.id = 0;
                    this.day_data.splice(0,this.day_data.length);
                }

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
                    this.$store.commit("post_chaodai_data",this.selected_1.option);
                    console.log('time_object:'+JSON.stringify(this.time_object));
                    this.http_json(this.time_url,'post',this.time_object,this.success_time,this.fail_time);
                }
            },

            chaodai_tip(){
                if(this.selected_1.option ===''){
                    this.show_chaodai=true;
                }else{
                    this.show_chaodai=false;
                }
            },

            nianhao_tip(){
                if(this.selected_2.option ===''){
                    this.show_nianhao=true;
                    document.getElementById("year").disabled=true;
                }else{
                    this.show_nianhao=false;
                    document.getElementById("year").disabled=false;
                }
            },

            year_tip(){
                if(this.year_number ===''){
                    this.show_year=true;
                }else{
                    this.show_year=false;
                }
            },

            month_tip(){
                if(this.selected_3.option ===''){
                    this.show_month=true;
                }else{
                    this.show_month=false;
                }
            }
        },

        computed:{
            get_month(){
                if(this.year_number ===''){
                    this.selected_3.option = '';
                    this.selected_3.id = 0;
                    this.month_data.splice(0,this.month_data.length);
                    this.selected_4.option = '';
                    this.selected_4.id = 0;
                    this.day_data.splice(0,this.day_data.length);
                }else if(this.year_number !== ''&&this.month_data.length === 0){
                    this.show_year=false;
                    let new_month_url = this.menu_url+'?model_id=26&&item_1_id=0&&item_2_id=0';
                    let month_object = {};
                    this.http_json(new_month_url,'get',month_object,this.success_month,this.fail_month);
                }
            }
        }
    }
</script>

<style>
    .zxw-time-add{
        background-image: url("../assets/img/button/create-next-step.png");
        background-color: transparent;
        background-size: contain;
        background-repeat: no-repeat;
        background-position: center;
        border: none;
        width:60px;
        height:30px;
        font-size: 16px;
        color:gainsboro;
    }

    .zxw-time-header{
        color:gainsboro;
        font-size: 18px;
        text-align: center;
        background-image: url("../assets/img/no-use-picture/modal-header.png");
        background-size: contain;
        background-position: center;
        background-color: transparent;
        width:800px;
        height:50px;
        padding:10px 0 0 0;
    }

    .zxw-time-select{
        width:70px;
        height:25px;
        border: 2px solid;
        background-color: transparent;
        font-size: 14px;
        margin:0 10px 0 0;
    }

    .zxw-time-label{
        margin:0 0 0 10px;
    }

    .zxw-time-body{
        margin-top:24px;
        width:800px;
        height:85px;
    }

    .zxw-time-modal{
        width:800px;
        height:150px;
        margin:auto;
    }

    .zxw-time-input{
        display:inline-block;
        border: 2px solid black;
        background-color: transparent;
        height:25px;
        width:70px;
        text-align: left;
        padding-left:10px;
    }

    .zxw-font-sixteen{
        font-size: 16px;
    }
</style>