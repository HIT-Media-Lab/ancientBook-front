<template>

    <!--品种层-->
    <div>
        <div class="form-center">
            <div>
                <div class="row">
                    <div class="col-md-2">
                        <span class="star">*</span>
                        <label>書名:</label>
                    </div>
                    <div class="col-md-4">
                        <input id="bookName" v-model="bookName">
                    </div>

                    <label class="col-md-2">別名:</label>
                    <div class="col-md-4">
                        <input placeholder="多值屬性用逗號隔開">
                    </div>
                </div>

                <div class="row">
                    <label class="col-md-2">卷數:</label>
                    <div class="col-md-4">
                        <input>
                    </div>

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
                        <input>
                    </div>
                </div>

                <div class="row">
                    <label class="col-md-2">提要信息：</label>
                    <div class="col-md-4">
                        <input>
                    </div>
                </div>

                <div class="row">
                    <label class="col-md-2">標準分類：</label>
                    <div class="col-md-3">
                        <select>
                            <option>經部</option>
                        </select>
                    </div>
                    <div class="col-md-3">
                        <select>
                            <option>總類</option>
                        </select>
                    </div>
                    <div class="col-md-4">
                        <select>
                            <option>石經之屬</option>
                        </select>
                    </div>
                </div>
            </div>

            <div id="form-variety">
                <div class="row">
                    <label class="col-md-2">責任順序：</label>
                    <div class="col-md-6">
                        <input placeholder="多值屬性用逗號隔開">
                    </div>

                    <div class="col-md-2">
                        <button id="btn-add-copy">添加</button>
                    </div>
                    <div class="col-md-2">
                        <button id="btn-delete-copy">刪除</button>
                    </div>
                </div>

                <div class="row">
                    <div class="col-md-2">
                        <span class="star">*</span>
                        <label>責任開始時間:</label>
                    </div>
                    <div class="col-md-4">
                        <input><button>添加</button>
                    </div>

                    <div class="col-md-2">
                        <span class="star">*</span>
                        <label>責任結束時間:</label>
                    </div>
                    <div class="col-md-4">
                        <input><button>添加</button>
                    </div>
                </div>

                <div class="row">
                    <label class="col-md-2">責任地點：</label>
                    <div class="col-md-4">
                        <input><button>添加</button>
                    </div>

                    <div class="col-md-2">
                        <span class="star">*</span>
                        <label>責任者名稱:</label>
                    </div>
                    <div class="col-md-4">
                        <input><button>添加</button>
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
                        <input>
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>

<script>
    export default{
        props: ['bookname'],
    }
</script>

