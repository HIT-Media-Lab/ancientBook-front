<template>

    <!--版本层-->
    <div>

        <div class="form-center">

            <div>
                <span>
                    <span>版本類型：</span>
                    <select>
                        <option>不詳</option>
                    </select>
                </span>

                <span>
                    <span>版本時代：</span>
                    <select>
                        <option>傳說時期</option>
                    </select>
                </span>

                <br>

                <span>
                    <span>載體形式：</span>
                    <select>
                        <option>不詳</option>
                    </select>
                </span>

                <span>
                    <span>裝幀形式：</span>
                    <select>
                        <option>不詳</option>
                    </select>
                </span>

                <br>

                <span>
                    <span>板框長度：</span>
                    <input>
                </span>

                <span>
                    <span>板框寬度：</span>
                    <input>
                </span>

                <br>

                <span>
                    <span>開本長度：</span>
                    <input>
                </span>

                <span>
                    <span>開本寬度：</span>
                    <input>
                </span>

                <br>

                <span>
                    <span>牌記內容：</span>
                    <input>
                </span>

                <span>
                    <span>牌記位置:</span>
                    <input>
                </span>

                <br>

                <span>
                    <span>半頁行數：</span>
                    <input>
                </span>

                <span>
                    <span>每行字數：</span>
                    <input>
                </span>

                <br>

                <span>
                    <span>雙行小字字數：</span>
                    <input>
                </span>

                <span>
                    <span>魚尾樣式：</span>
                    <select>
                        <option>不詳</option>
                    </select>
                </span>

                <br>

                <span>
                    <span>邊欄樣式：</span>
                    <select>
                        <option>不詳</option>
                    </select>
                </span>

                <span>
                    <span>分欄：</span>
                    <select>
                        <option>不詳</option>
                    </select>
                </span>

                <br>

                <span>
                    <span>書口樣式：</span>
                    <select>
                        <option>不詳</option>
                    </select>
                </span>

                <span>
                    <span>版心內容：</span>
                    <input>
                </span>

                <br>

                <span>
                    <span>有無書耳：</span>
                    <input>
                </span>

                <span>
                    <span>有無夾注：</span>
                    <select>
                        <option>不詳</option>
                    </select>
                </span>
            </div>

            <div id="form-edition">
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
                        <option>刻</option>
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

                <button id="btn-add-edition">添加</button>
                <button id="btn-delete-edition">刪除</button>
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