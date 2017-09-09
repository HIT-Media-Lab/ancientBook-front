<template>
    <div>
        <noumenon_title :title="edit_terms_title"> </noumenon_title>
        <div style="margin-left:60px">
            <p class="zxw-create-character" v-bind="standard_title" v-model="input_content.standard_name">本体名称：{{input_content.standard_name}}</p>
            <div class="zxw-character-row">
                <label class="zxw-character-span zxw-must-write">术语名称：</label>
                <input type="text" id="terms_name" class="zxw-character-input zxw-edit-character-input-margin zxw-input-placeholder" placeholder="请输入中文" v-model="input_content.terms_name" v-bind:class="{'zxw-input-chinese':show_input}" onfocus="placeholder=''" @blur="terms_name_tip()">
                <label class="zxw-character-span zxw-must-write">学科：</label>
                <select  class="zxw-ins-select" v-model="selected_course" @change="repeat_nou()">
                    <option v-for="item in course_type" v-bind:value="{item_1_id:item.item_1_id,chinese_name:item.chinese_name}">{{item.chinese_name}}</option>
                </select>
            </div>

            <div class="zxw-character-row">
                <label class="zxw-character-span">学科小类：</label>
                <input type="text" class="zxw-character-input zxw-edit-character-input-margin" value="未有具体数据" readonly>
                <label class="zxw-character-span">起始时间：</label>
                <div  class="zxw-character-input">
                    <div class="zxw-div-input" placeholder="点击右侧按钮添加" v-bind:contenteditable="input_content.begin_time_name !== ''">
                        <span class="zxw-person-relation-span"  @mouseover="show_begin_time = true" @mouseout="show_begin_time = false" v-if="input_content.begin_time_name !== ''">
                            <span class="zxw-tag-font" v-model="input_content.begin_time_name" >{{input_content.begin_time_name}}</span>
                            <button class="zxw-add-hover-img" v-show="show_begin_time===true" @click="delete_begin()"></button>
                        </span>
                    </div>
                    <button class="zxw-input-add-character" @click="open_begin()"></button>
                </div>
            </div>

            <div class="zxw-character-row">
                <label class="zxw-character-span">终止时间：</label>
                <div  class="zxw-character-input zxw-edit-character-input-margin">
                    <div class="zxw-div-input" placeholder="点击右侧按钮添加" v-bind:contenteditable="input_content.end_time_name !== ''">
                        <span class="zxw-person-relation-span"  @mouseover="show_end_time = true" @mouseout="show_end_time = false" v-if="input_content.end_time_name !== ''">
                            <span class="zxw-tag-font" v-model="input_content.end_time_name" >{{input_content.end_time_name}}</span>
                            <button class="zxw-add-hover-img" v-show="show_end_time===true" @click="delete_end()"></button>
                        </span>
                    </div>
                    <button class="zxw-input-add-character" @click="open_end()"></button>
                </div>
                <label class="zxw-character-span">别名：</label>
                <input type="text" class="zxw-character-input" v-model="input_content.other_name">
            </div>

            <div class="zxw-character-row">
                <label class="zxw-character-span">英译：</label>
                <input type="text" class="zxw-character-input zxw-edit-character-input-margin" v-model="input_content.english">
                <label class="zxw-character-span">解释：</label>
                <input type="text" class="zxw-character-input" v-model="input_content.explain">
            </div>

            <div v-for="(item ,index) in add_data">
                <input type="text" class="zxw-character-input-head zxw-character-input" v-model="item.remark_name">
                <input type="text" class="zxw-character-input" v-bind:readonly="item.remark_name === ''&&item.remark === ''" v-model="item.remark">
                <button class="zxw-add-button" @click="add_tip(index)" v-show="add_data[index].value" :disabled="add_data.length >=2">添加</button>
            </div>

            <div class="zxw-edit-btn">
                <button class="zxw-prebtn zxw-prebtn-margin zxw-prebtn-length" @click="cancel_edit()">取消</button>
                <button class="zxw-nextbtn zxw-nextbtn-length" @click="finish_edit()">完成</button>
            </div>
        </div>
        <!--若术语本体规范已存在的模态框-->
        <repeat_modal :show_repeat="this.show_repeat" :repeat_name="this.input_content.standard_name" :repeat_id="this.repeat_id" :repeat_noumenon="this.repeat_noumenon" v-on:close_modal="close_repeat"></repeat_modal>
        <time_modal :time_modal="this.time_modal_1" v-on:success_time="begin_time" v-on:close_modal="close_begin()"></time_modal>
        <time_modal :time_modal="this.time_modal_2" v-on:success_time="end_time" v-on:close_modal="close_end()"></time_modal>
        <warning_modal :show_info="show_next_step" :tip="'请填写完整必填信息(红字标注)!'" v-on:close_modal="close_next_error"></warning_modal>
        <warning_modal :show_info="show_next_2" :tip="'请填写完整注释部分!'" v-on:close_modal="close_next_2"></warning_modal>
    </div>
