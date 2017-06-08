<template>

    <!--版本层-->
    <div class="layer-input">
        <div id="edition" class="form-center">
            <div>
                <div class="row">
                    <label class="col-md-2">版本類型：</label>
                    <div class="col-md-4">
                        <select>
                            <option>不詳</option>
                        </select>
                    </div>

                    <label class="col-md-2">版本時代：</label>
                    <div class="col-md-4">
                        <select>
                            <option>傳說時期</option>
                        </select>
                    </div>
                </div>

                <div class="row">
                    <label class="col-md-2">載體形式：</label>
                    <div class="col-md-4">
                        <select>
                            <option>不詳</option>
                        </select>
                    </div>

                    <label class="col-md-2">裝幀形式：</label>
                    <div class="col-md-4">
                        <select>
                            <option>不詳</option>
                        </select>
                    </div>
                </div>

                <div class="row">
                    <label class="col-md-2">板框長度：</label>
                    <div class="col-md-4">
                        <input v-model="version_frame_length">
                    </div>

                    <label class="col-md-2">板框寬度：</label>
                    <div class="col-md-4">
                        <input v-model="version_frame_width">
                    </div>
                </div>

                <div class="row">
                    <label class="col-md-2">開本長度：</label>
                    <div class="col-md-4">
                        <input v-model="version_format_length">
                    </div>

                    <label class="col-md-2">開本寬度：</label>
                    <div class="col-md-4">
                        <input v-model="version_format_width">
                    </div>
                </div>

                <div class="row">
                    <label class="col-md-2">牌記內容：</label>
                    <div class="col-md-4">
                        <input v-model="version_paiji_content">
                    </div>

                    <label class="col-md-2">牌記位置:</label>
                    <div class="col-md-4">
                        <input v-model="version_paiji_location">
                    </div>
                </div>

                <div class="row">
                    <label class="col-md-2">半頁行數：</label>
                    <div class="col-md-4">
                        <input v-model="version_half_page_line_number">
                    </div>

                    <label class="col-md-2">每行字數：</label>
                    <div class="col-md-4">
                        <input v-model="version_page_line_number">
                    </div>
                </div>

                <div class="row">
                    <label class="col-md-2">雙行小字字數：</label>
                    <div class="col-md-4">
                        <input v-model="version_double_page_number">
                    </div>

                    <label class="col-md-2">魚尾樣式：</label>
                    <div class="col-md-4">
                        <select>
                            <option>不詳</option>
                        </select>
                    </div>
                </div>

                <div class="row">
                    <label class="col-md-2">邊欄樣式：</label>
                    <div class="col-md-4">
                        <select>
                            <option>不詳</option>
                        </select>
                    </div>

                    <label class="col-md-2">分欄：</label>
                    <div class="col-md-4">
                        <select>
                            <option>不詳</option>
                        </select>
                    </div>
                </div>

                <div class="row">
                    <label class="col-md-2">書口樣式：</label>
                    <div class="col-md-4">
                        <select>
                            <option>不詳</option>
                        </select>
                    </div>

                    <label class="col-md-2">版心內容：</label>
                    <div class="col-md-4">
                        <input v-model="version_banxin_content">
                    </div>
                </div>


                <div class="row">
                    <label class="col-md-2">有無書耳：</label>
                    <div class="col-md-4">
                        <input v-model="version_youshuwuer">
                    </div>

                    <label class="col-md-2">有無夾注：</label>
                    <div class="col-md-4">
                        <select>
                            <option>不詳</option>
                        </select>
                    </div>
                </div>

                <div class="row">
                    <label class="col-md-2">卷數:</label>
                    <div class="col-md-4">
                        <input v-model="version_volume">
                    </div>
                </div>
            </div>

            <div>
                <img src="../../../../assets/img/上传1/中间墨线.png" height="6" width="843"/>
            </div>

            <div id="form-edition">
                <div class="row">
                    <div class="col-md-2">
                        <button id="btn-add-edition" class="ry-btn-add">添加</button>
                    </div>
                    <div class="col-md-2">
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
                            <option>不詳</option>
                        </select>
                    </div>

                    <div class="col-md-2">
                        <span class="star">*</span>
                        <label>責任行為：</label>
                    </div>
                    <div class="col-md-4">
                        <select>
                            <option>刻</option>
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
                            <option>不詳</option>
                        </select>
                    </div>
                </div>

                <div class="row">
                    <label class="col-md-2">責任說明：</label>
                    <div class="col-md-4">
                        <input v-model="explain">
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
            }
        },

    }
</script>

