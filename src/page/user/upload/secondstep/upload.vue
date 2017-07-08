<template>

    <div id="upload2-box" class="ry-upload-two">
        <span>
            <span>冊號:</span>
            <input class="ry-input-upload2" v-model="upload2.book_num">
        </span>
        <br>
        <span>
            <span>冊名:</span>
            <input class="ry-input-upload2" v-model="upload2.book_name">
        </span>

        <div class="width800">
            <a href="javascript:;" class="ry-file-picture ry-white">上傳圖片
                <input id="pic-name" type="file" @change="onFileChange" multiple name="picture">
            </a>
            <a href="javascript:;" class="ry-file-text ry-white">上傳文本
                <input type="file" @change="onTextChange" multiple name="text">
            </a>
        </div>
    </div>

</template>

<script>
    export default{
        data() {
            return{
                images : [],
                picture_name : [],
                texts : [],
                upload2 : {},
            }
        },

        created : function () {
            this.upload2 = this.$store.getters.get_upload_file;
            this.images = this.$store.getters.get_images;
            this.texts = this.$store.getters.get_texts;
            this.picture_name = this.$store.getters.get_picture_name;
        },

        beforeRouteLeave(to, from, next) {
            this.$store.commit("get_upload_file",this.upload2);
            this.$store.commit("get_images",this.images);
            this.$store.commit("get_texts",this.texts);
            this.$store.commit("get_picture_name",this.picture_name);
            next();
        },

        methods :{
            onFileChange(e) {
                var files = e.target.files || e.dataTransfer.files;
                if (!files.length)return;
                this.createImage(files);
                var obj = document.getElementById("pic-name");
                for(var i = 0; i < obj.files.length; i++) {
                    var temp = obj.files[i].name;
                    this.picture_name.push(temp);
                }
            },
            createImage(file) {
                if (typeof FileReader === 'undefined') {
                    alert('您的浏览器不支持图片上传，请升级您的浏览器');
                    return false;
                }
                var vm = this;
                var leng = file.length;
                for (var i = 0; i < leng; i++) {
                    var reader = new FileReader();
                    reader.readAsDataURL(file[i]);
                    reader.onload = function(e) {
                        vm.images.push(e.target.result);
                    };
                }
            },

            onTextChange(e) {
                var files = e.target.files || e.dataTransfer.files;
                if (!files.length)return;
                this.createText(files);
            },
            createText(file) {
                if (typeof FileReader === 'undefined') {
                    alert('您的浏览器不支持图片上传，请升级您的浏览器');
                    return false;
                }
                var vm = this;
                var leng = file.length;
                for (var i = 0; i < leng; i++) {
                    var reader = new FileReader();
                    reader.readAsDataURL(file[i]);
                    reader.onload = function(e) {
                        vm.texts.push(e.target.result);
                    };
                }
            },
        },
    }
</script>

<style>
    #upload2-box a:hover, a:visited, a:link, a:active{
        text-decoration: none;
        color: white;
        cursor: pointer;
    }

    .ry-upload-two input{
        border: none;
        background-color: transparent;
        padding-left: 4px;
    }

    .ry-upload-two button{
        background-color: transparent;
        border: none;
    }

    .ry-btn-upload2-next{
        color: white;
        width: 127px;
        height: 54px;
        background-image: url("../../../../assets/img/上传2/下一步.png");
    }

    .ry-btn-upload2-last{
        width: 127px;
        height: 54px;
        background-image: url("../../../../assets/img/上传2/上一步.png");
    }

    .ry-input-upload2{
        margin: 5px 0px;
        width: 225px;
        height: 33px;
        background-image: url("../../../../assets/img/上传1/书名什么的.png");
    }

    .ry-file-picture{
        position: relative;
        display: inline-block;
        color: white;
        font-size: x-large;
        width: 175px;
        height: 74px;
        background-image:  url("../../../../assets/img/上传2/上传文本文本.png");
        padding-top: 25px;
        padding-left: 40px;
        overflow: hidden;
        text-decoration: none;
        text-indent: 0;
        line-height: 20px;
    }

    .ry-file-picture input{
        position: absolute;
        font-size: 100px;
        right: 0;
        top: 0;
        opacity: 0;
    }

    .ry-file-text{
        position: relative;
        display: inline-block;
        color: white;
        font-size: x-large;
        width: 175px;
        height: 74px;
        background-image:  url("../../../../assets/img/上传2/上传文本文本.png");
        padding-top: 25px;
        padding-left: 40px;
        overflow: hidden;
        text-decoration: none;
        text-indent: 0;
        line-height: 20px;
    }

    .ry-file-text input{
        position: absolute;
        font-size: 100px;
        right: 0;
        top: 0;
        opacity: 0;
    }


    .ry-btn-add-book{
        color: white;
        width: 142px;
        height: 47px;
        background-image: url("../../../../assets/img/上传2/添加新册.png");
    }
</style>