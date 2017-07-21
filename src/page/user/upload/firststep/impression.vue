<template>

    <!--印次层-->
    <div class="layer-input">
        <div class="form-center">
            <div>
                <div class="row">
                    <label class="col-md-2">印刷类型：</label>
                    <div class="col-md-4">
                        <select id="ry-i-print">
                            <option>不详</option>
                            <option>墨印</option>
                            <option>朱印</option>
                            <option>蓝印</option>
                            <option>绿印</option>
                            <option>套印</option>
                            <option>双色套印</option>
                            <option>三色套印</option>
                            <option>四色套印</option>
                            <option>四色以上套印</option>
                        </select>
                    </div>

                    <label class="col-md-2">印次：</label>
                    <div class="col-md-4">
                        <input v-model="impression_item.printing_number">
                    </div>
                </div>
            </div>

            <div>
                <img src="../../../../assets/img/no-use-picture/ink-line.png" height="6" width="843"/>
            </div>

            <div class="form-impression" v-for="(item,index) in impression_item.impression_responsibility">
                <div class="row">
                    <div class="col-md-2 float-right">
                        <button id="btn-add-copy" class="ry-btn-add" @click="add_new_box(index)" v-show="impression_item.impression_responsibility[index].value_add">添加</button>
                    </div>
                    <div class="col-md-2 float-right">
                        <button id="btn-delete-copy" class="ry-btn-del" @click="del_new_box(index)" v-show="impression_item.impression_responsibility[index].value_del">删除</button>
                    </div>
                </div>

                <div class="row">
                    <div class="col-md-2">
                        <span class="star"></span>
                        <label>责任开始时间:</label>
                    </div>
                    <div class="col-md-4">
                        <input readonly @click="open_birth()" v-model="item.begin_time">
                    </div>

                    <div class="col-md-2">
                        <span class="star"></span>
                        <label>责任结束时间:</label>
                    </div>
                    <div class="col-md-4">
                        <input readonly @click="open_dead()" v-model="item.end_time">
                    </div>
                </div>

                <div class="row">
                    <label class="col-md-2">责任地点：</label>
                    <div class="col-md-4">
                        <input readonly @click="open_location()" v-model="item.location">
                    </div>

                    <div class="col-md-2">
                        <span class="star"></span>
                        <label>责任者名称:</label>
                    </div>
                    <div class="col-md-4">
                        <input readonly @click="open_character()" v-model="item.person">
                    </div>
                </div>

                <div class="row">
                    <div class="col-md-2">
                        <span class="star"></span>
                        <label>责任者类型：</label>
                    </div>
                    <div class="col-md-4">
                        <select class="ry-i-type">
                            <option>不详</option>
                            <option>责任人</option>
                            <option>责任机构</option>
                        </select>
                    </div>

                    <div class="col-md-2">
                        <span class="star"></span>
                        <label>责任行为：</label>
                    </div>
                    <div class="col-md-4">
                        <select class="ry-i-action">
                            <option>初印</option>
                            <option>重印</option>
                        </select>
                    </div>
                </div>

                <div class="row">
                    <div class="col-md-2">
                        <span class="star"></span>
                        <label>确定性：</label>
                    </div>
                    <div class="col-md-4">
                        <select class="ry-i-confirm">
                            <option>不详</option>
                            <option>确定</option>
                            <option>题</option>
                        </select>
                    </div>
                </div>

                <div class="row">
                    <label class="col-md-2">责任说明：</label>
                    <div class="col-md-4">
                        <input v-model="item.explain" id="ry-input-responsibility">
                    </div>
                </div>
            </div>

            <div>
                <img src="../../../../assets/img/no-use-picture/ink-line.png" height="6" width="843"/>
            </div>

            <time_modal :time_modal="this.time_modal_1" v-on:success_time="birth_time" v-on:close_modal="close_birth()"></time_modal>
            <time_modal :time_modal="this.time_modal_2" v-on:success_time="dead_time" v-on:close_modal="close_dead()"></time_modal>
            <search_modal :search_url="this.search_location" :noumenon_modal="this.location_modal" :noumenon_number="7" v-on:close_modal="close_location" v-on:add_noumenon_relations="add_location"></search_modal>
            <search_modal :search_url="this.search_person" :noumenon_modal="this.character_modal" :noumenon_number="1" :repeat_arr="[]" v-on:close_modal="close_character" v-on:add_noumenon_relations="add_character"></search_modal>
        </div>
    </div>

</template>

