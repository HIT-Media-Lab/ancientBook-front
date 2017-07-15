<template>
    <div>

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
                    <input id="pic-name" type="file" @change="onFileChange" multiple accept="image/jpeg" name="picture">
                </a>
                <a href="javascript:;" class="ry-file-text ry-white">上傳文本
                    <input id="text-name" type="file" @change="onTextChange" multiple accept="text/plain" name="text">
                </a>
            </div>
        </div>

        <modal :show_modal="this.modal" v-on:fireclose="this.close_modal" class="ry-upload-modal">
            <div slot="header" class="ry-upload-modal-header">
                <span>上传图片</span>
            </div>

            <div slot="body" class="zxw-time-body" style="text-align: center">
                <div class="row">
                    <span class="col-md-5">文件名</span>
                    <span class="col-md-3">大小</span>
                    <span class="col-md-2">上传至</span>
                    <span class="col-md-2">状态</span>
                </div>
                <img src="../../../../assets/img/upload2/形状 1.png" height="1" width="750"/>
                <div class="row" v-for="item in images">
                    <span class="col-md-5"><img src="../../../../assets/img/upload2/1.png" height="40" width="30"/>{{item.pic_name}}</span>
                    <span class="col-md-3">{{item.pic_size}}KB</span>
                    <span class="col-md-2">册1</span>
                    <span class="col-md-2"><img src="../../../../assets/img/upload2/correct.png" height="25" width="26"/>已上传</span>
                    <img src="../../../../assets/img/upload2/形状 1.png" height="1" width="750"/>
                </div>
            </div>

            <div slot="footer" class="zxw-search-footer">
                <button class="zxw-prebtn zxw-search-create" @click="close_modal">继续上传</button>
                <button class="zxwnoumenom-button zxw-search-cancel" @click="close_modal">完成</button>
            </div>
        </modal>

    </div>

</template>

