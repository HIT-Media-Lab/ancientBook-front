<template>
    <div>
        <noumenon_title :title="edit_off_title"> </noumenon_title>
        <div style="margin-left:60px">
            <p class="zxw-create-character" v-bind="standard_title"  v-model="input_content.standard_name">本体名称：{{input_content.standard_name}}</p>
            <div class="zxw-character-row">
                <label class="zxw-character-span zxw-must-write">职官名：</label>
                <input id="off_name" type="text"  class="zxw-character-input zxw-edit-character-input-margin zxw-input-placeholder" placeholder="请输入中文" v-model="input_content.name" v-bind:class="{'zxw-input-chinese':show_input}" onfocus="placeholder=''" @blur="off_name_tip()">
                <label class="zxw-character-span">英译：</label>
                <input type="text" class="zxw-character-input" v-model="input_content.english">
            </div>

            <div class="zxw-character-row">
                <label class="zxw-character-span">别名：</label>
                <input type="text" class="zxw-character-input  zxw-edit-character-input-margin" v-model="input_content.other_name">
                <label class="zxw-character-span">隶属机构：</label>
                <div  class="zxw-character-input">
                    <div class="zxw-div-input" placeholder="点击右侧按钮添加">
                        <span class="zxw-person-relation-span"  @mouseover="show_ins = true" @mouseout="show_ins = false" v-if="input_content.institution_name !== ''">
                            <span class="zxw-tag-font" v-model="input_content.institution_name" >{{input_content.institution_name}}</span>
                            <button class="zxw-add-hover-img" v-show="show_ins === true" @click="delete_ins()"></button>
                        </span>
                    </div>
                    <button class="zxw-input-add-character" @click="open_ins()"></button>
                </div>
            </div>

            <div class="zxw-character-row">
                <label class="zxw-character-span zxw-must-write">起始时间：</label>
                <div  class="zxw-character-input zxw-edit-character-input-margin">
                    <div class="zxw-div-input" placeholder="点击右侧按钮添加">
                        <span class="zxw-person-relation-span"  @mouseover="show_begin_time = true" @mouseout="show_begin_time = false" v-if="input_content.begin_time_name !== ''">
                            <span class="zxw-tag-font" v-model="input_content.begin_time_name" >{{input_content.begin_time_name}}</span>
                            <button class="zxw-add-hover-img" v-show="show_begin_time===true" @click="delete_begin()"></button>
                        </span>
                    </div>
                    <button class="zxw-input-add-character" @click="open_begin()"></button>
                </div>
                <label class="zxw-character-span zxw-must-write">终止时间：</label>
                <div  class="zxw-character-input">
                    <div class="zxw-div-input" placeholder="点击右侧按钮添加">
                        <span class="zxw-person-relation-span"  @mouseover="show_end_time = true" @mouseout="show_end_time = false" v-if="input_content.end_time_name !== ''">
                            <span class="zxw-tag-font" v-model="input_content.end_time_name" >{{input_content.end_time_name}}</span>
                            <button class="zxw-add-hover-img" v-show="show_end_time===true" @click="delete_end()"></button>
                        </span>
                    </div>
                    <button class="zxw-input-add-character" @click="open_end()"></button>
                </div>
            </div>


            <div class="zxw-character-row">
                <label class="zxw-character-span">上级职官：</label>
                <div  class="zxw-character-input  zxw-edit-character-input-margin">
                    <div class="zxw-div-input" placeholder="点击右侧按钮添加">
                        <span class="zxw-person-relation-span"  @mouseover="show_s_office = true" @mouseout="show_s_office = false" v-if="input_content.s_office_name !== ''">
                            <span class="zxw-tag-font" v-model="input_content.s_office_name" >{{input_content.s_office_name}}</span>
                            <button class="zxw-add-hover-img" v-show="show_s_office === true" @click="delete_s_office()"></button>
                        </span>
                    </div>
                    <button class="zxw-input-add-character" @click="open_s_office()"></button>
                </div>
                <label class="zxw-character-span">品级：</label>
                <select  class="zxw-ins-select" v-model="selected_level">
                    <option v-for="item in level_type" v-bind:value="{item_1_id:item.item_1_id,chinese_name:item.chinese_name}">{{item.chinese_name}}</option>
                </select>
            </div>

            <div class="zxw-character-row">
                <label class="zxw-character-span">所属朝代：</label>
                <input type="text" class="zxw-character-input zxw-edit-character-input-margin" v-model="input_content.dynasty">
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

        <time_modal :time_modal="this.time_modal_1" v-on:success_time="begin_time" v-on:close_modal="close_begin()"></time_modal>
        <time_modal :time_modal="this.time_modal_2" v-on:success_time="end_time" v-on:close_modal="close_end()"></time_modal>
        <!--搜索上级职官本体-->
        <search_modal :search_url="this.search_office" :noumenon_modal="this.s_office_modal" :noumenon_number="5" :repeat_arr="[]" v-on:close_modal="close_s_office" v-on:add_noumenon_relations="add_s_office"></search_modal>
        <!--搜索隶属机构本体-->
        <search_modal :search_url="this.search_ins" :noumenon_modal="this.ins_modal" :noumenon_number="6" :repeat_arr="[]" v-on:close_modal="close_ins" v-on:add_noumenon_relations="add_ins"></search_modal>

        <!--若职官本体规范已存在的模态框-->
        <repeat_modal :show_repeat="this.show_repeat" :repeat_name="this.input_content.standard_name" :repeat_id="this.repeat_id" :repeat_noumenon="this.repeat_noumenon" v-on:close_modal="close_repeat"></repeat_modal>
        <warning_modal :show_info="show_next_step" :tip="'请填写完整必填信息(红字标注)!'" v-on:close_modal="close_next_error"></warning_modal>
        <warning_modal :show_info="show_next_2" :tip="'请填写完整注释部分!'" v-on:close_modal="close_next_2"></warning_modal>
    </div>
