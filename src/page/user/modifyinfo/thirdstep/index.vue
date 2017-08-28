<template>

    <div class="ry-upload-three">

        <!--模块名称-->
        <div class="width950 center">
            <h3 style="display:inline-block">3编辑</h3>
            <button class="float-right ry-btn-cancel-upload" @click="cancel_upload">取消上传</button>
        </div>

        <div class="width1000 center">
            <img src="../../../../assets/img/no-use-picture/ink-line-long.png" height="7" width="974"/>
        </div>

        <div class="width950 height650 center ry-scroll">
            <div id="ry-pictures" v-for="(item,index) in upload_file[this.book_index].images" style="display: inline-block">
                <div class="ry-picture-box" v-show="item.show">
                    <div class="ry-picture-view ry-fixed">
                        <button class="ry-del-pic" @click="del_picture(index)"><img src="../../../../assets/img/picture-button/add-character-hover.png" height="14" width="15" /></button>
                        <img :src="item.picture" class="ry-picture-view" @mouseover="view_picture()"/>
                    </div>
                    <p class="picture-names" style="text-align: center">{{item.pic_name}}</p>
                </div>
            </div>
            <div class="ry-picture-box">
                <a href="javascript:;" class="ry-add">
                    <input id="add" type="file" @change="onFileChange" multiple accept="image/jpeg" name="picture">
                </a>
            </div>
        </div>

        <!--底按鈕欄-->
        <div class="width1000 center ry-bottom-bar">
            <button class="float-right ry-btn-next-page" @click="next_volume">下一卷</button>
            <button class="float-right ry-btn-go" @click="go_volume">GO</button>
            <div class="float-right ry-page">
                <input id="ry-volume-page" class="ry-input-page" v-model="this.volume_bind">
                <span>/</span>
                <span>{{this.volume_total}}</span>
            </div>
            <button class="float-right ry-btn-last-page" @click="last_volume">上一卷</button>
            <button class="ry-btn-last-page" @click="last_book">上一册</button>
            <div style="display: inline-block" class="ry-page">
                <input id="ry-book-page" class="ry-input-page" v-model="this.book_bind">
                <span>/</span>
                <span>{{this.book_total}}</span>
            </div>
            <button class="ry-btn-go" @click="go_book">GO</button>
            <button class="ry-btn-next-page" @click="next_book">下一册</button>
        </div>

        <div class="width1000 center">
            <button class="ry-btn-submit float-right" @click="complete_upload()">发布</button>
            <button class="ry-btn-last-step3 float-right" @click="last_page()">上一步</button>
        </div>

        <hover_modal :show_modal="this.hover_modal" v-on:fireclose="this.close_modal" class="ry-hover-modal">
            <div slot="header" class="ry-hover-modal-header">
                <span>图文</span>
            </div>

            <div slot="body">
                <div class="ry-hover-picture">
                    <img id="ry-hover-picture" class="ry-hover-picture">
                    <a href="javascript:;" class="ry-fixed-left">更改图片
                        <input type="file" @change="change_picture" accept="image/jpeg" name="picture">
                    </a>
                    <a href="javascript:;" class="ry-fixed-right">更改文本
                        <input id="text-name" type="file" @change="change_text" accept="text/plain" name="text">
                    </a>
                </div>
                <div id="ry-hover-text" class="ry-hover-text"></div>
            </div>

            <div slot="footer">

            </div>
        </hover_modal>

    </div>

</template>

