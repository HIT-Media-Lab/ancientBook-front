<template>
    <div class="zxwcreate">
        <p class="zxwcreate-title">新建本体</p>
        <img src="../../../../assets/img/no-use-picture/create-step2.png" class="zxwcreate-img">
        <create_word :prams="this.prams"></create_word>

        <div id="333">
            <p class="zxw-create-character" v-bind="standard_title"  v-model="input_terms.standard_name">本体名称：{{input_terms.standard_name}}</p>
            <div class="zxw-character-row">
                <label class="zxw-character-span zxw-must-write">术语名称：</label>
                <input id="terms_name" type="text"  class="zxw-character-input zxw-character-input-margin zxw-input-placeholder" placeholder="请输入中文" v-model="input_terms.terms_name" v-bind:class="{'zxw-input-chinese':show_input}" onfocus="placeholder=''" @blur="terms_name_tip()">
                <label class="zxw-character-span zxw-must-write">学科：</label>
                <select  class="zxw-ins-select" v-model="input_terms.selected_course" @change="repeat_nou()">
                    <option v-for="item in course_type" v-bind:value="{item_1_id:item.item_1_id,chinese_name:item.chinese_name}">{{item.chinese_name}}</option>
                </select>
            </div>

            <div class="zxw-character-row">
                <label class="zxw-character-span">学科小类：</label>
                <input type="text" class="zxw-character-input zxw-character-input-margin" value="未有具体数据" readonly>
                <label class="zxw-character-span">起始时间：</label>
                <div  class="zxw-character-input">
                    <div class="zxw-div-input" placeholder="点击右侧按钮添加" v-bind:contenteditable="input_terms.begin_standard_time !== ''">
                        <span class="zxw-person-relation-span"  @mouseover="show_begin_time = true" @mouseout="show_begin_time = false" v-if="input_terms.begin_standard_time !== ''">
                            <span class="zxw-tag-font" v-model="input_terms.begin_standard_time" >{{input_terms.begin_standard_time}}</span>
                            <button class="zxw-add-hover-img" v-show="show_begin_time===true" @click="delete_begin()"></button>
                        </span>
                    </div>
                    <button class="zxw-input-add-character" @click="open_begin()"></button>
                </div>
            </div>

            <div class="zxw-character-row">
                <label class="zxw-character-span">终止时间：</label>
                <div  class="zxw-character-input zxw-character-input-margin">
                    <div class="zxw-div-input" placeholder="点击右侧按钮添加" v-bind:contenteditable="input_terms.end_standard_time !== ''">
                        <span class="zxw-person-relation-span"  @mouseover="show_end_time = true" @mouseout="show_end_time = false" v-if="input_terms.end_standard_time !== ''">
                            <span class="zxw-tag-font" v-model="input_terms.end_standard_time" >{{input_terms.end_standard_time}}</span>
                            <button class="zxw-add-hover-img" v-show="show_end_time===true" @click="delete_end()"></button>
                        </span>
                    </div>
                    <button class="zxw-input-add-character" @click="open_end()"></button>
                </div>
                <label class="zxw-character-span">别名：</label>
                <input type="text" class="zxw-character-input" v-model="input_terms.other_name">
            </div>

            <div class="zxw-character-row">
                <label class="zxw-character-span">英译：</label>
                <input type="text" class="zxw-character-input zxw-character-input-margin" v-model="input_terms.english">
                <label class="zxw-character-span">解释：</label>
                <input type="text" class="zxw-character-input" v-model="input_terms.explain">
            </div>

            <div v-for="(item ,index) in add_data">
                <input type="text" class="zxw-character-input-head zxw-character-input" v-model="item.remark_name">
                <input type="text" class="zxw-character-input" v-bind:readonly="item.remark_name === ''&&item.remark === ''" v-model="item.remark">
                <button class="zxw-add-button" @click="add_tip(index)" v-show="add_data[index].value" :disabled="add_data.length >=2">添加</button>
            </div>

            <div class="zxw-build-step2-btn">
                <button class="zxw-prebtn zxw-prebtn-margin zxw-prebtn-length" @click="pre_step()">上一步</button>
                <button class="zxw-nextbtn zxw-nextbtn-length" @click="next_step()">下一步</button>
            </div>
        </div>

        <time_modal :time_modal="this.time_modal_1" v-on:success_time="begin_terms_time" v-on:close_modal="close_begin()"></time_modal>
        <time_modal :time_modal="this.time_modal_2" v-on:success_time="end_terms_time" v-on:close_modal="close_end()"></time_modal>

        <!--若术语本体规范已存在的模态框-->
        <repeat_modal :show_repeat="this.show_repeat" :repeat_name="this.input_terms.standard_name" :repeat_id="this.repeat_id" :repeat_noumenon="this.repeat_noumenon" v-on:close_modal="close_repeat"></repeat_modal>
        <warning_modal :show_info="show_next_step" :tip="'请填写完整必填信息(红字标注)!'" v-on:close_modal="close_next_error"></warning_modal>
        <warning_modal :show_info="show_next_2" :tip="'请填写完整注释部分!'" v-on:close_modal="close_next_2"></warning_modal>
    </div>
