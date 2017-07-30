<template>
    <div>
        <div class="zxwcreate">
            <p class="zxwcreate-title">新建本体</p>
            <img src="../../../../assets/img/no-use-picture/create-step2.png" class="zxwcreate-img">
            <create_word :prams="this.prams"></create_word>
        </div>

        <p class="zxw-create-literature" v-bind="standard_title"  v-model="lit_content.standard_name">本体名称：{{lit_content.standard_name}}</p>
        <div class="zxw-lit-background">
            <!--文献版本层信息固有信息-->
            <div class="zxw-lit-layer">
                <label class="zxw-lit-label zxw-must-write">书名:</label>
                <input type="text" class="zxw-lit-info zxw-lit-info-margin zxw-lit-input-style" v-model="lit_content.type_name" v-bind:class="{'zxw-input-number':show_type_name}" :="repeat_nou_1">
                <label class="zxw-lit-label">别名:</label>
                <input type="text" class="zxw-lit-info zxw-lit-input-style" v-model="lit_content.type_other_name">
            </div>

            <div class="zxw-lit-layer">
                <label class="zxw-lit-label">存佚类型：</label>
                <select class="zxw-lit-info zxw-lit-info-margin zxw-lit-select" v-model="lit_content.selected_save">
                    <option v-for="item in type_save_arr" v-bind:value="{item_1_id:item.item_1_id,chinese_name:item.chinese_name}">{{item.chinese_name}}</option>
                </select>
                <label class="zxw-lit-label">品种级别:</label>
                <select class="zxw-lit-info zxw-lit-select" v-model="lit_content.selected_level">
                    <option v-for="item in type_level_arr" v-bind:value="{item_1_id:item.item_1_id,chinese_name:item.chinese_name}">{{item.chinese_name}}</option>
                </select>
            </div>

            <div class="zxw-lit-layer">
                <label class="zxw-lit-label">英译：</label>
                <input type="text" class="zxw-lit-info zxw-lit-input-style" v-model="lit_content.english">
            </div>

            <div class="zxw-lit-layer">
                <label class="zxw-lit-label">提要信息:</label>
                <textarea class="zxw-lit-create-summery" v-model="lit_content.type_summary"></textarea>
            </div>

            <div>
                <label class="zxw-lit-label">标准分类:</label>
                <select class="zxw-lit-select zxw-lit-select-margin" v-model="lit_content.selected_bu">
                    <option v-for="item in type_bu_arr" v-bind:value="{item_1_id:item.item_1_id,chinese_name:item.chinese_name}" :="get_type_lei">{{item.chinese_name}}</option>
                </select>
                <select class="zxw-lit-select zxw-lit-select-margin" v-model="lit_content.selected_lei" :="get_type_shu">
                    <option v-for="item in type_lei_arr" v-bind:value="{item_2_id:item.item_2_id,chinese_name:item.chinese_name}">{{item.chinese_name}}</option>
                </select>
                <select class="zxw-lit-select" v-model="lit_content.selected_shu">
                    <option v-for="item in type_shu_arr" v-bind:value="{item_3_id:item.item_3_id,chinese_name:item.chinese_name}">{{item.chinese_name}}</option>
                </select>
            </div>

            <!--文献版本层信息循坏添加信息-->
            <div v-for="(item,index) in lit_content.varieties_arr">
                <img src="../../../../assets/img/no-use-picture/ink-line.png" style="width:673px; height:5px;"/>

                <div class="row zxw-lit-btn-margin">
                    <div class="col-md-2 float-right">
                        <button class="ry-btn-add" v-show="lit_content.varieties_arr[index].value_add" @click="add_box(index)">添加</button>
                    </div>
                    <div class="col-md-2 float-right">
                        <button class="ry-btn-del" v-show="lit_content.varieties_arr[index].value_del" @click="del_box(index)">删除</button>
                    </div>
                </div>

                <div class="zxw-lit-layer">
                    <label class="zxw-lit-type-label zxw-must-write">责任开始时间:</label>
                    <div  class="zxw-lit-info zxw-lit-type-label-margin zxw-lit-input-style">
                        <div class="zxw-lit-div-input" placeholder="点击右侧按钮添加">
                        <span class="zxw-person-relation-span" @mouseover="item.show_begin_time = true" @mouseout="item.show_begin_time = false" v-if="item.begin_standard_time !=='' " v-bind:contenteditable="item.begin_standard_time !== ''" @keydown="down_delete()">
                            <span class="zxw-tag-font" v-model="item.begin_standard_time">{{item.begin_standard_time}}</span>
                            <button class="zxw-add-hover-img" v-show="item.show_begin_time===true" @click="delete_lit_begin(index)"></button>
                        </span>
                        </div>
                        <button class="zxw-input-add-character" @click="open_lit_begin(index)"></button>
                    </div>
                    <label class="zxw-lit-type-label zxw-must-write">责任结束时间:</label>
                    <div  class="zxw-lit-info zxw-lit-input-style">
                        <div class="zxw-lit-div-input" placeholder="点击右侧按钮添加">
                        <span class="zxw-person-relation-span" @mouseover="item.show_end_time = true" @mouseout="item.show_end_time = false" v-if="item.end_standard_time !== ''" v-bind:contenteditable="item.end_standard_time !== ''" @keydown="down_delete()">
                            <span class="zxw-tag-font" v-model="item.end_standard_time">{{item.end_standard_time}}</span>
                            <button class="zxw-add-hover-img" v-show="item.show_end_time===true" @click="delete_lit_end(index)"></button>
                        </span>
                        </div>
                        <button class="zxw-input-add-character" @click="open_lit_end(index)"></button>
                    </div>
                </div>

                <div class="zxw-lit-layer">
                    <label class="zxw-lit-type-label">责任地点:</label>
                    <div  class="zxw-lit-info zxw-lit-type-label-margin zxw-lit-input-style">
                        <div class="zxw-lit-div-input" placeholder="点击右侧按钮添加">
                        <span class="zxw-person-relation-span" @mouseover="item.show_lit_location = true" @mouseout="item.show_lit_location = false" v-if="item.location_standard_name !== ''" v-bind:contenteditable="item.location_standard_name !== ''" @keydown="down_delete()">
                            <span class="zxw-tag-font" v-model="item.location_standard_name">{{item.location_standard_name}}</span>
                            <button class="zxw-add-hover-img" v-show="item.show_lit_location===true" @click="delete_lit_location(index)"></button>
                        </span>
                        </div>
                        <button class="zxw-input-add-character" @click="open_lit_location(index)"></button>
                    </div>
                    <label class="zxw-lit-type-label zxw-must-write">责任者名称：</label>
                    <div  class="zxw-lit-info zxw-lit-input-style">
                        <div class="zxw-lit-div-input" placeholder="点击右侧按钮添加">
                        <span class="zxw-person-relation-span" @mouseover="item.show_lit_character = true" @mouseout="item.show_lit_character = false" v-if="item.character_standard_name !== ''" v-bind:contenteditable="item.character_standard_name !== ''" @keydown="down_delete()">
                            <span class="zxw-tag-font" v-model="item.character_standard_name">{{item.character_standard_name}}</span>
                            <button class="zxw-add-hover-img" v-show="item.show_lit_character===true" @click="delete_lit_character(index)"></button>
                        </span>
                        </div>
                        <button class="zxw-input-add-character" @click="open_lit_character(index)"></button>
                    </div>
                </div>

                <div class="zxw-lit-layer">
                    <label class="zxw-lit-type-label zxw-must-write">责任者类型:</label>
                    <select class="zxw-lit-select zxw-lit-type-label-margin" v-model="item.selected_type_name">
                        <option v-for="item in type_name_arr" v-bind:value="{item_1_id:item.item_1_id,chinese_name:item.chinese_name}">{{item.chinese_name}}</option>
                    </select>
                    <label class="zxw-lit-type-label zxw-must-write">责任行为：</label>
                    <select class="zxw-lit-select" v-model="item.selected_action" :="repeat_nou_1">
                        <option v-for="item in action_arr" v-bind:value="{item_1_id:item.item_1_id,chinese_name:item.chinese_name}">{{item.chinese_name}}</option>
                    </select>
                </div>

                <div class="zxw-lit-layer">
                    <label class="zxw-lit-type-label zxw-must-write">确定性:</label>
                    <select class="zxw-lit-select" v-model="item.selected_confirm" >
                        <option v-for="item in confirm_arr" v-bind:value="{item_1_id:item.item_1_id,chinese_name:item.chinese_name}">{{item.chinese_name}}</option>
                    </select>
                </div>

                <div class="zxw-lit-layer">
                    <label class="zxw-lit-type-label">责任说明:</label>
                    <textarea class="zxw-lit-create-summery" style="width:530px" v-model="item.explain">{{item.explain}}</textarea>
                </div>
            </div>
        </div>

        <div class="zxw-build-step2-btn">
            <button class="zxw-prebtn zxw-prebtn-margin zxw-prebtn-length" @click="pre_step()">上一步</button>
            <button class="zxw-nextbtn zxw-nextbtn-length" @click="next_step()" v-bind:disabled="lit_content.type_name === ''||this.show_type_name === true|| this.all_must_write !== 0" :="if_wirte">下一步</button>
        </div>

        <time_modal :time_modal="lit_content.varieties_arr[open_time_index].begin_time_modal" v-on:success_time="begin_lit_time" v-on:close_modal="close_lit_begin()"></time_modal>
        <time_modal :time_modal="lit_content.varieties_arr[open_time_index].end_time_modal" v-on:success_time="end_lit_time" v-on:close_modal="close_lit_end()"></time_modal>

        <search_modal :search_url="this.search_pla_url" :noumenon_modal="this.lit_content.varieties_arr[this.open_time_index].lit_pla_modal" :noumenon_number="7" :repeat_arr="[]" v-on:close_modal="close_lit_location" v-on:add_noumenon_relations="add_lit_location"></search_modal>
        <search_modal :search_url="this.search_cha_url" :noumenon_modal="this.lit_content.varieties_arr[this.open_time_index].lit_cha_modal" :noumenon_number="1" :repeat_arr="[]" v-on:close_modal="close_lit_character" v-on:add_noumenon_relations="add_lit_character"></search_modal>

        <!--若文献本体规范已存在的模态框-->
        <repeat_modal :show_repeat="this.show_repeat" :repeat_name="this.lit_content.standard_name" :repeat_id="this.repeat_id" :repeat_noumenon="this.repeat_noumenon" v-on:close_modal="close_repeat"></repeat_modal>
    </div>
