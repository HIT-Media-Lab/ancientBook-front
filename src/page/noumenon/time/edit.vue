<template>
    <div>
        <noumenon_title :title="edit_time_title"> </noumenon_title>
        <div style="margin-left:60px">
            <p class="zxw-create-character" v-model="standard_name" :="standard_title">本体名称：{{standard_name}}</p>
            <div class="zxw-character-row">
                <label class="zxw-character-span zxw-must-write">朝代：</label>
                <select  class="zxw-ins-select zxw-edit-character-input-margin" v-model="selected_chaodai" :="repeat_nou_1" v-bind="get_nianhao_type">
                    <option v-for="item in chaodai_type" v-bind:value="{item_1_id:item.item_1_id,chinese_name:item.chinese_name}">{{item.chinese_name}}</option>
                </select>

                <label class="zxw-character-span">年号：</label>
                <select  class="zxw-ins-select" v-model="selected_nianhao" :="repeat_nou_1" v-bind:disabled="selected_chaodai.chinese_name === ''">
                    <option v-for="item in nianhao_type" v-bind:value="{item_2_id:item.item_2_id,chinese_name:item.chinese_name}">{{item.chinese_name}}</option>
                </select>
            </div>

            <div class="zxw-character-row">
                <label class="zxw-character-span">年份：</label>
                <input type="text" class="zxw-character-input zxw-edit-character-input-margin" v-model="year" :="repeat_nou_1" v-bind:disabled="selected_nianhao.chinese_name === ''">

                <label class="zxw-character-span">月：</label>
                <select  class="zxw-ins-select" v-model="selected_1_month" :="repeat_nou_1" v-bind="clean_month" v-bind:disabled="year === ''">
                    <option v-for="item in month_type" v-bind:value="{item_1_id:item.item_1_id,chinese_name:item.chinese_name}">{{item.chinese_name}}</option>
                </select>
            </div>

            <div class="zxw-character-row">
                <label class="zxw-character-span">日：</label>
                <select  class="zxw-ins-select zxw-edit-character-input-margin" v-model="selected_1_day" :="repeat_nou_1" v-bind="clean_day" v-bind:disabled="selected_1_month.chinese_name === ''">
                    <option v-for="item in day_type" v-bind:value="{item_1_id:item.item_1_id,chinese_name:item.chinese_name}">{{item.chinese_name}}</option>
                </select>

                <label class="zxw-character-span">干支：</label>
                <select  class="zxw-ins-select" v-bind:disabled="g_year !== ''" v-model="selected_ganzhi" v-bind="compute_ganzhi">
                    <option v-for="item in ganzhi_type" v-bind:value="{item_1_id:item.item_1_id,chinese_name:item.chinese_name}">{{item.chinese_name}}</option>
                </select>
            </div>

            <div class="zxw-character-row">
                <label class="zxw-character-span">节气：</label>
                <select  class="zxw-ins-select zxw-edit-character-input-margin" v-model="selected_jieqi">
                    <option v-for="item in jieqi_type" v-bind:value="selected_jieqi">{{item}}</option>
                </select>

                <label class="zxw-character-span">英译：</label>
                <input type="text" class="zxw-character-input" v-model="english">
            </div>

            <div class="zxw-character-row">
                <label class="zxw-character-span">绝对日号：</label>
                <input type="text" class="zxw-character-input zxw-edit-character-input-margin" v-model="juedui" :class="{'zxw-input-chinese':show_input}" :="juedui_number">

                <label class="zxw-character-span">公元年份：</label>
                <input type="text" class="zxw-character-input" :class="{'zxw-input-chinese':show_g_year}" v-model="g_year" v-bind="g_year_number">
            </div>

            <div class="zxw-character-row">
                <label class="zxw-character-span zxw-must-write">月：</label>
                <select  class="zxw-ins-select zxw-edit-character-input-margin" :disabled="this.g_year === ''" v-model="selected_2_month" :="clean_g_month">
                    <option v-for="item in g_month_type" v-bind:value="{item_1_id:item.item_1_id,chinese_name:item.chinese_name}">{{item.chinese_name}}</option>
                </select>

                <label class="zxw-character-span">日：</label>
                <select  class="zxw-ins-select" :disabled="this.selected_2_month.chinese_name === null" v-model="selected_2_day" :="clean_g_day">
                    <option v-for="item in g_day_type" v-bind:value="{item_1_id:item.item_1_id,chinese_name:item.chinese_name}">{{item.chinese_name}}</option>
                </select>
            </div>

            <div class="zxw-edit-btn">
                <button class="zxw-prebtn zxw-prebtn-margin zxw-prebtn-length" @click="cancel_edit()">取消</button>
                <button class="zxw-nextbtn zxw-nextbtn-length" @click="finish_edit()" v-bind:disabled="selected_chaodai.chinese_name === ''|| show_input === true|| repeat_id !== ''||show_g_year === true "  >完成</button>
            </div>

        <!--若术语本体规范已存在的模态框-->
        <repeat_modal :show_repeat="this.show_repeat" :repeat_name="this.standard_name" :repeat_id="this.repeat_id" :repeat_noumenon="this.repeat_noumenon" v-on:close_modal="close_repeat"></repeat_modal>
    </div>
    </div>
