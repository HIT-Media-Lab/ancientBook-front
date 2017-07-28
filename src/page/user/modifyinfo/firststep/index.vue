<template>

    <div class="ry-upload">
        <!--模块名称-->
        <div class="width950 center">
            <h3 style="display:inline-block">1输入古籍名称</h3>
            <button class="float-right ry-btn-cancel-upload" @click="cancel_upload">取消编辑</button>
        </div>

        <div class="width1000 center">
            <img src="../../../../assets/img/no-use-picture/ink-line-long.png" height="7" width="974"/>
        </div>

        <div class="width950 center">
            <h3 style="display:inline-block" class="float-left">古籍规范名称：</h3>
            <h4 id="bookName" style="display:inline-block" class="float-left ry-book-name">{{varieties_item.type_name}}</h4>
            <div class="ry-4layers" style="display:inline-block">
                <p>{{book_info1}}</p>
                <p>{{book_info2}}</p>
                <p>{{book_info3}}</p>
                <p>{{book_info4}}</p>
            </div>
        </div>

        <div class="width800 center ry-form-upload">
            <menuBar></menuBar>
            <div id="layer-body" class="ry-form-body">
                <router-view></router-view>
            </div>
            <div>
                <h3>古籍简介</h3>
                <p>{{book_all_info.summary}}</p>
            </div>
            <div>
                <button class="float-right ry-btn-next-step" @click="confirm_modify">确定</button>
                <button class="float-right ry-btn-keep-modify" @click="next_page">继续编辑图文</button>
                <label class="float-right"><input id="ry-one-pri" type="checkbox" name="private" class="ry-check-pri">私密上传</label>
            </div>
        </div>

    </div>

</template>

