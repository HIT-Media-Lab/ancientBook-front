<template>

    <!--品种层-->
    <div>

        <div class="form-center">

            <div>
                <span>
                    <span class="star">*</span>
                    <span>書名:</span>
                    <input id="bookName" v-model="bookName" :bookname="bookname" @on-bookname-change="onBooknameChange" onchange="change">
                </span>

                <span>
                    <span>別名:</span>
                    <input placeholder="多值屬性用逗號隔開">
                </span>

                <br>

                <span>
                    <span>卷數:</span>
                    <input>
                </span>

                <span>
                    <span>存佚類型:</span>
                    <select>
                        <option>不詳</option>
                        <option>存</option>
                        <option>佚</option>
                        <option>殘</option>
                        <option>疑</option>
                    </select>
                </span>

                <br>

                <span>
                    <span>品種級別：</span>
                    <select>
                        <option>不詳</option>
                        <option></option>
                    </select>
                </span>

                <span>
                    <span>英譯：</span>
                    <input>
                </span>

                <br>

                <span>
                    <span>提要信息：</span>
                    <input>
                </span>

                <br>

                <span>
                    <span>標準分類：</span>
                    <select>
                        <option>經部</option>
                    </select>
                    <select>
                        <option>總類</option>
                    </select>
                    <select>
                        <option>石經之屬</option>
                    </select>
                </span>
            </div>

            <div id="form-variety">
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
                        <option>撰</option>
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

                <button id="btn-add-variety">添加</button>
                <button id="btn-delete-variety">刪除</button>
            </div>

        </div>
    </div>

</template>

<script>
    export default{
        props: ['bookname'],

        data() {
            return{
                bookName : this.bookname,
            }
        },

        watch: {
            bookname(val) {
                this.bookName = val;
            },
            bookName(val) {
                this.$emit("on-bookname-change",val);
            }
        },

        methods: {
            change() {
                this.bookName = document.getElementById("bookName").value;
            }
        }

    }
</script>

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