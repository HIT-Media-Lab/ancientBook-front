<template>
    <div class="zxwcreate">
        <p class="zxwcreate-title">新建本体</p>
        <img src="../../../../assets/img/no-use-picture/create-step2.png" class="zxwcreate-img">
        <create_word :prams="this.prams"></create_word>

        <div id="333">
            <p class="zxw-create-character" v-bind="standard_title"  v-model="input_place.standard_name">本体名称：{{input_place.standard_name}}</p>
            <div class="zxw-character-row">
                <label class="zxw-character-span zxw-must-write">地名：</label>
                <input id="pla_name" type="text"  class="zxw-character-input zxw-character-input-margin zxw-input-placeholder" placeholder="请输入中文" v-model="input_place.location_name" v-bind:class="{'zxw-input-chinese':show_input}" onfocus="placeholder=''" @blur="pla_name_tip()">
                <label class="zxw-character-span">英译：</label>
                <input type="text" class="zxw-character-input" v-model="input_place.english">
            </div>

            <div class="zxw-character-row">
                <label class="zxw-character-span">别名：</label>
                <input type="text" class="zxw-character-input zxw-character-input-margin" v-model="input_place.other_name">
                <label class="zxw-character-span">经度：</label>
                <input id="longitude" type="text" class="zxw-character-input zxw-input-placeholder" placeholder="请输入数字" v-model="input_place.longitude" onfocus="placeholder=''" @blur="number_longitude()" v-bind:class="{'zxw-input-chinese':show_longitude}">
            </div>

            <div class="zxw-character-row">
                <label class="zxw-character-span">纬度：</label>
                <input type="text" id="latitude" class="zxw-character-input zxw-character-input-margin zxw-input-placeholder" placeholder="请输入数字" v-model="input_place.latitude" :="number_latitude" v-bind:class="{'zxw-input-chinese':show_latitude}">
                <label class="zxw-character-span">今所在：</label>
                <input type="text" class="zxw-character-input" v-model="input_place.location_today">
            </div>

            <div class="zxw-character-row">
                <label class="zxw-character-span zxw-must-write">起始时间：</label>
                <div  class="zxw-character-input zxw-character-input-margin">
                    <div class="zxw-div-input" placeholder="点击右侧按钮添加" v-bind:contenteditable="input_place.begin_standard_time !== ''">
                        <span class="zxw-person-relation-span"  @mouseover="show_begin_time = true" @mouseout="show_begin_time = false" v-if="input_place.begin_standard_time !== ''">
                            <span class="zxw-tag-font" v-model="input_place.begin_standard_time" >{{input_place.begin_standard_time}}</span>
                            <button class="zxw-add-hover-img" v-show="show_begin_time===true" @click="delete_begin()"></button>
                        </span>
                    </div>
                    <button class="zxw-input-add-character" @click="open_begin()"></button>
                </div>
                <label class="zxw-character-span zxw-must-write">终止时间：</label>
                <div  class="zxw-character-input">
                    <div class="zxw-div-input" placeholder="点击右侧按钮添加" v-bind:contenteditable="input_place.end_standard_time !== ''">
                        <span class="zxw-person-relation-span"  @mouseover="show_end_time = true" @mouseout="show_end_time = false" v-if="input_place.end_standard_time !== ''">
                            <span class="zxw-tag-font" v-model="input_place.end_standard_time" >{{input_place.end_standard_time}}</span>
                            <button class="zxw-add-hover-img" v-show="show_end_time===true" @click="delete_end()"></button>
                        </span>
                    </div>
                    <button class="zxw-input-add-character" @click="open_end()"></button>
                </div>
            </div>

            <div class="zxw-character-row">
                <label class="zxw-character-span">上级地名：</label>
                <div  class="zxw-character-input zxw-character-input-margin">
                    <div class="zxw-div-input" placeholder="点击右侧按钮添加" v-bind:contenteditable="input_place.s_location_standard_name !== ''">
                        <span class="zxw-person-relation-span"  @mouseover="show_s_location = true" @mouseout="show_s_location = false" v-if="input_place.s_location_standard_name !== ''">
                            <span class="zxw-tag-font" v-model="input_place.s_location_standard_name" >{{input_place.s_location_standard_name}}</span>
                            <button class="zxw-add-hover-img" v-show="show_s_location===true" @click="delete_s_location()"></button>
                        </span>
                    </div>
                    <button class="zxw-input-add-character" @click="open_s_location()"></button>
                </div>
                <label class="zxw-character-span">下级地名：</label>
                <div  class="zxw-character-input">
                    <div class="zxw-div-input" placeholder="点击右侧按钮添加" v-bind:contenteditable="input_place.l_location_standard_name !== ''">
                        <span class="zxw-person-relation-span"  @mouseover="show_l_location = true" @mouseout="show_l_location = false" v-if="input_place.l_location_standard_name !== ''">
                            <span class="zxw-tag-font" v-model="input_place.l_location_standard_name">{{input_place.l_location_standard_name}}</span>
                            <button class="zxw-add-hover-img" v-show="show_l_location ===true" @click="delete_l_location()"></button>
                        </span>
                    </div>
                    <button class="zxw-input-add-character" @click="open_l_location()"></button>
                </div>
            </div>

            <div class="zxw-character-row">
                <label class="zxw-character-span">治所：</label>
                <div  class="zxw-character-input zxw-character-input-margin">
                    <div class="zxw-div-input" placeholder="点击右侧按钮添加"  @keydown="down_delete()" v-bind:contenteditable="input_place.seat_standard_name.length !== 0" >
                        <span class="zxw-person-relation-span" v-for="(item,index) in input_place.seat_standard_name"  @mouseover="show_seat = index" @mouseout="show_seat =-1">
                            <span class="zxw-tag-font">{{item}}</span>
                            <button class="zxw-add-hover-img"  v-show="show_seat === index" @click="delete_seat(index)"></button>
                        </span>
                    </div>
                    <button class="zxw-input-add-character" @click="open_seat()"></button>
                </div>
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

        <time_modal :time_modal="this.time_modal_1" v-on:success_time="begin_place_time" v-on:close_modal="close_begin()"></time_modal>
        <time_modal :time_modal="this.time_modal_2" v-on:success_time="end_place_time" v-on:close_modal="close_end()"></time_modal>

        <search_modal :search_url="this.search_location" :noumenon_modal="this.s_location_modal" :noumenon_number="7" :repeat_arr="[]"  v-on:close_modal="close_s_location" v-on:add_noumenon_relations="add_s_location"></search_modal>
        <search_modal :search_url="this.search_location" :noumenon_modal="this.l_location_modal" :noumenon_number="7" :repeat_arr="[]" v-on:close_modal="close_l_location" v-on:add_noumenon_relations="add_l_location"></search_modal>
        <search_modal :search_url="this.search_location" :noumenon_modal="this.seat_modal" :noumenon_number="7" :repeat_arr="this.input_place.seat_standard_name" v-on:close_modal="close_seat" v-on:add_noumenon_relations="add_seat"></search_modal>

        <!--若人物本体规范已存在的模态框-->
        <repeat_modal :show_repeat="this.show_repeat" :repeat_name="this.input_place.standard_name" :repeat_id="this.repeat_id" :repeat_noumenon="this.repeat_noumenon" v-on:close_modal="close_repeat"></repeat_modal>
        <warning_modal :show_info="show_next_step" :tip="'请填写完整必填信息(红字标注)!'" v-on:close_modal="close_next_error"></warning_modal>
    </div>