</template>

<script>
    /*let Mock = require('mockjs');
    Mock.mock('/ancient_books/get_menu_items.action?model_id=9&&item_1_id=0&&item_2_id=0','get', {
        "g":[
            {"model_id|9": 1,
                "item_1_id|1": 1,
                "chinese_name": "责任行为1"
            },
            {"model_id|9": 1,
                "item_1_id|2": 2,
                "chinese_name": "责任行为2"
            },
            {"model_id|9": 1,
                "item_1_id|3": 3,
                "chinese_name": "责任行为3"
            }
        ]
    });

    Mock.mock('/ancient_books/get_menu_items.action?model_id=8&&item_1_id=0&&item_2_id=0','get', {
        "g":[
            {"model_id|9": 1,
                "item_1_id|1": 1,
                "chinese_name": "部1"
            },
            {"model_id|9": 1,
                "item_1_id|2": 2,
                "chinese_name": "部2"
            },
            {"model_id|9": 1,
                "item_1_id|3": 3,
                "chinese_name": "部3"
            }
        ]
    });

    Mock.mock('/ancient_books/get_menu_items.action?model_id=8&&item_1_id=1&&item_2_id=0','get', {
        "g":[
            {"model_id|8": 1,
                "item_2_id|1": 1,
                "chinese_name": "类1"
            },
            {"model_id|9": 1,
                "item_2_id|2": 2,
                "chinese_name": "类2"
            },
            {"model_id|9": 1,
                "item_2_id|3": 3,
                "chinese_name": "类3"
            }
        ]
    });

    Mock.mock('/ancient_books/get_menu_items.action?model_id=8&&item_1_id=1&&item_2_id=1','get', {
        "g":[
            {"model_id|9": 1,
                "item_3_id|1": 1,
                "chinese_name": "属1"
            },
            {"model_id|9": 1,
                "item_3_id|2": 2,
                "chinese_name": "属2"
            },
            {"model_id|9": 1,
                "item_3_id|3": 3,
                "chinese_name": "属3"
            }
        ]
    });*/

    import create_word from '../../../../component/create-word.vue';
    import time_modal from '../../../../component/time-modal.vue';
    import search_modal from '../../../../component/search_noumenon.vue';
    import repeat_modal from '../../../../component/repeat_modal.vue';
    export default{
        created(){
            this.prams = this.$route.name;
            this.get_type_bu();
            this.get_action();
            this.initial_lit();
            this.back_step_two();
        },

        beforeRouteLeave(to,from,next){
            if(to.name !== 'litthree'){
                //清空Vuex
                this.$store.getters.get_build_lit.standard_name = '';
                this.$store.getters.get_build_lit.type_name = '';
                this.$store.getters.get_build_lit.type_other_name='';
                this.$store.getters.get_build_lit.type_summary = '';
                this.$store.getters.get_build_lit.english='';
                this.$store.getters.get_build_lit.selected_save.item_1_id=null;
                this.$store.getters.get_build_lit.selected_save.chinese_name='';
                this.$store.getters.get_build_lit.selected_level.item_1_id=null;
                this.$store.getters.get_build_lit.selected_level.chinese_name='';
                this.$store.getters.get_build_lit.selected_shu.chinese_name='';
                this.$store.getters.get_build_lit.selected_shu.item_3_id=null;
                this.$store.getters.get_build_lit.selected_lei.chinese_name='';
                this.$store.getters.get_build_lit.selected_lei.item_2_id=null;
                this.$store.getters.get_build_lit.selected_bu.chinese_name='';
                this.$store.getters.get_build_lit.selected_bu.item_1_id=null;
                this.$store.getters.get_build_lit.varieties_arr.splice(0,this.$store.getters.get_build_lit.varieties_arr.length);
                next();
            } else{
                next();
            }
        },

        components: {
            create_word,
            time_modal,
            search_modal,
            repeat_modal
        },

        data(){
            return {
                prams: '',
                all_must_write:0,
                chaodai:'',
                character_name:'',
                chaodai_2:'',
                character_name_2:'',
                show_type_name:false,
                show_repeat:false,
                repeat_id:'',
                repeat_noumenon:'文献本体',
                check_noumenon_repeat:'/ancient_books/check_noumenon_standard_name.action',
                menu_url: '/ancient_books/get_menu_items.action',
                search_pla_url: '/ancient_books/get_location_list_by_name.action',
                search_cha_url: '/ancient_books/get_person_list_by_name.action',
                type_save_arr: [
                    {
                        item_1_id: 1,
                        chinese_name: '不详'
                    },
                    {
                        item_1_id: 2,
                        chinese_name: '存'
                    },
                    {
                        item_1_id: 3,
                        chinese_name: '佚'
                    },
                    {
                        item_1_id: 4,
                        chinese_name: '残'
                    },
                    {
                        item_1_id: 5,
                        chinese_name: '疑'
                    }
                ],
                type_level_arr: [
                    {
                        item_1_id: 1,
                        chinese_name: '不详'
                    },
                    {
                        item_1_id: 2,
                        chinese_name: '丛书总目'
                    },
                    {
                        item_1_id: 3,
                        chinese_name: '丛书子目'
                    },
                    {
                        item_1_id: 4,
                        chinese_name: '单行本'
                    },
                    {
                        item_1_id: 5,
                        chinese_name: '合订本总目'
                    },
                    {
                        item_1_id: 6,
                        chinese_name: '合订本子目'
                    }
                ],
                type_bu_arr: [],
                type_lei_arr: [],
                type_shu_arr: [],
                type_name_arr: [
                    {
                        item_1_id: 1,
                        chinese_name: '不详'
                    },
                    {
                        item_1_id: 2,
                        chinese_name: '责任人'
                    },
                    {
                        item_1_id: 3,
                        chinese_name: '责任机构'
                    }
                ],
                action_arr: [],
                confirm_arr: [
                    {
                        item_1_id: 1,
                        chinese_name: '不详'
                    },
                    {
                        item_1_id: 2,
                        chinese_name: '确定'
                    },
                    {
                        item_1_id: 3,
                        chinese_name: '题'
                    }
                ],
                open_time_index: 0,
                lit_content: {
                    standard_name:'',
                    type_name: '',   //书名
                    type_other_name: '', //别名
                    english: '',
                    type_summary: '',
                    selected_save: {    //选择的存佚类型
                        item_1_id: null,
                        chinese_name: ''
                    },
                    selected_level: {   //选择的品种级别
                        item_1_id: null,
                        chinese_name: ''
                    },
                    selected_bu: {
                        item_1_id: null,
                        chinese_name: ''
                    },
                    selected_lei: {
                        item_2_id: null,
                        chinese_name: ''
                    },
                    selected_shu: {
                        item_3_id: null,
                        chinese_name: ''
                    },
                    varieties_arr: []
                }
            }
        },

        computed: {
            repeat_nou_1(){
                /*检查书名仅能输入中文*/
                if(this.lit_content.type_name !== '') {
                    if(!/^[\u4E00-\u9FA5]*$/.test(this.lit_content.type_name)) {
                        this.show_type_name = true;
                    } else {
                        this.show_type_name = false;
                    }
                } else if(this.lit_content.type_name === ''){
                    this.show_type_name = false;
                }

                /*判断文献本体名称是否重复*/
                if(this.lit_content.varieties_arr.length === 1){
                    if(this.lit_content.type_name !== '' && this.chaodai !== '' && this.show_type_name === false && this.character_name !== ''&& this.lit_content.varieties_arr[0].selected_action.chinese_name !== ''){
                        let repeat_object={};
                        let new_url= this.check_noumenon_repeat+'?name='+this.lit_content.standard_name+'&&type=2';
                        this.http_json(new_url,'get',repeat_object,this.success_repeat,this.fail_repeat);
                    }
                } else if(this.lit_content.varieties_arr.length > 1 && this.lit_content.type_name !== '' && this.chaodai !== '' && this.show_type_name === false && this.character_name !== ''&& this.lit_content.varieties_arr[0].selected_action.chinese_name !== ''&& this.chaodai_2 !== ''&&this.character_name_2 !== ''&& this.lit_content.varieties_arr[1].selected_action.chinese_name !== '') {
                    let repeat_object = {};
                    let new_url = this.check_noumenon_repeat + '?name=' + this.lit_content.standard_name + '&&type=2';
                    this.http_json(new_url, 'get', repeat_object, this.success_repeat, this.fail_repeat);

                } else if(this.lit_content.varieties_arr.length > 1 && this.lit_content.type_name !== '' && this.chaodai !== '' && this.show_type_name === false && this.character_name !== ''&& this.lit_content.varieties_arr[0].selected_action.chinese_name !== ''&& this.chaodai_2 === ''&&this.character_name_2 === ''&& this.lit_content.varieties_arr[1].selected_action.chinese_name === ''){
                    let repeat_object = {};
                    let new_url = this.check_noumenon_repeat + '?name=' + this.lit_content.standard_name + '&&type=2';
                    this.http_json(new_url, 'get', repeat_object, this.success_repeat, this.fail_repeat);
                }

            },

            /*本体名称*/
            standard_title(){
                let chaodai_name = '';
                let other_names = '';
                this.lit_content.standard_name = this.lit_content.type_name;
                if(this.chaodai !== ''){
                    chaodai_name = '['+this.chaodai+']';
                    other_names = chaodai_name;
                }
                if(this.character_name !== ''){
                    other_names = chaodai_name +this.character_name;
                }
                if(this.lit_content.varieties_arr[0].selected_action.chinese_name !== ''){
                    other_names = chaodai_name+this.character_name+this.lit_content.varieties_arr[0].selected_action.chinese_name;
                }
                if(other_names !== ''){
                    this.lit_content.standard_name = this.lit_content.type_name+'('+other_names+')';
                }

                /*若责任者信息有第二个*/
                if(this.lit_content.varieties_arr.length > 1){
                    let chaodai_name_2 = '';
                    let other_names_2 = '';
                    if(this.chaodai_2 !== ''){
                        chaodai_name_2 = '['+this.chaodai_2+']';
                        other_names_2 = chaodai_name_2;
                    }
                    if(this.character_name_2 !== ''){
                        other_names_2 = chaodai_name_2 +this.character_name_2;
                    }
                    if(this.lit_content.varieties_arr[1].selected_action.chinese_name !== ''){
                        other_names_2 = chaodai_name_2+this.character_name_2+this.lit_content.varieties_arr[1].selected_action.chinese_name;
                    }
                    if(other_names_2 !== ''){
                        this.lit_content.standard_name = this.lit_content.type_name+'('+other_names+'、'+other_names_2+')';
                    }
                }
            },

            /*类*/
            get_type_lei(){
                if (this.lit_content.selected_bu.chinese_name !== '') {
                    let object = {};
                    let new_url = this.menu_url + '?model_id=8&&item_1_id=' + this.lit_content.selected_bu.item_1_id + '&&item_2_id=0';
                    this.http_json(new_url, 'get', object, this.success_type_lei, this.fail_type_lei);
                }
            },

            /*属*/
            get_type_shu(){
                if (this.lit_content.selected_lei.chinese_name !== '') {
                    let object = {};
                    let new_url = this.menu_url + '?model_id=8&&item_1_id=' + this.lit_content.selected_bu.item_1_id + '&&item_2_id=' + this.lit_content.selected_lei.item_2_id;
                    this.http_json(new_url, 'get', object, this.success_type_shu, this.fail_type_shu);
                }
            },

            /*检查责任者信息是否全部填写*/
            if_wirte(){
                this.all_must_write = 0;
                for(let i = 0; i < this.lit_content.varieties_arr.length;i++){
                    if(this.lit_content.varieties_arr[i].begin_standard_time === ''){
                        this.all_must_write = this.all_must_write+1;

                    }
                    if(this.lit_content.varieties_arr[i].end_standard_time === ''){
                        this.all_must_write = this.all_must_write+1;

                    }
                    if(this.lit_content.varieties_arr[i].selected_type_name.chinese_name === ''){
                        this.all_must_write = this.all_must_write+1;

                    }
                    if(this.lit_content.varieties_arr[i].character_standard_name === ''){
                        this.all_must_write = this.all_must_write+1;

                    }
                    if(this.lit_content.varieties_arr[i].selected_action.chinese_name === ''){
                        this.all_must_write = this.all_must_write+1;

                    }
                    if(this.lit_content.varieties_arr[i].selected_confirm.chinese_name === ''){
                        this.all_must_write = this.all_must_write+1;
                    }
                }
                console.log('55: '+this.all_must_write);
            }
        },

        methods: {

            /*部*/
            get_type_bu(){
                let object = {};
                let new_url = this.menu_url + '?model_id=8&&item_1_id=0&&item_2_id=0';
                this.http_json(new_url, 'get', object, this.success_type_bu, this.fail_type_bu);
            },

            success_type_bu(response){
                for (let i = 0; i < response.body.length; i++) {
                    this.type_bu_arr.push({
                        item_1_id: response.body[i].item_1_id,
                        chinese_name: response.body[i].chinese_name
                    })
                }
            },

            fail_type_bu(response){
                console.log("部获取失败");
            },


            /*类*/
            success_type_lei(response){
                for (let i = 0; i < response.body.length; i++) {
                    this.type_lei_arr.push({
                        item_2_id: response.body[i].item_2_id,
                        chinese_name: response.body[i].chinese_name
                    })
                }
            },

            fail_type_lei(response){
                console.log("类获取失败");
            },

            /*属*/
            success_type_shu(response){
                for (let i = 0; i < response.body.length; i++) {
                    this.type_shu_arr.push({
                        item_3_id: response.body[i].item_3_id,
                        chinese_name: response.body[i].chinese_name
                    })
                }
            },

            fail_type_shu(response){
                console.log("属获取失败");
            },


            /*责任行为类型*/
            get_action(){
                let object = {};
                let new_url = this.menu_url + '?model_id=9&&item_1_id=0&&item_2_id=0';
                this.http_json(new_url, 'get', object, this.success_action, this.fail_action);
            },

            success_action(response){
                for (let i = 0; i < response.body.length; i++) {
                    this.action_arr.push({
                        item_1_id: response.body[i].item_1_id,
                        chinese_name: response.body[i].chinese_name
                    })
                }
            },

            fail_action(response){
                console.log("责任行为获取失败");
            },

            /*初始责任者信息*/
            initial_lit(){
                this.lit_content.varieties_arr.push({
                    value_add: true,
                    value_del: false,
                    show_input: false,
                    order: 1,   //责任顺序
                    show_begin_time: false,
                    begin_time_modal: false,
                    begin_standard_time: '',
                    begin_time_id: '',
                    show_end_time: false,
                    end_time_modal: false,
                    end_standard_time: '',
                    end_time_id: '',
                    lit_pla_modal: false,
                    show_lit_location: false,
                    location_standard_name: '',
                    location_id: '',
                    lit_cha_modal: false,
                    show_lit_character: false,
                    character_standard_name: '',
                    character_id: '',
                    selected_type_name: {
                        item_1_id: null,
                        chinese_name: ''
                    },
                    selected_action: {
                        item_1_id: null,
                        chinese_name: ''
                    },
                    selected_confirm: {
                        item_1_id: null,
                        chinese_name: ''
                    },
                    explain: ''
                })
            },

            add_box(p){
                this.lit_content.varieties_arr[p].value_del = false;
                this.lit_content.varieties_arr[p].value_add = false;
                this.lit_content.varieties_arr.push({
                    value_add: true,
                    value_del: true,
                    show_input: false,
                    order: this.lit_content.varieties_arr[p].order+1,
                    show_begin_time: false,
                    begin_time_modal: false,
                    begin_standard_time: '',
                    begin_time_id: '',
                    show_end_time: false,
                    end_time_modal: false,
                    end_standard_time: '',
                    end_time_id: '',
                    lit_pla_modal: false,
                    show_lit_location: false,
                    location_standard_name: '',
                    location_id: '',
                    lit_cha_modal: false,
                    show_lit_character: false,
                    character_standard_name: '',
                    character_id: '',
                    selected_type_name: {
                        item_1_id: null,
                        chinese_name: ''
                    },
                    selected_action: {
                        item_1_id: null,
                        chinese_name: ''
                    },
                    selected_confirm: {
                        item_1_id: null,
                        chinese_name: ''
                    },
                    explain: ''
                });
                console.log(JSON.stringify(this.lit_content.varieties_arr))
            },

            del_box(p){
                this.open_time_index = 0;
                this.lit_content.varieties_arr.splice(p, 1);
                this.lit_content.varieties_arr[p - 1].value_add = true;
                if (p > 1) {
                    this.lit_content.varieties_arr[p - 1].value_del = true;
                }
            },

            /*起始时间*/
            open_lit_begin(p){
                this.open_time_index = p;
                this.lit_content.varieties_arr[p].begin_time_modal = true;
            },

            begin_lit_time(p){
                this.lit_content.varieties_arr[this.open_time_index].begin_time_id = p.time_id;
                this.lit_content.varieties_arr[this.open_time_index].begin_standard_time = p.standard_name;
                this.close_lit_begin();
            },

            close_lit_begin(){
                this.lit_content.varieties_arr[this.open_time_index].begin_time_modal = false;
            },

            delete_lit_begin(p){
                this.lit_content.varieties_arr[p].begin_standard_time = '';
                this.lit_content.varieties_arr[p].begin_time_id = '';
            },

            /*结束时间*/
            open_lit_end(p){
                this.lit_content.varieties_arr[p].end_time_modal = true;
                this.open_time_index = p;
            },

            end_lit_time(p){
                this.lit_content.varieties_arr[this.open_time_index].end_time_id = p.time_id;
                this.lit_content.varieties_arr[this.open_time_index].end_standard_time = p.standard_name;
                if(this.open_time_index === 0){
                    this.chaodai = this.$store.getters.get_chaodai_data;
                } else if(this.open_time_index === 1){
                    this.chaodai_2 = this.$store.getters.get_chaodai_data;
                }
                this.close_lit_end();
                this.repeat_nou_2();
            },

            close_lit_end(){
                this.lit_content.varieties_arr[this.open_time_index].end_time_modal = false;
                this.$store.commit('post_chaodai_data','');
            },

            delete_lit_end(p){
                this.lit_content.varieties_arr[p].end_standard_time = '';
                this.lit_content.varieties_arr[p].end_time_id = '';
                if(p === 0){
                    this.chaodai = '';
                } else if (p === 1){
                    this.chaodai_2 = '';
                }
            },

            /*责任地点*/
            open_lit_location(p){
                this.lit_content.varieties_arr[p].lit_pla_modal = true;
                this.open_time_index = p;
            },

            add_lit_location(p){
                this.lit_content.varieties_arr[this.open_time_index].location_id = p.noumenon_id;
                this.lit_content.varieties_arr[this.open_time_index].location_standard_name = p.standard_name;
                this.close_lit_location();
            },

            delete_lit_location(p){
                this.lit_content.varieties_arr[p].location_standard_name = '';
                this.lit_content.varieties_arr[p].location_id = '';
            },

            close_lit_location(){
                this.lit_content.varieties_arr[this.open_time_index].lit_pla_modal = false;
            },

            /*责任者名称*/
            open_lit_character(p){
                this.lit_content.varieties_arr[p].lit_cha_modal = true;
                this.open_time_index = p;
            },

            add_lit_character(p){
                this.lit_content.varieties_arr[this.open_time_index].character_id = p.noumenon_id;
                this.lit_content.varieties_arr[this.open_time_index].character_standard_name = p.standard_name;
                if(this.open_time_index === 0){
                    this.character_name = this.$store.getters.get_character_data;
                } else if(this.open_time_index === 1){
                    this.character_name_2 = this.$store.getters.get_character_data;
                }
                this.close_lit_character();
                this.repeat_nou_2();
            },

            delete_lit_character(p){
                this.lit_content.varieties_arr[p].character_standard_name = '';
                this.lit_content.varieties_arr[p].character_id = '';
                if(p === 0){
                    this.character_name = '';
                } else if (p === 1){
                    this.character_name_2 = '';
                }

            },

            close_lit_character(){
                this.lit_content.varieties_arr[this.open_time_index].lit_cha_modal = false;
                this.$store.commit('post_character_data','');
            },

            /*禁止键盘输入*/
            down_delete(){
                let c = event.keyCode;
                if (c === 8 || c === 46 || c === 32 || c === 9 || c === 12 || c === 13 || c === 16 || c === 17 || c === 18 || c === 20 || c === 27 || (c >= 32 && c <= 36) || c === 38 || c === 40 || c === 45 || (c >= 48 && c <= 57) || (c >= 65 && c <= 90) || (c >= 96 && c <= 123) || (c >= 186 && c <= 192) || (c >= 219 && c <= 222)) {
                    event.returnValue = false;
                }
            },

            /*下一步*/
            next_step(){
                this.$store.commit("get_create_literature", this.lit_content);
                this.$router.push({path: '/litthree'});
            },

            pre_step(){
                this.$store.commit('get_create_one_selection', 5);
                this.$router.push({name: 'build'});
            },

            back_step_two(){
                if(this.$store.getters.get_build_lit.standard_name !== ''){
                    this.lit_content = this.$store.getters.get_build_lit;
                }
            },

            /*检查是否重复*/
            repeat_nou_2(){
                if(this.lit_content.varieties_arr.length === 1){
                    if(this.lit_content.type_name !== '' && this.lit_content.chaodai !== '' && this.show_type_name === false && this.character_name !== ''&& this.lit_content.varieties_arr[0].selected_action.chinese_name !== ''){
                        let repeat_object={};
                        let new_url= this.check_noumenon_repeat+'?name='+this.lit_content.standard_name+'&&type=2';
                        this.http_json(new_url,'get',repeat_object,this.success_repeat,this.fail_repeat);
                    }
                } else if(this.lit_content.varieties_arr.length > 1 && this.lit_content.type_name !== '' && this.lit_content.chaodai !== '' && this.show_type_name === false && this.character_name !== ''&& this.lit_content.varieties_arr[0].selected_action.chinese_name !== ''&& this.chaodai_2 !== ''&&this.lit_content.varieties_arr[1].character_name_2 !== ''&& this.lit_content.varieties_arr[1].selected_action.chinese_name !== '') {
                    let repeat_object = {};
                    let new_url = this.check_noumenon_repeat + '?name=' + this.lit_content.standard_name + '&&type=2';
                    this.http_json(new_url, 'get', repeat_object, this.success_repeat, this.fail_repeat);
                } else if(this.lit_content.varieties_arr.length > 1 && this.lit_content.type_name !== '' && this.lit_content.chaodai !== '' && this.show_type_name === false && this.character_name !== ''&& this.lit_content.varieties_arr[0].selected_action.chinese_name !== ''&& this.chaodai_2 === ''&&this.lit_content.varieties_arr[1].character_name_2 === ''&& this.lit_content.varieties_arr[1].selected_action.chinese_name === ''){
                    let repeat_object = {};
                    let new_url = this.check_noumenon_repeat + '?name=' + this.lit_content.standard_name + '&&type=2';
                    this.http_json(new_url, 'get', repeat_object, this.success_repeat, this.fail_repeat);
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
                    console.log(JSON.stringify(this.repeat_id));
                }
            },

            fail_repeat(response){
                console.log("判断是否重复失败");
            },

            close_repeat(){
                this.show_repeat=false;
            },

        }
    }
</script>

<style>
    .zxw-lit-create-summery{
        width: 560px;
        height: 50px;
        background-color: transparent;
        border: 2px solid black;
        overflow-y: hidden;
        vertical-align:top;
    }

    .zxw-lit-select{
        width:175px;
        height:30px;
        border: 2px solid;
        background-color: transparent;
    }

    .zxw-lit-select-margin{
        margin-right: 5px;
    }

    .zxw-lit-input-style{
        border: 2px solid;
        background-color: transparent;
        height: 30px;
        text-align: left;
        padding-left: 5px;
    }

    .zxw-lit-div-input{
        display: inline-block;
        width: 143px;
        height: 25px;
        padding-right: 3px;
        outline: none;
        white-space: nowrap;
        text-overflow: ellipsis;
        -o-text-overflow: ellipsis;
        overflow: hidden
    }

    .zxw-lit-div-input:empty::before{
        font-size: 16px;
        color:gray;
        content:attr(placeholder);
    }

    .zxw-create-literature{
        font-size: 20px;
        font-weight: bold;
        color:#a50000;
        margin:20px 0 20px 220px;
    }

    .zxw-input-number{
        border-color: #a50000;
    }

    .zxw-lit-btn-margin{
        margin-bottom: 10px;
    }
</style>