<script>
    import time_modal from '../../../../component/time-modal.vue';
    import search_modal from '../../../../component/search_noumenon.vue';
    export default{
        components:{
            time_modal,
            search_modal,
        },
        
        data() {
            return{
                index : 0,
                search_person:'/ancient_books/get_person_list_by_name.action',
                search_location:'/ancient_books/get_location_list_by_name.action',
                time_modal_1 : false,
                time_modal_2 : false,
                location_modal : false,
                character_modal : false,
                impression_item :{},
            }
        },

        created : function () {
            this.impression_item = this.$store.getters.get_impression_item
        },

        mounted : function () {
            this.default_selections_impression()
        },

        beforeRouteLeave (to, from, next) {
            this.impression_item.impression_responsibility[0].action_value = document.getElementsByClassName("ry-i-action")[0].options[document.getElementsByClassName("ry-i-action")[0].selectedIndex].text;
            this.$store.commit("get_impression_contents",this.impression_item);
            this.selections_impression();
            next();
        },

        methods : {
            /**
             * 获得责任数组指数
             */
            get_index() {
                var divs = document.getElementsByClassName("form-impression");
                for (var i = 0; i < divs.length; i++) {
                    divs[i].setAttribute("data-i", i);
                }
                this.index = event.currentTarget.parentNode.parentNode.parentNode.getAttribute("data-i");
            },


            /**
             * 添加责任信息
             */
            add_new_box(p) {
                this.impression_item.impression_responsibility[p].value_add = false;
                this.impression_item.impression_responsibility[p].value_del = false;
                this.impression_item.impression_responsibility.push({
                    value_add : true,
                    value_del : true,
                    location : '',
                    location_id : '',
                    person : '',
                    person_id : '',
                    begin_time : '',
                    begin_time_id : '',
                    end_time : '',
                    end_time_id :'',
                    action : '',
                    action_value : '',
                    explain : '',
                    confirm : '',
                    type : '',
                    level : 3,
                });
            },


            /**
             * 删除责任信息
             */
            del_new_box(p) {
                if (p == 1) {
                    this.impression_item.impression_responsibility[p-1].value_add = true;
                    this.impression_item.impression_responsibility[p-1].value_del = false;
                }
                else{
                    this.impression_item.impression_responsibility[p-1].value_add = true;
                    this.impression_item.impression_responsibility[p-1].value_del = true;
                }
                this.impression_item.impression_responsibility.pop();
            },


            /**
             * 责任开始时间
             */
            open_birth() {
                this.get_index();
                this.time_modal_1 = true;
            },

            birth_time(p) {
                this.impression_item.impression_responsibility[this.index].begin_time_id = p.time_id;
                this.impression_item.impression_responsibility[this.index].begin_time = p.standard_name;
                this.close_birth();
            },

            close_birth() {
                this.time_modal_1 = false;
            },


            /**
             * 责任结束时间
             */
            open_dead() {
                this.get_index();
                this.time_modal_2 = true;
            },

            dead_time(q) {
                this.impression_item.impression_responsibility[this.index].end_time_id = q.time_id;
                this.impression_item.impression_responsibility[this.index].end_time = q.standard_name;
                this.close_dead();
            },

            close_dead() {
                this.time_modal_2 = false;
            },


            /**
             * 责任地点
             */
            open_location() {
                this.get_index();
                this.location_modal = true;
            },

            add_location(p) {
                this.impression_item.impression_responsibility[this.index].location_id = p.noumenon_id;
                this.impression_item.impression_responsibility[this.index].location = p.standard_name;
            },

            close_location(){
                this.location_modal = false;
            },


            /**
             * 责任者名称
             */
            open_character(){
                this.get_index();
                this.character_modal = true;
            },

            add_character(p){
                this.impression_item.impression_responsibility[this.index].person_id = p.noumenon_id;
                this.impression_item.impression_responsibility[this.index].person = p.standard_name;
            },

            close_character(){
                this.character_modal = false;
            },


            /**
             * 获得用户选择的option并存储
             */
            selections_impression() {
                var print = document.getElementById("ry-i-print");
                var print_index = print.selectedIndex;
                this.impression_item.printing_type = print_index + 1;

                var types = document.getElementsByClassName("ry-i-type");
                for (var i = 0; i < types.length; i++) {
                    var type_index = types[i].selectedIndex;
                    this.impression_item.impression_responsibility[i].type = type_index + 1;
                }

                var actions = document.getElementsByClassName("ry-i-action");
                for (var j = 0; j < actions.length; j++) {
                    var action_index = actions[j].selectedIndex;
                    this.impression_item.impression_responsibility[j].action = action_index + 1;
                }

                var confirms = document.getElementsByClassName("ry-i-confirm");
                for (var k = 0; k < confirms.length; k++) {
                    var confirm_index = confirms[k].selectedIndex;
                    this.impression_item.impression_responsibility[k].confirm = confirm_index + 1;
                }
            },

            /**
             * 设置默认首选项
             */
            default_selections_impression() {
                var print = document.getElementById("ry-i-print");
                print.selectedIndex =this.impression_item.printing_type - 1;

                var types = document.getElementsByClassName("ry-i-type");
                for (var i = 0; i < types.length; i ++) {
                    types[i].selectedIndex = this.impression_item.impression_responsibility[i].type - 1;
                }

                var actions = document.getElementsByClassName("ry-i-action");
                for (var k = 0; k < actions.length; k ++) {
                    actions[k].selectedIndex = this.impression_item.impression_responsibility[k].action - 1;
                }

                var confirms = document.getElementsByClassName("ry-i-confirm");
                for (var j = 0; j < confirms.length; j ++) {
                    confirms[j].selectedIndex = this.impression_item.impression_responsibility[j].confirm - 1;
                }
            },
        },

    }
</script>