</template>

<script>

    import create_word from '../../../../component/create-word.vue';
    import time_modal from '../../../../component/time-modal.vue';
    import search_modal from '../../../../component/search_noumenon.vue';
    import repeat_modal from '../../../../component/repeat_modal.vue';
    import warning_modal from '../../../../component/warning_noumenon.vue';

    export default{
        beforeRouteLeave(to,from,next){
            if(to.name !== 'termsthree'){
                //清空Vuex
                this.$store.getters.get_build_terms.standard_name = '';
                this.$store.getters.get_build_terms.terms_name='';
                this.$store.getters.get_build_terms.course_subdivision=1;
                this.$store.getters.get_build_terms.selected_course.item_1_id = 0;
                this.$store.getters.get_build_terms.selected_course.chinese_name = '';
                this.$store.getters.get_build_terms.english='';
                this.$store.getters.get_build_terms.explain='';
                this.$store.getters.get_build_terms.other_name='';
                this.$store.getters.get_build_terms.begin_time_id='';
                this.$store.getters.get_build_terms.end_time_id='';
                this.$store.getters.get_build_terms.begin_standard_time='';
                this.$store.getters.get_build_terms.end_standard_time='';
                this.$store.getters.get_build_terms.remark_1_name='';
                this.$store.getters.get_build_terms.remark_2_name='';
                this.$store.getters.get_build_terms.remark_1='';
                this.$store.getters.get_build_terms.remark_2='';
                next();
            } else{
                next();
            }
        },

        created(){
            this.prams = this.$route.name;
            this.get_course_type();
        },

        components:{
            create_word,
            time_modal,
            search_modal,
            repeat_modal,
            warning_modal
        },

        computed:{
            standard_title(){
                if( this.input_terms.terms_name !== '' && this.input_terms.selected_course.chinese_name !== '' ){
                    this.input_terms.standard_name = this.input_terms.terms_name +'('+this.input_terms.selected_course.chinese_name+')';
                } else {
                    this.input_terms.standard_name = this.input_terms.terms_name;
                }
            }
        },

        data(){
            return{
                //对应的第几步
                prams:'',
                course_type_url:'/ancient_books/get_menu_items.action',
                //添加后删除符号以便删除
                show_input:false,
                show_begin_time:false,
                show_end_time:false,
                //打开对应的时间模态框
                time_modal_1:false,
                time_modal_2:false,
                show_next_step:false,
                show_next_2:false,
                course_type:[],
                input_terms:{
                    standard_name:'',
                    terms_name:'',
                    selected_course:{
                        item_1_id:0,
                        chinese_name:''
                    },
                    course_subdivision:1,
                    english:'',
                    other_name:'',
                    explain:'',
                    begin_time_id:'',
                    begin_standard_time:'',
                    end_time_id:'',
                    end_standard_time:'',
                    remark_1_name:'',
                    remark_2_name:'',
                    remark_1:'',
                    remark_2:''
                },
                //输入的备注，v-model备注部分
                add_data:[{
                    value:true,
                    remark_name:'',
                    remark:''
                }],
                check_noumenon_repeat:'/ancient_books/check_noumenon_standard_name.action',
                show_repeat:false,
                repeat_id:'',
                repeat_noumenon:'术语本体'
            }
        },

        methods:{
            terms_name_tip(){
                /*检查术语仅能输入中文*/
                if(this.input_terms.terms_name !== '') {
                    if(!/^[\u4E00-\u9FA5]*$/.test(this.input_terms.terms_name)) {
                        this.show_input = true;
                        this.input_terms.terms_name ='';
                        document.getElementById("terms_name").placeholder='请输入中文';
                    } else {
                        this.show_input = false;
                    }
                } else if(this.input_terms.terms_name === ''){
                    this.show_input = true;
                    document.getElementById("terms_name").placeholder='术语名称不能为空';
                }
                this.repeat_nou();
            },

            repeat_nou(){
                /*检查术语规范名称是否重复*/
                if(this.input_terms.terms_name !== '' && this.show_input === false && this.input_terms.selected_course.chinese_name !== ''){
                    let repeat_object={};
                    let new_url= this.check_noumenon_repeat+'?name='+this.input_terms.standard_name+'&&type=3';
                    this.http_json(new_url,'get',repeat_object,this.success_repeat,this.fail_repeat);
                }
            },

            /*学科类型下拉框*/
            get_course_type(){
                let object = {};
                let new_url = this.course_type_url+'?model_id=3&&item_1_id=0&&item_2_id=0';
                this.http_json(new_url,'get',object,this.success_course_type,this.fail_course_type);
            },

            success_course_type(response){
                for(let i = 0;i < response.body.length;i++){
                    this.course_type.push({
                        item_1_id:response.body[i].item_1_id,
                        chinese_name:response.body[i].chinese_name
                    })
                }
                if(this.$store.getters.get_build_terms.selected_course.chinese_name !== ''){
                    this.show_terms_info();
                } else{
                    this.input_terms.selected_course.item_1_id = this.course_type[0].item_1_id;
                    this.input_terms.selected_course.chinese_name = this.course_type[0].chinese_name;
                }
            },

            fail_course_type(){
                console.log("获取学科类型失败");
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

            /*禁止键盘输入*/
            down_delete(){
                let c = event.keyCode;
                if (c === 8 || c === 46||c===32||c===9||c===12||c===13||c===16||c===17||c===18||c===20||c===27||(c>=32&&c<=36)||c===38||c===40||c===45||(c >= 48 && c <= 57)||(c >= 65 && c <= 90)||(c >= 96 && c <= 123)||(c >= 186 && c <= 192)||(c >= 219 && c <= 222)) {
                    event.returnValue = false;
                }
            },


            /*起始时间*/
            open_begin(){
                this.time_modal_1 = true;
            },

            begin_terms_time(p){
                this.input_terms.begin_time_id = p.time_id;
                this.input_terms.begin_standard_time = p.standard_name;
                this.close_begin();
            },

            close_begin(){
                this.time_modal_1 = false;
            },

            delete_begin(){
                this.input_terms.begin_standard_time = '';
                this.input_terms.begin_time_id = '';
            },

            /*终止时间*/
            open_end(){
                this.time_modal_2 = true;
            },

            end_terms_time(q){
                this.input_terms.end_time_id = q.time_id;
                this.input_terms.end_standard_time = q.standard_name;
                this.close_end();
            },

            close_end(){
                this.time_modal_2 = false;
            },

            delete_end(){
                this.input_terms.end_standard_time = '';
                this.input_terms.end_time_id = '';
            },

            /*添加备注信息*/
            add_tip(p){ //目前只能添加两条备注，后续会改数据库为无限增加
                if(this.add_data.length < 2){
                    this.add_data[p].value = false;
                    this.add_data.push({
                        value:true,
                        remark_name:'',
                        remark:''
                    });
                    console.log(this.add_data.length+JSON.stringify(this.add_data));
                }
            },


            /*下一步*/
            next_step(){
                if(this.input_terms.selected_course.chinese_name === ''||this.input_terms.terms_name === ''|| this.show_input === true|| this.repeat_id !== ''){
                    this.show_next_step=true;

                } else if((this.add_data[0].remark_name === '' && this.add_data[0].remark !== '' )||(this.add_data[1] !== undefined && this.add_data[1].remark_name === '' && this.add_data[1].remark !=='')){
                    this.show_next_2 = true;

                } else{
                    this.input_terms.remark_1_name = this.add_data[0].remark_name;
                    this.input_terms.remark_1 = this.add_data[0].remark;
                    if(typeof this.add_data[1] !== 'undefined'){
                        this.input_terms.remark_2_name = this.add_data[1].remark_name;
                        this.input_terms.remark_2 = this.add_data[1].remark;
                    }
                    this.$store.commit("get_create_terms",this.input_terms);
                    this.$router.push({path:'/termsthree'});
                }
            },

            /*第三步的“上一步”*/
            show_terms_info(){
                this.input_terms = this.$store.getters.get_build_terms;
                console.log("返回到第二步: "+JSON.stringify(this.input_terms));
                this.add_data[0].remark_name = this.input_terms.remark_1_name;
                this.add_data[0].remark = this.input_terms.remark_1;
                if( this.input_terms.remark_2_name !== ''|| this.input_terms.remark_2 !== '') {
                    this.add_tip(0);
                    this.add_data[1].remark_name = this.input_terms.remark_2_name;
                    this.add_data[1].remark = this.input_terms.remark_2;
                }

            },

            pre_step(){
                this.$store.commit('get_create_one_selection',6);
                this.$router.push({name:'build'});
            },

            close_next_error(){
                this.show_next_step = false;
            },

            close_next_2(){
                this.show_next_2 = false;
            }
        }
    }
</script>
