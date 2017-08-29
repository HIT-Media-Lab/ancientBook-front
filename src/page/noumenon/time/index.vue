<template>
    <div>
        <!--时间本体标题-->
        <noumenon_title :title="this.title">
            <build_button slot="children"></build_button>
        </noumenon_title>
        <div style="margin: 20px 0 0 60px;">
            <select class="zxw-time-select-index zxw-time-type zxw-time-index-margin">
                <option style="color:black">中历</option>
            </select>

                <label>朝代:</label>
                <select class="zxw-time-select-index zxw-time-index-margin" v-model="selected_chaodai" @change="get_nianhao_type()">
                    <option v-for="item in chaodai_type" v-bind:value="{item_1_id:item.item_1_id,chinese_name:item.chinese_name}">{{item.chinese_name}}</option>
                </select>

                <label>年号:</label>
                <select class="zxw-time-select-index zxw-time-index-margin" v-model="selected_nianhao" v-bind:disabled="selected_chaodai.chinese_name === ''">
                    <option v-for="item in nianhao_type" v-bind:value="{item_2_id:item.item_2_id,chinese_name:item.chinese_name}">{{item.chinese_name}}</option>
                </select>

                <label>年份:</label>
                <input class="zxw-time-select-index zxw-time-index-margin" type="text" v-bind:disabled="selected_nianhao.chinese_name === ''" v-model="year">

                <label>月:</label>
                <select class="zxw-time-select-index zxw-time-index-margin" v-model="selected_month" v-bind:disabled="year === ''">
                    <option v-for="item in month_type" v-bind:value="{item_1_id:item.item_1_id,chinese_name:item.chinese_name}">{{item.chinese_name}}</option>
                </select>

                <label>日:</label>
                <select class="zxw-time-select-index" v-model="selected_day" v-bind:disabled="selected_month.chinese_name === ''">
                    <option v-for="item in day_type" v-bind:value="{item_1_id:item.item_1_id,chinese_name:item.chinese_name}">{{item.chinese_name}}</option>
                </select>

                <button class="zxw-search-time" v-bind:disabled="selected_chaodai.chinese_name === ''" @click="search_zhongli()">查找</button>


            <template v-if="standard_id === ''">
                <p style="margin:50px 0 0 150px; font-weight: bold">您可输入"朝代"、"朝代-年号-年份"、"朝代-年号-年份-月"或</p>
                <p style="margin:0 0 0 250px;font-weight: bold">"朝代-年号-年份-月-日"查找时间本体</p>
            </template>

           <button style="margin:20px 0 0 0; font-weight: bold;display: block"  v-model="standard_name" @click="go_time()" v-if="standard_id !== ''">{{standard_name}}</button>

        </div>
    </div>
</template>

