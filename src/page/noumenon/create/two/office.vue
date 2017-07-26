<template>
    <div class="zxwcreate">
        <p class="zxwcreate-title">新建本体</p>
        <img src="../../../../assets/img/no-use-picture/create-step2.png" class="zxwcreate-img">
        <create_word :prams="this.prams"></create_word>

        <div id="333">
            <p class="zxw-create-character" v-bind="standard_title"  v-model="input_off.standard_name">本体名称：{{input_off.standard_name}}</p>
            <div class="zxw-character-row">
                <label class="zxw-character-span zxw-must-write">职官名：</label>
                <input id="person_name" type="text"  class="zxw-character-input zxw-character-input-margin" v-model="input_off.office_name" v-bind:class="{'zxw-input-chinese':show_input}" :="repeat_nou_1">
                <label class="zxw-character-span">英译：</label>
                <input type="text" class="zxw-character-input" v-model="input_off.english">
            </div>

            <div class="zxw-character-row">
                <label class="zxw-character-span">别名：</label>
                <input type="text" class="zxw-character-input  zxw-character-input-margin" v-model="input_off.other_name">
                <label class="zxw-character-span">隶属机构：</label>
                <div  class="zxw-character-input">
                    <div class="zxw-div-input" placeholder="点击右侧按钮添加">
                        <span class="zxw-person-relation-span"  @mouseover="show_ins = true" @mouseout="show_ins = false" v-if="input_off.institution_name !== ''">
                            <span class="zxw-tag-font" v-model="input_off.institution_name" >{{input_off.institution_name}}</span>
                            <button class="zxw-add-hover-img" v-show="show_ins === true" @click="delete_ins()"></button>
                        </span>
                    </div>
                    <button class="zxw-input-add-character" @click="open_ins()"></button>
                </div>
            </div>

            <div class="zxw-character-row">
                <label class="zxw-character-span zxw-must-write">起始时间：</label>
                <div  class="zxw-character-input zxw-character-input-margin">
                    <div class="zxw-div-input" placeholder="点击右侧按钮添加">
                        <span class="zxw-person-relation-span"  @mouseover="show_begin_time = true" @mouseout="show_begin_time = false" v-if="input_off.begin_standard_time !== ''">
                            <span class="zxw-tag-font" v-model="input_off.begin_standard_time" >{{input_off.begin_standard_time}}</span>
                            <button class="zxw-add-hover-img" v-show="show_begin_time===true" @click="delete_begin()"></button>
                        </span>
                    </div>
                    <button class="zxw-input-add-character" @click="open_begin()"></button>
                </div>
                <label class="zxw-character-span zxw-must-write">终止时间：</label>
                <div  class="zxw-character-input">
                    <div class="zxw-div-input" placeholder="点击右侧按钮添加">
                        <span class="zxw-person-relation-span"  @mouseover="show_end_time = true" @mouseout="show_end_time = false" v-if="input_off.end_standard_time !== ''">
                            <span class="zxw-tag-font" v-model="input_off.end_standard_time" >{{input_off.end_standard_time}}</span>
                            <button class="zxw-add-hover-img" v-show="show_end_time===true" @click="delete_end()"></button>
                        </span>
                    </div>
                    <button class="zxw-input-add-character" @click="open_end()"></button>
                </div>
            </div>

            <div class="zxw-character-row">
                <label class="zxw-character-span">上级职官：</label>
                <div  class="zxw-character-input zxw-character-input-margin">
                    <div class="zxw-div-input" placeholder="点击右侧按钮添加">
                        <span class="zxw-person-relation-span"  @mouseover="show_s_office = true" @mouseout="show_s_office = false" v-if="input_off.s_office_name !== ''">
                            <span class="zxw-tag-font" v-model="input_off.s_office_name" >{{input_off.s_office_name}}</span>
                            <button class="zxw-add-hover-img" v-show="show_s_office === true" @click="delete_s_office()"></button>
                        </span>
                    </div>
                    <button class="zxw-input-add-character" @click="open_s_office()"></button>
                </div>
                <label class="zxw-character-span">品级：</label>
                <select  class="zxw-ins-select" v-model="input_off.selected_level">
                    <option v-for="item in level_type" v-bind:value="{item_1_id:item.item_1_id,chinese_name:item.chinese_name}">{{item.chinese_name}}</option>
                </select>
            </div>

            <div class="zxw-character-row">
                <label class="zxw-character-span">所属朝代：</label>
                <input type="text" class="zxw-character-input  zxw-character-input-margin" v-model="input_off.dynasty">
            </div>

            <div v-for="(item ,index) in add_data">
                <input type="text" class="zxw-character-input-head zxw-character-input" v-model="item.remark_name">
                <input type="text" class="zxw-character-input" v-bind:readonly="item.remark_name === ''&&item.remark === ''" v-model="item.remark">
                <button class="zxw-add-button" @click="add_tip(index)" v-show="add_data[index].value" :disabled="add_data.length >=2">添加</button>
            </div>

            <div class="zxw-build-step2-btn">
                <button class="zxw-prebtn zxw-prebtn-margin zxw-prebtn-length" @click="pre_step()">上一步</button>
                <button class="zxw-nextbtn zxw-nextbtn-length" @click="next_step()" v-bind:disabled="input_off.begin_time_id === ''|| input_off.end_time_id === ''||input_off.office_name === ''|| show_input === true|| repeat_id !== '' ||(add_data[0].remark_name === '' && add_data[0].remark !== '' )||(add_data[1] !== undefined && add_data[1].remark_name === '' && add_data[1].remark !=='')" >下一步</button>
            </div>
        </div>

        <time_modal :time_modal="this.time_modal_1" v-on:success_time="begin_off_time" v-on:close_modal="close_begin()"></time_modal>
        <time_modal :time_modal="this.time_modal_2" v-on:success_time="end_off_time" v-on:close_modal="close_end()"></time_modal>

        <search_modal :search_url="this.search_office" :noumenon_modal="this.s_office_modal" :noumenon_number="5" :repeat_arr="[]"  v-on:close_modal="close_s_office" v-on:add_noumenon_relations="add_s_office"></search_modal>
        <search_modal :search_url="this.search_ins" :noumenon_modal="this.ins_modal" :noumenon_number="6" :repeat_arr="[]" v-on:close_modal="close_ins" v-on:add_noumenon_relations="add_ins"></search_modal>

        <!--若机构本体规范已存在的模态框-->
        <repeat_modal :show_repeat="this.show_repeat" :repeat_name="this.input_off.standard_name" :repeat_id="this.repeat_id" :repeat_noumenon="this.repeat_noumenon" v-on:close_modal="close_repeat"></repeat_modal>

    </div>
