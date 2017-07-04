<template>

    <!--版本层-->
    <div class="layer-input">
        <div id="edition" class="form-center">
            <div>
                <div class="row">
                    <label class="col-md-2">版本類型：</label>
                    <div class="col-md-4">
                        <select>
                            <option v-for="item in menu_ten">{{item.chinese_name}}</option>
                        </select>
                    </div>

                    <label class="col-md-2">版本時代：</label>
                    <div class="col-md-4">
                        <select>
                            <option v-for="item in menu_eleven">{{item.chinese_name}}</option>
                        </select>
                    </div>
                </div>

                <div class="row">
                    <label class="col-md-2">載體形式：</label>
                    <div class="col-md-4">
                        <select>
                            <option v-for="item in menu_twelve">{{item.chinese_name}}</option>
                        </select>
                    </div>

                    <label class="col-md-2">裝幀形式：</label>
                    <div class="col-md-4">
                        <select>
                            <option v-for="item in menu_thirteen">{{item.chinese_name}}</option>
                        </select>
                    </div>
                </div>

                <div class="row">
                    <label class="col-md-2">板框長度：</label>
                    <div class="col-md-4">
                        <input v-model="edition_item.version_frame_length">
                    </div>

                    <label class="col-md-2">板框寬度：</label>
                    <div class="col-md-4">
                        <input v-model="edition_item.version_frame_width">
                    </div>
                </div>

                <div class="row">
                    <label class="col-md-2">開本長度：</label>
                    <div class="col-md-4">
                        <input v-model="edition_item.version_format_length">
                    </div>

                    <label class="col-md-2">開本寬度：</label>
                    <div class="col-md-4">
                        <input v-model="edition_item.version_format_width">
                    </div>
                </div>

                <div class="row">
                    <label class="col-md-2">牌記內容：</label>
                    <div class="col-md-4">
                        <input v-model="edition_item.version_paiji_content">
                    </div>

                    <label class="col-md-2">牌記位置:</label>
                    <div class="col-md-4">
                        <input v-model="edition_item.version_paiji_location">
                    </div>
                </div>

                <div class="row">
                    <label class="col-md-2">半頁行數：</label>
                    <div class="col-md-4">
                        <input v-model="edition_item.version_half_page_line_number">
                    </div>

                    <label class="col-md-2">每行字數：</label>
                    <div class="col-md-4">
                        <input v-model="edition_item.version_page_line_number">
                    </div>
                </div>

                <div class="row">
                    <label class="col-md-2">雙行小字字數：</label>
                    <div class="col-md-4">
                        <input v-model="edition_item.version_double_page_number">
                    </div>

                    <label class="col-md-2">魚尾樣式：</label>
                    <div class="col-md-4">
                        <select>
                            <option v-for="item in menu_fourteen">{{item.chinese_name}}</option>
                        </select>
                    </div>
                </div>

                <div class="row">
                    <label class="col-md-2">邊欄樣式：</label>
                    <div class="col-md-4">
                        <select>
                            <option v-for="item in menu_fifteen">{{item.chinese_name}}</option>
                        </select>
                    </div>

                    <label class="col-md-2">分欄：</label>
                    <div class="col-md-4">
                        <select>
                            <option v-for="item in menu_sixteen">{{item.chinese_name}}</option>
                        </select>
                    </div>
                </div>

                <div class="row">
                    <label class="col-md-2">書口樣式：</label>
                    <div class="col-md-4">
                        <select>
                            <option v-for="item in menu_seventeen">{{item.chinese_name}}</option>
                        </select>
                    </div>

                    <label class="col-md-2">版心內容：</label>
                    <div class="col-md-4">
                        <input v-model="edition_item.version_banxin_content">
                    </div>
                </div>


                <div class="row">
                    <label class="col-md-2">有無書耳：</label>
                    <div class="col-md-4">
                        <input v-model="edition_item.version_youshuwuer">
                    </div>

                    <label class="col-md-2">有無夾注：</label>
                    <div class="col-md-4">
                        <select>
                            <option>不详</option>
                            <option>有</option>
                            <option>无</option>
                        </select>
                    </div>
                </div>

                <div class="row">
                    <label class="col-md-2">卷數:</label>
                    <div class="col-md-4">
                        <input v-model="edition_item.version_volume">
                    </div>
                </div>
            </div>

            <div>
                <img src="../../../../assets/img/上传1/中间墨线.png" height="6" width="843"/>
            </div>

            <div id="form-edition">
                <div class="row">
                    <div class="col-md-2 float-right">
                        <button id="btn-add-edition" class="ry-btn-add">添加</button>
                    </div>
                    <div class="col-md-2 float-right">
                        <button id="btn-delete-edition" class="ry-btn-del">刪除</button>
                    </div>
                </div>

                <div class="row">
                    <div class="col-md-2">
                        <span class="star">*</span>
                        <label>責任開始時間:</label>
                    </div>
                    <div class="col-md-4">
                        <input>
                    </div>

                    <div class="col-md-2">
                        <span class="star">*</span>
                        <label>責任結束時間:</label>
                    </div>
                    <div class="col-md-4">
                        <input>
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
                        <select>
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
                        <select>
                            <option v-for="item in menu_nineteen">{{item.chinese_name}}</option>
                        </select>
                    </div>
                </div>

                <div class="row">
                    <div class="col-md-2">
                        <span class="star">*</span>
                        <label>確定性：</label>
                    </div>
                    <div class="col-md-4">
                        <select>
                            <option>不详</option>
                            <option>确定</option>
                            <option>題</option>
                        </select>
                    </div>
                </div>

                <div class="row">
                    <label class="col-md-2">責任說明：</label>
                    <div class="col-md-4">
                        <input v-model="edition_item.edition_responsibility.explain" id="ry-input-responsibility">
                    </div>
                </div>

            </div>

            <div>
                <img src="../../../../assets/img/上传1/中间墨线.png" height="6" width="843"/>
            </div>
        </div>
    </div>

</template>

<script>
    export default{
        data() {
            return{
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
                edition_item : {
                    version_volume : '',
                    version_type : '',
                    version_age : '',
                    version_support : '',
                    version_binding : '',
                    version_frame_length : '',
                    version_frame_width : '',
                    version_format_length : '',
                    version_format_width : '',
                    version_paiji_content : '',
                    version_paiji_location : '',
                    version_half_page_line_number : '',
                    version_page_line_number : '',
                    version_yuwei : '',
                    version_double_page_number : '',
                    version_bianlan : '',
                    version_fenlan : '',
                    version_shukou : '',
                    version_banxin_content : '',
                    version_youshuwuer : '',
                    version_youwujiazhu  : '',
                    edition_responsibility : {
                        location_id : '',
                        person_id : '',
                        begin_time : '',
                        end_time : '',
                        action : '',
                        explain : '',
                        confirm : '',
                        type : '',
                        level : 2,
                    }
                },
            }
        },

        created : function () {
            this.edition_item = this.$store.getters.get_edition_item
        },

        beforeRouteLeave (to, from, next) {
            this.$store.commit("get_edition_contents",this.edition_item);
            next();
        },

        methods : {
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
        },

    }
</script>