<script>

    /*let Mock = require('mockjs');
    Mock.mock('/ancient_books/get_time_by_chinese_name.action','post', {
        "status|200":200,
        "result|1":1,
        "id|7789":7789
    });

    Mock.mock('/ancient_books/getToken.action','get', {
        "token|100":100,
    });*/

    import noumenon_title from '../../../component/noumenon-title.vue';
    import build_button from '../../../component/build-button.vue';
    export default{
        components:{
            noumenon_title,
            build_button
        },

        created(){
            this.get_chaodai_type();
            this.get_month_type();
            this.get_day_type();
        },

        data(){
            return{
                title:'时间本体(公元前1030年 至 公元1916年)',
                standard_name:'',
                standard_id:'',
                menu_url:'/ancient_books/get_menu_items.action',
                zhongli_url:'/ancient_books/get_time_by_chinese_name.action',
                selected_chaodai:{
                    item_1_id:0,
                    chinese_name:''
                },
                selected_nianhao:{
                    item_2_id:0,
                    chinese_name:''
                },
                selected_month:{
                    item_1_id:0,
                    chinese_name:''
                },
                selected_day:{
                    item_1_id:0,
                    chinese_name:''
                },
                chaodai_type:[],
                nianhao_type:[],
                month_type:[],
                day_type:[],
                year:'',
                g_year:''

            }
        },

        methods:{
            /*朝代类型下拉框*/
            get_chaodai_type(){
                let object = {};
                let new_url = this.menu_url+'?model_id=25&&item_1_id=0&&item_2_id=0';
                this.http_json(new_url,'get',object,this.success_chaodai_type,this.fail_chaodai_type);
            },

            success_chaodai_type(response){
                for(let i = 0;i < response.body.length;i++){
                    this.chaodai_type.push({
                        item_1_id:response.body[i].item_1_id,
                        chinese_name:response.body[i].chinese_name
                    })
                }
            },

            fail_chaodai_type(response){
                console.log("获取朝代失败");
            },

            /*年号下拉框*/
            get_nianhao_type(){
                if(this.selected_chaodai.chinese_name !== ""){
                    this.nianhao_type.splice(0,this.nianhao_type.length);
                    let object = {};
                    let new_url = this.menu_url+'?model_id=25&&item_1_id='+this.selected_chaodai.item_1_id+'&&item_2_id=0';
                    this.http_json(new_url,'get',object,this.success_nianhao_type,this.fail_nianhao_type);
                }
            },

            success_nianhao_type(response){
                for(let i = 0;i < response.body.length;i++){
                    this.nianhao_type.push({
                        item_2_id:response.body[i].item_2_id,
                        chinese_name:response.body[i].chinese_name
                    })
                }
                console.log('nianhao: '+JSON.stringify(this.nianhao_type));
            },

            fail_nianhao_type(response){
                console.log("获取年号失败");
            },

            /*中历月份下拉框*/
            get_month_type(){
                let object = {};
                let new_url = this.menu_url+'?model_id=26&&item_1_id=0&&item_2_id=0';
                this.http_json(new_url,'get',object,this.success_month_type,this.fail_month_type);
            },

            success_month_type(response){
                for(let i = 0;i < response.body.length;i++){
                    this.month_type.push({
                        item_1_id:response.body[i].item_1_id,
                        chinese_name:response.body[i].chinese_name
                    })
                }
            },

            fail_month_type(response){
                console.log("获取月份失败");
            },

            /*中历日下拉框*/
            get_day_type(){
                let object = {};
                let new_url = this.menu_url+'?model_id=27&&item_1_id=0&&item_2_id=0';
                this.http_json(new_url,'get',object,this.success_day_type,this.fail_day_type);
            },

            success_day_type(response){
                for(let i = 0;i < response.body.length;i++){
                    this.day_type.push({
                        item_1_id:response.body[i].item_1_id,
                        chinese_name:response.body[i].chinese_name
                    })
                }
            },

            fail_day_type(response){
                console.log("获取日期失败");
            },

            /*中历关联时间本体*/
            search_zhongli(){
                if(this.selected_nianhao.chinese_name !== ''){
                    if(this.selected_nianhao.chinese_name === '-'){
                        this.standard_name = this.selected_chaodai.chinese_name+this.year+this.selected_month.chinese_name+this.selected_day.chinese_name;
                    } else {
                        this.standard_name = this.selected_chaodai.chinese_name+this.selected_nianhao.chinese_name+this.year+this.selected_month.chinese_name+this.selected_day.chinese_name;
                    }
                } else{
                    this.standard_name = this.selected_chaodai.chinese_name+this.selected_nianhao.chinese_name+this.year+this.selected_month.chinese_name+this.selected_day.chinese_name;
                }
                let object = {};
                object.standard_name = this.standard_name;
                object.chaodai = this.selected_chaodai.item_1_id;
                object.nianhao = this.selected_nianhao.item_2_id;
                object.nianfen = this.year;
                object.yue = this.selected_month.item_1_id;
                object.ri = this.selected_day.item_1_id;
                this.http_json(this.zhongli_url,'post',object,this.success_zhongli,this.fail_zhongli);
            },

            success_zhongli(response){
                this.standard_id = response.body.id;
            },

            fail_zhongli(response){
                console.log("关联中历失败");
            },

            /*跳转到时间本体详情*/
            go_time(){
                this.$router.push({name:'time_detail',params:{nouId:this.standard_id}});
            }
        }

    }
</script>

<style>
    .zxw-time-select-index{
        width: 70px;
        height: 25px;
        border:2px solid;
        background-color: transparent;
        font-size: 18px;

    }

    .zxw-time-type{
        border-color: black;
        color:#a50000;
    }

    .zxw-time-index-margin{
        margin-right:20px;
    }

    .zxw-search-time{
        background-image: url("../../../assets/img/button/create-next-step.png");
        background-color: transparent;
        background-size: contain;
        background-repeat: no-repeat;
        background-position: center;
        border: none;
        width:75px;
        height:40px;
        font-size: 18px;
        color:gainsboro;
    }
</style>