<template>
   <div class="zxwcreate">
        <p class="zxwcreate-title">新建本体</p>
        <img src="../../../../assets/img/no-use-picture/create-step2.png" class="zxwcreate-img">
        <create_word :prams="this.prams"></create_word>

        <div id="333">
            <p class="zxw-create-character" v-bind="standard_title"  v-model="input_ins.standard_name">本体名称：{{input_ins.standard_name}}</p>
            <div class="zxw-character-row">
                <label class="zxw-character-span zxw-must-write">机构名：</label>
                <input id="person_name" type="text"  class="zxw-character-input zxw-character-input-margin" v-model="input_ins.ins_name" v-bind:class="{'zxw-input-chinese':show_input}" :="repeat_nou_1">
                <label class="zxw-character-span">英译：</label>
                <input type="text" class="zxw-character-input" v-model="input_ins.english">
            </div>

            <div class="zxw-character-row">
                <label class="zxw-character-span">机构类型：</label>
                <select  class="zxw-ins-select zxw-character-input-margin" v-model="input_ins.type">
                   <option v-for="(item,index) in input_ins.type_ins" v-bind:value="item.id">{{item.option}}</option>
                </select>
                <label class="zxw-character-span">别名：</label>
                <input type="text" class="zxw-character-input" v-model="input_ins.other_name">
            </div>

            <div class="zxw-character-row">
                <label class="zxw-character-span">主管职：</label>
               <div  class="zxw-character-input zxw-character-input-margin">
                  <div class="zxw-div-input" placeholder="点击右侧按钮添加" v-bind:contenteditable="input_ins.chief_office_name !== ''">
                        <span class="zxw-person-relation-span"  @mouseover="show_chief_office = true" @mouseout="show_chief_office = false" v-if="input_ins.chief_office_name !== ''">
                            <span class="zxw-tag-font" v-model="input_ins.chief_office_name" >{{input_ins.chief_office_name}}</span>
                            <button class="zxw-add-hover-img" v-show="show_chief_office === true" @click="delete_chief_office()"></button>
                        </span>
                  </div>
                  <button class="zxw-input-add-character" @click="open_chief_office()"></button>
               </div>
                <label class="zxw-character-span">副官职：</label>
                <div  class="zxw-character-input">
                   <div class="zxw-div-input" placeholder="点击右侧按钮添加" v-bind:contenteditable="input_ins.vice_office_name !== ''">
                        <span class="zxw-person-relation-span"  @mouseover="show_vice_office = true" @mouseout="show_vice_office = false" v-if="input_ins.vice_office_name !== ''">
                            <span class="zxw-tag-font" v-model="input_ins.vice_office_name" >{{input_ins.vice_office_name}}</span>
                            <button class="zxw-add-hover-img" v-show="show_vice_office === true" @click="delete_vice_office()"></button>
                        </span>
                   </div>
                  <button class="zxw-input-add-character" @click="open_vice_office()"></button>
                </div>
            </div>

            <div class="zxw-character-row">
                <label class="zxw-character-span zxw-must-write">起始时间：</label>
                <div  class="zxw-character-input zxw-character-input-margin">
                    <div class="zxw-div-input" placeholder="点击右侧按钮添加" v-bind:contenteditable="input_ins.begin_standard_time !== ''">
                        <span class="zxw-person-relation-span"  @mouseover="show_begin_time = true" @mouseout="show_begin_time = false" v-if="input_ins.begin_standard_time !== ''">
                            <span class="zxw-tag-font" v-model="input_ins.begin_standard_time" >{{input_ins.begin_standard_time}}</span>
                            <button class="zxw-add-hover-img" v-show="show_begin_time===true" @click="delete_begin()"></button>
                        </span>
                    </div>
                    <button class="zxw-input-add-character" @click="open_begin()"></button>
                </div>
                <label class="zxw-character-span zxw-must-write">终止时间：</label>
                <div  class="zxw-character-input">
                    <div class="zxw-div-input" placeholder="点击右侧按钮添加" v-bind:contenteditable="input_ins.end_standard_time !== ''">
                        <span class="zxw-person-relation-span"  @mouseover="show_end_time = true" @mouseout="show_end_time = false" v-if="input_ins.end_standard_time !== ''">
                            <span class="zxw-tag-font" v-model="input_ins.end_standard_time" >{{input_ins.end_standard_time}}</span>
                            <button class="zxw-add-hover-img" v-show="show_end_time===true" @click="delete_end()"></button>
                        </span>
                    </div>
                    <button class="zxw-input-add-character" @click="open_end()"></button>
                </div>
            </div>

            <div class="zxw-character-row">
                <label class="zxw-character-span">上级机构：</label>
                <div  class="zxw-character-input zxw-character-input-margin">
                    <div class="zxw-div-input" placeholder="点击右侧按钮添加" v-bind:contenteditable="input_ins.parent_body_name !== ''">
                        <span class="zxw-person-relation-span"  @mouseover="show_parent_ins = true" @mouseout="show_parent_ins = false" v-if="input_ins.parent_body_name !== ''">
                            <span class="zxw-tag-font" v-model="input_ins.parent_body_name" >{{input_ins.parent_body_name}}</span>
                            <button class="zxw-add-hover-img" v-show="show_parent_ins === true" @click="delete_parent_ins()"></button>
                        </span>
                    </div>
                    <button class="zxw-input-add-character" @click="open_parent_ins()"></button>
                </div>
            </div>

            <div v-for="(item ,index) in add_data">
                <input type="text" class="zxw-character-input-head zxw-character-input" v-model="item.remark_name">
                <input type="text" class="zxw-character-input" v-bind:readonly="item.remark_name === ''&&item.remark === ''" v-model="item.remark">
                <button class="zxw-add-button" @click="add_tip(index)" v-show="add_data[index].value" :disabled="add_data.length >=2">添加</button>
            </div>

            <div class="zxw-build-step2-btn">
                <button class="zxw-prebtn zxw-prebtn-margin zxw-prebtn-length" @click="pre_step()">上一步</button>
                <button class="zxw-nextbtn zxw-nextbtn-length" @click="next_step()" v-bind:disabled="input_ins.begin_time_id === ''|| input_ins.end_time_id === ''||input_ins.ins_name === ''|| show_input === true|| repeat_id !== '' ||(add_data[0].remark_name === '' && add_data[0].remark !== '' )||(add_data[1] !== undefined && add_data[1].remark_name === '' && add_data[1].remark !=='')" >下一步</button>
            </div>
        </div>

        <time_modal :time_modal="this.time_modal_1" v-on:success_time="begin_place_time" v-on:close_modal="close_begin()"></time_modal>
        <time_modal :time_modal="this.time_modal_2" v-on:success_time="end_place_time" v-on:close_modal="close_end()"></time_modal>

        <search_modal :search_url="this.search_office" :noumenon_modal="this.chief_office_modal" :noumenon_number="5" :repeat_arr="[]"  v-on:close_modal="close_chief_office" v-on:add_noumenon_relations="add_chief_office"></search_modal>
        <search_modal :search_url="this.search_office" :noumenon_modal="this.vice_office_modal" :noumenon_number="5" :repeat_arr="[]" v-on:close_modal="close_vice_office" v-on:add_noumenon_relations="add_vice_office"></search_modal>
        <search_modal :search_url="this.search_ins" :noumenon_modal="this.parent_ins_modal" :noumenon_number="6" :repeat_arr="[]" v-on:close_modal="close_parent_ins" v-on:add_noumenon_relations="add_parent_ins"></search_modal>

        <!--若机构本体规范已存在的模态框-->
        <repeat_modal :show_repeat="this.show_repeat" :repeat_name="this.input_ins.standard_name" :repeat_id="this.repeat_id" :repeat_noumenon="this.repeat_noumenon" v-on:close_modal="close_repeat"></repeat_modal>

    </div>
