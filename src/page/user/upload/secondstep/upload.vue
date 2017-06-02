<template>

    <div>
        <div id="upload2-box">
            <div>
                <span>
                    <span>冊號:</span>
                    <input class="ry-input-upload2">
                    <button class="ry-btn-add-book" @click="add_new_book()">添加新冊</button>
                </span>
                <br>
                <span>
                    <span>冊名:</span>
                    <input class="ry-input-upload2">
                </span>

                <div class="width800">
                    <div class="ry-box-file">
                        <input id="ry-file1" type="file">
                        <button class="ry-upload-file">上傳圖片</button>
                    </div>
                    <div class="ry-box-file">
                        <input id="ry-file2" type="file">
                        <button class="ry-upload-file">上傳文本</button>
                    </div>
                </div>
            </div>
        </div>

        <div>

        </div>
    </div>



</template>

<script>
    export default{
        methods :{
            add_new_book() {
                var upload_box = document.getElementById("upload2-box");
                var upload_file = upload_box.firstChild;
                upload_box.appendChild(upload_file);
            }
        },
    }
</script>

<style>
    .ry-input-upload2{
        margin: 5px 0px;
        width: 225px;
        height: 33px;
        background-image: url("../../../../assets/img/上传1/书名什么的.png");
    }

    #ry-file1,#ry-file2{
        height: 100px;
        display: none;
    }

    .ry-box-file{
        width: 200px;
        display: inline-block;
        overflow: hidden;
    }

    .ry-upload-file{
        font-size: x-large;
        color: white;
        width: 175px;
        height: 74px;
        background-image: url("../../../../assets/img/上传2/上传文本文本.png");
    }


    .ry-btn-add-book{
        color: white;
        width: 142px;
        height: 47px;
        background-image: url("../../../../assets/img/上传2/添加新册.png");
    }
</style>