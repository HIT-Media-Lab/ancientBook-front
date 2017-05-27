<template>

    <!--印次层-->
    <div>

        <div class="form-center">

            <div>
                <span>
                    <span>印刷類型：</span>
                    <select>
                        <option>不詳</option>
                    </select>
                </span>

                <span>
                    <span>印次：</span>
                    <input>
                </span>
            </div>

            <div id="form-impression">
                <span>
                    <span>責任順序：</span>
                    <input placeholder="多值屬性用逗號隔開">
                </span>

                <br>

                <span>
                    <span class="star">*</span>
                    <span>責任開始時間:</span>
                    <input><button>添加</button>
                </span>

                <span>
                    <span class="star">*</span>
                    <span>責任結束時間:</span>
                    <input><button>添加</button>
                </span>

                <br>

                <span>
                    <span>責任地點：</span>
                    <input><button>添加</button>
                </span>

                <span>
                    <span class="star">*</span>
                    <span>責任者名稱:</span>
                    <input><button>添加</button>
                </span>

                <br>

                <span>
                    <span class="star">*</span>
                    <span>責任者類型：</span>
                    <select>
                        <option>不詳</option>
                    </select>
                </span>

                <span>
                    <span class="star">*</span>
                    <span>責任行為：</span>
                    <select>
                        <option>重印</option>
                    </select>
                </span>

                <br>

                <span>
                    <span class="star">*</span>
                    <span>確定性：</span>
                    <select>
                        <option>不詳</option>
                    </select>
                </span>

                <br>

                <span>
                    <span>責任說明：</span>
                    <input>
                </span>

                <button id="btn-add-impression">添加</button>
                <button id="btn-delete-impression">刪除</button>
            </div>

        </div>
    </div>

</template>

<style>
    *{
        margin: 0;
        padding: 0;
    }

    /*红色星号*/
    .star{
        color: red;
    }
</style>