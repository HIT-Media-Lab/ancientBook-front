<template>

    <div>

        <!--模块名称-->
        <div class="width950 center">
            <h3 style="display:inline-block">2上传图文</h3>
            <button class="float-right ry-btn-cancel-upload" @click="cancel_upload">取消上传</button>
        </div>

        <div class="width1000 center">
            <img src="../../../../assets/img/no-use-picture/ink-line-long.png" height="7" width="974"/>
        </div>

        <div class="width600 center">
            <div id="upload2-box" class="ry-upload-two" v-for="(item,index) in upload_file">
                <span>册号:</span>
                <input class="ry-input-upload2" v-model="item.book_num">
                <button class="ry-btn-add-book" @click="add_new_book(index)" v-show="upload_file[index].value">添加新册</button>
                <br>
                <span>册名:</span>
                <input class="ry-input-upload2" v-model="item.book_name">
                <div class="width800">
                    <a href="javascript:;" class="ry-file-picture ry-white">上传图片
                        <input id="pic-name" type="file" @change="onFileChange" multiple accept="image/jpeg" name="picture">
                    </a>
                    <a href="javascript:;" class="ry-file-text ry-white">上传文本
                        <input id="text-name" type="file" @change="onTextChange" multiple accept="text/plain" name="text">
                    </a>
                </div>
            </div>
        </div>

        <div class="width600 center">
            <p>请严格遵守命名规范上传文件，并保证对应图文文件的名称一致（可以仅上传图片文件）</p>
            <p>命名规范：“卷-页”，如“卷001-001.jpg”，“卷001-001.txt”</p>
            <p>若分AB页：“卷-页-A/B”，如“卷001-001-A.jpg”，“卷001-001-B.jpg”，“卷001-001-A.txt”，“卷001-001-B.txt”</p>
        </div>

        <div class="width600 center">
            <button class="ry-btn-upload2-next float-right" @click="next_page()">下一步</button>
            <button class="ry-btn-upload2-last float-right" @click="last_page()">上一步</button>
        </div>

        <modal :show_modal="this.modal" v-on:fireclose="this.close_modal" class="ry-upload-modal">
            <div slot="header" class="ry-upload-modal-header">
                <span>上传图片</span>
            </div>

            <div slot="body" class="zxw-time-body" style="text-align: center">
                <div style="background-color:white;">
                    <div class="row">
                        <span class="col-md-5">文件名</span>
                        <span class="col-md-3">大小</span>
                        <span class="col-md-2">上传至</span>
                        <span class="col-md-2">状态</span>
                    </div>
                    <img src="../../../../assets/img/no-use-picture/ink-line.png" height="1" width="750"/>
                    <div class="row" v-for="item in upload_file[index].images">
                        <span class="col-md-5"><img src="../../../../assets/img/no-use-picture/1.png" height="40" width="30"/>{{item.pic_name}}</span>
                        <span class="col-md-3">{{item.pic_size}}KB</span>
                        <span class="col-md-2">册1</span>
                        <span class="col-md-2"><img src="../../../../assets/img/no-use-picture/correct.png" height="25" width="26"/>已上传</span>
                        <img src="../../../../assets/img/no-use-picture/ink-line.png" height="1" width="750"/>
                    </div>

                    <button class="zxw-prebtn" @click="close_modal">继续上传</button>
                    <button class="zxwnoumenom-button ry-search-cancel" @click="close_modal">完成</button>
                </div>
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
                index : 0,
                modal : false,
                text_name : [],
                upload_file : [{
                    value : true,
                    book_name : '',
                    book_num : '',
                    images : [],
                    texts : [],
                }],
            }
        },

        created : function () {
            this.index = this.$store.getters.get_upload_book_index;
            this.upload_file = this.$store.getters.get_upload_file;
            this.text_name = this.$store.getters.get_text_name;
        },

        mounted : function () {

        },

        beforeRouteLeave(to, from, next) {
            this.$store.commit("get_upload_file",this.upload_file);
            this.$store.commit("get_text_name",this.text_name);
            this.$store.commit("get_upload_book_index",this.index);
            next();
        },

        methods : {
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
                var _this = this;
                this.createImage(files,this.index, function(i, length) {
                    if (i == length - 1) {
                        _this.check_picture_name();
                    }
                });
            },

            createImage(file,index,callback) {
                if (typeof FileReader === 'undefined') {
                    alert('您的浏览器不支持图片上传，请升级您的浏览器');
                    return false;
                }
                var vm = this;
                var leng = file.length;
                for (let i = 0; i < leng; i++) {
                    let name = file[i].name;
                    let a = file[i].size;
                    let size = a/1000;
                    let reader = new FileReader();
                    reader.readAsDataURL(file[i]);
                    reader.onload = function(e) {
                        vm.upload_file[index].images.push({
                            show:true,
                            picture:e.target.result,
                            pic_name:name,
                            pic_size:size
                        });
                        callback(i, leng);
                    };
                }
            },