</template>

<script>

    import noumenon_title from '../../../component/noumenon-title.vue';
    import time_modal from '../../../component/time-modal.vue';
    import search_modal from '../../../component/search_noumenon.vue';
    import repeat_modal from '../../../component/repeat_modal.vue';
    import warning_modal from '../../../component/warning_noumenon.vue';

    export default{
        created(){
            this.show_off();
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
                if( this.input_content.begin_time_name !== '' ){
                    this.input_content.standard_name = this.input_content.name +'('+this.input_content.begin_time_name+')';
                } else {
                    this.input_content.standard_name = this.input_content.name;
                }
            }
        },

        data(){
            return {
                edit_off_title:'',
                off_url:'/ancient_books/get_office_by_id.action',
                search_office:'/ancient_books/get_office_list_by_name.action',
                search_ins:'/ancient_books/get_institution_list_by_name.action',
                level_type_url:'/ancient_books/get_menu_items.action',
                ins_modal:false,
                s_office_modal:false,
                show_input:false,
                show_ins:false,
                show_begin_time:false,
                show_end_time:false,
                show_s_office:false,
                time_modal_1:false,
                time_modal_2:false,
                show_next_step:false,
                show_next_2:false,
                level_type:[],
                selected_level:{
                    item_1_id:0,
                    chinese_name:''
                },
                input_content:{
                    standard_name: '',
                    english: '',
                    name: '',
                    institution_id:'',
                    institution_name:'',
                    other_name: '',
                    begin_time_id:'',
                    begin_time_name: '',
                    end_time_id: '',
                    end_time_name: '',
                    s_office_id:'',
                    s_office_name:'',
                    level:0,
                    dynasty:'',
                    remark_1: '',
                    remark_2: '',
                    remark_1_name:'',
                    remark_2_name: ''
                },
                add_data:[{
                    value:true,
                    remark_name:'',
                    remark:''
                }],
                check_noumenon_repeat:'/ancient_books/check_noumenon_standard_name.action',
                show_repeat:false,
                repeat_id:'',
                repeat_noumenon:'职官本体',
                modify_url:'/ancient_books/modify_office_by_id.action'
            }
        },
        methods:{
            off_name_tip(){
                /*检查机构仅能输入中文*/
                if(this.input_content.name !== '') {
                    if(!/^[\u4E00-\u9FA5]*$/.test(this.input_content.name)) {
                        this.show_input = true;
                        this.input_content.name = '';

                    } else {
                        this.show_input = false;
                    }
                } else if(this.input_content.name === ''){
                    this.show_input = true;
                    document.getElementById("off_name").placeholder='职官名不能为空';
                }

                if(this.input_content.name !== '' && this.input_content.begin_time_name !== ''&& this.show_input === false){
                    let new_title = this.input_content.name+'('+this.input_content.begin_time_name+')';
                    console.log('edit_off_title: '+JSON.stringify(this.edit_off_title));
                    console.log('new_title: '+JSON.stringify(new_title));
                    if(new_title !== this.edit_off_title){
                        let repeat_object={};
                        let new_url= this.check_noumenon_repeat+'?name='+this.input_content.standard_name+'&&type=5';
                        this.http_json(new_url,'get',repeat_object,this.success_repeat,this.fail_repeat);
                    }
                }
            },

            /*职官本体关系禁止键盘输入*/
            down_delete(){
                let c = event.keyCode;
                if (c === 8 || c === 46||c===32||c===9||c===12||c===13||c===16||c===17||c===18||c===20||c===27||(c>=32&&c<=36)||c===38||c===40||c===45||(c >= 48 && c <= 57)||(c >= 65 && c <= 90)||(c >= 96 && c <= 123)||(c >= 186 && c <= 192)||(c >= 219 && c <= 222)) {
                    event.returnValue = false;
                }
            },

            /*根据id获取任务具体信息*/
            show_off(){
                let object = {};
                let new_url = this.off_url+'?id='+this.$route.params.nouId;
                this.http_json(new_url,'get',object,this.success_off,this.fail_off);
            },

            success_off(response){
                this.edit_off_title = response.body.standard_name;
                this.input_content.standard_name = response.body.standard_name;
                this.input_content.name = response.body.name;
                this.input_content.english = response.body.english;
                this.input_content.other_name = response.body.other_name;
                this.input_content.institution_id = response.body.institution_id;
                this.input_content.institution_name = response.body.institution_name;
                this.input_content.begin_time_id = response.body.begin_time_id;
                this.input_content.begin_time_name = response.body.begin_time_name;
                this.input_content.end_time_id = response.body.end_time_id;
                this.input_content.end_time_name = response.body.end_time_name;
                this.input_content.s_office_id = response.body.s_office_id;
                this.input_content.s_office_name = response.body.s_office_name;
                this.input_content.level = response.body.level;
                this.input_content.dynasty = response.body.dynasty;
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
                this.get_off_type();
            },

            fail_off(){
                console.log("获取职官信息失败");
            },

            /*品级类型下拉框*/
            get_off_type(){
                let object = {};
                let new_url = this.level_type_url+'?model_id=2&&item_1_id=0&&item_2_id=0';
                this.http_json(new_url,'get',object,this.success_level_type,this.fail_level_type);
            },

            success_level_type(response){
                for(let i = 0;i < response.body.length;i++){
                    this.level_type.push({
                        item_1_id:response.body[i].item_1_id,
                        chinese_name:response.body[i].chinese_name
                    })
                }
                if(this.input_content.level !== null && this.level_type.length > 0){
                    for(let m = 0;m <this.level_type.length;m++){
                        if(this.input_content.level === this.level_type[m].item_1_id){
                            this.selected_level.item_1_id=this.level_type[m].item_1_id;
                            this.selected_level.chinese_name=this.level_type[m].chinese_name;
                            console.log('selected_level: '+JSON.stringify(this.selected_level));
                        }
                    }
                }
            },

            fail_level_type(response){
                console.log("获取品级失败");
            },

            /*本体是否重复*/
            repeat_nou_2(){
                if(this.input_content.name !== '' && this.input_content.begin_time_name !== ''&& this.show_input === false){
                    let repeat_object={};
                    let new_url= this.check_noumenon_repeat+'?name='+this.input_content.standard_name+'&&type=5';
                    this.http_json(new_url,'get',repeat_object,this.success_repeat,this.fail_repeat);
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
                this.repeat_nou_2();
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

            /*上级机构*/
            open_s_office(){
                this.s_office_modal = true;
            },

            add_s_office(p){
                this.input_content.s_office_id = p.noumenon_id;
                this.input_content.s_office_name = p.standard_name;
                console.log('this.input_content.s_office_id: '+this.input_content.s_office_id);
                console.log('this.input_content.s_office_name: '+this.input_content.s_office_name);
            },

            delete_s_office(){
                this.input_content.s_office_id = '';
                this.input_content.s_office_name = '';
                console.log(JSON.stringify(this.input_content));
            },

            close_s_office(){
                this.s_office_modal = false;
            },


            /*隶属机构*/
            open_ins(){
                this.ins_modal = true;
            },

            add_ins(p){
                this.input_content.institution_id = p.noumenon_id;
                this.input_content.institution_name = p.standard_name;
                console.log('this.input_content.institution_id: '+this.input_content.institution_id);
                console.log('this.input_content.institution_name: '+this.input_content.institution_name);
            },

            delete_ins(){
                this.input_content.institution_id = '';
                this.input_content.institution_name = '';
                console.log(JSON.stringify(this.input_content));
            },

            close_ins(){
                this.ins_modal = false;
            },


            cancel_edit(){
                this.$router.push({name:'off_detail',params:{nouId:this.$route.params.nouId}});
            },

            finish_edit(){
                if(this.input_content.begin_time_name === ''|| this.input_content.end_time_name === ''||this.input_content.name === ''|| this.show_input === true|| this.repeat_id !== ''){
                    this.show_next_step = true;
                } else if((this.add_data[0].remark_name === ''&& this.add_data[0].remark !== '')||(this.add_data[1] !== undefined && this.add_data[1].remark_name === '' && this.add_data[1].remark !=='')){
                    this.show_next_2 = true;
                } else{
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
                    edit_object.office_name = this.input_content.name;
                    edit_object.english=this.input_content.english;
                    edit_object.other_name=this.input_content.other_name;
                    edit_object.institution_id=this.input_content.institution_id;
                    edit_object.begin_time_id=this.input_content.begin_time_id;
                    edit_object.end_time_id=this.input_content.end_time_id;
                    edit_object.s_office_id=this.input_content.s_office_id;
                    edit_object.level=this.selected_level.item_1_id;
                    edit_object.dynasty=this.input_content.dynasty;
                    edit_object.remark_1_name=this.input_content.remark_1_name;
                    edit_object.remark_2_name=this.input_content.remark_2_name;
                    edit_object.remark_1=this.input_content.remark_1;
                    edit_object.remark_2=this.input_content.remark_2;
                    this.http_json(this.modify_url,'post',edit_object,this.success_modify_off,this.fail_modify_off);
                }
            },

            success_modify_off(response){
                if(response.body.result === 1){
                    this.$router.push({name:'off_detail',params:{nouId:this.$route.params.nouId}});
                }
            },

            fail_modify_off(){
                console.log("修改职官本体失败");
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