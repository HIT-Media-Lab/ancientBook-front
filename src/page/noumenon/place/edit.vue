<template>
    <div>
        <noumenon_title :title="edit_place_title"> </noumenon_title>
        <div style="margin-left:60px">
            <p class="zxw-create-character" v-bind="standard_title"  v-model="input_content.standard_name">本体名称：{{input_content.standard_name}}</p>
            <div class="zxw-character-row">
                <label class="zxw-character-span zxw-must-write">地名：</label>
                <input id="person_name" type="text"  class="zxw-character-input zxw-edit-character-input-margin" v-model="input_content.location_name" v-bind:class="{'zxw-input-chinese':show_input}" :="repeat_nou_1">
                <label class="zxw-character-span">英译：</label>
                <input type="text" class="zxw-character-input" v-model="input_content.english">
            </div>

            <div class="zxw-character-row">
                <label class="zxw-character-span">别名：</label>
                <input type="text" class="zxw-character-input zxw-edit-character-input-margin" v-model="input_content.other_name">
                <label class="zxw-character-span">经度：</label>
                <input type="text" class="zxw-character-input" v-model="input_content.longitude" :="number_longitude" v-bind:class="{'zxw-input-chinese':show_longitude}">
            </div>

            <div class="zxw-character-row">
                <label class="zxw-character-span">纬度：</label>
                <input type="text" class="zxw-character-input zxw-edit-character-input-margin" v-model="input_content.latitude" :="number_latitude" v-bind:class="{'zxw-input-chinese':show_latitude}">
                <label class="zxw-character-span">今所在：</label>
                <input type="text" class="zxw-character-input" v-model="input_content.location_today">
            </div>

            <div class="zxw-character-row">
                <label class="zxw-character-span zxw-must-write">起始时间：</label>
                <div  class="zxw-character-input zxw-edit-character-input-margin">
                    <div class="zxw-div-input" placeholder="点击右侧按钮添加" v-bind:contenteditable="input_content.begin_time_name !== ''">
                        <span class="zxw-person-relation-span"  @mouseover="show_begin_time = true" @mouseout="show_begin_time = false" v-if="input_content.begin_time_name !== ''">
                            <span class="zxw-tag-font" v-model="input_content.begin_time_name" >{{input_content.begin_time_name}}</span>
                            <button class="zxw-add-hover-img" v-show="show_begin_time===true" @click="delete_begin()"></button>
                        </span>
                    </div>
                    <button class="zxw-input-add-character" @click="open_begin()"></button>
                </div>
                <label class="zxw-character-span zxw-must-write">终止时间：</label>
                <div  class="zxw-character-input">
                    <div class="zxw-div-input" placeholder="点击右侧按钮添加" v-bind:contenteditable="input_content.end_time_name !== ''">
                        <span class="zxw-person-relation-span"  @mouseover="show_end_time = true" @mouseout="show_end_time = false" v-if="input_content.end_time_name !== ''">
                            <span class="zxw-tag-font" v-model="input_content.end_time_name" >{{input_content.end_time_name}}</span>
                            <button class="zxw-add-hover-img" v-show="show_end_time===true" @click="delete_end()"></button>
                        </span>
                    </div>
                    <button class="zxw-input-add-character" @click="open_end()"></button>
                </div>
            </div>

            <div class="zxw-character-row">
                <label class="zxw-character-span">上级地名：</label>
                <div  class="zxw-character-input zxw-edit-character-input-margin">
                    <div class="zxw-div-input" placeholder="点击右侧按钮添加" v-bind:contenteditable="input_content.s_location_name !== ''">
                        <span class="zxw-person-relation-span"  @mouseover="show_s_location = true" @mouseout="show_s_location = false" v-if="input_content.s_location_name !== ''">
                            <span class="zxw-tag-font" v-model="input_content.s_location_name" >{{input_content.s_location_name}}</span>
                            <button class="zxw-add-hover-img" v-show="show_s_location===true" @click="delete_s_location()"></button>
                        </span>
                    </div>
                    <button class="zxw-input-add-character" @click="open_s_location()"></button>
                </div>
                <label class="zxw-character-span">下级地名：</label>
                <div  class="zxw-character-input">
                    <div class="zxw-div-input" placeholder="点击右侧按钮添加" v-bind:contenteditable="input_content.l_location_name !== ''">
                        <span class="zxw-person-relation-span"  @mouseover="show_l_location = true" @mouseout="show_l_location = false" v-if="input_content.l_location_name !== ''">
                            <span class="zxw-tag-font" v-model="input_content.l_location_name" >{{input_content.l_location_name}}</span>
                            <button class="zxw-add-hover-img" v-show="show_l_location===true" @click="delete_l_location()"></button>
                        </span>
                    </div>
                    <button class="zxw-input-add-character" @click="open_l_location()"></button>
                </div>
            </div>

            <div class="zxw-character-row">
                <label class="zxw-character-span">治所：</label>
                <div  class="zxw-character-input">
                    <div id="son" class="zxw-div-input" placeholder="点击右侧按钮添加" @keydown="down_delete()" v-bind:contenteditable="input_content.seat_standard_name.length !== 0">
                        <span class="zxw-person-relation-span" v-for="(item,index) in input_content.seat_standard_name"  @mouseover="show_seat=index" @mouseout="show_seat =-1">
                            <span class="zxw-tag-font">{{item}}</span>
                            <button class="zxw-add-hover-img" v-show="show_seat === index" @click="delete_seat(index)"></button>
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

            <div class="zxw-edit-btn">
                <button class="zxw-prebtn zxw-prebtn-margin zxw-prebtn-length" @click="cancel_edit()">取消</button>
                <button class="zxw-nextbtn zxw-nextbtn-length" @click="finish_edit()" v-bind:disabled="input_content.begin_time_name === ''|| input_content.end_time_name === ''||input_content.location_name === ''|| show_input === true|| repeat_id !== '' ||(add_data[0].remark_name === ''&& add_data[0].remark !== '')||(add_data[1] !== undefined && add_data[1].remark_name === '' && add_data[1].remark !=='')||show_latitude === true||show_longitude === true">完成</button>
            </div>
        </div>

        <time_modal :time_modal="this.time_modal_1" v-on:success_time="begin_time" v-on:close_modal="close_begin()"></time_modal>
        <time_modal :time_modal="this.time_modal_2" v-on:success_time="end_time" v-on:close_modal="close_end()"></time_modal>

        <search_modal :search_url="this.search_location" :noumenon_modal="this.seat_modal" :noumenon_number="7" :repeat_arr="this.input_content.seat_standard_name" v-on:close_modal="close_seat" v-on:add_noumenon_relations="add_seat"></search_modal>
        <search_modal :search_url="this.search_location" :noumenon_modal="this.s_location_modal" :noumenon_number="7" :repeat_arr="[]" v-on:close_modal="close_s_location" v-on:add_noumenon_relations="add_s_location"></search_modal>
        <search_modal :search_url="this.search_location" :noumenon_modal="this.l_location_modal" :noumenon_number="7" :repeat_arr="[]" v-on:close_modal="close_l_location" v-on:add_noumenon_relations="add_l_location"></search_modal>
        <!--若地点本体规范已存在的模态框-->
        <repeat_modal :show_repeat="this.show_repeat" :repeat_name="this.input_content.standard_name" :repeat_id="this.repeat_id" :repeat_noumenon="this.repeat_noumenon" v-on:close_modal="close_repeat"></repeat_modal>
    </div>
