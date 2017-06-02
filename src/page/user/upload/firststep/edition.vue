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
                        <input>
                    </div>

                    <label class="col-md-2">板框寬度：</label>
                    <div class="col-md-4">
                        <input>
                    </div>
                </div>

                <div class="row">
                    <label class="col-md-2">開本長度：</label>
                    <div class="col-md-4">
                        <input>
                    </div>

                    <label class="col-md-2">開本寬度：</label>
                    <div class="col-md-4">
                        <input>
                    </div>
                </div>

                <div class="row">
                    <label class="col-md-2">牌記內容：</label>
                    <div class="col-md-4">
                        <input>
                    </div>

                    <label class="col-md-2">牌記位置:</label>
                    <div class="col-md-4">
                        <input>
                    </div>
                </div>

                <div class="row">
                    <label class="col-md-2">半頁行數：</label>
                    <div class="col-md-4">
                        <input>
                    </div>

                    <label class="col-md-2">每行字數：</label>
                    <div class="col-md-4">
                        <input>
                    </div>
                </div>

                <div class="row">
                    <label class="col-md-2">雙行小字字數：</label>
                    <div class="col-md-4">
                        <input>
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
                        <input>
                    </div>
                </div>


                <div class="row">
                    <label class="col-md-2">有無書耳：</label>
                    <div class="col-md-4">
                        <input>
                    </div>

                    <label class="col-md-2">有無夾注：</label>
                    <div class="col-md-4">
                        <select>
                            <option>不詳</option>
                        </select>
                    </div>
                </div>
            </div>

            <div>
                <img src="../../../../assets/img/上传1/中间墨线.png" height="6" width="843"/>
            </div>

            <div id="form-edition">
                <div class="row">
                    <label class="col-md-2">責任順序：</label>
                    <div class="col-md-6">
                        <input placeholder="多值屬性用逗號隔開">
                    </div>

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
                        <input>
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

</script>