</template>

<script>

    import create_word from '../../../../component/create-word.vue';
    import time_modal from '../../../../component/time-modal.vue';
    import search_modal from '../../../../component/search_noumenon.vue';
    import repeat_modal from '../../../../component/repeat_modal.vue';
    export default{
        beforeRouteLeave(to,from,next){
            if(to.name !== 'officethree'){
                //清空Vuex
                this.$store.getters.get_build_off.standard_name = '';
                this.$store.getters.get_build_off.office_name='';
                this.$store.getters.get_build_off.level=0;
                this.$store.getters.get_build_off.english='';
                this.$store.getters.get_build_off.other_name='';
                this.$store.getters.get_build_off.dynasty='';
                this.$store.getters.get_build_off.selected_level.item_1_id=0;
                this.$store.getters.get_build_off.selected_level.chinese_name='';
                this.$store.getters.get_build_off.institution_id='';
                this.$store.getters.get_build_off.institution_name='';
                this.$store.getters.get_build_off.s_office_id='';
                this.$store.getters.get_build_off.s_office_name='';
                this.$store.getters.get_build_off.begin_time_id='';
                this.$store.getters.get_build_off.end_time_id='';
                this.$store.getters.get_build_off.begin_standard_time='';
                this.$store.getters.get_build_off.end_standard_time='';
                this.$store.getters.get_build_off.remark_1_name='';
                this.$store.getters.get_build_off.remark_2_name='';
                this.$store.getters.get_build_off.remark_1='';
                this.$store.getters.get_build_off.remark_2='';
                next();
            } else{
                next();
            }
        },

        created(){
            this.prams = this.$route.name;
            this.get_level_type();

        },

        components:{
            create_word,
            time_modal,
            search_modal,
            repeat_modal,
        },

        computed:{
            standard_title(){
                if( this.input_off.begin_standard_time !== '' ){
                    this.input_off.standard_name = this.input_off.office_name +'('+this.input_off.begin_standard_time+')';
                } else {
                    this.input_off.standard_name = this.input_off.office_name;
                }
            },

            repeat_nou_1(){
                /*检查职官名仅能输入中文*/
                if(this.input_off.office_name !== '') {
                    if(!/^[\u4E00-\u9FA5]*$/.test(this.input_off.office_name)) {
                        this.show_input = true;
                    } else {
                        this.show_input = false;
                    }
                } else if(this.input_off.office_name === ''){
                    this.show_input = false;
                }

                /*判断职官本体名称是否重复*/
                if(this.input_off.office_name !== '' && this.input_off.begin_standard_time !== '' && this.show_input === false){
                    let repeat_object={};
                    let new_url= this.check_noumenon_repeat+'?name='+this.input_off.standard_name+'&&type=5';
                    this.http_json(new_url,'get',repeat_object,this.success_repeat,this.fail_repeat);
                }
            }
        },

        data(){
            return{
                //对应的第几步
                prams:'',
                level_type_url:'/ancient_books/get_menu_items.action',
                search_office:'/ancient_books/get_office_list_by_name.action',
                search_ins:'/ancient_books/get_institution_list_by_name.action',
                //添加后删除符号以便删除
                show_input:false,
                show_s_office:false,
                show_ins:false,
                show_begin_time:false,
                show_end_time:false,
                //打开对应的时间模态框
                time_modal_1:false,
                time_modal_2:false,
                //打开对应的搜索模态框
                s_office_modal:false,
                ins_modal:false,
                level_type:[],
                input_off:{
                    standard_name:'',
                    office_name:'',
                    english:'',
                    other_name:'',
                    institution_id:'',
                    institution_name:'',
                    s_office_id:'',
                    s_office_name:'',
                    dynasty:'',
                    selected_level:{
                        item_1_id:0,
                        chinese_name:''
                    },
                    begin_time_id:'',
                    begin_standard_time:'',
                    end_time_id:'',
                    end_standard_time:'',
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
                repeat_noumenon:'职官本体'
            }
        },

        methods:{
            /*品级下拉框*/
            get_level_type(){
                let object = {};
                let new_url = this.level_type_url+'?model_id=2&&item_1_id=0&&item_2_id=0';
                this.http_json(new_url,'get',object,this.success_level_type,this.fail_level_type);
            },

            success_level_type(response){
                for(let i = 0;i < response.body.g.length;i++){
                    this.level_type.push({
                        item_1_id:response.body.g[i].item_1_id,
                        chinese_name:response.body.g[i].chinese_name
                    })
                }
                if(this.$store.getters.get_build_off.selected_level.chinese_name !== ''){
                    this.show_off_info();
                } else{
                    this.input_off.selected_level.item_1_id = this.level_type[0].item_1_id;
                    this.input_off.selected_level.chinese_name = this.level_type[0].chinese_name;
                }
            },

            fail_level_type(){
                console.log("获取品级失败");
            },


            /*本体是否重复*/
            repeat_nou_2(){
                if(this.input_off.office_name !== '' && this.input_off.begin_standard_time !== '' && this.show_repeat=== false){
                    let repeat_object={};
                    let new_url= this.check_noumenon_repeat+'?name='+this.input_off.standard_name+'&&type=5';
                    this.http_json(new_url,'get',repeat_object,this.success_repeat,this.fail_repeat);
                }
            },

            success_repeat(response){
                if(response.body.result === 0){
                    this.$store.commit('change_fork',false);
                    this.show_repeat = true;
                    this.repeat_id = response.body.id;
                    console.log("职官本体重复");
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

            begin_off_time(p){
                this.input_off.begin_time_id = p.time_id;
                this.input_off.begin_standard_time = p.standard_name;
                this.close_begin();
                this.repeat_nou_2();
            },

            close_begin(){
                this.time_modal_1 = false;
            },

            delete_begin(){
                this.input_off.begin_standard_time = '';
                this.input_off.begin_time_id = '';
            },

            /*终止时间*/
            open_end(){
                this.time_modal_2 = true;
            },

            end_off_time(q){
                this.input_off.end_time_id = q.time_id;
                this.input_off.end_standard_time = q.standard_name;
                this.close_end();
            },

            close_end(){
                this.time_modal_2 = false;
            },

            delete_end(){
                this.input_off.end_standard_time = '';
                this.input_off.end_time_id = '';
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
                }
            },


            /*上级职官*/
            open_ins(){
                this.ins_modal = true;
            },

            add_ins(p){
                this.input_off.institution_id = p.noumenon_id;
                this.input_off.institution_name = p.standard_name;
            },

            delete_ins(){
                this.input_off.institution_id = '';
                this.input_off.institution_name = '';
            },

            close_ins(){
                this.ins_modal = false;
            },


            /*隶属机构*/
            open_s_office(){
                this.s_office_modal = true;
            },

            add_s_office(p){
                this.input_off.s_office_id = p.noumenon_id;
                this.input_off.s_office_name = p.standard_name;
            },

            delete_s_office(){
                this.input_off.s_office_id = '';
                this.input_off.s_office_name = '';
            },

            close_s_office(){
                this.s_office_modal = false;
            },


            /*下一步*/
            next_step(){
                this.input_off.remark_1_name = this.add_data[0].remark_name;
                this.input_off.remark_1 = this.add_data[0].remark;
                if(typeof this.add_data[1] !== 'undefined'){
                    this.input_off.remark_2_name = this.add_data[1].remark_name;
                    this.input_off.remark_2 = this.add_data[1].remark;
                }
                this.$store.commit("get_create_off",this.input_off);
                this.$router.push({path:'/offthree'});
            },

            /*第三步的“上一步”*/
            show_off_info(){
                this.input_off = this.$store.getters.get_build_off;
                this.add_data[0].remark_name = this.input_off.remark_1_name;
                this.add_data[0].remark = this.input_off.remark_1;
                if( this.input_off.remark_2_name !== ''|| this.input_off.remark_2 !== '') {
                    this.add_tip(0);
                    this.add_data[1].remark_name = this.input_ins.remark_2_name;
                    this.add_data[1].remark = this.input_ins.remark_2;
                }
            },

            pre_step(){
                this.$store.commit('get_create_one_selection',4);
                this.$router.push({name:'build'});
            }
        }
    }
</script>
