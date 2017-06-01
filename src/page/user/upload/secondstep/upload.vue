<template>

    <div>
        <div id="upload2-box">
            <div>
                <span>
                    <span>冊號:</span>
                    <input>
                </span>
                <br>
                <span>
                    <span>冊名:</span>
                    <input>
                </span>
                <br>
                <span>
                    <input type="file" value="選擇圖片">
                    <input type="file" value="選擇文本">
                </span>
            </div>
        </div>

        <div>
            <button @click="add_new_book()">添加新冊</button>
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