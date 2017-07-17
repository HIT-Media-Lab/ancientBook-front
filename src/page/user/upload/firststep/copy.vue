<template>

    <!--复本层-->
    <div class="layer-input">
        <div class="form-center">
            <div>
                <div class="row">
                    <label class="col-md-2">冊數：</label>
                    <div class="col-md-4">
                        <input v-model="copy_item.duplicate_book_count">
                    </div>

                    <label class="col-md-2">完整性：</label>
                    <div class="col-md-4">
                        <select id="ry-c-complete">
                            <option>不详</option>
                            <option>全</option>
                            <option>残</option>
                        </select>
                    </div>
                </div>

                <div class="row">
                    <label class="col-md-2">品級：</label>
                    <div class="col-md-4">
                        <select id="ry-c-level">
                            <option>不详</option>
                            <option>一級甲等</option>
                            <option>一級乙等</option>
                            <option>一級丙等</option>
                            <option>二級甲等</option>
                            <option>二級乙等</option>
                            <option>二級丙等</option>
                            <option>三級甲等</option>
                            <option>三級乙等</option>
                            <option>三級丙等</option>
                            <option>四級</option>
                        </select>
                    </div>

                    <label class="col-md-2">附件信息：</label>
                    <div class="col-md-4">
                        <input v-model="copy_item.duplicate_attachment">
                    </div>
                </div>
            </div>

            <div>
                <img src="../../../../assets/img/upload1/中间墨线.png" height="6" width="843"/>
            </div>

            <div id="form-copy" v-for="(item,index) in copy_item.copy_responsibility">
                <div class="row">
                    <div class="col-md-2 float-right">
                        <button id="btn-add-copy" class="ry-btn-add" @click="add_new_box(index)" v-show="copy_item.copy_responsibility[index].value">添加</button>
                    </div>
                    <div class="col-md-2 float-right">
                        <button id="btn-delete-copy" class="ry-btn-del" v-show="copy_item.copy_responsibility[index].value">刪除</button>
                    </div>
                </div>

                <div class="row">
                    <div class="col-md-2">
                        <span class="star">*</span>
                        <label>責任開始時間:</label>
                    </div>
                    <div class="col-md-4">
                        <input readonly @click="open_birth()" v-model="item.begin_time">
                    </div>

                    <div class="col-md-2">
                        <span class="star">*</span>
                        <label>責任結束時間:</label>
                    </div>
                    <div class="col-md-4">
                        <input readonly @click="open_dead()" v-model="item.end_time">
                    </div>
                </div>

                <div class="row">
                    <label class="col-md-2">責任地點：</label>
                    <div class="col-md-4">
                        <input readonly @click="open_location()" v-model="item.location">
                    </div>

                    <div class="col-md-2">
                        <span class="star">*</span>
                        <label>責任者名稱:</label>
                    </div>
                    <div class="col-md-4">
                        <input readonly @click="open_character()" v-model="item.person">
                    </div>
                </div>

                <div class="row">
                    <div class="col-md-2">
                        <span class="star">*</span>
                        <label>責任者類型：</label>
                    </div>
                    <div class="col-md-4">
                        <select class="ry-c-type">
                            <option>不详</option>
                            <option>责任人</option>
                            <option>责任机构</option>
                        </select>
                    </div>

                    <div class="col-md-2">
                        <span class="star">*</span>
                        <label>責任行為：</label>
                    </div>
                    <div class="col-md-4">
                        <select class="ry-c-action">
                            <option>贈</option>
                            <option>藏</option>
                            <option>裝</option>
                            <option>購</option>
                            <option>題籤</option>
                            <option>題跋</option>
                            <option>過錄</option>
                            <option>批注</option>
                            <option>批校</option>
                            <option>補目</option>
                        </select>
                    </div>
                </div>

                <div class="row">
                    <div class="col-md-2">
                        <span class="star">*</span>
                        <label>確定性：</label>
                    </div>
                    <div class="col-md-4">
                        <select class="ry-c-confirm">
                            <option>不详</option>
                            <option>确定</option>
                            <option>題</option>
                        </select>
                    </div>
                </div>

                <div class="row">
                    <label class="col-md-2">責任說明：</label>
                    <div class="col-md-4">
                        <input v-model="item.explain" id="ry-input-responsibility">
                    </div>
                </div>
            </div>

            <div>
                <img src="../../../../assets/img/upload1/中间墨线.png" height="6" width="843"/>
            </div>

            <time_modal :time_modal="this.time_modal_1" v-on:success_time="birth_time" v-on:close_modal="close_birth()"></time_modal>
            <time_modal :time_modal="this.time_modal_2" v-on:success_time="dead_time" v-on:close_modal="close_dead()"></time_modal>
            <search_modal :search_url="this.search_location" :noumenon_modal="this.location_modal" :noumenon_number="7" v-on:close_modal="close_location" v-on:add_noumenon_relations="add_location"></search_modal>
            <search_modal :search_url="this.search_person" :noumenon_modal="this.character_modal" :noumenon_number="1" v-on:close_modal="close_character" v-on:add_noumenon_relations="add_character"></search_modal>
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
                copy_item : {
                    duplicate_book_count : '',
                    duplicate_level : '',
                    duplicate_complete : '',
                    duplicate_attachment : '',
                    copy_responsibility : [{
                        value : true,
                        location : '',
                        location_id : '',
                        person : '',
                        person_id : '',
                        begin_time : '',
                        begin_time_id : '',
                        end_time : '',
                        end_time_id : '',
                        action : '',
                        action_value : '',
                        explain : '',
                        confirm : '',
                        type : '',
                        level : 4,
                    }]
                }
            }
        },

        created : function () {
            this.copy_item = this.$store.getters.get_copy_item
        },

        mounted : function () {
            this.default_selections_copy()
        },

        beforeRouteLeave (to, from, next) {
            this.copy_item.copy_responsibility.action_value = document.getElementById("ry-c-action").options[document.getElementById("ry-c-action").selectedIndex].text;
            this.$store.commit("get_copy_contents",this.copy_item);
            this.selections_copy();
            next();
        },



        methods : {
            /**
             * 添加新册
             */
            add_new_box(p) {
                this.copy_item.copy_responsibility[p].value = false;
                this.copy_item.copy_responsibility.push({
                    value : true,
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
                    level : 4,
                });
            },


            /**
             * 责任开始时间
             */
            open_birth() {
                this.time_modal_1 = true;
            },

            birth_time(p) {
                this.copy_item.copy_responsibility.begin_time_id = p.time_id;
                this.copy_item.copy_responsibility.begin_time = p.standard_name;
                this.close_birth();
            },

            close_birth() {
                this.time_modal_1 = false;
            },

            /**
             * 责任结束时间
             */
            open_dead() {
                this.time_modal_2 = true;
            },

            dead_time(q) {
                this.copy_item.copy_responsibility.end_time_id = q.time_id;
                this.copy_item.copy_responsibility.end_time = q.standard_name;
                this.close_dead();
            },

            close_dead() {
                this.time_modal_2 = false;
            },


            /**
             * 责任地点
             */
            open_location() {
                this.location_modal = true;
            },

            add_location(p) {
                this.copy_item.copy_responsibility.location_id = p.noumenon_id;
                this.copy_item.copy_responsibility.location = p.standard_name;
            },

            close_location(){
                this.location_modal = false;
            },


            /**
             * 责任者名称
             */
            open_character(){
                this.character_modal = true;
            },

            add_character(p){
                this.copy_item.copy_responsibility.person_id = p.noumenon_id;
                this.copy_item.copy_responsibility.person = p.standard_name;
            },

            close_character(){
                this.character_modal = false;
            },


            /**
             * 获得用户选择的option并存储
             */
            selections_copy() {
                var complete = document.getElementById("ry-c-complete");
                var complete_index = complete.selectedIndex;
                this.copy_item.duplicate_complete = complete_index + 1;
                var level = document.getElementById("ry-c-level");
                var level_index = level.selectedIndex;
                this.copy_item.duplicate_level = level_index + 1;

                var types = document.getElementsByClassName("ry-c-type");
                for (var i = 0; i < types.length; i++) {
                    var type_index = types[i].selectedIndex;
                    this.copy_item.copy_responsibility[i].type = type_index + 1;
                }

                var actions = document.getElementsByClassName("ry-c-action");
                for (var j = 0; j < actions.length; j++) {
                    var action_index = actions[j].selectedIndex;
                    this.copy_item.copy_responsibility[j].action = action_index + 1;
                }

                var confirms = document.getElementsByClassName("ry-c-confirm");
                for (var k = 0; k < confirms.length; k++) {
                    var confirm_index = confirms[k].selectedIndex;
                    this.copy_item.copy_responsibility[k].confirm = confirm_index + 1;
                }
            },

            /**
             * 设置默认首选项
             */
            default_selections_copy() {
                var complete = document.getElementById("ry-c-complete");
                complete.selectedIndex = this.copy_item.duplicate_complete - 1;
                var level = document.getElementById("ry-c-level");
                level.selectedIndex = this.copy_item.duplicate_level - 1;

                var types = document.getElementsByClassName("ry-c-type");
                for (var i = 0; i < types.length; i ++) {
                    types[i].selectedIndex = this.copy_item.copy_responsibility[i].type - 1;
                }

                var actions = document.getElementsByClassName("ry-c-action");
                for (var k = 0; k < actions.length; k ++) {
                    actions[k].selectedIndex = this.copy_item.copy_responsibility[k].action - 1;
                }

                var confirms = document.getElementsByClassName("ry-c-confirm");
                for (var j = 0; j < confirms.length; j ++) {
                    confirms[j].selectedIndex = this.copy_item.copy_responsibility[j].confirm - 1;
                }
            },
        }

    }
</script>