<script>
    import modal from '../../../../component/modal.vue';
    export default{
        components:{
            modal,
        },

        data() {
            return{
                modal : false,
                images : [],
                texts : [],
                text_name : [],
                upload2 : {},
            }
        },

        created : function () {
            this.upload2 = this.$store.getters.get_upload_file;
            this.images = this.$store.getters.get_images;
            this.texts = this.$store.getters.get_texts;
            this.text_name = this.$store.getters.get_text_name;
        },

        beforeRouteLeave(to, from, next) {
            this.$store.commit("get_upload_file",this.upload2);
            this.$store.commit("get_images",this.images);
            this.$store.commit("get_texts",this.texts);
            this.$store.commit("get_text_name",this.text_name);
            next();
        },

        methods :{
            /**
             * 上传进度模态框
             */
            close_modal() {
                this.modal = false
            },


            /**
             * 添加上传图片
             */
            onFileChange(e) {
                var files = e.target.files || e.dataTransfer.files;
                if (!files.length)return;
                this.createImage(files);
                this.check_picture_name();
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
                    var name = file[i].name;
                    var a = file[i].size;
                    var size = a/1000;
                    reader.onload = function(e) {
                        vm.images.push({
                            picture:e.target.result,
                            pic_name:name,
                            pic_size:size
                        });
                    };
                }
            },

            check_picture_name() {
                for (var i = 0; i < this.images.length; i ++) {
                    var name = this.images[i].pic_name;
                    var one = name.charAt(0);
                    var two = name.charAt(1);
                    var three = name.charAt(2);
                    var four = name.charAt(3);
                    var five = name.charAt(4);
                    var six = name.charAt(5);
                    var seven = name.charAt(6);
                    var eight = name.charAt(7);
                    var first = '卷';
                    var second =  /^[0-9]+.?[0-9]*$/;
                    var third =  /^[0-9]+.?[0-9]*$/;
                    var fourth =  /^[0-9]+.?[0-9]*$/;
                    var fifth =  '-';
                    var sixth =  /^[0-9]+.?[0-9]*$/;
                    var seventh =  /^[0-9]+.?[0-9]*$/;
                    var eighth =  /^[0-9]+.?[0-9]*$/;
                    if (one != first) {
                        alert("上传文件名不符合规范，第一个字符应为“卷”，请重新上传");
                        this.images = [];
                        break;
                    }
                    else if (!second.test(two)) {
                        alert("上传文件名不符合规范，第二个字符应为数字，请重新上传");
                        this.images = [];
                        break;
                    }
                    else if (!third.test(three)) {
                        alert("上传文件名不符合规范，第三个字符应为数字，请重新上传");
                        this.images = [];
                        break;
                    }
                    else if (!fourth.test(four)) {
                        alert("上传文件名不符合规范，第四个字符应为数字，请重新上传");
                        this.images = [];
                        break;
                    }
                    else if (five != fifth) {
                        alert("上传文件名不符合规范，第五个字符应为“-”，请重新上传");
                        this.images = [];
                        break;
                    }
                    else if (!sixth.test(six)) {
                        alert("上传文件名不符合规范，第六个字符应为数字，请重新上传");
                        this.images = [];
                        break;
                    }
                    else if (!seventh.test(seven)) {
                        alert("上传文件名不符合规范，第七个字符应为数字，请重新上传");
                        this.images = [];
                        break;
                    }
                    else if (!eighth.test(eight)) {
                        alert("上传文件名不符合规范，第八个字符应为数字，请重新上传");
                        this.images = [];
                        break;
                    }
                    else{
                        this.modal = true;
                    }
                }
            },


            /**
             * 上传文本文件
             */
            onTextChange(e) {
                var files = e.target.files || e.dataTransfer.files;
                if (!files.length)return;
                this.createText(files);
                var obj = document.getElementById("text-name");
                for(var i = 0; i < obj.files.length; i++) {
                    var temp = obj.files[i].name;
                    this.text_name.push(temp);
                }
                this.check_text_name();
            },

            createText(file) {
                var vm = this;
                var leng = file.length;
                for (var i = 0; i < leng; i++) {
                    var reader = new FileReader();
                    reader.readAsText(file[i],'gbk');
                    reader.onload = function(e) {
                        vm.texts.push(e.target.result);
                    };
                }
            },

            check_text_name() {
                for (var i = 0; i < this.text_name.length; i ++) {
                    var name = this.text_name[i];
                    var one = name.charAt(0);
                    var two = name.charAt(1);
                    var three = name.charAt(2);
                    var four = name.charAt(3);
                    var five = name.charAt(4);
                    var six = name.charAt(5);
                    var seven = name.charAt(6);
                    var eight = name.charAt(7);
                    var first = '卷';
                    var second =  /^[0-9]+.?[0-9]*$/;
                    var third =  /^[0-9]+.?[0-9]*$/;
                    var fourth =  /^[0-9]+.?[0-9]*$/;
                    var fifth =  '-';
                    var sixth =  /^[0-9]+.?[0-9]*$/;
                    var seventh =  /^[0-9]+.?[0-9]*$/;
                    var eighth =  /^[0-9]+.?[0-9]*$/;
                    if (one != first) {
                        alert("上传文件名不符合规范，第一个字符应为“卷”，请重新上传");
                        this.text_name = [];
                        this.texts = [];
                        break;
                    }
                    else if (!second.test(two)) {
                        alert("上传文件名不符合规范，第二个字符应为数字，请重新上传");
                        this.text_name = [];
                        this.texts = [];
                        break;
                    }
                    else if (!third.test(three)) {
                        alert("上传文件名不符合规范，第三个字符应为数字，请重新上传");
                        this.text_name = [];
                        this.texts = [];
                        break;
                    }
                    else if (!fourth.test(four)) {
                        alert("上传文件名不符合规范，第四个字符应为数字，请重新上传");
                        this.text_name = [];
                        this.texts = [];
                        break;
                    }
                    else if (five != fifth) {
                        alert("上传文件名不符合规范，第五个字符应为“-”，请重新上传");
                        this.text_name = [];
                        this.texts = [];
                        break;
                    }
                    else if (!sixth.test(six)) {
                        alert("上传文件名不符合规范，第六个字符应为数字，请重新上传");
                        this.text_name = [];
                        this.texts = [];
                        break;
                    }
                    else if (!seventh.test(seven)) {
                        alert("上传文件名不符合规范，第七个字符应为数字，请重新上传");
                        this.text_name = [];
                        this.texts = [];
                        break;
                    }
                    else if (!eighth.test(eight)) {
                        alert("上传文件名不符合规范，第八个字符应为数字，请重新上传");
                        this.text_name = [];
                        this.texts = [];
                        break;
                    }
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
        background-image: url("../../../../assets/img/upload2/下一步.png");
    }

    .ry-btn-upload2-last{
        width: 127px;
        height: 54px;
        background-image: url("../../../../assets/img/upload2/上一步.png");
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
        background-image:  url("../../../../assets/img/upload2/上传文本文本.png");
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
        background-image:  url("../../../../assets/img/upload2/上传文本文本.png");
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
        background-image: url("../../../../assets/img/upload2/添加新册.png");
    }

    .ry-upload-modal{
        width:800px;
        background-repeat: no-repeat;
        background-size:800px auto;
    }

    .ry-upload-modal-header{
        color:gainsboro;
        font-size: 18px;
        text-align: center;
        background-image: url("../../../../assets/img/弹框标题.png");
        background-size: contain;
        background-color: transparent;
        width:800px;
        height:50px;
        padding:10px 0 0 0;
    }
</style>