</template>

<script>
    /*let Mock = require('mockjs');
     Mock.mock('/ancient_books/check_noumenon_standard_name.action?name=%E9%B9%BF%E6%99%97(%E5%AE%8B%E6%9C%9D)&&type=1','get', {
     "status|200":200,
     "result|0":1,
     "id:|250":250
     });

     Mock.mock('/ancient_books/check_noumenon_standard_name.action?name=%E5%93%88%E5%93%88(%E5%AE%8B%E6%9C%9D)&&type=1','get', {
     "status|200":200,
     "result|1":0,
     "id:|300":250
     });*/

    import create_word from '../../../../component/create-word.vue';
    import time_modal from '../../../../component/time-modal.vue';
    import search_modal from '../../../../component/search_noumenon.vue';
    import repeat_modal from '../../../../component/repeat_modal.vue';
    import warning_modal from '../../../../component/warning_noumenon.vue';
    export default{
        beforeRouteLeave(to,from,next){
            if(to.name !== 'placethree'){
                //清空Vuex
                this.$store.getters.get_build_place.standard_name = '';
                this.$store.getters.get_build_place.location_name='';
                this.$store.getters.get_build_place.longitude='';
                this.$store.getters.get_build_place.latitude='';
                this.$store.getters.get_build_place.location_today='';
                this.$store.getters.get_build_place.other_name='';
                this.$store.getters.get_build_place.begin_time_id='';
                this.$store.getters.get_build_place.end_time_id='';
                this.$store.getters.get_build_place.begin_standard_time='';
                this.$store.getters.get_build_place.end_standard_time='';
                this.$store.getters.get_build_place.remark_1_name='';
                this.$store.getters.get_build_place.remark_2_name='';
                this.$store.getters.get_build_place.remark_1='';
                this.$store.getters.get_build_place.remark_2='';
                this.$store.getters.get_build_place.english='';
                this.$store.getters.get_build_place.s_location_id='';
                this.$store.getters.get_build_place.l_location_id='';
                this.$store.getters.get_build_place.s_location_standard_name='';
                this.$store.getters.get_build_place.l_location_standard_name='';
                this.$store.getters.get_build_place.seat_id.splice(0,this.$store.getters.get_build_place.seat_id.length);
                this.$store.getters.get_build_place.seat_standard_name.splice(0,this.$store.getters.get_build_place.seat_standard_name.length);
                next();
            } else{
                next();
            }
        },

        created(){
            this.prams = this.$route.name;
            this.show_place_info();

        },

        components:{
            create_word,
            time_modal,
            search_modal,
            repeat_modal,
            warning_modal
        },

        computed:{
            /*经度六位小数*/
            number_longitude(){
                if(this.input_place.longitude !== ''){
                    if(!/^(?:[\+\-]?\d+(?:\.\d+)?)?$/.test(this.input_place.longitude)){
                        this.show_longitude = true;
                    } else {
                        this.show_longitude = false;
                    }
                } else if (this.input_place.longitude === ''){
                    this.show_longitude = false;
                }
            },

            /*纬度六位小数*/
            number_latitude(){
                if(this.input_place.latitude !== ''){
                    if(!/^\d+(\.\d{6})*$/.test(this.input_place.latitude)){
                        this.show_latitude = true;
                    } else {
                        this.show_latitude = false;
                    }
                } else if (this.input_place.longitude === ''){
                    this.show_latitude = false;
                }
            },

            standard_title(){
                if( this.input_place.begin_standard_time !== '' ){
                    this.input_place.standard_name = this.input_place.location_name +'('+this.input_place.begin_standard_time+')';
                } else {
                    this.input_place.standard_name = this.input_place.location_name;
                }
            }
        },

        data(){
            return{
                //对应的第几步
                prams:'',
                search_location:'/ancient_books/get_location_list_by_name.action',
                //添加后删除符号以便删除
                show_input:false,
                show_s_location:false,
                show_l_location:false,
                show_longitude:false,
                show_latitude:false,
                show_begin_time:false,
                show_end_time:false,
                show_seat:0,
                //打开对应的时间模态框
                time_modal_1:false,
                time_modal_2:false,
                //打开对应的搜索模态框
                s_location_modal:false,
                l_location_modal:false,
                seat_modal:false,
                show_next_step:false,
                input_place:{
                    standard_name:'',
                    location_name:'',
                    longitude:'',
                    latitude:'',
                    location_today:'',
                    other_name:'',
                    begin_time_id:'',
                    begin_standard_time:'',
                    end_time_id:'',
                    end_standard_time:'',
                    remark_1_name:'',
                    remark_2_name:'',
                    remark_1:'',
                    remark_2:'',
                    english:'',
                    s_location_id:'',
                    l_location_id:'',
                    seat_id:[],
                    s_location_standard_name:'',
                    l_location_standard_name:'',
                    seat_standard_name:[]
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
                repeat_noumenon:'地点本体'
            }
        },

        methods:{

            pla_name_tip(){
                /*检查地名仅能输入中文*/
                if(this.input_place.location_name !== '') {
                    if(!/^[\u4E00-\u9FA5]*$/.test(this.input_place.location_name)) {
                        this.show_input = true;
                        this.input_place.location_name = '';
                        document.getElementById("pla_name").placeholder='请输入中文';
                    } else {
                        this.show_input = false;
                    }
                } else if(this.input_place.location_name === ''){
                    this.show_input = true;
                    document.getElementById("pla_name").placeholder='地名不能为空';
                }

                /*判断地名本体名称是否重复*/
                if(this.input_place.location_name !== '' && this.input_place.begin_standard_time !== '' && this.show_input === false){
                    let repeat_object={};
                    let new_url= this.check_noumenon_repeat+'?name='+this.input_place.standard_name+'&&type=7';
                    this.http_json(new_url,'get',repeat_object,this.success_repeat,this.fail_repeat);
                }
            },

            /*本体是否重复*/
            repeat_nou_2(){
                if(this.input_place.location_name !== '' && this.input_place.begin_standard_time !== '' && this.show_repeat=== false){
                    let repeat_object={};
                    let new_url= this.check_noumenon_repeat+'?name='+this.input_place.standard_name+'&&type=7';
                    this.http_json(new_url,'get',repeat_object,this.success_repeat,this.fail_repeat);
                }
            },

            success_repeat(response){
                if(response.body.result === 0){
                    this.$store.commit('change_fork',false);
                    this.show_repeat = true;
                    this.repeat_id = response.body.id;
                    console.log("地名本体重复");
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

            /*治所禁止键盘输入*/
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
                this.input_place.begin_time_id = p.time_id;
                this.input_place.begin_standard_time = p.standard_name;
                this.close_begin();
                this.repeat_nou_2();
            },

            close_begin(){
                this.time_modal_1 = false;
            },

            delete_begin(){
                this.input_place.begin_standard_time = '';
                this.input_place.begin_time_id = '';
            },

            /*终止时间*/
            open_end(){
                this.time_modal_2 = true;
            },

            end_place_time(q){
                this.input_place.end_time_id = q.time_id;
                this.input_place.end_standard_time = q.standard_name;
                this.close_end();
            },

            close_end(){
                this.time_modal_2 = false;
            },

            delete_end(){
                this.input_place.end_standard_time = '';
                this.input_place.end_time_id = '';
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


            /*上级地名*/
            open_s_location(){
                this.s_location_modal = true;
            },

            add_s_location(p){
                this.input_place.s_location_id = p.noumenon_id;
                this.input_place.s_location_standard_name= p.standard_name;
                console.log('this.input_place.s_location_id: '+this.input_place.s_location_id);
                console.log('this.input_place.s_location_standard_name: '+this.input_place.s_location_standard_name);
            },

            delete_s_location(){
                this.input_place.s_location_id = '';
                this.input_place.s_location_standard_name = '';
                console.log(JSON.stringify(this.input_place));
            },

            close_s_location(){
                this.s_location_modal = false;
            },


            /*下级地名*/
            open_l_location(){
                this.l_location_modal = true;
            },

            add_l_location(p){
                this.input_place.l_location_id = p.noumenon_id;
                this.input_place.l_location_standard_name= p.standard_name;
                console.log('this.input_place.l_location_id: '+this.input_place.l_location_id);
                console.log('this.input_place.l_location_standard_name: '+this.input_place.l_location_standard_name);
            },

            delete_l_location(){
                this.input_place.l_location_id = '';
                this.input_place.l_location_standard_name = '';
                console.log(JSON.stringify(this.input_place));
            },

            close_l_location(){
                this.l_location_modal = false;
            },

            /*治所*/
            open_seat(){
                this.seat_modal = true;
            },

            add_seat(p){
                this.input_place.seat_id.push({
                    location_id : p.noumenon_id
                });

                this.input_place.seat_standard_name.push(p.standard_name);
                console.log('this.input_place.seat_standard_name: '+JSON.stringify( this.input_place.seat_standard_name));
                console.log('this.input_place.seat_id: '+JSON.stringify(this.input_place.seat_id));
            },

            delete_seat(){
                this.input_place.seat_standard_name.splice(p,1);
                this.input_place.seat_id.splice(p,1);
                console.log('splice seat:'+JSON.stringify(this.input_place.son));
            },

            close_seat(){
                this.seat_modal = false;
            },


            /*下一步*/
            next_step(){
                if(this.input_place.begin_time_id === ''|| this.input_place.end_time_id === ''||this.input_place.location_name === ''|| this.show_input === true|| this.repeat_id !== '' ||(this.add_data[0].remark_name === '' && this.add_data[0].remark !== '' )||(this.add_data[1] !== undefined && this.add_data[1].remark_name === '' && this.add_data[1].remark !=='')||this.show_latitude === true||this.show_longitude === true){
                    this.show_next_step = true;
                }else{
                    this.input_place.remark_1_name = this.add_data[0].remark_name;
                    this.input_place.remark_1 = this.add_data[0].remark;
                    if(typeof this.add_data[1] !== 'undefined'){
                        this.input_place.remark_2_name = this.add_data[1].remark_name;
                        this.input_place.remark_2 = this.add_data[1].remark;
                    }
                    this.$store.commit("get_create_place",this.input_place);
                    this.$router.push({path:'/plathree'});
                }
            },

            /*第三步的“上一步”*/
            show_place_info(){
                this.input_place = this.$store.getters.get_build_place;
                //alert(JSON.stringify(this.input_place));
                this.add_data[0].remark_name = this.input_place.remark_1_name;
                this.add_data[0].remark = this.input_place.remark_1;
                if( this.input_place.remark_2_name !== ''|| this.input_place.remark_2 !== '') {
                    this.add_tip(0);
                    this.add_data[1].remark_name = this.input_place.remark_2_name;
                    this.add_data[1].remark = this.input_place.remark_2;
                }
            },

            pre_step(){
                this.$store.commit('get_create_one_selection',1);
                this.$router.push({name:'build'});
            },

            close_next_error(){
                this.show_next_step = false;
            },
        }
    }
</script>

<style>

</style>