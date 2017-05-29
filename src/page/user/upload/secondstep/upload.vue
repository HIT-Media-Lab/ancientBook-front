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
            <button @click="add_newBook()">添加新冊</button>
        </div>
    </div>



</template>

<script>
    export default{
        methods :{
            add_newBook() {
                var uploadBox = document.getElementById("upload2-box");
                var uploadFile = uploadBox.firstChild;
                uploadBox.appendChild(uploadFile);
            }
        },
    }
</script>