</template>

<script>
    import noumenon_title from '../../../component/noumenon-title.vue';
    import time_modal from '../../../component/time-modal.vue';
    import search_modal from '../../../component/search_noumenon.vue';
    import repeat_modal from '../../../component/repeat_modal.vue';
    export default{
        created(){
            this.show_place();
        },

        components:{
            noumenon_title,
            time_modal,
            search_modal,
            repeat_modal,
        },

        computed:{
            /*经度六位小数*/
            number_longitude(){
                if(this.input_content.longitude !== ''){
                    if(!/^\d+(\.\d{6})*$/.test(this.input_content.longitude)){
                        this.show_longitude = true;
                    } else {
                        this.show_longitude = false;
                    }
                } else if (this.input_content.longitude === ''){
                    this.show_longitude = false;
                }
            },

            /*纬度六位小数*/
            number_latitude(){
                if(this.input_content.latitude !== ''){
                    if(!/^(?:[\+\-]?\d+(?:\.\d+)?)?$/.test(this.input_content.latitude)){
                        this.show_latitude = true;
                    } else {
                        this.show_latitude = false;
                    }
                } else if (this.input_content.longitude === ''){
                    this.show_latitude = false;
                }
            },

            standard_title(){
                if( this.input_content.begin_time_name !== '' ){
                    this.input_content.standard_name = this.input_content.location_name +'('+this.input_content.begin_time_name+')';
                } else {
                    this.input_content.standard_name = this.input_content.location_name;
                }
            },

            repeat_nou_1(){
                /*检查人名仅能输入中文*/
                if(this.input_content.location_name !== '') {
                    if(!/^[\u4E00-\u9FA5]*$/.test(this.input_content.location_name)) {
                        this.show_input = true;
                    } else {
                        this.show_input = false;
                    }
                } else if(this.input_content.location_name === ''){
                    this.show_input = false;
                }


                if(this.input_content.location_name !== '' && this.input_content.begin_time_name !== ''&& this.show_input === false){
                    let new_title = this.input_content.location_name+'('+this.input_content.begin_time_name+')';
                    if(new_title !== this.edit_place_title){
                        let repeat_object={};
                        let new_url= this.check_noumenon_repeat+'?name='+this.input_content.standard_name+'&&type=7';
                        this.http_json(new_url,'get',repeat_object,this.success_repeat,this.fail_repeat);
                    }
                }
            }

        },

        data(){
            return {
                search_location:'/ancient_books/get_location_list_by_name.action',
                edit_place_title:'',
                place_url:'/ancient_books/get_location_by_id.action',
                show_s_location:false,
                show_l_location:false,
                show_input:false,
                show_longitude:false,
                show_latitude:false,
                show_begin_time:false,
                show_end_time:false,
                show_seat:0,
                prams:'',
                s_location_modal:false,
                l_location_modal:false,
                time_modal_1:false,
                time_modal_2:false,
                seat_modal:false,
                input_content:{
                    standard_name:'',
                    location_name:'',
                    english:'',
                    longitude:'',
                    latitude:'',
                    other_name:'',
                    location_today:'',
                    begin_time_id:'',
                    begin_time_name:'',
                    end_time_id:'',
                    end_time_name:'',
                    remark_1_name:'',
                    remark_2_name:'',
                    remark_1:'',
                    remark_2:'',
                    s_location_id:'',
                    s_location_name:'',
                    l_location_id:'',
                    l_location_name:'',
                    seat:[],
                    seat_standard_name:[]
                },
                add_data:[{
                    value:true,
                    remark_name:'',
                    remark:''
                }],
                check_noumenon_repeat:'/ancient_books/check_noumenon_standard_name.action',
                show_repeat:false,
                repeat_id:'',
                repeat_noumenon:'地点本体',
                seat_delete:[],
                seat_modify:[],
                seat_add:[],
                modify_url:'/ancient_books/modify_location_by_id.action'
            }
        },
        methods:{
            /*人物本体关系禁止键盘输入*/
            down_delete(){
                let c = event.keyCode;
                if (c === 8 || c === 46||c===32||c===9||c===12||c===13||c===16||c===17||c===18||c===20||c===27||(c>=32&&c<=36)||c===38||c===40||c===45||(c >= 48 && c <= 57)||(c >= 65 && c <= 90)||(c >= 96 && c <= 123)||(c >= 186 && c <= 192)||(c >= 219 && c <= 222)) {
                    event.returnValue = false;
                }
            },

            /*根据id获取任务具体信息*/
            show_place(){
                let object = {};
                let new_url = this.place_url+'?id='+this.$route.params.nouId;
                this.http_json(new_url,'get',object,this.success_place,this.fail_place);
            },

            success_place(response){
                this.edit_place_title = response.body.standard_name;
                this.input_content.standard_name = response.body.standard_name;
                this.input_content.location_name = response.body.name;
                this.input_content.english = response.body.english;
                this.input_content.longitude = response.body.longitude;
                this.input_content.latitude = response.body.latitude;
                this.input_content.location_today = response.body.location_today;
                this.input_content.other_name = response.body.other_name;
                this.input_content.begin_time_id = response.body.begin_time_id;
                this.input_content.begin_time_name = response.body.begin_time_name;
                this.input_content.end_time_id = response.body.end_time_id;
                this.input_content.end_time_name = response.body.end_time_name;
                this.input_content.s_location_id = response.body.s__location_id;
                this.input_content.s_location_name = response.body.s_location_name;
                this.input_content.l_location_id = response.body.l__location_id;
                this.input_content.l_location_name = response.body.l_location_name;
                this.input_content.remark_1_name = response.body.remark_1_name;
                this.input_content.remark_2_name = response.body.remark_2_name;
                this.input_content.remark_1 = response.body.remark_1;
                this.input_content.remark_2 = response.body.remark_2;
                if(response.body.seat.length > 0){
                    for(let i =0; i < response.body.seat.length; i++){
                            this.input_content.seat_standard_name.push(response.body.seat[i].location_name);
                            this.input_content.seat.push({
                                relation_id:response.body.seat[i].relation_id,
                                location_id:response.body.seat[i].location_id,
                                location_name:response.body.seat[i].location_name
                            });
                    }
                }
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
            },

            fail_place(){
                console.log("获取地名信息失败");
            },

            /*本体是否重复*/
            repeat_nou_2(){
                if(this.input_content.location_name !== '' && this.input_content.begin_time_name !== ''&& this.show_input === false){
                    let repeat_object={};
                    let new_url= this.check_noumenon_repeat+'?name='+this.input_content.standard_name+'&&type=7';
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

            /*关联上级地名*/
            open_s_location(){
                this.s_location_modal = true;
            },

            add_s_location(p){
                this.input_content.s_location_id = p.noumenon_id;
                this.input_content.s_location_name = p.standard_name;
                console.log('this.input_content.s_location_id: '+this.input_content.s_location_id);
                console.log('this.input_content.s_location_name: '+this.input_content.s_location_name);
            },

            delete_s_location(){
                this.input_content.s_location_id = '';
                this.input_content.s_location_name = '';
                console.log(JSON.stringify(this.input_content));
            },

            close_s_location(){
                this.s_location_modal = false;
            },

            /*关联下级地名*/
            open_l_location(){
                this.l_location_modal = true;
            },

            add_l_location(p){
                this.input_content.l_location_id = p.noumenon_id;
                this.input_content.l_location_name = p.standard_name;
                console.log('this.input_content.l_location_id: '+this.input_content.l_location_id);
                console.log('this.input_content.l_location_name: '+this.input_content.l_location_name);
            },

            delete_l_location(){
                this.input_content.l_location_id = '';
                this.input_content.l_location_name = '';
                console.log(JSON.stringify(this.input_content));
            },

            close_l_location(){
                this.l_location_modal = false;
            },

            /*治所*/
            open_seat(){
                this.seat_modal = true;
            },

            add_seat(p){
                this.input_content.seat_standard_name.push(p.standard_name);
                this.input_content.seat.push({
                    location_id:p.noumenon_id,
                    location_name:p.standard_name
                });
                console.log('seat_standard_name: '+JSON.stringify( this.input_content.seat_standard_name));
                console.log('seat: '+JSON.stringify(this.input_content.seat));
            },

            delete_seat(p){
                this.input_content.seat_standard_name.splice(p,1);
                this.input_content.seat[p].location_name = undefined;
                this.input_content.seat[p].location_id = undefined;
                console.log('seat_standard_name: '+JSON.stringify( this.input_content.seat_standard_name));
                console.log('seat: '+JSON.stringify(this.input_content.seat));
            },

            close_seat(){
                this.seat_modal = false;
            },

            cancel_edit(){
                this.$router.push({name:'pla_detail',params:{nouId:this.$route.params.nouId}});
            },

            finish_edit(){

                for(let i = 0;i < this.input_content.seat.length;i++){
                    if(this.input_content.seat[i].relation_id !== undefined && this.input_content.seat[i].location_id === undefined && this.input_content.seat[i].location_name === undefined){
                        this.seat_delete.push({
                            relation_id:this.input_content.seat[i].relation_id
                        })
                    }
                    if(this.input_content.seat[i].relation_id === undefined){
                        this.seat_add.push({
                            location_id:this.input_content.seat[i].location_id
                        })
                    }
                }

                //备注信息
                this.input_content.remark_1_name = this.add_data[0].remark_name ;
                this.input_content.remark_1 = this.add_data[0].remark;
                if(this.add_data.length > 1){
                    this.input_content.remark_2_name = this.add_data[1].remark_name ;
                    this.input_content.remark_2 = this.add_data[1].remark ;
                }
                console.log("post:add_data "+JSON.stringify(this.add_data));

                let edit_object={};
                edit_object.id=this.$route.params.nouId;
                edit_object.standard_name=this.input_content.standard_name;
                edit_object.location_name=this.input_content.location_name;
                edit_object.longitude=this.input_content.longitude;
                edit_object.latitude=this.input_content.latitude;
                edit_object.location_today=this.input_content.location_today;
                edit_object.other_name=this.input_content.other_name;
                edit_object.begin_time_id=this.input_content.begin_time_id;
                edit_object.end_time_id=this.input_content.end_time_id;
                edit_object.remark_1_name=this.input_content.remark_1_name;
                edit_object.remark_2_name=this.input_content.remark_2_name;
                edit_object.remark_1=this.input_content.remark_1;
                edit_object.remark_2=this.input_content.remark_2;
                edit_object.english=this.input_content.english;
                edit_object.s_location_id=this.input_content.s_location_id;
                edit_object.l_location_id=this.input_content.l_location_id;
                edit_object.seat_delete=this.seat_delete;
                edit_object.seat_modify=this.seat_modify;
                edit_object.seat_add=this.seat_add;
                console.log('edit object: '+JSON.stringify(edit_object));
                this.http_json(this.modify_url,'post',edit_object,this.success_modify_char,this.fail_modify_char);
            },

            success_modify_char(response){
                if(response.body.result === 1){
                    this.$router.push({name:'pla_detail',params:{nouId:this.$route.params.nouId}});
                }
            },

            fail_modify_char(){
                console.log("修改地点本体失败");
            }
        }
    }
</script>
