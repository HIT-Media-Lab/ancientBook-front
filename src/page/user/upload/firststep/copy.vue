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
                        <select>
                            <option>不详</option>
                            <option>全</option>
                            <option>残</option>
                        </select>
                    </div>
                </div>

                <div class="row">
                    <label class="col-md-2">品級：</label>
                    <div class="col-md-4">
                        <select>
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
                <img src="../../../../assets/img/上传1/中间墨线.png" height="6" width="843"/>
            </div>

            <div id="form-copy">
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
                        <input v-model="copy_item.person_id">
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
                        <select>
                            <option v-for="item in menu_items[1]">{{item.chinese_name}}</option>
                        </select>
                    </div>
                </div>

                <div class="row">
                    <label class="col-md-2">責任說明：</label>
                    <div class="col-md-4">
                        <input v-model="copy_item.copy_responsibility.explain" id="ry-input-responsibility">
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
                menu_items : [],
                copy_item : {
                    duplicate_book_count : '',
                    duplicate_level : '',
                    duplicate_complete : '',
                    duplicate_attachment : '',
                    copy_responsibility : {
                        location_id : '',
                        person_id : '',
                        begin_time : '',
                        end_time : '',
                        action : '',
                        explain : '',
                        confirm : '',
                        type : '',
                        level : 4,
                    }
                }
            }
        },

        created : function () {
            this.get_copy_item();
            this.copy_item = this.$store.getters.get_copy_item
        },

        beforeRouteLeave (to, from, next) {
            this.$store.commit("get_copy_contents",this.copy_item);
            next();
        },



        methods : {
            get_copy_item() {
                this.menu_items = this.$store.getters.get_menu_item
            }
        }

    }
</script>