</template>

<script>

    import create_word from '../../../../component/create-word.vue';
    import time_modal from '../../../../component/time-modal.vue';
    import search_modal from '../../../../component/search_noumenon.vue';
    import repeat_modal from '../../../../component/repeat_modal.vue';
    export default{
        beforeRouteLeave(to,from,next){
            if(to.name !== 'institutionthree'){
                //清空Vuex
                this.$store.getters.get_build_ins.standard_name = '';
                this.$store.getters.get_build_ins.ins_name='';
                this.$store.getters.get_build_ins.type=0;
                this.$store.getters.get_build_ins.type_ins.splice(0,this.$store.getters.get_build_ins.type_ins.length);
                this.$store.getters.get_build_ins.english='';
                this.$store.getters.get_build_ins.other_name='';
                this.$store.getters.get_build_ins.begin_time_id='';
                this.$store.getters.get_build_ins.end_time_id='';
                this.$store.getters.get_build_ins.begin_standard_time='';
                this.$store.getters.get_build_ins.end_standard_time='';
                this.$store.getters.get_build_ins.remark_1_name='';
                this.$store.getters.get_build_ins.remark_2_name='';
                this.$store.getters.get_build_ins.remark_1='';
                this.$store.getters.get_build_ins.remark_2='';
                next();
            } else{
                next();
            }
        },

        created(){
            this.prams = this.$route.name;
            this.show_ins_info();
            this.get_ins_type();

        },

        components:{
            create_word,
            time_modal,
            search_modal,
            repeat_modal,
        },

        computed:{
            standard_title(){
                if( this.input_ins.begin_standard_time !== '' ){
                    this.input_ins.standard_name = this.input_ins.ins_name +'('+this.input_ins.begin_standard_time+')';
                } else {
                    this.input_ins.standard_name = this.input_ins.ins_name;
                }
            },

            repeat_nou_1(){
                /*检查机构名仅能输入中文*/
                if(this.input_ins.ins_name !== '') {
                    if(!/^[\u4E00-\u9FA5]*$/.test(this.input_ins.ins_name)) {
                        this.show_input = true;
                    } else {
                        this.show_input = false;
                    }
                } else if(this.input_ins.ins_name === ''){
                    this.show_input = false;
                }

                /*判断机构本体名称是否重复*/
                if(this.input_ins.ins_name !== '' && this.input_ins.begin_standard_time !== '' && this.show_input === false){
                    let repeat_object={};
                    let new_url= this.check_noumenon_repeat+'?name='+this.input_ins.standard_name+'&&type=6';
                    this.http_json(new_url,'get',repeat_object,this.success_repeat,this.fail_repeat);
                }
            }
        },

        data(){
            return{
                //对应的第几步
                prams:'',
                ins_type:'/ancient_books/get_menu_items.action',
                search_office:'/ancient_books/get_office_list_by_name.action',
                search_ins:'/ancient_books/get_institution_list_by_name.action',
                //添加后删除符号以便删除
                show_input:false,
                show_chief_office:false,
                show_vice_office:false,
                show_parent_ins:false,
                show_begin_time:false,
                show_end_time:false,
                //打开对应的时间模态框
                time_modal_1:false,
                time_modal_2:false,
                //打开对应的搜索模态框
                chief_office_modal:false,
                vice_office_modal:false,
                parent_ins_modal:false,
                input_ins:{
                    standard_name:'',
                    ins_name:'',
                    type:1,
                    type_ins:[],
                    english:'',
                    other_name:'',
                    begin_time_id:'',
                    begin_standard_time:'',
                    end_time_id:'',
                    end_standard_time:'',
                    remark_1_name:'',
                    remark_2_name:'',
                    remark_1:'',
                    remark_2:'',
                    chief_office_id:'',
                    chief_office_name:'',
                    vice_office_id:'',
                    vice_office_name:'',
                    parent_body_id:'',
                    parent_body_name:''
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
                repeat_noumenon:'机构本体'
            }
        },

        methods:{
           /*机构类型下拉框*/
            get_ins_type(){
                let object = {};
                let new_url = this.ins_type+'?model_id=1&&item_1_id=0&&item_2_id=0';
                this.http_json(new_url,'get',object,this.success_ins_type,this.fail_ins_type);
            },

            success_ins_type(response){
                for(let i = 0;i < response.body.length;i++){
                    this.input_ins.type_ins.push({
                        id:response.body[i].item_1_id,
                        option:response.body[i].chinese_name
                    })
                }
                console.log('type_ins:'+JSON.stringify(this.input_ins.type_ins));
            },

            fail_ins_type(){
                console.log("获取机构类型失败");
            },


            /*本体是否重复*/
            repeat_nou_2(){
                if(this.input_ins.ins_name !== '' && this.input_ins.begin_standard_time !== '' && this.show_repeat=== false){
                    let repeat_object={};
                    let new_url= this.check_noumenon_repeat+'?name='+this.input_ins.standard_name+'&&type=6';
                    this.http_json(new_url,'get',repeat_object,this.success_repeat,this.fail_repeat);
                }
            },

            success_repeat(response){
                if(response.body.result === 0){
                    this.$store.commit('change_fork',false);
                    this.show_repeat = true;
                    this.repeat_id = response.body.id;
                    console.log("机构本体重复");
                } else if(response.body.result === 1){
                    this.repeat_id = '';
                    console.log("没有重复信息");
                    console.log(JSON.stringify(this.repeat_id));
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

            begin_place_time(p){
                this.input_ins.begin_time_id = p.time_id;
                this.input_ins.begin_standard_time = p.standard_name;
                this.close_begin();
                this.repeat_nou_2();
            },

            close_begin(){
                this.time_modal_1 = false;
            },

            delete_begin(){
                this.input_ins.begin_standard_time = '';
                this.input_ins.begin_time_id = '';
            },

            /*终止时间*/
            open_end(){
                this.time_modal_2 = true;
            },

            end_place_time(q){
                this.input_ins.end_time_id = q.time_id;
                this.input_ins.end_standard_time = q.standard_name;
                this.close_end();
            },

            close_end(){
                this.time_modal_2 = false;
            },

            delete_end(){
                this.input_ins.end_standard_time = '';
                this.input_ins.end_time_id = '';
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


            /*上级机构*/
            open_parent_ins(){
                this.parent_ins_modal = true;
            },

            add_parent_ins(p){
                this.input_ins.parent_body_id = p.noumenon_id;
                this.input_ins.parent_body_name = p.standard_name;
                console.log('this.input_ins.parent_body_id: '+this.input_ins.parent_body_id);
                console.log('this.input_ins.parent_body_name: '+this.input_ins.parent_body_name);
            },

            delete_parent_ins(){
                this.input_ins.parent_body_id = '';
                this.input_ins.parent_body_name = '';
                console.log(JSON.stringify(this.input_ins));
            },

            close_parent_ins(){
                this.parent_ins_modal = false;
            },


            /*主管职*/
            open_chief_office(){
                this.chief_office_modal = true;
            },

            add_chief_office(p){
                this.input_ins.chief_office_id = p.noumenon_id;
                this.input_ins.chief_office_name = p.standard_name;
                console.log('this.input_ins.chief_office_id: '+this.input_ins.chief_office_id);
                console.log('this.input_ins.chief_office_name: '+this.input_ins.chief_office_name);
            },

            delete_chief_office(){
                this.input_ins.chief_office_id = '';
                this.input_ins.chief_office_name = '';
                console.log(JSON.stringify(this.input_ins));
            },

            close_chief_office(){
                this.chief_office_modal = false;
            },

            /*副管职*/
            open_vice_office(){
                this.vice_office_modal = true;
            },

            add_vice_office(p){
                this.input_ins.vice_office_id = p.noumenon_id;
                this.input_ins.vice_office_name = p.standard_name;
                console.log('this.input_ins.vice_office_id: '+this.input_ins.vice_office_id);
                console.log('this.input_ins.vice_office_name: '+this.input_ins.vice_office_name);
            },

            delete_vice_office(){
                this.input_ins.vice_office_id = '';
                this.input_ins.vice_office_name = '';
                console.log(JSON.stringify(this.input_ins));
            },

            close_vice_office(){
                this.vice_office_modal = false;
            },


            /*下一步*/
            next_step(){
                console.log('add_data:'+JSON.stringify(this.add_data));
                this.input_ins.remark_1_name = this.add_data[0].remark_name;
                this.input_ins.remark_1 = this.add_data[0].remark;
                if(typeof this.add_data[1] !== 'undefined'){
                    this.input_ins.remark_2_name = this.add_data[1].remark_name;
                    this.input_ins.remark_2 = this.add_data[1].remark;
                }
                this.$store.commit("get_create_ins",this.input_ins);
                this.$router.push({path:'/insthree'});
            },

            /*第三步的“上一步”*/
            show_ins_info(){
                this.input_ins = this.$store.getters.get_build_ins;
                this.add_data[0].remark_name = this.input_ins.remark_1_name;
                this.add_data[0].remark = this.input_ins.remark_1;
                if( this.input_ins.remark_2_name !== ''|| this.input_ins.remark_2 !== '') {
                    this.add_tip(0);
                    this.add_data[1].remark_name = this.input_ins.remark_2_name;
                    this.add_data[1].remark = this.input_ins.remark_2;
                }
            },

            pre_step(){
                this.$store.commit('get_create_one_selection',3);
                this.$router.push({name:'build'});
            }
        }
    }
</script>
