<template>
        <modal :show_modal="this.time_modal" v-on:fireclose="this.close" v-model="this.add">
            <div slot="header" class="zxw-time-header">
                <span>时间本体</span>
            </div>

            <div slot="body" class="zxw-time-body">

                <label class="zxw-time-label">朝代：</label>
                <select id="chaodai" class="zxw-select zxw-time-select" v-model="selected_1" @change="get_year()">
                    <option v-for="item in menu_data" v-bind:value="item.item_1_id"> {{item.chinese_name}}</option>
                </select>

                <label>年号：</label>
                <select id="nianhao" class="zxw-select zxw-time-select" v-model="selected_2">
                    <option v-for="item in year_data" v-bind:value="item.item_2_id">{{item.chinese_name}}</option>
                </select>

                <label>年份：</label>
                <input type="text" class="zxw-time-select zxw-character-input" v-model="year_number">

                <label>月：</label>
                <select id="yue" class="zxw-select zxw-time-select" v-model="selected_3">
                    <option v-for="item in month_data" v-bind:value="item.item_1_id">{{item.chinese_name}}</option>
                </select>

                <label>日：</label>
                <select id="ri" class="zxw-select zxw-time-select" v-model="selected_4">
                    <option v-for="item in day_data" v-bind:value="item.item_1_id">{{item.chinese_name}}</option>
                </select>

                <button class="zxw-time-add" @click="add_time()">添加</button>
            </div>
        </modal>
</template>

<script>
    /*let Mock = require('mockjs');
    Mock.mock('/ancient_books/get_menu_items.action?model_id=1&&item_1_id=0&&item_2_id=0','get', {
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

    Mock.mock('/ancient_books/get_menu_items.action?model_id=1&&item_1_id=1&&item_2_id=0','get', {
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
        "id|100":100
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
              //ban:true,
              selected_1:null,
              selected_2:null,
              selected_3:null,
              selected_4:null,
              year_number:'',
              menu_url:'/ancient_books/get_menu_items.action',
              time_url:'/ancient_books/get_time_by_chinese_name.action',
              menu_data:[],
              year_data:[],
              month_data:[],
              day_data:[],
              time_object:{},
              time_data:[]
          }
        },

        methods:{
            close(){
                this.$emit('close_modal',close);
                this.time_data.splice(0,this.time_data.length);
                this.year_number='';
                console.log("time_data:"+this.time_data);
            },

            /*朝代下拉框*/
            success_menu(response){
                for(let i = 0; i < response.body.g.length; i++){
                    this.menu_data.push({
                        item_1_id:response.body.g[i].item_1_id,
                        chinese_name:response.body.g[i].chinese_name
                    })
                }
                console.log(JSON.stringify(this.menu_data));
            },

            fail_menu(){
                console.log("朝代下拉框获取失败");
            },

            get_menu(){
                let new_menu_url = this.menu_url+'?model_id=1&&item_1_id=0&&item_2_id=0';//朝代总的model_id
                let menu_object = {};
                this.http_json(new_menu_url,'get',menu_object,this.success_menu,this.fail_menu);
            },

            /*年号下拉框*/
            success_year(response){
                for(let i = 0; i < response.body.length; i++){
                    this.year_data.push({
                        item_2_id:response.body.item_2_id,
                        chinese_name:response.body.chinese_name
                    })
                }
                console.log(JSON.stringify(this.year_data));
            },

            fail_year(){
                console.log("获取年份失败");
            },

            get_year(){
                //朝代的ID
                let new_year_url = this.menu_url+'?model_id=1'+'&&item_1_id='+this.selected_1+'&&item_2_id=0';
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
            },

            fail_month(response){
                console.log("获取月份失败");
            },

            get_month(){
                //月份ID
                let new_month_url = this.menu_url+'?model_id=2&&item_1_id=0&&item_2_id=0';
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
            },

            fail_day(response){
                console.log("获取日期失败");
            },

            get_day(){
                //日期ID
                let new_day_url = this.menu_url+'?model_id=3&&item_1_id=0&&item_2_id=0';
                let day_object = {};
                this.http_json(new_day_url,'get',day_object,this.success_day,this.fail_day);
            },

            /*关联时间本体*/
            success_time(response){
                this.time_data.push({
                    time_id:response.body.id,
                    content:this.time_object.standard_name
                });
                this.$emit('success_time',this.time_data);
                this.time_data.splice(0,this.time_data.length);
                this.year_number='';
                console.log("time_data:"+this.time_data);
            },

            fail_time(){
                console.log("添加时间本体成功");
            },

            add_time(){
                if(this.selected_1 !== 0){
                    //this.ban = true;
                    this.time_object.standard_name = this.selected_1+this.selected_2+this.year_number+this.selected_3+this.selected_4;
                    this.time_object.chaodai = this.selected_1;
                    this.time_object.nianhao = this.selected_2;
                    this.time_object.nianfen = this.year_number;
                    this.time_object.yue = this.selected_3;
                    this.time_object.ri = this.selected_4;
                    console.log(JSON.stringify(this.time_object));
                    this.http_json(this.time_url,'post',this.time_object,this.success_time,this.fail_time);
                }
            }
        },

        computed:{
            add(){
                return this.time_modal;
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
        background-size: 100%;
        background-color: transparent;
        width:400px;
        height:50px;
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
        margin:24px 0 0 0;
    }

</style>