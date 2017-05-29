<template>

    <!--印次层-->
    <div>
        <div class="form-center">
            <div>
                <div class="row">
                    <label class="col-md-2">印刷類型：</label>
                    <div class="col-md-4">
                        <select>
                            <option>不詳</option>
                        </select>
                    </div>

                    <label class="col-md-2">印次：</label>
                    <div class="col-md-4">
                        <input>
                    </div>
                </div>
            </div>

            <div id="form-impression">
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
                            <option>重印</option>
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

