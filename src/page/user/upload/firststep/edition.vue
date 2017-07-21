<template>
    <!--版本层-->
    <div class="layer-input">
        <div id="edition" class="form-center">
            <div>
                <div class="row">
                    <label class="col-md-2">版本类型：</label>
                    <div class="col-md-4">
                        <select id="ry-e-edition-type">
                            <option v-for="item in menu_ten">{{item.chinese_name}}</option>
                        </select>
                    </div>

                    <label class="col-md-2">版本时代：</label>
                    <div class="col-md-4">
                        <select id="ry-e-age">
                            <option v-for="item in menu_eleven">{{item.chinese_name}}</option>
                        </select>
                    </div>
                </div>

                <div class="row">
                    <label class="col-md-2">载体形式：</label>
                    <div class="col-md-4">
                        <select id="ry-e-support">
                            <option v-for="item in menu_twelve">{{item.chinese_name}}</option>
                        </select>
                    </div>

                    <label class="col-md-2">装帧形式：</label>
                    <div class="col-md-4">
                        <select id="ry-e-binding">
                            <option v-for="item in menu_thirteen">{{item.chinese_name}}</option>
                        </select>
                    </div>
                </div>

                <div class="row">
                    <label class="col-md-2">板框长度：</label>
                    <div class="col-md-4">
                        <input v-model="edition_item.version_frame_length_str">
                    </div>

                    <label class="col-md-2">板框宽度：</label>
                    <div class="col-md-4">
                        <input v-model="edition_item.version_frame_width_str">
                    </div>
                </div>

                <div class="row">
                    <label class="col-md-2">开本长度：</label>
                    <div class="col-md-4">
                        <input v-model="edition_item.version_format_length_str">
                    </div>

                    <label class="col-md-2">开本宽度：</label>
                    <div class="col-md-4">
                        <input v-model="edition_item.version_format_width_str">
                    </div>
                </div>

                <div class="row">
                    <label class="col-md-2">牌记内容：</label>
                    <div class="col-md-4">
                        <input v-model="edition_item.version_paiji_content">
                    </div>

                    <label class="col-md-2">牌记位置:</label>
                    <div class="col-md-4">
                        <input v-model="edition_item.version_paiji_location">
                    </div>
                </div>

                <div class="row">
                    <label class="col-md-2">半页行数：</label>
                    <div class="col-md-4">
                        <input v-model="edition_item.version_half_page_line_number_str">
                    </div>

                    <label class="col-md-2">每行字数：</label>
                    <div class="col-md-4">
                        <input v-model="edition_item.version_page_line_number_str">
                    </div>
                </div>

                <div class="row">
                    <label class="col-md-2">双行小字字数：</label>
                    <div class="col-md-4">
                        <input v-model="edition_item.version_double_page_number_str">
                    </div>

                    <label class="col-md-2">鱼尾样式：</label>
                    <div class="col-md-4">
                        <select id="ry-e-fish">
                            <option v-for="item in menu_fourteen">{{item.chinese_name}}</option>
                        </select>
                    </div>
                </div>

                <div class="row">
                    <label class="col-md-2">边栏样式：</label>
                    <div class="col-md-4">
                        <select id="ry-e-side">
                            <option v-for="item in menu_fifteen">{{item.chinese_name}}</option>
                        </select>
                    </div>

                    <label class="col-md-2">分栏：</label>
                    <div class="col-md-4">
                        <select id="ry-e-divide">
                            <option v-for="item in menu_sixteen">{{item.chinese_name}}</option>
                        </select>
                    </div>
                </div>

                <div class="row">
                    <label class="col-md-2">书口样式：</label>
                    <div class="col-md-4">
                        <select id="ry-e-book">
                            <option v-for="item in menu_seventeen">{{item.chinese_name}}</option>
                        </select>
                    </div>

                    <label class="col-md-2">版心內容：</label>
                    <div class="col-md-4">
                        <input v-model="edition_item.version_banxin_content">
                    </div>
                </div>


                <div class="row">
                    <label class="col-md-2">有无书耳：</label>
                    <div class="col-md-4">
                        <input v-model="edition_item.version_youshuwuer">
                    </div>

                    <label class="col-md-2">有无夹注：</label>
                    <div class="col-md-4">
                        <select id="ry-e-comment">
                            <option>不详</option>
                            <option>有</option>
                            <option>无</option>
                        </select>
                    </div>
                </div>

                <div class="row">
                    <label class="col-md-2">卷数:</label>
                    <div class="col-md-4">
                        <input v-model="edition_item.version_volume_str">
                    </div>
                </div>
            </div>

            <div>
                <img src="../../../../assets/img/no-use-picture/ink-line.png" height="6" width="843"/>
            </div>

            <div class="form-edition" v-for="(item,index) in edition_item.edition_responsibility">
                <div class="row">
                    <div class="col-md-2 float-right">
                        <button id="btn-add-edition" class="ry-btn-add" @click="add_new_box(index)" v-show="edition_item.edition_responsibility[index].value_add">添加</button>
                    </div>
                    <div class="col-md-2 float-right">
                        <button id="btn-delete-edition" class="ry-btn-del" @click="del_new_box(index)" v-show="edition_item.edition_responsibility[index].value_del">刪除</button>
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
                        <select class="ry-e-type">
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
                        <select class="ry-e-action">
                            <option v-for="item in menu_nineteen">{{item.chinese_name}}</option>
                        </select>
                    </div>
                </div>

                <div class="row">
                    <div class="col-md-2">
                        <span class="star"></span>
                        <label>确定性：</label>
                    </div>
                    <div class="col-md-4">
                        <select class="ry-e-confirm">
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
                get_menu_ten_obj : {},
                menu_ten : [],
                get_menu_eleven_obj : {},
                menu_eleven : [],
                get_menu_twelve_obj : {},
                menu_twelve : [],
                get_menu_thirteen_obj : {},
                menu_thirteen : [],
                get_menu_fourteen_obj : {},
                menu_fourteen : [],
                get_menu_fifteen_obj : {},
                menu_fifteen : [],
                get_menu_sixteen_obj : {},
                menu_sixteen : [],
                get_menu_seventeen_obj : {},
                menu_seventeen : [],
                get_menu_nineteen_obj : {},
                menu_nineteen : [],
                menu_items :[],
                edition_item : {},
            }
        },

        created : function () {
            this.edition_item = this.$store.getters.get_edition_item;
            this. get_menu_ten();
            this. get_menu_eleven();
            this. get_menu_twelve();
            this. get_menu_thirteen();
            this. get_menu_fourteen();
            this. get_menu_fifteen();
            this. get_menu_sixteen();
            this. get_menu_seventeen();
            this. get_menu_nineteen();
        },

        mounted : function () {
            this.default_selections_edition();
        },

        beforeRouteLeave (to, from, next) {
            this.edition_item.edition_responsibility[0].action_value = document.getElementsByClassName("ry-e-action")[0].options[document.getElementsByClassName("ry-e-action")[0].selectedIndex].text;
            this.$store.commit("get_edition_contents",this.edition_item);
            this.selections_edition();
            next();
        },

        methods : {
            /**
             * 获得责任数组指数
             */
            get_index() {
                var divs = document.getElementsByClassName("form-edition");
                for (var i = 0; i < divs.length; i++) {
                    divs[i].setAttribute("data-i", i);
                }
                this.index = event.currentTarget.parentNode.parentNode.parentNode.getAttribute("data-i");
            },


            /**
             * 添加责任信息
             */
            add_new_box(p) {
                this.edition_item.edition_responsibility[p].value_add = false;
                this.edition_item.edition_responsibility[p].value_del = false;
                this.edition_item.edition_responsibility.push({
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
                    level : 2,
                });
            },


            /**
             * 删除责任信息
             */
            del_new_box(p) {
                if (p == 1) {
                    this.edition_item.edition_responsibility[p-1].value_add = true;
                    this.edition_item.edition_responsibility[p-1].value_del = false;
                }
                else{
                    this.edition_item.edition_responsibility[p-1].value_add = true;
                    this.edition_item.edition_responsibility[p-1].value_del = true;
                }
                this.edition_item.edition_responsibility.pop();
            },


            /**
             * 责任开始时间
             */
            open_birth() {
                this.get_index();
                this.time_modal_1 = true;
            },

            birth_time(p) {
                this.edition_item.edition_responsibility[this.index].begin_time_id = p.time_id;
                this.edition_item.edition_responsibility[this.index].begin_time = p.standard_name;
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
                this.edition_item.edition_responsibility[this.index].end_time_id = q.time_id;
                this.edition_item.edition_responsibility[this.index].end_time = q.standard_name;
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
                this.edition_item.edition_responsibility[this.index].location_id = p.noumenon_id;
                this.edition_item.edition_responsibility[this.index].location = p.standard_name;
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
                this.edition_item.edition_responsibility[this.index].person_id = p.noumenon_id;
                this.edition_item.edition_responsibility[this.index].person = p.standard_name;
            },

            close_character(){
                this.character_modal = false;
            },


            get_menu_ten() {
                let url = '/ancient_books/get_menu_items.action?model_id=10&&item_1_id=0&&item_2_id=0';
                this.http_json (url , 'get' , this.get_menu_ten_obj , this.success_get_menu_ten , this.fail_get_menu_ten);
            },

            success_get_menu_ten(response) {
                console.log ("success get menu ten");
                //将后端数据显示在前端页面里
                if (response.body.length === 0) {
                    console.log ("没有返回数组！");
                }
                else {
                    for (var j = 0; j <= response.body.length-1; j++) {
                        this.menu_ten.push({
                            chinese_name: response.body[j].chinese_name
                        });
                    }
                }
            },

            fail_get_menu_ten() {
                console.log ("fail get menu ten!");
            },

            get_menu_eleven() {
                let url = '/ancient_books/get_menu_items.action?model_id=11&&item_1_id=0&&item_2_id=0';
                this.http_json (url , 'get' , this.get_menu_eleven_obj , this.success_get_menu_eleven , this.fail_get_menu_eleven);
            },

            success_get_menu_eleven(response) {
                console.log ("success get menu eleven");
                //将后端数据显示在前端页面里
                if (response.body.length === 0) {
                    console.log ("没有返回数组！");
                }
                else {
                    for (var j = 0; j <= response.body.length-1; j++) {
                        this.menu_eleven.push({
                            chinese_name: response.body[j].chinese_name
                        });
                    }
                }
            },

            fail_get_menu_eleven() {
                console.log ("fail get menu eleven!");
            },

            get_menu_twelve() {
                let url = '/ancient_books/get_menu_items.action?model_id=12&&item_1_id=0&&item_2_id=0';
                this.http_json (url , 'get' , this.get_menu_twelve_obj , this.success_get_menu_twelve , this.fail_get_menu_twelve);
            },

            success_get_menu_twelve(response) {
                console.log ("success get menu twelve");
                //将后端数据显示在前端页面里
                if (response.body.length === 0) {
                    console.log ("没有返回数组！");
                }
                else {
                    for (var j = 0; j <= response.body.length-1; j++) {
                        this.menu_twelve.push({
                            chinese_name: response.body[j].chinese_name
                        });
                    }
                }
            },

            fail_get_menu_twelve() {
                console.log ("fail get menu twelve!");
            },

            get_menu_thirteen() {
                let url = '/ancient_books/get_menu_items.action?model_id=13&&item_1_id=0&&item_2_id=0';
                this.http_json (url , 'get' , this.get_menu_thirteen_obj , this.success_get_menu_thirteen , this.fail_get_menu_thirteen);
            },

            success_get_menu_thirteen(response) {
                console.log ("success get menu thirteen");
                //将后端数据显示在前端页面里
                if (response.body.length === 0) {
                    console.log ("没有返回数组！");
                }
                else {
                    for (var j = 0; j <= response.body.length-1; j++) {
                        this.menu_thirteen.push({
                            chinese_name: response.body[j].chinese_name
                        });
                    }
                }
            },

            fail_get_menu_thirteen() {
                console.log ("fail get menu thirteen!");
            },

            get_menu_fourteen() {
                let url = '/ancient_books/get_menu_items.action?model_id=14&&item_1_id=0&&item_2_id=0';
                this.http_json (url , 'get' , this.get_menu_fourteen_obj , this.success_get_menu_fourteen , this.fail_get_menu_fourteen);
            },

            success_get_menu_fourteen(response) {
                console.log ("success get menu fourteen");
                //将后端数据显示在前端页面里
                if (response.body.length === 0) {
                    console.log ("没有返回数组！");
                }
                else {
                    for (var j = 0; j <= response.body.length-1; j++) {
                        this.menu_fourteen.push({
                            chinese_name: response.body[j].chinese_name
                        });
                    }
                }
            },

            fail_get_menu_fourteen() {
                console.log ("fail get menu fourteen!");
            },

            get_menu_fifteen() {
                let url = '/ancient_books/get_menu_items.action?model_id=15&&item_1_id=0&&item_2_id=0';
                this.http_json (url , 'get' , this.get_menu_fifteen_obj , this.success_get_menu_fifteen , this.fail_get_menu_fifteen);
            },

            success_get_menu_fifteen(response) {
                console.log ("success get menu fifteen");
                //将后端数据显示在前端页面里
                if (response.body.length === 0) {
                    console.log ("没有返回数组！");
                }
                else {
                    for (var j = 0; j <= response.body.length-1; j++) {
                        this.menu_fifteen.push({
                            chinese_name: response.body[j].chinese_name
                        });
                    }
                }
            },

            fail_get_menu_fifteen() {
                console.log ("fail get menu fifteen!");
            },

            get_menu_sixteen() {
                let url = '/ancient_books/get_menu_items.action?model_id=16&&item_1_id=0&&item_2_id=0';
                this.http_json (url , 'get' , this.get_menu_sixteen_obj , this.success_get_menu_sixteen , this.fail_get_menu_sixteen);
            },

            success_get_menu_sixteen(response) {
                console.log ("success get menu sixteen");
                //将后端数据显示在前端页面里
                if (response.body.length === 0) {
                    console.log ("没有返回数组！");
                }
                else {
                    for (var j = 0; j <= response.body.length-1; j++) {
                        this.menu_sixteen.push({
                            chinese_name: response.body[j].chinese_name
                        });
                    }
                }
            },

            fail_get_menu_sixteen() {
                console.log ("fail get menu sixteen!");
            },

            get_menu_seventeen() {
                let url = '/ancient_books/get_menu_items.action?model_id=17&&item_1_id=0&&item_2_id=0';
                this.http_json (url , 'get' , this.get_menu_seventeen_obj , this.success_get_menu_seventeen , this.fail_get_menu_seventeen);
            },

            success_get_menu_seventeen(response) {
                console.log ("success get menu seventeen");
                //将后端数据显示在前端页面里
                if (response.body.length === 0) {
                    console.log ("没有返回数组！");
                }
                else {
                    for (var j = 0; j <= response.body.length-1; j++) {
                        this.menu_seventeen.push({
                            chinese_name: response.body[j].chinese_name
                        });
                    }
                }
            },

            fail_get_menu_seventeen() {
                console.log ("fail get menu seventeen!");
            },

            get_menu_nineteen() {
                let url = '/ancient_books/get_menu_items.action?model_id=19&&item_1_id=0&&item_2_id=0';
                this.http_json (url , 'get' , this.get_menu_nineteen_obj , this.success_get_menu_nineteen , this.fail_get_menu_nineteen);
            },

            success_get_menu_nineteen(response) {
                console.log ("success get menu nineteen");
                //将后端数据显示在前端页面里
                if (response.body.length === 0) {
                    console.log ("没有返回数组！");
                }
                else {
                    for (var j = 0; j <= response.body.length-1; j++) {
                        this.menu_nineteen.push({
                            chinese_name: response.body[j].chinese_name
                        });
                    }
                }
            },

            fail_get_menu_nineteen() {
                console.log ("fail get menu nineteen!");
            },

            /**
             * 获得用户选择的option并存储
             */
            selections_edition() {
                var e_type = document.getElementById("ry-e-edition-type");
                var e_type_index = e_type.selectedIndex;
                this.edition_item.version_type = e_type_index + 1;
                var age = document.getElementById("ry-e-age");
                var age_index = age.selectedIndex;
                this.edition_item.version_age = age_index + 1;
                var support = document.getElementById("ry-e-support");
                var support_index = support.selectedIndex;
                this.edition_item.version_support = support_index + 1;
                var binding = document.getElementById("ry-e-binding");
                var binding_index = binding.selectedIndex;
                this.edition_item.version_binding = binding_index + 1;
                var fish = document.getElementById("ry-e-fish");
                var fish_index = fish.selectedIndex;
                this.edition_item.version_yuwei = fish_index + 1;
                var side = document.getElementById("ry-e-side");
                var side_index = side.selectedIndex;
                this.edition_item.version_bianlan = side_index + 1;
                var divide = document.getElementById("ry-e-divide");
                var divide_index = divide.selectedIndex;
                this.edition_item.version_fenlan = divide_index + 1;
                var book = document.getElementById("ry-e-book");
                var book_index = book.selectedIndex;
                this.edition_item.version_shukou = book_index + 1;
                var comment = document.getElementById("ry-e-comment");
                var comment_index = comment.selectedIndex;
                this.edition_item.version_youwujiazhu = comment_index + 1;

                var types = document.getElementsByClassName("ry-e-type");
                for (var i = 0; i < types.length; i++) {
                    var type_index = types[i].selectedIndex;
                    this.edition_item.edition_responsibility[i].type = type_index + 1;
                }

                var actions = document.getElementsByClassName("ry-e-action");
                for (var j = 0; j < actions.length; j++) {
                    var action_index = actions[j].selectedIndex;
                    this.edition_item.edition_responsibility[j].action = action_index + 1;
                }

                var confirms = document.getElementsByClassName("ry-e-confirm");
                for (var k = 0; k < confirms.length; k++) {
                    var confirm_index = confirms[k].selectedIndex;
                    this.edition_item.edition_responsibility[k].confirm = confirm_index + 1;
                }
            },

            /**
             * 设置默认首选项
             */
            default_selections_edition() {
                var e_type = document.getElementById("ry-e-edition-type");
                e_type.selectedIndex = this.edition_item.version_type - 1;
                var age = document.getElementById("ry-e-age");
                age.selectedIndex = this.edition_item.version_age - 1;
                var support = document.getElementById("ry-e-support");
                support.selectedIndex = this.edition_item.version_support - 1;
                var binding = document.getElementById("ry-e-binding");
                binding.selectedIndex = this.edition_item.version_binding - 1;
                var fish = document.getElementById("ry-e-fish");
                fish.selectedIndex = this.edition_item.version_yuwei - 1;
                var side = document.getElementById("ry-e-side");
                side.selectedIndex = this.edition_item.version_bianlan - 1;
                var divide = document.getElementById("ry-e-divide");
                divide.selectedIndex = this.edition_item.version_fenlan - 1;
                var book = document.getElementById("ry-e-book");
                book.selectedIndex = this.edition_item.version_shukou - 1;
                var comment = document.getElementById("ry-e-comment");
                comment.selectedIndex = this.edition_item.version_youwujiazhu - 1;

                var types = document.getElementsByClassName("ry-e-type");
                for (var i = 0; i < types.length; i ++) {
                    types[i].selectedIndex = this.edition_item.edition_responsibility[i].type - 1;
                }

                var actions = document.getElementsByClassName("ry-e-action");
                for (var k = 0; k < actions.length; k ++) {
                    actions[k].selectedIndex = this.edition_item.edition_responsibility[k].action - 1;
                }

                var confirms = document.getElementsByClassName("ry-e-confirm");
                for (var j = 0; j < confirms.length; j ++) {
                    confirms[j].selectedIndex = this.edition_item.edition_responsibility[j].confirm - 1;
                }
            },
        },

    }
</script>



