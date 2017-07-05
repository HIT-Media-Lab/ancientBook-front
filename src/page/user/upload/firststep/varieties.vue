<template>

    <!--品种层-->
    <div class="layer-input">
        <div class="form-center">
            <div>
                <div class="row">
                    <div class="col-md-2">
                        <span class="star">*</span>
                        <label>書名:</label>
                    </div>
                    <div class="col-md-4">
                        <input id="bookName" v-model="varieties_item.type_name">
                    </div>

                    <label class="col-md-2">別名:</label>
                    <div class="col-md-4">
                        <input v-model="varieties_item.type_other_name" placeholder="多值屬性用逗號隔開">
                    </div>
                </div>

                <div class="row">
                    <label class="col-md-2">存佚類型:</label>
                    <div class="col-md-4">
                        <select id="ry-type-save">
                            <option>不详</option>
                            <option>存</option>
                            <option>佚</option>
                            <option>残</option>
                            <option>疑</option>
                        </select>
                    </div>
                </div>

                <div class="row">
                    <label class="col-md-2">品種級別：</label>
                    <div class="col-md-4">
                        <select id="ry-type-level">
                            <option>不详</option>
                            <option>叢書總目</option>
                            <option>叢書子目</option>
                            <option>單行本</option>
                            <option>合訂本總目</option>
                            <option>合訂本子目</option>
                        </select>
                    </div>

                    <label class="col-md-2">英譯：</label>
                    <div class="col-md-4">
                        <input v-model="varieties_item.english">
                    </div>
                </div>

                <div class="row">
                    <label class="col-md-2">提要信息：</label>
                    <div class="col-md-4">
                        <input id="ry-input-info" v-model="varieties_item.type_summary">
                    </div>
                </div>

                <div class="row">
                    <label class="col-md-2">標準分類：</label>
                    <div class="col-md-3">
                        <select id="ry-select-b" @change="">
                            <option v-for="item in menu_eight">{{item.chinese_name}}</option>
                        </select>
                    </div>
                    <div class="col-md-3">
                        <select id="ry-select-l" @click="get_lei_item()" @change="">
                            <option v-for="item in lei_items">{{item.chinese_name}}</option>
                        </select>
                    </div>
                    <div class="col-md-4">
                        <select id="ry-select-s" @click="get_shu_item()">
                            <option v-for="item in shu_items">{{item.chinese_name}}</option>
                        </select>
                    </div>
                </div>
            </div>

            <div>
                <img src="../../../../assets/img/上传1/中间墨线.png" height="6" width="843"/>
            </div>

            <div id="form-variety">
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
                        <input readonly @click="open_birth()" v-model="varieties_item.varieties_responsibility.begin_time">
                    </div>

                    <div class="col-md-2">
                        <span class="star">*</span>
                        <label>責任結束時間:</label>
                    </div>
                    <div class="col-md-4">
                        <input readonly @click="open_dead()" v-model="varieties_item.varieties_responsibility.end_time">
                    </div>
                </div>

                <div class="row">
                    <label class="col-md-2">責任地點：</label>
                    <div class="col-md-4">
                        <input>
                    </div>

                    <div class="col-md-2">
                        <span class="star">*</span>
                        <label>責任者名稱:</label>
                    </div>
                    <div class="col-md-4">
                        <input>
                    </div>
                </div>

                <div class="row">
                    <div class="col-md-2">
                        <span class="star">*</span>
                        <label>責任者類型：</label>
                    </div>
                    <div class="col-md-4">
                        <select id="ry-v-type">
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
                        <select id="ry-v-action">
                            <option v-for="item in menu_nine">{{item.chinese_name}}</option>
                        </select>
                    </div>
                </div>

                <div class="row">
                    <div class="col-md-2">
                        <span class="star">*</span>
                        <label>確定性：</label>
                    </div>
                    <div class="col-md-4">
                        <select id="ry-v-confirm">
                            <option>不详</option>
                            <option>确定</option>
                            <option>題</option>
                        </select>
                    </div>
                </div>

                <div class="row">
                    <label class="col-md-2">責任說明：</label>
                    <div class="col-md-4">
                        <input v-model="varieties_item.varieties_responsibility.explain" id="ry-input-responsibility">
                    </div>
                </div>
            </div>

            <div>
                <img src="../../../../assets/img/上传1/中间墨线.png" height="6" width="843"/>
            </div>

            <time_modal :time_modal="this.time_modal_1" v-on:success_time="birth_time" v-on:close_modal="close_birth()"></time_modal>
            <time_modal :time_modal="this.time_modal_2" v-on:success_time="dead_time" v-on:close_modal="close_dead()"></time_modal>
        </div>
    </div>

