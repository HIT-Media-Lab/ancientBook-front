<template>
    <div class="zxwcreate">
        <p class="zxwcreate-title">新建本体</p>
        <img src="../../../../assets/img/no-use-picture/create-step2.png" class="zxwcreate-img">
        <create_word :prams="this.prams"></create_word>

        <div id="333">
            <p class="zxw-create-character" v-bind="standard_title"  v-model="input_time.standard_name">本体名称：{{input_time.standard_name}}</p>
            <div class="zxw-character-row">
                <label class="zxw-character-span zxw-must-write">朝代：</label>
                <select  class="zxw-ins-select zxw-character-input-margin" v-model="input_time.selected_chaodai" v-bind="get_nianhao_type" :="repeat_nou_1" @change="clean_nianhao">
                    <option v-for="item in chaodai_type" v-bind:value="{item_1_id:item.item_1_id,chinese_name:item.chinese_name}">{{item.chinese_name}}</option>
                </select>
                <label class="zxw-character-span">年号：</label>
                <select  class="zxw-ins-select" v-model="input_time.selected_nianhao" :="repeat_nou_1" :disabled="this.input_time.selected_chaodai.chinese_name === ''">
                    <option v-for="item in nianhao_type" v-bind:value="{item_2_id:item.item_2_id,chinese_name:item.chinese_name}">{{item.chinese_name}}</option>
                </select>
            </div>

            <div class="zxw-character-row">
                <label class="zxw-character-span">年份：</label>
                <input type="text" class="zxw-character-input zxw-character-input-margin" :disabled="this.input_time.selected_nianhao.chinese_name === ''" :="repeat_nou_1" v-model="input_time.year">
                <label class="zxw-character-span">月：</label>
                <select  class="zxw-ins-select" :disabled="this.input_time.year === ''" v-model="input_time.selected_1_month" :="repeat_nou_1" v-bind="clean_month">
                    <option v-for="item in month_type" v-bind:value="{item_1_id:item.item_1_id,chinese_name:item.chinese_name}">{{item.chinese_name}}</option>
                </select>
            </div>

            <div class="zxw-character-row">
                <label class="zxw-character-span">日：</label>
                <select  class="zxw-ins-select zxw-character-input-margin" :disabled="this.input_time.selected_1_month.chinese_name === ''" v-model="input_time.selected_1_day" :="repeat_nou_1" v-bind="clean_day">
                    <option v-for="item in day_type" v-bind:value="{item_1_id:item.item_1_id,chinese_name:item.chinese_name}">{{item.chinese_name}}</option>
                </select>
                <label class="zxw-character-span">干支：</label>
                <select  class="zxw-ins-select" v-bind:disabled="input_time.g_year !== ''" v-model="input_time.selected_ganzhi" v-bind="compute_ganzhi">
                    <option v-for="item in ganzhi_type" v-bind:value="{item_1_id:item.item_1_id,chinese_name:item.chinese_name}">{{item.chinese_name}}</option>
                </select>
            </div>

            <div class="zxw-character-row">
                <label class="zxw-character-span">节气：</label>
                <select  class="zxw-ins-select  zxw-character-input-margin" v-model="input_time.selected_jieqi">
                    <option v-for="item in jieqi_type">{{item}}</option>
                </select>
                <label class="zxw-character-span">英译：</label>
                <input type="text" class="zxw-character-input" v-model="input_time.english">
            </div>

            <div class="zxw-character-row">
                <label class="zxw-character-span">绝对日号：</label>
                <input type="text" class="zxw-character-input zxw-character-input-margin" v-model="input_time.juedui" :class="{'zxw-input-chinese':show_input}" :="juedui_number">
                <label class="zxw-character-span">公元年份：</label>
                <input type="text" class="zxw-character-input" v-model="input_time.g_year" :class="{'zxw-input-chinese':show_g_year}" :="g_year_number">
            </div>

            <div class="zxw-character-row">
                <label class="zxw-character-span">月：</label>
                <select  class="zxw-ins-select zxw-character-input-margin" :disabled="this.input_time.g_year === ''" v-model="input_time.selected_2_month" v-bind="clean_g_month">
                    <option v-for="item in g_month_type" v-bind:value="{item_1_id:item.item_1_id,chinese_name:item.chinese_name}">{{item.chinese_name}}</option>
                </select>
                <label class="zxw-character-span">日：</label>
                <select  class="zxw-ins-select" :disabled="this.input_time.selected_2_month.chinese_name === null" v-model="input_time.selected_2_day" v-bind="clean_g_day">
                    <option v-for="item in g_day_type" v-bind:value="{item_1_id:item.item_1_id,chinese_name:item.chinese_name}">{{item.chinese_name}}</option>
                </select>
            </div>

            <div class="zxw-build-step2-btn">
                <button class="zxw-prebtn zxw-prebtn-margin zxw-prebtn-length" @click="pre_step()">上一步</button>
                <button class="zxw-nextbtn zxw-nextbtn-length" @click="next_step()" v-bind:disabled="input_time.selected_chaodai.chinese_name === ''||show_input === true|| repeat_id !== ''||show_g_year === true " >下一步</button>
            </div>
        </div>

        <!--若时间本体规范已存在的模态框-->
        <repeat_modal :show_repeat="this.show_repeat" :repeat_name="this.input_time.standard_name" :repeat_id="this.repeat_id" :repeat_noumenon="this.repeat_noumenon" v-on:close_modal="close_repeat"></repeat_modal>

    </div>
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
                "item_2_id|4": 1,
                "chinese_name": "-"
            },
            {"model_id|1": 1,
                "item_1_id|1": 1,
                "item_2_id|1": 1,
                "chinese_name": "天宝"
            },
            {"model_id|1": 1,
                "item_1_id|1": 1,
                "item_2_id|2": 1,
                "chinese_name": "元包"
            },
            {"model_id|1": 1,
                "item_1_id|1": 1,
                "item_2_id|3": 1,
                "chinese_name": "满宝"
            }
        ]
    });

    Mock.mock('/ancient_books/get_menu_items.action?model_id=25&&item_1_id=2&&item_2_id=0','get', {
        "g":[
            {"model_id|1": 1,
                "item_1_id|1": 1,
                "item_2_id|4": 1,
                "chinese_name": "-"
            },
            {"model_id|1": 1,
                "item_1_id|1": 1,
                "item_2_id|1": 1,
                "chinese_name": "火锅"
            },
            {"model_id|1": 1,
                "item_1_id|1": 1,
                "item_2_id|2": 1,
                "chinese_name": "羊肉"
            },
            {"model_id|1": 1,
                "item_1_id|1": 1,
                "item_2_id|3": 1,
                "chinese_name": "面皮"
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
                "item_1_id|2": 1,
                "chinese_name": "二月"
            },
            {"model_id|1": 1,
                "item_1_id|3": 1,
                "chinese_name": "三月"
            }
        ]
    });

    Mock.mock('/ancient_books/get_menu_items.action?model_id=27&&item_1_id=0&&item_2_id=0','get', {
        "g":[
            {"model_id|1": 1,
                "item_1_id|1": 1,
                "chinese_name": "一日"
            },
            {"model_id|1": 1,
                "item_1_id|2": 1,
                "chinese_name": "二日"
            },
            {"model_id|1": 1,
                "item_1_id|3": 1,
                "chinese_name": "三日"
            }
        ]
    });

    Mock.mock('/ancient_books/get_menu_items.action?model_id=29&&item_1_id=0&&item_2_id=0','get', {
        "g":[
            {"model_id|1": 1,
                "item_1_id|1": 1,
                "chinese_name": "干支1"
            },
            {"model_id|1": 1,
                "item_1_id|2": 2,
                "chinese_name": "干支2"
            },
            {"model_id|1": 1,
                "item_1_id|3": 1,
                "chinese_name": "干支3"
            }
        ]
    });


    Mock.mock('/ancient_books/get_menu_items.action?model_id=28&&item_1_id=0&&item_2_id=0','get', {
        "g":[
            {"model_id|1": 1,
                "chinese_name": "节气1"
            },
            {"model_id|1": 1,
                "chinese_name": "节气2"
            },
            {"model_id|1": 1,
                "chinese_name": "节气3"
            }
        ]
    });

    Mock.mock('/ancient_books/get_menu_items.action?model_id=30&&item_1_id=0&&item_2_id=0','get', {
        "g":[
            {"model_id|1": 1,
                "item_1_id|1": 1,
                "chinese_name|1": 1
            },
            {"model_id|1": 1,
                "item_1_id|2": 2,
                "chinese_name|2":2
            },
            {"model_id|1": 1,
                "item_1_id|3": 1,
                "chinese_name|3": 3
            }
        ]
    });


    Mock.mock('/ancient_books/get_menu_items.action?model_id=31&&item_1_id=0&&item_2_id=0','get', {
        "g":[
            {"model_id|1": 1,
                "item_1_id|1": 1,
                "chinese_name|1": 1
            },
            {"model_id|1": 1,
                "item_1_id|2": 2,
                "chinese_name|2": 2
            },
            {"model_id|1": 1,
                "item_1_id|3": 1,
                "chinese_name|3": 3
            }
        ]
    });

    Mock.mock('/ancient_books/get_ganzhi_by_gongyuan.action?gongyuan=2017','get', {
        "ganzhi|2":2,
        "ganzhi_name":'干支2'
    });*/


    import create_word from '../../../../component/create-word.vue';
    import repeat_modal from '../../../../component/repeat_modal.vue';
    export default{
        beforeRouteLeave(to,from,next){
            if(to.name !== 'timethree'){
                //清空Vuex
                this.$store.getters.get_build_time.standard_name = '';
                this.$store.getters.get_build_time.selected_chaodai.item_1_id = 0;
                this.$store.getters.get_build_time.selected_chaodai.chinese_name = '';
                this.$store.getters.get_build_time.selected_nianhao.item_2_id = 0;
                this.$store.getters.get_build_time.selected_nianhao.chinese_name = '';
                this.$store.getters.get_build_time.selected_1_month.item_1_id = 0;
                this.$store.getters.get_build_time.selected_1_month.chinese_name = '';
                this.$store.getters.get_build_time.selected_1_day.item_1_id = 0;
                this.$store.getters.get_build_time.selected_1_day.chinese_name = '';
                this.$store.getters.get_build_time.selected_ganzhi.item_1_id = 0;
                this.$store.getters.get_build_time.selected_ganzhi.chinese_name = '';
                this.$store.getters.get_build_time.selected_2_month.item_1_id = 0;
                this.$store.getters.get_build_time.selected_2_month.chinese_name = '';
                this.$store.getters.get_build_time.selected_2_day.item_1_id = 0;
                this.$store.getters.get_build_time.selected_2_day.chinese_name = '';
                this.$store.getters.get_build_time.year='';
                this.$store.getters.get_build_time.g_year='';
                this.$store.getters.get_build_time.juedui='';
                this.$store.getters.get_build_time.selected_jieqi='';
                this.$store.getters.get_build_time.english='';
                next();
            } else{
                next();
            }
        },

        created(){
            this.prams = this.$route.name;
            this.show_time_info();
            this.get_chaodai_type();
            this.get_month_type();
            this.get_day_type();
            this.get_ganzhi_type();
            this.get_jieqi_type();
            this.get_g_month_type();
            this.get_g_day_type();
        },

        components:{
            create_word,
            repeat_modal
        },

        computed:{
            standard_title(){
                if(this.input_time.selected_nianhao.chinese_name === '-'){
                    this.input_time.standard_name = this.input_time.selected_chaodai.chinese_name+this.input_time.year+this.input_time.selected_1_month.chinese_name+this.input_time.selected_1_day.chinese_name;
                } else{
                    this.input_time.standard_name = this.input_time.selected_chaodai.chinese_name +this.input_time.selected_nianhao.chinese_name+this.input_time.year+this.input_time.selected_1_month.chinese_name+this.input_time.selected_1_day.chinese_name;
                }
            },

            juedui_number(){
                if(this.input_time.juedui !== ''){
                    if(!/^(?:[\+\-]?\d+(?:\.\d+)?)?$/.test(this.input_time.juedui)){
                        this.show_input = true;
                    } else {
                        this.show_input = false;
                    }
                }else {
                    this.show_input = false;
                }
            },

            g_year_number(){
                if(this.input_time.g_year !== ''){
                    if(!/^(?:[\+\-]?\d+(?:\.\d+)?)?$/.test(this.input_time.g_year)){
                        this.show_g_year = true;
                    } else {
                        this.show_g_year = false;
                    }
                }else {
                    this.show_g_year = false;
                }
            },

            clean_g_month(){
                if(this.input_time.g_year === '' || this.input_time.selected_2_month.chinese_name === '-'){
                    this.input_time.selected_2_month.chinese_name = null;
                    this.input_time.selected_2_month.item_1_id = 0;
                }
            },

            clean_g_day(){
                if(this.input_time.selected_2_month.chinese_name === null || this.input_time.selected_2_day.chinese_name === '-'){
                    this.input_time.selected_2_day.chinese_name = null;
                    this.input_time.selected_2_day.item_1_id = 0;
                }
            },

            clean_month(){
                if(this.input_time.year === ''||this.input_time.selected_1_month.chinese_name=== '-'){
                    this.input_time.selected_1_month.chinese_name = '';
                    this.input_time.selected_1_month.item_1_id = 0;
                }
            },

            clean_day(){
                if(this.input_time.selected_1_month.chinese_name === ''||this.input_time.selected_1_day.chinese_name=== '-'){
                    this.input_time.selected_1_day.chinese_name = '';
                    this.input_time.selected_1_day.item_1_id = 0;
                }
            },

            repeat_nou_1(){
                /*检查时间规范名称是否重复*/
                if(this.input_time.selected_chaodai.chinese_name !== ''){
                    let repeat_object={};
                    let new_url= this.check_noumenon_repeat+'?name='+this.input_time.standard_name+'&&type=4';
                    this.http_json(new_url,'get',repeat_object,this.success_repeat,this.fail_repeat);
                }
            },

            get_nianhao_type(){
                if(this.input_time.selected_chaodai.chinese_name !== ''){
                    let object = {};
                    let new_url = this.menu_url+'?model_id=25&&item_1_id='+this.input_time.selected_chaodai.item_1_id+'&&item_2_id=0';
                    this.http_json(new_url,'get',object,this.success_nianhao_type,this.fail_nianhao_type);
                }
            },

            compute_ganzhi(){
                if(this.input_time.g_year !== '' && this.show_g_year === false ){
                    let new_url = this.ganzhi_name+'?gongyuan='+parseInt(this.input_time.g_year);
                    let object = {};
                    this.http_json(new_url,'get',object,this.success_ganzhi_name,this.fail_ganzhi_name);
                } else if(this.input_time.g_year ==='' || this.show_g_year === true){
                    this.input_time.selected_ganzhi.item_1_id=0;
                    this.input_time.selected_ganzhi.chinese_name = '';
                }
            },
        },

        data(){
            return{
                //对应的第几步
                prams:'',
                menu_url:'/ancient_books/get_menu_items.action',
                ganzhi_name:'/ancient_books/get_ganzhi_by_gongyuan.action',
                //添加后删除符号以便删除
                show_input:false,
                show_g_year:false,
                //打开对应的时间模态框
                chaodai_type:[],
                nianhao_type:[],
                month_type:[],
                day_type:[],
                ganzhi_type:[],
                jieqi_type:[],
                g_month_type:[],
                g_day_type:[],
                input_time:{
                    standard_name:'',
                    selected_chaodai:{
                        item_1_id:0,
                        chinese_name:''
                    },
                    selected_nianhao:{
                        item_2_id:0,
                        chinese_name:''
                    },
                    year:'',
                    selected_1_month:{
                        item_1_id:0,
                        chinese_name:''
                    },
                    selected_1_day:{
                        item_1_id:0,
                        chinese_name:''
                    },
                    selected_ganzhi:{
                        item_1_id:0,
                        chinese_name:''
                    },
                    juedui:'',
                    g_year:'',
                    selected_2_month:{
                        item_1_id:0,
                        chinese_name:''
                    },
                    selected_2_day:{
                        item_1_id:0,
                        chinese_name:''
                    },
                    selected_jieqi:'',
                    english:''
                },
                check_noumenon_repeat:'/ancient_books/check_noumenon_standard_name.action',
                show_repeat:false,
                repeat_id:'',
                repeat_noumenon:'时间本体'
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

           clean_nianhao(){
                this.nianhao_type.splice(0,this.nianhao_type.length);
                this.input_time.selected_nianhao.item_2_id=0;
                this.input_time.selected_nianhao.chinese_name='';
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

            /*干支下拉框*/
            get_ganzhi_type(){
                let object = {};
                let new_url = this.menu_url+'?model_id=29&&item_1_id=0&&item_2_id=0';
                this.http_json(new_url,'get',object,this.success_ganzhi_type,this.fail_ganzhi_type);
            },

            success_ganzhi_type(response){
                for(let i = 0;i < response.body.length;i++){
                    this.ganzhi_type.push({
                        item_1_id:response.body[i].item_1_id,
                        chinese_name:response.body[i].chinese_name
                    })
                }
            },

            /*根据公元年份返回干支*/
            success_ganzhi_name(response){
                this.input_time.selected_ganzhi.item_1_id = response.body.ganzhi;
                this.input_time.selected_ganzhi.chinese_name = response.body.ganzhi_name;
            },

            fail_ganzhi_name(response){
                console.log("根据公元年份返回干支失败");
            },

            fail_ganzhi_type(response){
                console.log("获取干支失败");
            },

            /*节气下拉框*/
            get_jieqi_type(){
                let object = {};
                let new_url = this.menu_url+'?model_id=28&&item_1_id=0&&item_2_id=0';
                this.http_json(new_url,'get',object,this.success_jieqi_type,this.fail_jieqi_type);
            },

            success_jieqi_type(response){
                for(let i = 0;i < response.body.length;i++){
                    this.jieqi_type.push(
                        response.body[i].chinese_name
                    )
                }
            },

            fail_jieqi_type(response){
                console.log("获取节气失败");
            },

            /*公历月份下拉框*/
            get_g_month_type(){
                let object = {};
                let new_url = this.menu_url+'?model_id=30&&item_1_id=0&&item_2_id=0';
                this.http_json(new_url,'get',object,this.success_g_month_type,this.fail_g_month_type);
            },

            success_g_month_type(response){
                for(let i = 0;i < response.body.length;i++){
                    this.g_month_type.push({
                        item_1_id:response.body[i].item_1_id,
                        chinese_name:response.body[i].chinese_name
                    })
                }
            },

            fail_g_month_type(response){
                console.log("获取公历月份失败");
            },

            /*公历日下拉框*/
            get_g_day_type(){
                let object = {};
                let new_url = this.menu_url+'?model_id=31&&item_1_id=0&&item_2_id=0';
                this.http_json(new_url,'get',object,this.success_g_day_type,this.fail_g_day_type);
            },

            success_g_day_type(response){
                for(let i = 0;i < response.body.length;i++){
                    this.g_day_type.push({
                        item_1_id:response.body[i].item_1_id,
                        chinese_name:response.body[i].chinese_name
                    })
                }
            },

            fail_g_day_type(response){
                console.log("获取公历日期失败");
            },


            success_repeat(response){
                if(response.body.result === 0){
                    this.$store.commit('change_fork',false);
                    this.show_repeat = true;
                    this.repeat_id = response.body.id;
                    console.log("术语本体重复");
                } else if(response.body.result === 1){
                    this.repeat_id = '';
                    console.log("没有重复信息");
                }
            },

            fail_repeat(response){
                console.log("判断是否重复失败");
            },

            close_repeat(){
                this.show_repeat=false;
            },

            /*下一步*/
            next_step(){
                this.$store.commit("get_create_time",this.input_time);
                this.$router.push({path:'/timethree'});
            },

            /*第三步的“上一步”*/
            show_time_info(){
                this.input_time = this.$store.getters.get_build_time;
                console.log("返回到第二步: "+JSON.stringify(this.input_time));
            },

            pre_step(){
                this.$store.commit('get_create_one_selection',0);
                this.$router.push({name:'build'});
            }
        }
    }
</script>

<style>
</style>