</template>

<script>

    import noumenon_title from '../../../component/noumenon-title.vue';
    import repeat_modal from '../../../component/repeat_modal.vue';

    export default{
        created(){
            this.get_chaodai_type();
            this.get_month_type();
            this.get_day_type();
            this.get_ganzhi_type();
            this.get_jieqi_type();
            this.get_g_month_type();
            this.get_g_day_type();
        },

        components:{
            noumenon_title,
            repeat_modal,
        },

        computed:{
            standard_title(){
                    if(this.selected_nianhao.chinese_name === '-'){
                        this.standard_name = this.selected_chaodai.chinese_name+this.year+this.selected_1_month.chinese_name+this.selected_1_day.chinese_name;
                    } else{
                        this.standard_name = this.selected_chaodai.chinese_name +this.selected_nianhao.chinese_name+this.year+this.selected_1_month.chinese_name+this.selected_1_day.chinese_name;
                    }
            },

            juedui_number(){
                if(this.juedui !== ''){
                    if(!/^(?:[\+\-]?\d+(?:\.\d+)?)?$/.test(this.juedui)){
                        this.show_input = true;
                    } else {
                        this.show_input = false;
                    }
                }else {
                    this.show_input = false;
                }
            },

            g_year_number(){
                if(this.g_year !== ''){
                    if(!/^(?:[\+\-]?\d+(?:\.\d+)?)?$/.test(this.g_year)){
                        this.show_g_year = true;
                    } else {
                        this.show_g_year = false;
                    }
                }else {
                    this.show_g_year = false;
                }
            },

            compute_ganzhi(){
                if(this.g_year !== '' && this.show_g_year === false ){
                    let new_url = this.ganzhi_name+'?gongyuan='+parseInt(this.g_year);
                    let object = {};
                    this.http_json(new_url,'get',object,this.success_ganzhi_name,this.fail_ganzhi_name);
                }
            },

            repeat_nou_1(){
                /*检查时间规范名称是否重复*/
                if(this.selected_chaodai.chinese_name !== ''){
                    if(this.standard_name !== this.edit_time_title){
                        let repeat_object={};
                        let new_url= this.check_noumenon_repeat+'?name='+this.standard_name+'&&type=4';
                        this.http_json(new_url,'get',repeat_object,this.success_repeat,this.fail_repeat);
                    }
                }
            },

            get_nianhao_type(){
                this.nianhao_type.splice(0,this.nianhao_type.length);
                this.selected_nianhao.item_2_id=0;
                this.selected_nianhao.chinese_name ='';
                if(this.selected_chaodai.chinese_name !== ''&& this.chaodai_type.length > 0 && this.nianhao_type.length === 0){
                    let object = {};
                    let new_url = this.menu_url+'?model_id=25&&item_1_id='+this.selected_chaodai.item_1_id+'&&item_2_id=0';
                    this.http_json(new_url,'get',object,this.success_nianhao_type,this.fail_nianhao_type);
                } else {

                }
            },

            clean_g_month(){
                if(this.g_year === ''||this.selected_2_month.chinese_name === '-'){
                    this.selected_2_month.chinese_name = '';
                    this.selected_2_month.item_1_id= 0;
                }
            },

            clean_g_day(){
                if(this.selected_2_month.chinese_name === null||this.selected_2_day.chinese_name === '-'){
                    this.selected_2_day.chinese_name = '';
                    this.selected_2_day.item_1_id = 0;
                }
            },

            clean_month(){
                if(this.year === ''||this.selected_1_month.chinese_name === '-'){
                    this.selected_1_month.chinese_name = '';
                    this.selected_1_month.item_1_id = 0;
                }
            },

            clean_day(){
                if(this.selected_1_month.chinese_name === ''||this.selected_1_day.chinese_name === '-'){
                    this.selected_1_day.chinese_name = '';
                    this.selected_1_day.item_1_id = 0;
                }
            },

        },

        data(){
            return {
                edit_time_title:'',
                menu_url:'/ancient_books/get_menu_items.action',
                time_url:'/ancient_books/get_time_by_id.action',
                ganzhi_name:'/ancient_books/get_ganzhi_by_gongyuan.action',
                chaodai_type:[],
                nianhao_type:[],
                month_type:[],
                day_type:[],
                ganzhi_type:[],
                jieqi_type:[],
                g_month_type:[],
                g_day_type:[],
                selected_chaodai:{
                    item_1_id:0,
                    chinese_name:''
                },
                selected_nianhao:{
                    item_2_id:0,
                    chinese_name:''
                },
                selected_1_month:{
                    item_1_id:0,
                    chinese_name:''
                },
                selected_1_day:{
                    item_1_id:0,
                    chinese_name:''
                },
                selected_2_month:{
                    item_1_id:0,
                    chinese_name:''
                },
                selected_2_day:{
                    item_1_id:0,
                    chinese_name:''
                },
                selected_ganzhi:{
                    item_1_id:0,
                    chinese_name:''
                },
                selected_jieqi:'',
                standard_name: '',
                year: '',
                g_year:'',
                juedui:'',
                english: '',
                show_input:false,
                show_g_year:false,
                check_noumenon_repeat:'/ancient_books/check_noumenon_standard_name.action',
                show_repeat:false,
                repeat_id:'',
                repeat_noumenon:'时间本体',
                modify_url:'/ancient_books/modify_time_by_id.action'
            }
        },
        methods:{

            /*根据id获取任务具体信息*/
            show_time(){
                let object = {};
                let new_url = this.time_url+'?id='+this.$route.params.nouId;
                this.http_json(new_url,'get',object,this.success_time,this.fail_time);
            },

            success_time(response){
                    this.edit_time_title = response.body.standard_name;
                    this.standard_name = response.body.standard_name;
                    this.selected_chaodai.item_1_id = response.body.chaodai;
                    this.selected_chaodai.chinese_name = response.body.chaodai_name;
                    this.selected_nianhao.item_2_id = response.body.nianhao;
                    this.selected_nianhao.chinese_name = response.body.nianhao_name;
                    this.year = response.body.nianfen;
                    this.selected_1_month.item_1_id = response.body.yue;
                    this.selected_1_month.chinese_name = response.body.yue_name;
                    this.selected_1_day.item_1_id = response.body.ri;
                    this.selected_1_day.chinese_name = response.body.ri_name;
                    this.selected_ganzhi.item_1_id = response.body.ganzhi;
                    this.selected_ganzhi.chinese_name = response.body.ganzhi_name;
                    if(response.body.juedui === null){
                        this.juedui = "";
                    } else{
                        this.juedui = response.body.juedui.toString();
                    }

                    if(response.body.gongyuan === null){
                        this.g_year = "";
                    } else {
                        this.g_year = response.body.gongyuan.toString();
                    }
                    this.selected_2_month.item_1_id = response.body.g_yue;
                    this.selected_2_month.chinese_name = response.body.g_yue_name;
                    this.selected_2_day.item_1_id= response.body.g_ri;
                    this.selected_2_day.chinese_name= response.body.g_ri_name;
                    this.english = response.body.english;
                    this.selected_jieqi = response.body.jieqi;
            },

            fail_time(response){
                console.log("获取时间信息失败");
            },

            success_repeat(response){
                if(response.body.result === 0){
                    this.$store.commit('change_fork',false);
                    this.show_repeat = true;
                    this.repeat_id = response.body.id;
                    console.log("本体重复");
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

            cancel_edit(){
                this.$router.push({name:'time_detail',params:{nouId:this.$route.params.nouId}});
            },

            finish_edit(){
                let edit_object={};
                edit_object.id=this.$route.params.nouId;
                edit_object.standard_name = this.standard_name;
                edit_object.chaodai = this.selected_chaodai.item_1_id;
                edit_object.nianhao = this.selected_nianhao.item_2_id;
                edit_object.nianfen = this.year;
                edit_object.yue=this.selected_1_month.item_1_id;
                edit_object.ri=this.selected_1_day.item_1_id;
                edit_object.ganzhi=this.selected_ganzhi.item_1_id;
                edit_object.juedui=parseInt(this.juedui);
                edit_object.gongyuan=parseInt(this.g_year);
                edit_object.g_yue=this.selected_2_month.item_1_id;
                edit_object.g_ri=this.selected_2_day.item_1_id;
                edit_object.english=this.english;
                edit_object.jieqi=this.selected_jieqi;
                this.http_json(this.modify_url,'post',edit_object,this.success_modify_time,this.fail_modify_time);
            },

            success_modify_time(response){
                if(response.body.result === 1){
                    this.$router.push({name:'time_detail',params:{nouId:this.$route.params.nouId}});
                }
            },

            fail_modify_time(){
                console.log("修改时间本体失败");
            },


            /*朝代类型下拉框*/
            get_chaodai_type(){
                let object = {};
                let new_url = this.menu_url+'?model_id=25&&item_1_id=0&&item_2_id=0';
                this.http_json(new_url,'get',object,this.success_chaodai_type,this.fail_chaodai_type);
            },

            success_chaodai_type(response){
                if(response.body.length > 0){
                    for(let i = 0;i < response.body.length;i++){
                        this.chaodai_type.push({
                            item_1_id:response.body[i].item_1_id,
                            chinese_name:response.body[i].chinese_name
                        })
                    }
                }
                this.show_time();
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

            /*月份下拉框*/
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

            /*日下拉框*/
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

            fail_ganzhi_type(response){
                console.log("获取干支失败");
            },

            /*根据公元年份返回干支*/
            success_ganzhi_name(response){
                this.selected_ganzhi.item_1_id = response.body.ganzhi;
                this.selected_ganzhi.chinese_name = response.body.ganzhi_name;
            },

            fail_ganzhi_name(response){
                console.log("根据公元年份返回干支失败");
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
            }

        }
    }
</script>