</template>

<script>
    import time_modal from '../../../../component/time-modal.vue';
    export default{
        components:{
            time_modal,
        },

        data() {
            return{
                time_modal_1:false,
                time_modal_2:false,
                lei_items_obj : {},
                shu_items_obj : {},
                lei_items : [],
                shu_items : [],
                get_menu_eight_obj : {},
                menu_eight : [],
                get_menu_nine_obj : {},
                menu_nine : [],
                varieties_item : {
                    type_name : '',
                    type_other_name : '',
                    english : '',
                    type_save : '',
                    type_level : '',
                    type_bu : '',
                    type_lei : '',
                    type_shu : '',
                    type_summary : '',
                    literature_standard_name : '',
                    varieties_responsibility : {
                        location_id : '',
                        person_id : '',
                        begin_time : '',
                        begin_time_id : '',
                        end_time : '',
                        end_time_id :'',
                        action : '',
                        explain : '',
                        confirm : '',
                        type : '',
                        level : 1,
                    }
                },
            }
        },

        created : function () {
            this.get_menu_eight();
            this.get_menu_nine();
            this.varieties_item = this.$store.getters.get_varieties_item;
        },

        mounted : function () {
            this.default_selections_variety();
        },

        beforeRouteLeave (to, from, next) {
            this.$store.commit("get_varieties_contents",this.varieties_item);
//            this.selections_variety();
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
                this.varieties_item.varieties_responsibility.begin_time_id = p.time_id;
                this.varieties_item.varieties_responsibility.begin_time = p.standard_name;
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
                this.varieties_item.varieties_responsibility.end_time_id = q.time_id;
                this.varieties_item.varieties_responsibility.end_time = q.standard_name;
                this.close_dead();
            },

            close_dead() {
                this.time_modal_2 = false;
            },

            get_menu_nine() {
                let url = '/ancient_books/get_menu_items.action?model_id=9&&item_1_id=0&&item_2_id=0';
                this.http_json (url , 'get' , this.get_menu_nine_obj , this.success_get_menu_nine , this.fail_get_menu_nine);
            },

            success_get_menu_nine(response) {
                console.log ("success get menu nine");
                //将后端数据显示在前端页面里
                if (response.body.length === 0) {
                    console.log ("没有返回数组！");
                }
                else {
                    for (var j = 0; j <= response.body.length-1; j++) {
                        this.menu_nine.push({
                            chinese_name: response.body[j].chinese_name
                        });
                    }
                }
            },

            fail_get_menu_nine() {
                console.log ("fail get menu nine!");
            },

            get_menu_eight() {
                let url = '/ancient_books/get_menu_items.action?model_id=8&&item_1_id=0&&item_2_id=0';
                this.http_json (url , 'get' , this.get_menu_eight_obj , this.success_get_menu_eight , this.fail_get_menu_eight);
            },

            success_get_menu_eight(response) {
                console.log ("success get menu eight");
                //将后端数据显示在前端页面里
                if (response.body.length === 0) {
                    console.log ("没有返回数组！");
                }
                else {
                    for (var j = 0; j <= response.body.length-1; j++) {
                        this.menu_eight.push({
                            chinese_name: response.body[j].chinese_name
                        });
                    }
                }
            },

            fail_get_menu_eight() {
                console.log ("fail get menu eight!");
            },


            get_lei_item() {
                var bu = document.getElementById("ry-select-b");
                var bu_index = bu.selectedIndex;
                this.get_lei_items_obj.model_id = 8;
                this.get_lei_items_obj.item_1_id = bu_index;
                this.get_lei_items_obj.item_2_id = 0;
                this.http_json ('/ancient_books/get_menu_items.action' , 'get' , this.get_lei_items_obj , this.success_get_lei_items , this.fail_get_lei_items);
            },

            success_get_lei_items(response) {
                console.log ("success get lei items ");
                //将后端数据显示在前端页面里
                if (response.body.length === 0) {
                    console.log ("没有返回数组！");
                }
                else {
                    for (var j = 0; j <= response.body.length-1; j++) {
                        this.lei_items.push({
                            chinese_name: response.body[j].chinese_name
                        });
                    }
                }
            },

            fail_get_lei_items() {
                console.log ("fail get lei items!");
            },

            get_shu_item() {
                var bu = document.getElementById("ry-select-b");
                var lei = document.getElementById("ry-select-l");
                var bu_index = bu.selectedIndex;
                var lei_index = lei.selectedIndex;
                this.get_shu_items_obj.model_id = 8;
                this.get_shu_items_obj.item_1_id = bu_index;
                this.get_shu_items_obj.item_2_id = lei_index;
                this.http_json ('/ancient_books/get_menu_items.action' , 'get' , this.get_shu_items_obj , this.success_get_shu_items , this.fail_get_shu_items);
            },

            success_get_shu_items(response) {
                console.log ("success get shu items ");
                //将后端数据显示在前端页面里
                if (response.body.length === 0) {
                    console.log ("没有返回数组！");
                }
                else {
                    for (var j = 0; j <= response.body.length-1; j++) {
                        this.shu_items.push({
                            chinese_name: response.body[j].chinese_name
                        });
                    }
                }
            },

            fail_get_shu_items() {
                console.log ("fail get shu items!");
            },

            /**
             * 获得用户选择的option并存储
             */
            selections_variety() {
                var type_save = document.getElementById("ry-type-save");
                var type_save_index = type_save.selectedIndex;
                this.varieties_item.type_save = type_save_index + 1;
                var type_level = document.getElementById("ry-type-level");
                var type_level_index = type_level.selectedIndex;
                this.varieties_item.type_level = type_level_index + 1;
                var bu = document.getElementById("ry-select-b");
                var bu_index = bu.selectedIndex;
                this.varieties_item.type_bu = bu_index + 1;
                var lei = document.getElementById("ry-select-l");
                var lei_index = lei.selectedIndex;
                this.varieties_item.type_lei = lei_index + 1;
                var shu = document.getElementById("ry-select-s");
                var shu_index = shu.selectedIndex;
                this.varieties_item.type_shu = shu_index + 1;
                var type = document.getElementById("ry-v-type");
                var type_index = type.selectedIndex;
                this.varieties_item.varieties_responsibility.type = type_index + 1;
                var action = document.getElementById("ry-v-action");
                var action_index = action.selectedIndex;
                this.varieties_item.varieties_responsibility.action = action_index + 1;
                var confirm = document.getElementById("ry-v-confirrm");
                var confirm_index = confirm.selectedIndex;
                this.varieties_item.varieties_responsibility.confirm = confirm_index + 1;
            },

            /**
             * 设置默认首选项
             */
            default_selections_variety() {
                var type_save = document.getElementById("ry-type-save");
                type_save.selectedIndex = this.varieties_item.type_save - 1;
                var type_level = document.getElementById("ry-type-level");
                type_level.selectedIndex = this.varieties_item.type_level - 1;
                var bu = document.getElementById("ry-select-b");
                bu.selectedIndex = this.varieties_item.type_bu - 1;
                var lei = document.getElementById("ry-select-l");
                lei.selectedIndex = this.varieties_item.type_lei - 1;
                var shu = document.getElementById("ry-select-s");
                shu.selectedIndex = this.varieties_item.type_shu - 1;
                var type = document.getElementById("ry-v-type");
                type.selectedIndex = this.varieties_item.varieties_responsibility.type - 1;
                var action = document.getElementById("ry-v-action");
                action.selectedIndex = this.varieties_item.varieties_responsibility.action - 1;
                var confirm = document.getElementById("ry-v-confirm");
                confirm.selectedIndex = this.varieties_item.varieties_responsibility.confirm - 1;
            },
        },
    }
</script>

<style>
    #ry-select-b,#ry-select-l,#ry-select-s{
        width: 208px;
        height: 33px;
        background-image: url("../../../../assets/img/上传1/标准分类.png");
    }

    #ry-input-info,#ry-input-responsibility{
        width: 664px;
        height: 74px;
        background-image: url("../../../../assets/img/上传1/责任信息.png");
    }


</style>