</template>

<script>

    /*let Mock = require('mockjs');
    //显示用户列表
    Mock.mock('/ancient_books/check_noumenon_standard_name.action?name=%E6%B0%B4%E7%94%B5(%E8%AF%AD%E6%96%87)&&type=3','get',{
        "status|200":200,
        "result|0":1,
        "id:|360":360
    });*/

    import noumenon_title from '../../../component/noumenon-title.vue';
    import time_modal from '../../../component/time-modal.vue';
    import search_modal from '../../../component/search_noumenon.vue';
    import repeat_modal from '../../../component/repeat_modal.vue';
    import warning_modal from '../../../component/warning_noumenon.vue';

    export default{
        created(){
            this.get_course_type();
        },

        components:{
            noumenon_title,
            time_modal,
            search_modal,
            repeat_modal,
            warning_modal
        },

        computed:{

            standard_title(){
                if( this.input_content.course !== null ){
                    this.input_content.standard_name = this.input_content.terms_name +'('+this.selected_course.chinese_name+')';
                } else {
                    this.input_content.standard_name = this.input_content.terms_name;
                }
            }
        },

        data(){
            return {
                edit_terms_title:'',
                course_type_url:'/ancient_books/get_menu_items.action',
                terms_url:'/ancient_books/get_technical_by_id.action',
                show_input:false,
                show_begin_time:false,
                show_end_time:false,
                //打开模态框
                time_modal_1:false,
                time_modal_2:false,
                show_next_step:false,
                show_next_2:false,
                course_type:[],
                course_number:0,
                selected_course:{
                    item_1_id:0,
                    chinese_name:''
                },
                input_content:{
                    standard_name:'',
                    terms_name:'',
                    course:0,
                    course_subdivision:1,
                    english:'',
                    other_name:'',
                    explain:'',
                    begin_time_id:'',
                    begin_time_name:'',
                    end_time_id:'',
                    end_time_name:'',
                    remark_1_name:'',
                    remark_2_name:'',
                    remark_1:'',
                    remark_2:''
                },
                add_data:[{
                    value:true,
                    remark_name:'',
                    remark:''
                }],
                check_noumenon_repeat:'/ancient_books/check_noumenon_standard_name.action',
                show_repeat:false,
                repeat_id:'',
                repeat_noumenon:'术语本体',
                modify_url:'/ancient_books/modify_technical_by_id.action'
            }
        },
        methods:{
            terms_name_tip(){
                /*检查术语仅能输入中文*/
                if(this.input_content.terms_name !== '') {
                    if(!/^[\u4E00-\u9FA5]*$/.test(this.input_content.terms_name)) {
                        this.show_input = true;
                        this.input_content.terms_name = '';
                        document.getElementById("terms_name").placeholder='请输入中文';
                    } else {
                        this.show_input = false;
                    }
                } else if(this.input_content.terms_name === ''){
                    this.show_input = true;
                    document.getElementById("terms_name").placeholder='术语名称不能为空';
                }
                this.repeat_nou();
            },

            repeat_nou(){
                /*检查术语规范名称修改后是否重复*/
                if(this.input_content.terms_name !== '' && this.input_content.course !== null && this.show_input === false){
                    let new_title = this.input_content.terms_name+'('+this.selected_course.chinese_name+')';
                    if(new_title !== this.edit_terms_title){
                        let repeat_object={};
                        let new_url= this.check_noumenon_repeat+'?name='+this.input_content.standard_name+'&&type=3';
                        this.http_json(new_url,'get',repeat_object,this.success_repeat,this.fail_repeat);
                    }
                }
            },

            /*术语本体关系禁止键盘输入*/
            down_delete(){
                let c = event.keyCode;
                if (c === 8 || c === 46||c===32||c===9||c===12||c===13||c===16||c===17||c===18||c===20||c===27||(c>=32&&c<=36)||c===38||c===40||c===45||(c >= 48 && c <= 57)||(c >= 65 && c <= 90)||(c >= 96 && c <= 123)||(c >= 186 && c <= 192)||(c >= 219 && c <= 222)) {
                    event.returnValue = false;
                }
            },

            /*根据id获取任务具体信息*/
            show_terms(){
                let object = {};
                let new_url = this.terms_url+'?id='+this.$route.params.nouId;
                this.http_json(new_url,'get',object,this.success_terms,this.fail_terms);
            },

            success_terms(response){
                this.edit_terms_title = response.body.standard_name;
                this.input_content.standard_name = response.body.standard_name;
                this.input_content.terms_name = response.body.name;
                this.input_content.english = response.body.english;
                this.input_content.other_name = response.body.other_name;
                this.input_content.course = response.body.course;
                this.input_content.course_subdivision = response.body.course_subdivision;
                this.input_content.explain = response.body.explain;
                this.input_content.begin_time_id = response.body.begin_time_id;
                this.input_content.begin_time_name = response.body.begin_time_name;
                this.input_content.end_time_id = response.body.end_time_id;
                this.input_content.end_time_name = response.body.end_time_name;
                this.input_content.remark_1_name = response.body.remark_1_name;
                this.input_content.remark_2_name = response.body.remark_2_name;
                this.input_content.remark_1 = response.body.remark_1;
                this.input_content.remark_2 = response.body.remark_2;
                this.add_data[0].remark_name = response.body.remark_1_name;
                this.add_data[0].remark = response.body.remark_1;
                if(response.body.remark_2_name !== ''){
                    this.add_data[0].value = false;
                    this.add_data.push({
                        value:true,
                        remark_name:response.body.remark_2_name,
                        remark:response.body.remark_2
                    })
                }
                console.log('input_content: '+JSON.stringify(this.input_content));
                console.log('add_data: '+JSON.stringify(this.add_data));
                /*显示学科类型*/
                this.display_course();
            },

            fail_terms(){
                console.log("获取术语信息失败");
            },

            /*术语学科类型下拉框*/
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
                console.log("course_type: "+JSON.stringify(this.course_type));
                /*学科类型获取完成之后发请求获取id具体信息*/
                this.show_terms();
            },

            fail_course_type(){
                console.log("获取术语学科失败");
            },

            /*学科显示*/
            display_course(){
                if(this.input_content.course !== null && this.course_type.length > 0){
                    for(let i = 0; i < this.course_type.length;i++){
                        if(this.input_content.course === this.course_type[i].item_1_id){
                            this.selected_course.item_1_id = this.course_type[i].item_1_id;
                            this.selected_course.chinese_name = this.course_type[i].chinese_name;
                        }
                    }
                    console.log("selected_course: "+JSON.stringify(this.selected_course));
                }
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


            /*起始时间*/
            open_begin(){
                this.time_modal_1 = true;
            },

            begin_time(p){
                this.input_content.begin_time_id = p.time_id;
                this.input_content.begin_time_name = p.standard_name;
                this.close_begin();
            },

            close_begin(){
                this.time_modal_1 = false;
            },

            delete_begin(){
                this.input_content.begin_time_id='';
                this.input_content.begin_time_name='';
            },

            /*终止时间*/
            open_end(){
                this.time_modal_2 = true;
            },

            end_time(q){
                this.input_content.end_time_id = q.time_id;
                this.input_content.end_time_name=q.standard_name;
                this.close_end();
            },

            close_end(){
                this.time_modal_2 = false;
            },

            delete_end(){
                this.input_content.end_time_id = '';
                this.input_content.end_time_name='';
            },

            /*添加备注信息*/
            add_tip(p){
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

            cancel_edit(){
                this.$router.push({name:'terms_detail',params:{nouId:this.$route.params.nouId}});
            },

            finish_edit(){
                if(this.input_content.selected_course.chinese_name === ''||this.input_content.terms_name === ''|| this.show_input === true|| this.repeat_id !== ''){
                    this.show_next_step=true;
                } else if((this.add_data[0].remark_name === ''&& this.add_data[0].remark !== '')||(this.add_data[1] !== undefined && this.add_data[1].remark_name === '' && this.add_data[1].remark !=='')){
                    this.show_next_2 = true;
                } else {
                    //备注信息
                    this.input_content.remark_1_name = this.add_data[0].remark_name ;
                    this.input_content.remark_1 = this.add_data[0].remark;
                    if(this.add_data.length > 1){
                        this.input_content.remark_2_name = this.add_data[1].remark_name ;
                        this.input_content.remark_2 = this.add_data[1].remark ;
                    }

                    let edit_object={};
                    edit_object.id=this.$route.params.nouId;
                    edit_object.standard_name = this.input_content.standard_name;
                    edit_object.technical_name = this.input_content.terms_name;
                    edit_object.course = this.selected_course.item_1_id;
                    edit_object.course_subdivision = this.input_content.course_subdivision;
                    edit_object.english=this.input_content.english;
                    edit_object.explain=this.input_content.explain;
                    edit_object.other_name=this.input_content.other_name;
                    edit_object.begin_time_id=this.input_content.begin_time_id;
                    edit_object.end_time_id=this.input_content.end_time_id;
                    edit_object.remark_1_name=this.input_content.remark_1_name;
                    edit_object.remark_2_name=this.input_content.remark_2_name;
                    edit_object.remark_1=this.input_content.remark_1;
                    edit_object.remark_2=this.input_content.remark_2;
                    this.http_json(this.modify_url,'post',edit_object,this.success_modify_terms,this.fail_modify_terms);
                }
            },

            success_modify_terms(response){
                if(response.body.result === 1){
                    this.$router.push({name:'terms_detail',params:{nouId:this.$route.params.nouId}});
                }
            },

            fail_modify_terms(){
                console.log("修改术语本体失败");
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