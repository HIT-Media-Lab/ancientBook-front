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
                <img src="../../../../assets/img/upload1/中间墨线.png" height="6" width="843"/>
            </div>

            <div class="form-variety" v-for="(item,index) in varieties_item.varieties_responsibility">
                <div class="row">
                    <div class="col-md-2 float-right">
                        <button id="btn-add-copy" class="ry-btn-add" @click="add_new_box(index)" v-show="varieties_item.varieties_responsibility[index].value_add">添加</button>
                    </div>
                    <div class="col-md-2 float-right">
                        <button id="btn-delete-copy" class="ry-btn-del" @click="del_new_box(index)" v-show="varieties_item.varieties_responsibility[index].value_del">刪除</button>
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
                        <select class="ry-v-type">
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
                        <select class="ry-v-action">
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
                        <select class="ry-v-confirm">
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
                get_lei_items_obj : {},
                get_shu_items_obj : {},
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
                    varieties_responsibility : [{
                        value_add : true,
                        value_del : false,
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
                        level : 1,
                    }]
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
            this.varieties_item.varieties_responsibility[0].action_value = document.getElementsByClassName("ry-v-action")[0].options[document.getElementById("ry-v-action").selectedIndex].text;
            this.$store.commit("get_varieties_contents",this.varieties_item);
            this.selections_variety();
            next();
        },

        methods : {
            /**
             * 获得责任数组指数
             */
            get_index() {
                var divs = document.getElementsByClassName("form-variety");
                for (var i = 0; i < divs.length; i++) {
                    divs[i].setAttribute("data-i", i);
                }
                this.index = event.currentTarget.parentNode.parentNode.parentNode.getAttribute("data-i");
            },


            /**
             * 添加责任信息
             */
            add_new_box(p) {
                this.varieties_item.varieties_responsibility[p].value_add = false;
                this.varieties_item.varieties_responsibility[p].value_del = false;
                this.varieties_item.varieties_responsibility.push({
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
                    level : 1,
                });
            },


            /**
             * 删除责任信息
             */
            del_new_box(p) {
                if (p == 1) {
                    this.varieties_item.varieties_responsibility[p-1].value_add = true;
                    this.varieties_item.varieties_responsibility[p-1].value_del = false;
                }
                else{
                    this.varieties_item.varieties_responsibility[p-1].value_add = true;
                    this.varieties_item.varieties_responsibility[p-1].value_del = true;
                }
                this.varieties_item.varieties_responsibility.pop();
            },


            /**
             * 责任开始时间
             */
            open_birth() {
                this.get_index();
                this.time_modal_1 = true;
            },

            birth_time(p) {
                this.varieties_item.varieties_responsibility[this.index].begin_time_id = p.time_id;
                this.varieties_item.varieties_responsibility[this.index].begin_time = p.standard_name;
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
                this.varieties_item.varieties_responsibility[this.index].end_time_id = q.time_id;
                this.varieties_item.varieties_responsibility[this.index].end_time = q.standard_name;
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
                this.varieties_item.varieties_responsibility[this.index].location_id = p.noumenon_id;
                this.varieties_item.varieties_responsibility[this.index].location = p.standard_name;
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
                this.varieties_item.varieties_responsibility[this.index].person_id = p.noumenon_id;
                this.varieties_item.varieties_responsibility[this.index].person = p.standard_name;
            },

            close_character(){
                this.character_modal = false;
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
                var bu_index = bu.selectedIndex + 1;
                this.http_json ('/ancient_books/get_menu_items.action?model_id=8&&item_1_id=' + bu_index + '&&item_2_id=0' , 'get' , this.get_lei_items_obj , this.success_get_lei_items , this.fail_get_lei_items);
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
                var bu_index = bu.selectedIndex + 1;
                var lei_index = lei.selectedIndex + 1;
                this.http_json ('/ancient_books/get_menu_items.action?model_id=8&&item_1_id=' + bu_index + '&&item_2_id=' + lei_index , 'get' , this.get_shu_items_obj , this.success_get_shu_items , this.fail_get_shu_items);
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

                var types = document.getElementsByClassName("ry-v-type");
                for (var i = 0; i < types.length; i++) {
                    var type_index = types[i].selectedIndex;
                    this.varieties_item.varieties_responsibility[i].type = type_index + 1;
                }

                var actions = document.getElementsByClassName("ry-v-action");
                for (var j = 0; j < actions.length; j++) {
                    var action_index = actions[j].selectedIndex;
                    this.varieties_item.varieties_responsibility[j].action = action_index + 1;
                }

                var confirms = document.getElementsByClassName("ry-v-confirm");
                for (var k = 0; k < confirms.length; k++) {
                    var confirm_index = confirms[k].selectedIndex;
                    this.varieties_item.varieties_responsibility[k].confirm = confirm_index + 1;
                }
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

                var types = document.getElementsByClassName("ry-v-type");
                for (var i = 0; i < types.length; i ++) {
                    types[i].selectedIndex = this.varieties_item.varieties_responsibility[i].type - 1;
                }

                var actions = document.getElementsByClassName("ry-v-action");
                for (var k = 0; k < actions.length; k ++) {
                    actions[k].selectedIndex = this.varieties_item.varieties_responsibility[k].action - 1;
                }

                var confirms = document.getElementsByClassName("ry-v-confirm");
                for (var j = 0; j < confirms.length; j ++) {
                    confirms[j].selectedIndex = this.varieties_item.varieties_responsibility[j].confirm - 1;
                }
            },
        },
    }
</script>

<style>
    #ry-select-b,#ry-select-l,#ry-select-s{
        width: 208px;
        height: 33px;
        background-image: url("../../../../assets/img/upload1/标准分类.png");
    }

    #ry-input-info,#ry-input-responsibility{
        width: 664px;
        height: 74px;
        background-image: url("../../../../assets/img/upload1/责任信息.png");
    }


</style>

