<template>

    <!--印次层-->
    <div class="layer-input">
        <div class="form-center">
            <div>
                <div class="row">
                    <label class="col-md-2">印刷類型：</label>
                    <div class="col-md-4">
                        <select id="ry-i-print">
                            <option>不详</option>
                            <option>墨印</option>
                            <option>朱印</option>
                            <option>藍印</option>
                            <option>綠印</option>
                            <option>套印</option>
                            <option>雙色套印</option>
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
                <img src="../../../../assets/img/上传1/中间墨线.png" height="6" width="843"/>
            </div>

            <div id="form-impression">
                <div class="row">
                    <div class="col-md-2 float-right">
                        <button id="btn-add-copy" class="ry-btn-add">添加</button>
                    </div>
                    <div class="col-md-2 float-right">
                        <button id="btn-delete-copy" class="ry-btn-del">刪除</button>
                    </div>
                </div>

                <div class="row">
                    <div class="col-md-2">
                        <span class="star">*</span>
                        <label>責任開始時間:</label>
                    </div>
                    <div class="col-md-4">
                        <input readonly @click="open_birth()" v-model="impression_item.impression_responsibility.begin_time">
                    </div>

                    <div class="col-md-2">
                        <span class="star">*</span>
                        <label>責任結束時間:</label>
                    </div>
                    <div class="col-md-4">
                        <input readonly @click="open_dead()" v-model="impression_item.impression_responsibility.end_time">
                    </div>
                </div>

                <div class="row">
                    <label class="col-md-2">責任地點：</label>
                    <div class="col-md-4">
                        <input readonly @click="open_location()" v-model="impression_item.impression_responsibility.location">
                    </div>

                    <div class="col-md-2">
                        <span class="star">*</span>
                        <label>責任者名稱:</label>
                    </div>
                    <div class="col-md-4">
                        <input readonly @click="open_character()" v-model="impression_item.impression_responsibility.person">
                    </div>
                </div>

                <div class="row">
                    <div class="col-md-2">
                        <span class="star">*</span>
                        <label>責任者類型：</label>
                    </div>
                    <div class="col-md-4">
                        <select id="ry-i-type">
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
                        <select id="ry-i-action">
                            <option>初印</option>
                            <option>重印</option>
                        </select>
                    </div>
                </div>

                <div class="row">
                    <div class="col-md-2">
                        <span class="star">*</span>
                        <label>確定性：</label>
                    </div>
                    <div class="col-md-4">
                        <select id="ry-i-confirm">
                            <option>不详</option>
                            <option>确定</option>
                            <option>題</option>
                        </select>
                    </div>
                </div>

                <div class="row">
                    <label class="col-md-2">責任說明：</label>
                    <div class="col-md-4">
                        <input v-model="impression_item.impression_responsibility.explain" id="ry-input-responsibility">
                    </div>
                </div>
            </div>

            <div>
                <img src="../../../../assets/img/上传1/中间墨线.png" height="6" width="843"/>
            </div>

            <time_modal :time_modal="this.time_modal_1" v-on:success_time="birth_time" v-on:close_modal="close_birth()"></time_modal>
            <time_modal :time_modal="this.time_modal_2" v-on:success_time="dead_time" v-on:close_modal="close_dead()"></time_modal>
            <!--<location_modal :location_modal="this.location_modal" v-on:close_modal="close_location" v-on:add_location_relations="add_location"></location_modal>-->
            <!--<character_modal :character_modal="this.character_modal"  v-on:close_modal="close_character" v-on:add_person_relations="add_character"></character_modal>-->
        </div>
    </div>

</template>

<script>
    import time_modal from '../../../../component/time-modal.vue';
//    import location_modal from '../../../../component/search_location.vue';
//    import character_modal from '../../../../component/search_noumenon.vue';
    export default{
        components:{
            time_modal,
//            location_modal,
//            character_modal,
        },
        
        data() {
            return{
                time_modal_1 : false,
                time_modal_2 : false,
                location_modal : false,
                character_modal : false,
                impression_item :{
                    printing_type : '',
                    printing_number : '',
                    impression_responsibility : {
                        location : '',
                        location_id : '',
                        person : '',
                        person_id : '',
                        begin_time : '',
                        begin_time_id : '',
                        end_time : '',
                        end_time_id :'',
                        action : '',
                        explain : '',
                        confirm : '',
                        type : '',
                        level : 3,
                    }
                },
            }
        },

        created : function () {
            this.impression_item = this.$store.getters.get_impression_item
        },

        mounted : function () {
            this.default_selections_impression()
        },

        beforeRouteLeave (to, from, next) {
            this.$store.commit("get_impression_contents",this.impression_item);
            this.selections_impression();
            next();
        },

        methods : {
            /**
             * 责任开始时间
             */
            open_birth() {
                this.time_modal_1 = true;
            },

            birth_time(p) {
                this.impression_item.impression_responsibility.begin_time_id = p.time_id;
                this.impression_item.impression_responsibility.begin_time = p.standard_name;
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
                this.impression_item.impression_responsibility.end_time_id = q.time_id;
                this.impression_item.impression_responsibility.end_time = q.standard_name;
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
                this.impression_item.impression_responsibility.location_id = p.noumenon_id;
                this.impression_item.impression_responsibility.location = p.standard_name;
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
                this.impression_item.impression_responsibility.person_id = p.noumenon_id;
                this.impression_item.impression_responsibility.person = p.standard_name;
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
                var type = document.getElementById("ry-i-type");
                var type_index = type.selectedIndex;
                this.impression_item.impression_responsibility.type = type_index + 1;
                var action = document.getElementById("ry-i-action");
                var action_index = action.selectedIndex;
                this.impression_item.impression_responsibility.action = action_index + 1;
                var confirm = document.getElementById("ry-i-confirm");
                var confirm_index = confirm.selectedIndex;
                this.impression_item.impression_responsibility.confirm = confirm_index + 1;
            },

            /**
             * 设置默认首选项
             */
            default_selections_impression() {
                var print = document.getElementById("ry-i-print");
                print.selectedIndex =this.impression_item.printing_type - 1;
                var type = document.getElementById("ry-i-type");
                type.selectedIndex = this.impression_item.impression_responsibility.type - 1;
                var action = document.getElementById("ry-i-action");
                action.selectedIndex = this.impression_item.impression_responsibility.action - 1;
                var confirm = document.getElementById("ry-i-confirm");
                confirm.selectedIndex = this.impression_item.impression_responsibility.confirm - 1;
            },
        },

    }
</script>