<script>
    import copy from './copy.vue';
    import edition from './edition.vue';
    import impression from './impression.vue';
    import varieties from './variety.vue';
    import menuBar from '../../../../component/modify-info-bar.vue';
    export default{
        components:{
            copy,
            edition,
            impression,
            varieties,
            menuBar,
        },

        data() {
            return{
                ancient_book_id : '',

                three_layers_id : '',
                literature_id : '',
                summary : '',

                literature_info : {},
                three_layers_info : {},

                book_all_info : {},
                book_info_split: [],
                book_info1:'',
                book_info2:'',
                book_info3:'',
                book_info4:'',

                varieties_item : {
                    type_name : '',
                    type_other_name : '',
                    english : '',
                    type_save : 1,
                    type_level : 1,
                    type_bu : 1,
                    type_lei : 1,
                    type_shu : 1,
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
                        action : 1,
                        action_value : '',
                        explain : '',
                        confirm : 1,
                        type : 1,
                        level : 1,
                    }]
                },
                edition_item : {
                    version_volume_str : '',
                    version_volume : null,
                    version_type : 1,
                    version_age : 1,
                    version_support : 1,
                    version_binding : 1,
                    version_frame_length_str : '',
                    version_frame_length : null,
                    version_frame_width_str : '',
                    version_frame_width : null,
                    version_format_length_str : '',
                    version_format_length : null,
                    version_format_width_str : '',
                    version_format_width : null,
                    version_paiji_content : '',
                    version_paiji_location : '',
                    version_half_page_line_number_str : '',
                    version_half_page_line_number : null,
                    version_page_line_number_str : '',
                    version_page_line_number : null,
                    version_yuwei : 1,
                    version_double_page_number_str : '',
                    version_double_page_number : null,
                    version_bianlan : 1,
                    version_fenlan : 1,
                    version_shukou : 1,
                    version_banxin_content : '',
                    version_youshuwuer : '',
                    version_youwujiazhu  : 1,
                    edition_responsibility : [{
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
                        action : 1,
                        action_value : '',
                        explain : '',
                        confirm : 1,
                        type : 1,
                        level : 2,
                    }]
                },
                impression_item : {
                    printing_type : 1,
                    printing_number : '',
                    impression_responsibility : [{
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
                        action : 1,
                        action_value : '',
                        explain : '',
                        confirm : 1,
                        type : 1,
                        level : 3,
                    }]
                },
                copy_item : {
                    duplicate_book_count_str : '',
                    duplicate_book_count : null,
                    duplicate_level : 1,
                    duplicate_complete : 1,
                    duplicate_attachment : '',
                    copy_responsibility : [{
                        value_add : true,
                        value_del : false,
                        location : '',
                        location_id : '',
                        person : '',
                        person_id : '',
                        begin_time : '',
                        begin_time_id : '',
                        end_time : '',
                        end_time_id : '',
                        action : 1,
                        action_value : '',
                        explain : '',
                        confirm : 1,
                        type : 1,
                        level : 4,
                    }]
                },
                three_layers_item : {},

                upload_one_info : {
                    pri : 0,
                    standard_name : '',
                    name : '',
                },
            }
        },

        created : function () {
            this.ancient_book_id = this.$route.params.ancient_book_id;
            this.get_4layers_id();
            this.get_ancient_books_all_info();
            this.get_literature_info();
            this.get_3layers_info();
            this.$store.commit("get_varieties_contents",this.varieties_item);
            this.$store.commit("get_edition_contents",this.edition_item);
            this.$store.commit("get_impression_contents",this.impression_item);
            this.$store.commit("get_copy_contents",this.copy_item);
        },

        mounted : function () {

        },

        beforeRouteLeave (to, from, next) {

            next();
        },

        watch:{
            $route(){
                this.varieties_item.varieties_responsibility[0].action_value = document.getElementsByClassName("ry-v-action")[0].options[document.getElementsByClassName("ry-v-action")[0].selectedIndex].text;
                this.$store.commit("get_varieties_contents",this.varieties_item);
                this.$store.commit("get_edition_contents",this.edition_item);
                this.$store.commit("get_impression_contents",this.impression_item);
                this.$store.commit("get_copy_contents",this.copy_item);
            }
        },

        methods : {
            /**
             * get请求得到4层id
             */
            get_4layers_id() {
                var url = '/ancient_books/get_4_info.action?id=' + this.ancient_book_id;
                var obj = {};
                this.http_json (url , 'get' , obj , this.success_get_ids , this.fail_get_ids);
            },

            success_get_ids(response) {
                if (response.body.length != 0) {
                    console.log("得到4层id");
                    this.three_layers_id = response.body.ancient_book_info_id;
                    this.literature_id = response.body.literature_id;
                    this.summary = response.body.summary;
                }
                else{
                    console.log("未得到4层id")
                }
            },

            fail_get_ids() {
                console.log("4层id请求发送失败")
            },


            /**
             * 发送古籍id，get请求得到4层信息id
             */
            get_ancient_books_all_info() {
                var get_obj = {};
                let url = '/ancient_books/get_ancient_books_all_info_by_id.action?ancient_book_id=' + this.ancient_book_id;
                this.http_json (url , 'get' , get_obj , this.success_get_ancient_books_all_info , this.fail_get_ancient_books_all_info);
            },

            success_get_ancient_books_all_info(response) {
                console.log ("success get books all info");
                if (response.body.length === 0) {
                    console.log ("返回空对象");
                }
                else{
                    this.book_all_info = response.body;
                    this.book_info_split = response.body.standard_name.split('[');
                    if (this.book_info_split.length > 1){
                        this.book_info1 = '[' + this.book_info_split[1];
                        this.book_info2 = '[' + this.book_info_split[2];
                        this.book_info3 = '[' + this.book_info_split[3];
                        this.book_info4 = '[' + this.book_info_split[4];
                    }else {
                        this.book_info_split = response.body.content[i].standard_name.split('【');
                        this.book_info1 = '【' + this.book_info_split[1];
                        this.book_info2 = '【' + this.book_info_split[2];
                        this.book_info3 = '【' + this.book_info_split[3];
                        this.book_info4 = '【' + this.book_info_split[4];
                    }
                }
            },

            fail_get_ancient_books_all_info() {
                console.log ("fail get books all info!");
            },


            /**
             * get请求得到文献本体信息
             */
            get_literature_info() {
                var url = '/ancient_books/get_literature_by_id.action?literature_id=' + this.literature_id;
                var obj = {};
                this.http_json (url , 'get' , obj , this.success_get_literature_info , this.fail_get_literature_info);
            },

            success_get_literature_info(response) {
                if (response.body.length != 0) {
                    console.log("得到文献本体信息");
                    this.literature_info = response.body;
                    this.varieties_item.english = response.body.english;
                    this.varieties_item.type_name = response.body.type_name;
                    this.varieties_item.type_other_name = response.body.type_other_name;
                    this.varieties_item.type_save = response.body.type_save;
                    this.varieties_item.type_level = response.body.type_level;
                    this.varieties_item.type_bu = response.body.type_bu;
                    this.varieties_item.type_lei = response.body.type_lei;
                    this.varieties_item.type_shu = response.body.type_shu;
                    this.varieties_item.type_summary = response.body.type_summary;
                    this.varieties_item.literature_standard_name = response.body.literature_standard_name;
                    for (var i = 0; i < response.body.responsibility_infos.length; i++) {
                        this.varieties_item.varieties_responsibility.push({
                            value_add : true,
                            value_del : false,
                            location : response.body.responsibility_infos.location_name,
                            location_id : response.body.responsibility_infos.location_id,
                            person : response.body.responsibility_infos.name_name,
                            person_id : response.body.responsibility_infos.name_id,
                            begin_time : response.body.responsibility_infos.begin_time_name,
                            begin_time_id : response.body.responsibility_infos.begin_time_id,
                            end_time : response.body.responsibility_infos.end_time_name,
                            end_time_id : response.body.responsibility_infos.end_time_id,
                            action : response.body.responsibility_infos.action,
                            action_value : response.body.responsibility_infos.action_name,
                            explain : response.body.responsibility_infos.explain,
                            confirm : response.body.responsibility_infos.confirm,
                            type : response.body.responsibility_infos.type,
                            level : response.body.responsibility_infos.level
                        })
                    }
                }
                else{
                    console.log("未得到文献本体信息")
                }
            },

            fail_get_literature_info() {
                console.log("文献本体信息请求发送失败")
            },


            /**
             * get请求得到3层信息
             */
            get_3layers_info() {
                var url = '/ancient_books/get_ancient_book_info_by_id.action?id=' + this.three_layers_id;
                var obj = {};
                this.http_json (url , 'get' , obj , this.success_get_3layers_info , this.fail_get_3layers_info);
            },

            success_get_3layers_info(response) {
                if (response.body.length != 0) {
                    console.log("得到3层信息");
                    this.three_layers_info = response.body;
                    this.edition_item.version_volume_str = response.body.version_volume.toString();
                    this.edition_item.version_volume = response.body.version_volume;
                    this.edition_item.version_type = response.body.version_type;
                    this.edition_item.version_age = response.body.version_age;
                    this.edition_item.version_support = response.body.version_support;
                    this.edition_item.version_binding = response.body.version_binding;
                    this.edition_item.version_frame_length_str = response.body.version_frame_length.toString();
                    this.edition_item.version_frame_length = response.body.version_frame_length;
                    this.edition_item.version_frame_width_str = response.body.version_frame_width.toString();
                    this.edition_item.version_frame_width = response.body.version_frame_width;
                    this.edition_item.version_format_length_str = response.body.version_format_length.toString();
                    this.edition_item.version_format_length = response.body.version_format_length;
                    this.edition_item.version_format_width_str = response.body.version_format_width.toString();
                    this.edition_item.version_format_width = response.body.version_format_width;
                    this.edition_item.version_paiji_content = response.body.version_paiji_content;
                    this.edition_item.version_paiji_location = response.body.version_paiji_location;
                    this.edition_item.version_half_page_line_number_str = response.body.version_half_page_line_number.toString();
                    this.edition_item.version_half_page_line_number = response.body.version_half_page_line_number;
                    this.edition_item.version_page_line_number_str = response.body.version_page_line_number.toString();
                    this.edition_item.version_page_line_number = response.body.version_page_line_number;
                    this.edition_item.version_yuwei = response.body.version_yuwei;
                    this.edition_item.version_double_page_number_str = response.body.version_double_page_number.toString();
                    this.edition_item.version_double_page_number = response.body.version_double_page_number;
                    this.edition_item.version_bianlan = response.body.version_bianlan;
                    this.edition_item.version_fenlan = response.body.version_fenlan;
                    this.edition_item.version_shukou = response.body.version_shukou;
                    this.edition_item.version_banxin_content = response.body.version_banxin_content;
                    this.edition_item.version_youshuwuer = response.body.version_youshuwuer;
                    this.edition_item.version_youwujiazhu  = response.body.version_youwujiazhu;
                    this.impression_item.printing_type = response.body.printing_type;
                    this.impression_item.printing_number = response.body.printing_number;
                    this.copy_item.duplicate_book_count_str = response.body.duplicate_book_count.toString();
                    this.copy_item.duplicate_book_count = response.body.duplicate_book_count;
                    this.copy_item.duplicate_level = response.body.duplicate_level;
                    this.copy_item.duplicate_complete = response.body.duplicate_complete;
                    this.copy_item.duplicate_attachment = response.body.duplicate_attachment;
                    for (var i = 0; i< response.body.responsibility_infos.length; i++) {
                        if (response.body.responsibility_infos[i].level == 2) {
                            this.edition_item.edition_responsibility.push({
                                value_add : true,
                                value_del : false,
                                location : response.body.responsibility_infos.location_name,
                                location_id : response.body.responsibility_infos.location_id,
                                person : response.body.responsibility_infos.name_name,
                                person_id : response.body.responsibility_infos.name_id,
                                begin_time : response.body.responsibility_infos.begin_time_name,
                                begin_time_id : response.body.responsibility_infos.begin_time_id,
                                end_time : response.body.responsibility_infos.end_time_name,
                                end_time_id : response.body.responsibility_infos.end_time_id,
                                action : response.body.responsibility_infos.action,
                                action_value : response.body.responsibility_infos.action_name,
                                explain : response.body.responsibility_infos.explain,
                                confirm : response.body.responsibility_infos.confirm,
                                type : response.body.responsibility_infos.type,
                                level : response.body.responsibility_infos.level
                            })
                        }
                        else if (response.body.responsibility_infos[i].level == 3) {
                            this.impression_item.impression_responsibility.push({
                                value_add : true,
                                value_del : false,
                                location : response.body.responsibility_infos.location_name,
                                location_id : response.body.responsibility_infos.location_id,
                                person : response.body.responsibility_infos.name_name,
                                person_id : response.body.responsibility_infos.name_id,
                                begin_time : response.body.responsibility_infos.begin_time_name,
                                begin_time_id : response.body.responsibility_infos.begin_time_id,
                                end_time : response.body.responsibility_infos.end_time_name,
                                end_time_id : response.body.responsibility_infos.end_time_id,
                                action : response.body.responsibility_infos.action,
                                action_value : response.body.responsibility_infos.action_name,
                                explain : response.body.responsibility_infos.explain,
                                confirm : response.body.responsibility_infos.confirm,
                                type : response.body.responsibility_infos.type,
                                level : response.body.responsibility_infos.level
                            })
                        }
                        else if (response.body.responsibility_infos[i].level == 4) {
                            this.copy_item.copy_responsibility.push({
                                value_add : true,
                                value_del : false,
                                location : response.body.responsibility_infos.location_name,
                                location_id : response.body.responsibility_infos.location_id,
                                person : response.body.responsibility_infos.name_name,
                                person_id : response.body.responsibility_infos.name_id,
                                begin_time : response.body.responsibility_infos.begin_time_name,
                                begin_time_id : response.body.responsibility_infos.begin_time_id,
                                end_time : response.body.responsibility_infos.end_time_name,
                                end_time_id : response.body.responsibility_infos.end_time_id,
                                action : response.body.responsibility_infos.action,
                                action_value : response.body.responsibility_infos.action_name,
                                explain : response.body.responsibility_infos.explain,
                                confirm : response.body.responsibility_infos.confirm,
                                type : response.body.responsibility_infos.type,
                                level : response.body.responsibility_infos.level
                            })
                        }
                    }
                }
                else{
                    console.log("未得到3层信息")
                }
            },

            fail_get_3layers_info() {
                console.log("3层信息请求发送失败")
            },


            /**
             * 传走第一步信息
             */
            get_upload_one_info() {
                var pri_check = document.getElementById("ry-one-pri");
                if (pri_check.checked ==true) {
                    this.upload_one_info.pri = 1;
                }
                else {
                    this.upload_one_info.pri = 0;
                }
                this.upload_one_info.name = this.varieties_item.type_name;
                var a = document.getElementById("v-standard-name").innerText;
                var b = document.getElementById("e-standard-name").innerText;
                var c = document.getElementById("i-standard-name").innerText;
                var d = document.getElementsByClassName("c-standard-name").innerText;
                this.upload_one_info.standard_name = a + b + c + d;
            },


            /**
             * 确定修改
             */
            confirm_modify() {
                this.varieties_item = this.$store.getters.get_varieties_item;
                this.edition_item = this.$store.getters.get_edition_item;
                this.impression_item = this.$store.getters.get_impression_item;
                this.copy_item = this.$store.getters.get_copy_item;
                this.upload_one_info = this.$store.getters.get_upload1_info;
                this.summary = this.$store.getters.get_book_summary;

                var delet_responsibility_infos = [];
                var add_responsibility_infos = [];
                for (var i = 0; i < this.literature_info.responsibility_infos.length; i++) {
                    delet_responsibility_infos.push(this.literature_info.responsibility_infos[i].responsibility_info_id)
                }
                for (var j = 0; j < this.literature_info.responsibility_infos.length; j++) {
                    delet_responsibility_infos.push(this.three_layers_info.responsibility_infos[j].responsibility_info_id)
                }
                for (var k = 0; k < this.varieties_item.varieties_responsibility.length; k ++) {
                    add_responsibility_infos.push(this.varieties_item.varieties_responsibility[k])
                }
                for (var m = 0; m < this.edition_item.edition_responsibility.length; m ++) {
                    add_responsibility_infos.push(this.edition_item.edition_responsibility[m])
                }
                for (var n = 0; n < this.impression_item.impression_responsibility.length; n ++) {
                    add_responsibility_infos.push(this.impression_item.impression_responsibility[n])
                }
                for (var o = 0; o < this.copy_item.copy_responsibility.length; o ++) {
                    add_responsibility_infos.push(this.copy_item.copy_responsibility[o])
                }

                this.add_book_obj.english = this.varieties_item.english;
                this.add_book_obj.type_name = this.varieties_item.type_name;
                this.add_book_obj.type_other_name = this.varieties_item.type_other_name;
                this.add_book_obj.type_save = this.varieties_item.type_save;
                this.add_book_obj.type_level = this.varieties_item.type_level;
                this.add_book_obj.type_bu = this.varieties_item.type_bu;
                this.add_book_obj.type_lei = this.varieties_item.type_lei;
                this.add_book_obj.type_shu = this.varieties_item.type_shu;
                this.add_book_obj.type_summary = this.varieties_item.type_summary;
                this.add_book_obj.literature_standard_name = this.varieties_item.literature_standard_name;
                this.add_book_obj.version_volume = parseInt(this.edition_item.version_volume_str);
                this.add_book_obj.version_type = this.edition_item.version_type;
                this.add_book_obj.version_age = this.edition_item.version_age;
                this.add_book_obj.version_support = this.edition_item.version_support;
                this.add_book_obj.version_binding = this.edition_item.version_binding;
                this.add_book_obj.version_frame_length = parseInt(this.edition_item.version_frame_length_str);
                this.add_book_obj.version_frame_width = parseInt(this.edition_item.version_frame_width_str);
                this.add_book_obj.version_format_length = parseInt(this.edition_item.version_format_length_str);
                this.add_book_obj.version_format_width = parseInt(this.edition_item.version_format_width_str);
                this.add_book_obj.version_paiji_content = this.edition_item.version_paiji_content;
                this.add_book_obj.version_paiji_location = this.edition_item.version_paiji_location;
                this.add_book_obj.version_half_page_line_number = parseInt(this.edition_item.version_half_page_line_number_str);
                this.add_book_obj.version_page_line_number = parseInt(this.edition_item.version_page_line_number_str);
                this.add_book_obj.version_yuwei = this.edition_item.version_yuwei;
                this.add_book_obj.version_double_page_number = parseInt(this.edition_item.version_double_page_number_str);
                this.add_book_obj.version_bianlan = this.edition_item.version_bianlan;
                this.add_book_obj.version_fenlan = this.edition_item.version_fenlan;
                this.add_book_obj.version_shukou = this.edition_item.version_shukou;
                this.add_book_obj.version_banxin_content = this.edition_item.version_banxin_content;
                this.add_book_obj.version_youshuwuer = this.edition_item.version_youshuwuer;
                this.add_book_obj.version_youwujiazhu = this.edition_item.version_youwujiazhu;
                this.add_book_obj.printing_type = this.impression_item.printing_type;
                this.add_book_obj.printing_number = this.impression_item.printing_number;
                this.add_book_obj.duplicate_book_count = parseInt(this.copy_item.duplicate_book_count_str);
                this.add_book_obj.duplicate_level = this.copy_item.duplicate_level;
                this.add_book_obj.duplicate_complete = this.copy_item.duplicate_complete;
                this.add_book_obj.duplicate_attachment = this.copy_item.duplicate_attachment;
                this.add_book_obj.ancient_book_id = this.ancient_book_id;
                this.add_book_obj.name = this.upload_one_info.name;
                this.add_book_obj.standard_name = this.upload_one_info.standard_name;
                this.add_book_obj.pri = this.upload_one_info.pri;
                this.add_book_obj.summary = this.summary;
                this.add_book_obj.delet_responsibility_infos = delet_responsibility_infos;
                this.add_book_obj.add_responsibility_infos = add_responsibility_infos;
                this.before_http(this.add_book_obj);
                this.http_json('/ancient_books/modify_ancient_book_all_info_with_literature.action' , 'post' , this.add_book_obj , this.success_post_add , this.fail_post_add);
            },

            success_post_edit(response) {
                if (response.body.result === 1) {
                    console.log ("修改古籍成功!");
                    window.location.reload();   //  重新加载
                }
                else if (response.body.result === 0) {
                    console.log ("修改古籍失败");
                }
            },

            fail_post_edit() {
                console.log("修改古籍请求发送失败");
            },


            /**
             * 下一步
             */
            next_page() {
                if (this.varieties_item.type_name == '') {
                    alert("请填写书名");
                }
                else if (this.varieties_item.varieties_responsibility[0].begin_time == '') {
                    alert("请填写品种层责任开始时间");
                }
                else if (this.varieties_item.varieties_responsibility[0].end_time == '') {
                    alert("请填写品种层责任结束时间");
                }
                else if (this.varieties_item.varieties_responsibility[0].person == '') {
                    alert("请填写品种层责任者名称");
                }
                else if (this.edition_item.edition_responsibility[0].begin_time == '') {
                    alert("请填写版本层责任开始时间");
                }
                else if (this.edition_item.edition_responsibility[0].end_time == '') {
                    alert("请填写版本层责任结束时间");
                }
                else if (this.edition_item.edition_responsibility[0].person == '') {
                    alert("请填写版本层责任者名称");
                }
                else if (this.impression_item.impression_responsibility[0].begin_time == '') {
                    alert("请填写印次层责任开始时间");
                }
                else if (this.impression_item.impression_responsibility[0].end_time == '') {
                    alert("请填写印次层责任结束时间");
                }
                else if (this.impression_item.impression_responsibility[0].person == '') {
                    alert("请填写印次层责任者名称");
                }
                else if (this.copy_item.copy_responsibility[0].begin_time == '') {
                    alert("请填写复本层责任开始时间");
                }
                else if (this.copy_item.copy_responsibility[0].end_time == '') {
                    alert("请填写复本层责任结束时间");
                }
                else if (this.copy_item.copy_responsibility[0].person == '') {
                    alert("请填写复本层责任者名称");
                }
                else{
                    this.get_upload_one_info();
                    let url = '/ancient_books/check_if_ancient_book_already_exist.action?name=' + this.upload_one_info.standard_name;
                    var check_obj = '';
                    this.http_json (url , 'get' , check_obj , this.success_check , this.fail_check);
                }
            },

            success_check(response) {
                if (response.body.length === 0) {
                    console.log ("没有返回判断值！");
                }
                else{
                    if (response.body.result === 1) {
                        alert("古籍规范名称重复")
                    }
                    else{
                        this.$router.push({path: '/user/modify2'});
                    }
                }
            },

            fail_check() {
                console.log("error!")
            },

            cancel_upload() {
                this.$router.push({path: '/user'});
            }
        }
    }
</script>

<style>
    .ry-btn-keep-modify{
        color: white;
        margin-left: 50px;
        width: 142px;
        height: 47px;
        background-image: url("../../../../assets/img/button/build-button.png");
    }
</style>

