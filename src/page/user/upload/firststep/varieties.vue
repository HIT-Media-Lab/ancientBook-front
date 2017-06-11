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
                        <select>
                            <option v-for="item in menu_items[2]">{{item.chinese_name}}</option>
                        </select>
                    </div>
                </div>

                <div class="row">
                    <label class="col-md-2">品種級別：</label>
                    <div class="col-md-4">
                        <select>
                            <option v-for="item in menu_items[3]">{{item.chinese_name}}</option>
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
                        <select id="ry-select-b">
                            <option v-for="item in menu_items[4]">{{item.chinese_name}}</option>
                        </select>
                    </div>
                    <div class="col-md-3">
                        <select id="ry-select-l" @click="get_lei_item()">
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
                            <option v-for="item in menu_items[0]">{{item.chinese_name}}</option>
                        </select>
                    </div>

                    <div class="col-md-2">
                        <span class="star">*</span>
                        <label>責任行為：</label>
                    </div>
                    <div class="col-md-4">
                        <select>
                            <option v-for="item in menu_items[5]">{{item.chinese_name}}</option>
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
                            <option v-for="item in menu_items[1]">{{item.chinese_name}}</option>
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
        </div>
    </div>

</template>

<script>
    export default{
        created : function () {
            this.get_varieties_item();
            this.varieties_item = this.$store.getters.get_varieties_item
        },

        beforeRouteLeave (to, from, next) {
            this.$store.commit("get_varieties_contents",this.varieties_item);
            next();
        },

        data() {
            return{
                lei_items_obj : {},
                shu_items_obj : {},
                lei_items : [],
                shu_items : [],
                menu_items : [],
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
                        end_time : '',
                        action : '',
                        explain : '',
                        confirm : '',
                        type : '',
                        level : 1,
                    }
                },
            }
        },

        methods : {
            get_varieties_item() {
                this.menu_items = this.$store.getters.get_menu_item
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
                    for (j = 0; j <= response.body.length-1; j++) {
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
                    for (j = 0; j <= response.body.length-1; j++) {
                        this.shu_items.push({
                            chinese_name: response.body[j].chinese_name
                        });
                    }
                }
            },

            fail_get_shu_items() {
                console.log ("fail get shu items!");
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