<script>
    import hover_modal from '../../../../component/modal.vue';
    export default{
        components:{
            hover_modal,
        },

        data() {
            return{
                book_total : 1,
                volume_total : 1,
                book_bind : 1,
                volume_bind : 1,
                book_index : 0,
                volume_index : 0,
                index : 0,
                hover_modal : false,
                varieties_item : {},
                edition_item : {},
                impression_item : {},
                copy_item : {},
                upload_one_info : {},
                summary : {},
                upload_file : [],
                responsibility_info : [],
                add_book_obj : {},

                post_index1 : 0,
                post_index2 : 0,
            }
        },

        created : function () {
            this.upload_file = this.$store.getters.get_upload_file;
            this.book_total = this.upload_file.length;
            this.get_volume_total();
        },

        mounted : function () {
            this.set_show();
        },

        beforeRouteLeave(to, from, next) {
            this.$store.commit("get_upload_file",this.upload_file);
            next();
        },

        methods : {
            /**
             * 获得每册卷数最大值
             */
            get_volume_total() {
                for (var i = 0; i < this.upload_file[this.book_index].images.length; i++) {
                    var name = this.upload_file[this.book_index].images[i].pic_name;
                    var first = name.charAt(1);
                    var second = name.charAt(2);
                    var third = name.charAt(3);
                    var str = first + second + third;
                    var num = parseInt(str);
                    if (num > this.volume_total) {
                        this.volume_total = num;
                    }
                }
            },


            /**
             * 悬浮模态框
             */
            close_modal() {
                this.hover_modal = false;
            },

            view_picture() {
                this.hover_modal = true;
                var src = event.currentTarget.src;
                document.getElementById("ry-hover-picture").src = src;
                for (var i = 0; i < this.upload_file[this.book_index].images.length; i++) {
                    var key = this.upload_file[this.book_index].images[i].picture;
                    if (src == key) {
                        var index = i;
                        this.index = index;
                        break;
                    }
                }
                document.getElementById("ry-hover-text").innerText = this.upload_file[this.book_index].texts[index]
            },


            /**
             * 删除图片
             */
            del_picture(index) {
                this.upload_file[this.book_index].images.splice(index,1)
            },

            /**
             * 更改图片
             */
            change_picture(e) {
                var files = e.target.files || e.dataTransfer.files;
                if (!files.length)return;
                this.change_image(files,this.book_index);
            },

            change_image(file,index) {
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
                        vm.$set(vm.upload_file[index].images,vm.index,{
                            show:true,
                            picture:e.target.result,
                            pic_name:name,
                            pic_size:size
                        });
                    };
                }
            },


            /**
             * 更改文本
             */
            change_text(e) {
                var files = e.target.files || e.dataTransfer.files;
                if (!files.length)return;
                this.change_content(files);
            },

            change_content(file) {
                var vm = this;
                var leng = file.length;
                for (var i = 0; i < leng; i++) {
                    var reader = new FileReader();
                    reader.readAsText(file[i],'gbk');
                    reader.onload = function(e) {
                        vm.$set(vm.texts,vm.index,e.target.result);
                    };
                }
            },


            /**
             * 添加上传图片
             */
            onFileChange(e) {
                var files = e.target.files || e.dataTransfer.files;
                if (!files.length)return;
                this.createImage(files,this.book_index);
            },

            createImage(file,index) {
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
                        vm.upload_file[index].images.push({
                            show:true,
                            picture:e.target.result,
                            pic_name:name,
                            pic_size:size
                        });
                    };
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


            /**
             * 上下册翻册
             */
            last_book() {
                if (this.book_index == 0) {
                    alert("这是第一册")
                }
                else{
                    this.book_index = this.book_index - 1;
                    this.book_bind = this.book_bind - 1;
                    this.get_volume_total();
                }
            },
            next_book() {
                if (this.book_bind == this.book_total) {
                    alert("这是最后一册")
                }
                else{
                    this.book_index = this.book_index + 1;
                    this.book_bind = this.book_bind + 1;
                    this.get_volume_total();
                }
            },
            go_book() {
                var page = parseInt(document.getElementById("ry-book-page").value);
                this.book_index = page-1;
                this.book_bind = page;
                alert(this.book_index)
            },


            /**
             * 上下卷翻卷
             */
            set_show() {
                for (var i = 0; i < this.upload_file[this.book_index].images.length; i++) {
                    var name = this.upload_file[this.book_index].images[i].pic_name;
                    var first = name.charAt(1);
                    var second = name.charAt(2);
                    var third = name.charAt(3);
                    var str = first + second + third;
                    var key = parseInt(str) - 1;
                    if (key == this.volume_index) {
                        this.upload_file[this.book_index].images[i].show = true;
                    }
                    else{
                        this.upload_file[this.book_index].images[i].show = false;
                    }
                }
            },

            last_volume() {
                if (this.volume_index == 0) {
                    alert("这是第一卷")
                }
                else{
                    this.volume_index = this.volume_index - 1;
                    this.volume_bind = this.volume_bind - 1;
                    this.set_show();
                }
            },
            next_volume() {
                if (this.volume_bind == this.volume_total) {
                    alert("这是最后一卷");
                }
                else{
                    this.volume_index = this.volume_index + 1;
                    this.volume_bind = this.volume_bind + 1;
                    this.set_show();
                }
            },
            go_volume() {
                var page = parseInt(document.getElementById("ry-volume-page").value);
                this.volume_index = page-1;
                this.volume_bind = page;
                this.set_show();
            },


            /**
             * 取消上传
             */
            cancel_upload() {
                this.$router.push({path: '/user'});
            },

            last_page() {
                this.$router.push({path: '/user/upload2'});
            },


            /**
             * post上传请求
             */
            complete_upload() {
                for (vm.post_index1 = 0; vm.post_index1 < vm.upload_file.length; vm.post_index1++) {
                    for (vm.post_index2 = 0; vm.post_index2 < vm.upload_file[vm.post_index1].images.length; vm.post_index2++) {
                        var upload_picture_obj = new FormData;

                        var name = vm.upload_file[vm.post_index1].images[vm.post_index2].pic_name;
                        var first = name.charAt(1);
                        var second = name.charAt(2);
                        var third = name.charAt(3);
                        var str = first + second + third;
                        var volume = parseInt(str);

                        upload_picture_obj.append('ancient_book_id' , response.body.id);
                        upload_picture_obj.append('book' , vm.post_index1 + 1);
                        upload_picture_obj.append('volume' , volume);
                        upload_picture_obj.append('page' , vm.post_index2 + 1);
                        upload_picture_obj.append('picture' , vm.upload_file[vm.post_index1].images[vm.post_index2].picture);
                        upload_picture_obj.append('content' , vm.upload_file[vm.post_index1].texts[vm.post_index2]);
                        upload_picture_obj.append('book_name' , vm.upload_file[vm.post_index1].book_name);

                        upload_picture_obj.token = this.$store.getters.GetToken;
                        this.before_http(upload_picture_obj);
                        upload_picture_obj.token = this.$store.getters.GetToken;
                        upload_picture_obj.append('token' , upload_picture_obj.token);

                        this.$http.post('/ancient_books/upload_page.action' , upload_picture_obj ,
                                {emulateJSON: true}
                        ).then(function (response) {
                            this.response_post(response,this.success_post_picture,this.fail_post_picture);
                        },function () {
                            this.error();
                        })
                    }
                }
            },

            success_post_picture(response) {
                if (response.body.result === 1) {
                    console.log("success upload picture!");
                    if (vm.post_index1 == vm.upload_file.length - 1 && vm.post_index2 == vm.upload_file[vm.upload_file.length - 1].images.length - 1) {
                        this.$router.push({path:'/user_info/mybook'});
                    }
                }
                else if (response.body.result === 0) {
                    console.log("fail upload picture");
                }
            },

            fail_post_picture() {
                console.log("fail upload picture!");
            },

            response_post(response, success, fail) {
                let status = response.status;
                if (status == 200){
                    if (response.body.result == 1){
                        this.after_success(response);
                        success(response);
                    } else if (response.body.result == 0){
                        this.after_success(response);
                        fail(response);
                    }
                } else if (status == 403){
                    this.$router.push('/403');
                } else if (status == 404){
                    this.$router.push('/404');
                }
            },

            after_success (response) {
                //更新token
                this.$store.commit("change_token",response.body.token);
            },

            error () {

            },
        },
    }
</script>

