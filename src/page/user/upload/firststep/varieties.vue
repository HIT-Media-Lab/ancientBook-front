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
                        <input id="bookName" v-model="type_name">
                    </div>

                    <label class="col-md-2">別名:</label>
                    <div class="col-md-4">
                        <input v-model="type_other_name" placeholder="多值屬性用逗號隔開">
                    </div>
                </div>

                <div class="row">
                    <label class="col-md-2">存佚類型:</label>
                    <div class="col-md-4">
                        <select>
                            <option>不詳</option>
                            <option>存</option>
                            <option>佚</option>
                            <option>殘</option>
                            <option>疑</option>
                        </select>
                    </div>
                </div>

                <div class="row">
                    <label class="col-md-2">品種級別：</label>
                    <div class="col-md-4">
                        <select>
                            <option>不詳</option>
                            <option></option>
                        </select>
                    </div>

                    <label class="col-md-2">英譯：</label>
                    <div class="col-md-4">
                        <input v-model="english">
                    </div>
                </div>

                <div class="row">
                    <label class="col-md-2">提要信息：</label>
                    <div class="col-md-4">
                        <input id="ry-input-info" v-model="type_summary">
                    </div>
                </div>

                <div class="row">
                    <label class="col-md-2">標準分類：</label>
                    <div class="col-md-3">
                        <select id="ry-select-b">
                            <option>經部</option>
                        </select>
                    </div>
                    <div class="col-md-3">
                        <select id="ry-select-l">
                            <option>總類</option>
                        </select>
                    </div>
                    <div class="col-md-4">
                        <select id="ry-select-s">
                            <option>石經之屬</option>
                        </select>
                    </div>
                </div>
            </div>

            <div>
                <img src="../../../../assets/img/上传1/中间墨线.png" height="6" width="843"/>
            </div>

            <div id="form-variety">
                <div class="row">
                    <div class="col-md-2">
                        <button id="btn-add-copy" class="ry-btn-add">添加</button>
                    </div>
                    <div class="col-md-2">
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
                            <option>不詳</option>
                        </select>
                    </div>

                    <div class="col-md-2">
                        <span class="star">*</span>
                        <label>責任行為：</label>
                    </div>
                    <div class="col-md-4">
                        <select>
                            <option>撰</option>
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
                        <input v-model="explain" id="ry-input-responsibility">
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
            }
        }
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

