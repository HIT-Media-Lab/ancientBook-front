<template>

    <!--品种层-->
    <div class="layer-input div-now">
        <div class="form-center">
            <div>
                <div class="row">
                    <div class="col-md-2">
                        <span class="star">*</span>
                        <label>书名:</label>
                    </div>
                    <div class="col-md-4">
                        <input id="bookName" v-model="varieties_item.type_name">
                    </div>

                    <label class="col-md-2">别名:</label>
                    <div class="col-md-4">
                        <input v-model="varieties_item.type_other_name" placeholder="多值属性用逗号隔开">
                    </div>
                </div>

                <div class="row">
                    <label class="col-md-2">存佚类型:</label>
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
                    <label class="col-md-2">品种级别：</label>
                    <div class="col-md-4">
                        <select id="ry-type-level">
                            <option>不详</option>
                            <option>丛书总目</option>
                            <option>丛书子目</option>
                            <option>单行本</option>
                            <option>合订本总目</option>
                            <option>合订本子目</option>
                        </select>
                    </div>

                    <label class="col-md-2">英译：</label>
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
                    <label class="col-md-2">标准分类：</label>
                    <div class="col-md-3">
                        <select id="ry-select-b" @change="get_lei_item()">
                            <option v-for="item in menu_eight">{{item.chinese_name}}</option>
                        </select>
                    </div>
                    <div class="col-md-3">
                        <select id="ry-select-l" @change="get_shu_item()">
                            <option v-for="item in lei_items">{{item.chinese_name}}</option>
                        </select>
                    </div>
                    <div class="col-md-4">
                        <select id="ry-select-s">
                            <option v-for="item in shu_items">{{item.chinese_name}}</option>
                        </select>
                    </div>
                </div>
            </div>

            <div>
                <img src="../../../../assets/img/no-use-picture/ink-line.png" height="6" width="843"/>
            </div>

            <div class="form-variety" v-for="(item,index) in varieties_item.varieties_responsibility">
                <div class="row">
                    <div class="col-md-2 float-right">
                        <button id="btn-add-copy" class="ry-btn-add" @click="add_new_box(index)" v-show="varieties_item.varieties_responsibility[index].value_add">添加</button>
                    </div>
                    <div class="col-md-2 float-right">
                        <button id="btn-delete-copy" class="ry-btn-del" @click="del_new_box(index)" v-show="varieties_item.varieties_responsibility[index].value_del">删除</button>
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
                    <div class="col-md-2">
                        <span class="star"></span>
                        <label>责任者类型：</label>
                    </div>
                    <div class="col-md-4">
                        <select class="ry-v-type" @click="get_index()" @change="change_type()">
                            <option>不详</option>
                            <option>责任人</option>
                            <option>责任机构</option>
                        </select>
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
                    <label class="col-md-2">责任地点：</label>
                    <div class="col-md-4">
                        <input readonly @click="open_location()" v-model="item.location">
                    </div>

                    <div class="col-md-2">
                        <span class="star"></span>
                        <label>责任行为：</label>
                    </div>
                    <div class="col-md-4">
                        <select class="ry-v-action">
                            <option v-for="item in menu_nine">{{item.chinese_name}}</option>
                        </select>
                    </div>
                </div>

                <div class="row">
                    <div class="col-md-2">
                        <span class="star"></span>
                        <label>确定性：</label>
                    </div>
                    <div class="col-md-4">
                        <select class="ry-v-confirm">
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
        </div>

        <time_modal :time_modal="this.time_modal_1" v-on:success_time="birth_time" v-on:close_modal="close_birth()"></time_modal>
        <time_modal :time_modal="this.time_modal_2" v-on:success_time="dead_time" v-on:close_modal="close_dead()"></time_modal>
        <search_modal :search_url="this.search_location" :noumenon_modal="this.location_modal" :noumenon_number="7" :repeat_arr="[]" v-on:close_modal="close_location" v-on:add_noumenon_relations="add_location"></search_modal>
        <search_modal :search_url="this.search_person" :noumenon_modal="this.character_modal" :noumenon_number="this.noumenon_number" :repeat_arr="[]" v-on:close_modal="close_character" v-on:add_noumenon_relations="add_character"></search_modal>
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
                noumenon_number : 0,
                search_person : '',
                search_location : '/ancient_books/get_location_list_by_name.action',
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
                varieties_item : {},
            }
        },

        created : function () {
            this.get_menu_lei();
            this.get_menu_shu();
            this.get_menu_eight();
            this.get_menu_nine();
            this.varieties_item = this.$store.getters.get_varieties_item;
        },

        mounted : function () {
            this.default_selections_variety();
        },

        beforeRouteLeave (to, from, next) {
            this.varieties_item.varieties_responsibility[0].action_value = document.getElementsByClassName("ry-v-action")[0].options[document.getElementsByClassName("ry-v-action")[0].selectedIndex].text;
            if (document.getElementsByClassName("ry-v-action")[1]){
                this.varieties_item.varieties_responsibility[1].action_value = document.getElementsByClassName("ry-v-action")[1].options[document.getElementsByClassName("ry-v-action")[1].selectedIndex].text;
            }
            this.selections_variety();
            this.$store.commit("get_varieties_contents",this.varieties_item);
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
                if (this.noumenon_number != 0) {
                    this.character_modal = true;
                }
            },

            add_character(p){
                this.varieties_item.varieties_responsibility[this.index].person_id = p.noumenon_id;
                this.varieties_item.varieties_responsibility[this.index].person = p.standard_name;
            },

            close_character(){
                this.character_modal = false;
            },


            /**
             * 责任者类型改变
             */
            change_type() {
                var types = document.getElementsByClassName("ry-v-type");
                if (types[this.index].selectedIndex == 0) {
                    this.search_person = '';
                    this.noumenon_number = 0;
                }
                else if (types[this.index].selectedIndex == 1) {
                    this.search_person = '/ancient_books/get_person_list_by_name.action';
                    this.noumenon_number = 1;
                }
                else if (types[this.index].selectedIndex == 2) {
                    this.search_person = '/ancient_books/get_institution_list_by_name.action';
                    this.noumenon_number = 6;
                }
            },


            /**
             * 下拉菜单内容请求
             */
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

            get_menu_lei(){
                var obj = {};
                var url = '/ancient_books/get_menu_items.action?model_id=8&&item_1_id=1&&item_2_id=0';
                this.http_json (url , 'get' , obj , this.success_get_menu_lei , this.fail_get_menu_lei);
            },

            success_get_menu_lei(response){
                console.log ("成功获得第一组类");
                //将后端数据显示在前端页面里
                this.lei_items = [];
                for (var j = 0; j <= response.body.length-1; j++) {
                    this.lei_items.push({
                        item_2_id: response.body[j].item_2_id,
                        chinese_name: response.body[j].chinese_name
                    });
                }
            },

            fail_get_menu_lei(){
                console.log ("失败获得第一组类");
            },

            get_menu_shu(){
                var obj = {};
                var url = '/ancient_books/get_menu_items.action?model_id=8&&item_1_id=1&&item_2_id=1';
                this.http_json (url , 'get' , obj , this.success_get_menu_shu , this.fail_get_menu_shu);
            },

            success_get_menu_shu(response){
                console.log ("成功获得第一组属");
                //将后端数据显示在前端页面里
                this.shu_items = [];
                for (var j = 0; j <= response.body.length-1; j++) {
                    this.shu_items.push({
                        item_3_id: response.body[j].item_3_id,
                        chinese_name: response.body[j].chinese_name
                    });
                }
            },

            fail_get_menu_shu(){
                console.log ("失败获得第一组属");
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
                    this.lei_items = [];
                    for (var j = 0; j <= response.body.length-1; j++) {
                        this.lei_items.push({
                            item_2_id: response.body[j].item_2_id,
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
//                if (bu_index == 2){
//                    lei_index =
//                }
//                else if (bu_index == 3){
//                    lei_index =
//                }
//                else if (bu_index == 4){
//                    lei_index =
//                }
//                else if (bu_index == 5){
//                    lei_index =
//                }
                this.http_json ('/ancient_books/get_menu_items.action?model_id=8&&item_1_id=' + bu_index + '&&item_2_id=' + lei_index , 'get' , this.get_shu_items_obj , this.success_get_shu_items , this.fail_get_shu_items);
            },

            success_get_shu_items(response) {
                console.log ("success get shu items ");
                //将后端数据显示在前端页面里
                if (response.body.length === 0) {
                    console.log ("没有返回数组！");
                    this.shu_items = [];
                }
                else {
                    this.shu_items = [];
                    for (var j = 0; j <= response.body.length-1; j++) {
                        this.shu_items.push({
                            item_3_id: response.body[j].item_3_id,
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
                var lei_text = lei.options[lei_index].text;
                if (lei_text){
                    for (var m = 0; m < this.lei_items.length; m++){
                        if (lei_text == this.lei_items[m].chinese_name){
                            this.varieties_item.type_lei = this.lei_items[m].item_2_id;
                        }
                    }
                }

                var shu = document.getElementById("ry-select-s");
                var shu_index = shu.selectedIndex;
                var shu_text = shu.options[shu_index].text;
                if (shu_text){
                    for (var n = 0; n < this.shu_items.length; n++){
                        if (shu_text == this.shu_items[n].chinese_name){
                            this.varieties_item.type_shu = this.shu_items[n].item_3_id;
                        }
                    }
                }

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
        background-image: url("../../../../assets/img/picture-button/biaozhunfenlei.png");
    }

    #ry-input-info,#ry-input-responsibility{
        width: 664px;
        height: 74px;
        background-image: url("../../../../assets/img/modal-box/zerenxinxi.png");
        background-size: 100%;
    }

    .ry-btn-add{
        width: 103px;
        height: 44px;
        color: white;
        background-image: url("../../../../assets/img/button/add-button.png");
    }

    .ry-btn-del{
        width: 103px;
        height: 44px;
        color: white;
        background-image: url("../../../../assets/img/button/add-button.png");
    }


</style>