//            /**
//             * 添加上传图片
//             */
//             onFileChange(e) {
//                var files = e.target.files || e.dataTransfer.files;
//                if (!files.length)return;
//                this.createImage(files,this.index);
////                console.log(this.upload_file[this.index].images);
////                console.log(this.upload_file[this.index].images.length);
//                this.check_picture_name();
//             },
//
//            createImage(file,index,callback) {
//                if (typeof FileReader === 'undefined') {
//                    alert('您的浏览器不支持图片上传，请升级您的浏览器');
//                    return false;
//                }
//                var vm = this;
//                var leng = file.length;
//                for (var i = 0; i < leng; i++) {
//                    var name = file[i].name;
//                    var a = file[i].size;
//                    var size = a/1000;
//                    var reader = new FileReader();
//                    reader.readAsDataURL(file[i]);
//                    vm.upload_file[index].images.push({key:2});
//                    reader.onloadend = function(e) {
//                        vm.upload_file[index].images.pop();
//                        vm.upload_file[index].images.push({
//                            show:true,
//                            picture:e.target.result,
//                            pic_name:name,
//                            pic_size:size
//                        });
//                    };
//                    };
//            },



            check_picture_name() {
                var vm = this;
                var key = 0;
                for (var i = 0; i < this.upload_file[vm.index].images.length; i++) {
                    var name = this.upload_file[vm.index].images[i].pic_name;
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
                        this.upload_file[this.index].images = [];
                        console.log(this.upload_file[this.index].images);
                        key = 1;
                        break;
                    }
                    else if (!second.test(two)) {
                        alert("上传文件名不符合规范，第二个字符应为数字，请重新上传");
                        this.upload_file[this.index].images = [];
                        key = 1;
                        break;
                    }
                    else if (!third.test(three)) {
                        alert("上传文件名不符合规范，第三个字符应为数字，请重新上传");
                        this.upload_file[this.index].images = [];
                        key = 1;
                        break;
                    }
                    else if (!fourth.test(four)) {
                        alert("上传文件名不符合规范，第四个字符应为数字，请重新上传");
                        this.upload_file[this.index].images = [];
                        key = 1;
                        break;
                    }
                    else if (five != fifth) {
                        alert("上传文件名不符合规范，第五个字符应为“-”，请重新上传");
                        this.upload_file[this.index].images = [];
                        key = 1;
                        break;
                    }
                    else if (!sixth.test(six)) {
                        alert("上传文件名不符合规范，第六个字符应为数字，请重新上传");
                        this.upload_file[this.index].images = [];
                        key = 1;
                        break;
                    }
                    else if (!seventh.test(seven)) {
                        alert("上传文件名不符合规范，第七个字符应为数字，请重新上传");
                        this.upload_file[this.index].images = [];
                        key = 1;
                        break;
                    }
                    else if (!eighth.test(eight)) {
                        alert("上传文件名不符合规范，第八个字符应为数字，请重新上传");
                        this.upload_file[this.index].images = [];
                        key = 1;
                        break;
                    }
                }
                if (key == 0) {
                    this.modal = true;
                }
            },


            /**
             * 上传文本文件
             */
            onTextChange(e) {
                var files = e.target.files || e.dataTransfer.files;
                if (!files.length)return;
                this.createText(files,this.index);
                var obj = document.getElementById("text-name");
                for(var i = 0; i < obj.files.length; i++) {
                    var temp = obj.files[i].name;
                    this.text_name.push(temp);
                    if (i == obj.files.length - 1) {
                        this.check_text_name();
                    }
                }
            },

            createText(file,index) {
                var vm = this;
                var leng = file.length;
                for (var i = 0; i < leng; i++) {
                    var　name_check = 0;
                    var reader = new FileReader();
                    reader.readAsText(file[i],'gbk');

                    var name = file[i].name;
                    var first = name.charAt(1);
                    var second = name.charAt(2);
                    var third = name.charAt(3);
                    var fourth = name .charAt(5);
                    var fifth = name.charAt(6);
                    var sixth = name.charAt(7);
                    var text = first + second + third + fourth + fifth + sixth;
                    var text_index = parseInt(text);
                    for (var j = 0; j < vm.upload_file[index].images.length; j++) {
                        var pic_name = vm.upload_file[index].images[j].pic_name;
                        var one = pic_name.charAt(1);
                        var two = pic_name.charAt(2);
                        var three = pic_name.charAt(3);
                        var four = pic_name .charAt(5);
                        var five = pic_name.charAt(6);
                        var six = pic_name.charAt(7);
                        var pic = one + two + three + four + five + six;
                        var pic_index = parseInt(pic);
                        if (pic_index == text_index) {
                            reader.onload = function(e) {
                                vm.upload_file[index].texts.push(e.target.result);
                            };
                            name_check = 1;
                            break;
                        }
                        else if (pic_index != text_index) {
                            reader.onload = function() {
                                vm.upload_file[index].texts.push(null);
                            };
                        }
                    }

                    if (name_check == 0) {
                        alert("您上传的文本文件中含有没有与其对应的图片文件，不能上传");
                        vm.upload_file[index].texts = [];
                        break;
                    }
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
                        this.upload_file[this.index].texts = [];
                        break;
                    }
                    else if (!second.test(two)) {
                        alert("上传文件名不符合规范，第二个字符应为数字，请重新上传");
                        this.text_name = [];
                        this.upload_file[this.index].texts = [];
                        break;
                    }
                    else if (!third.test(three)) {
                        alert("上传文件名不符合规范，第三个字符应为数字，请重新上传");
                        this.text_name = [];
                        this.upload_file[this.index].texts = [];
                        break;
                    }
                    else if (!fourth.test(four)) {
                        alert("上传文件名不符合规范，第四个字符应为数字，请重新上传");
                        this.text_name = [];
                        this.upload_file[this.index].texts = [];
                        break;
                    }
                    else if (five != fifth) {
                        alert("上传文件名不符合规范，第五个字符应为“-”，请重新上传");
                        this.text_name = [];
                        this.upload_file[this.index].texts = [];
                        break;
                    }
                    else if (!sixth.test(six)) {
                        alert("上传文件名不符合规范，第六个字符应为数字，请重新上传");
                        this.text_name = [];
                        this.upload_file[this.index].texts = [];
                        break;
                    }
                    else if (!seventh.test(seven)) {
                        alert("上传文件名不符合规范，第七个字符应为数字，请重新上传");
                        this.text_name = [];
                        this.upload_file[this.index].texts = [];
                        break;
                    }
                    else if (!eighth.test(eight)) {
                        alert("上传文件名不符合规范，第八个字符应为数字，请重新上传");
                        this.text_name = [];
                        this.upload_file[this.index].texts = [];
                        break;
                    }
                }
            },


            /**
             * 添加新册
             */
            add_new_book(p) {
                if (this.upload_file[this.index].book_num == '') {
                    alert("请填写册号")
                }
                else if (this.upload_file[this.index].book_name == '') {
                    alert("请填写册名")
                }
                else if (this.upload_file[this.index].images.length == 0) {
                    alert("请选择要上传的图片文件")
                }
                else{
                    this.upload_file[p].value = false;
                    this.upload_file.push({
                        value:true,
                        book_name : '',
                        book_num : '',
                        images : [],
                        texts : [],
                    });

                    this.index = this.index + 1;
                }
            },


            next_page() {
                if (this.upload_file[this.index].book_num == '') {
                    alert("请填写册号")
                }
                else if (this.upload_file[this.index].book_name == '') {
                    alert("请填写册名")
                }
                else if (this.upload_file[this.index].images.length == 0) {
                    alert("请选择要上传的图片文件")
                }
                else{
                    for (var i = 0; i < this.upload_file.length; i++) {
                        var temp;
                        if (this.upload_file[i].images.length > 1) {
                            for (var j = 0; j < this.upload_file[i].images.length - 1; j++) {
                                for (var k = 0; k < this.upload_file[i].images.length - 1 - j; k++) {
                                    var name1 = this.upload_file[i].images[k].pic_name;
                                    var first = name1.charAt(1);
                                    var second = name1.charAt(2);
                                    var third = name1.charAt(3);
                                    var fourth = name1.charAt(5);
                                    var fifth = name1.charAt(6);
                                    var sixth = name1.charAt(7);
                                    var str1 = first + second + third + fourth + fifth + sixth;
                                    var key1 = parseInt(str1);

                                    var name2 = this.upload_file[i].images[k + 1].pic_name;
                                    var one = name2.charAt(1);
                                    var two = name2.charAt(2);
                                    var three = name2.charAt(3);
                                    var four = name2.charAt(5);
                                    var five = name2.charAt(6);
                                    var six = name2.charAt(7);
                                    var str2 = one + two + three + four + five + six;
                                    var key2 = parseInt(str2);

                                    if (key1 > key2) {
                                        temp = this.upload_file[i].images[k];
                                        this.upload_file[i].images[k] = this.upload_file[i].images[k + 1];
                                        this.upload_file[i].images[k + 1] = temp;
                                    }
                                }
                            }
                        }

                        if (i == this.upload_file.length - 1) {
                            this.$router.push({path: '/user/upload3'});
                        }
                    }
                }
            },

            last_page() {
                this.$router.push({path: '/user/upload1'});
            },

            cancel_upload() {
                this.$router.push({path: '/user'});
            },

            remove(item) {
                var i = this.upload_box.indexOf(item);
                this.upload_box.splice(i, 1)
            }
        }
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
        background-image: url("../../../../assets/img/button/create-next-step.png");
    }

    .ry-btn-upload2-last{
        color: white;
        width: 127px;
        height: 54px;
        background-image: url("../../../../assets/img/button/create-next-step.png");
    }

    .ry-input-upload2{
        margin: 5px 0px;
        width: 225px;
        height: 33px;
        background-image: url("../../../../assets/img/modal-box/book-name.png");
    }

    .ry-file-picture{
        position: relative;
        display: inline-block;
        color: white;
        font-size: x-large;
        width: 175px;
        height: 74px;
        background-image:  url("../../../../assets/img/button/create-next-step.png");
        background-size: 100%;
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
        background-image:  url("../../../../assets/img/button/create-next-step.png");
        background-size: 100%;
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
        background-image: url("../../../../assets/img/button/build-button.png");
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
        background-image: url("../../../../assets/img/no-use-picture/modal-header.png");
        background-size: 100%;
        background-color: transparent;
        width:800px;
        height:50px;
        padding:10px 0 0 0;
    }

    .ry-search-cancel{
        width: 80px;
        height: 50px;
        margin-right: 20px;
        background-size: 80px 40px;
    }
</style>