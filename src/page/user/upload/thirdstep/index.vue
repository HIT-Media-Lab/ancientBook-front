<template>

    <div class="ry-upload-three">

        <!--模块名称-->
        <div class="width950 center">
            <h3 style="display:inline-block">3編輯</h3>
            <button class="float-right ry-btn-cancel-upload" @click="cancel_upload">取消上傳</button>
        </div>

        <div class="width1000 center">
            <img src="../../../../assets/img/本体标记/墨水线上.png" height="7" width="974"/>
        </div>

        <div class="width950 height650 center ry-scroll">
            <div id="ry-pictures" v-for="item in upload_file[this.book_index].images" style="display: inline-block">
                <div class="ry-picture-box" v-show="item.show">
                    <img :src="item.picture" class="ry-picture-view" @mouseover="view_picture()"/>
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
                <span>80</span>
            </div>
            <button class="float-right ry-btn-last-page" @click="last_volume">上一卷</button>
            <button class="ry-btn-last-page" @click="last_book">上一冊</button>
            <div style="display: inline-block" class="ry-page">
                <input id="ry-book-page" class="ry-input-page" v-model="this.book_bind">
                <span>/</span>
                <span>80</span>
            </div>
            <button class="ry-btn-go" @click="go_book">GO</button>
            <button class="ry-btn-next-page" @click="next_book">下一冊</button>
        </div>

        <div class="width1000 center">
            <button class="ry-btn-submit float-right" @click="complete_upload()">發佈</button>
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
                page : 1,
                upload_file : [],
                responsibility_info : [],
                add_book_obj : {},
            }
        },

        created : function () {
            this.upload_file = this.$store.getters.get_upload_file;
        },

        mounted : function () {
            this.set_show()
        },

        beforeRouteLeave(to, from, next) {
            this.$store.commit("get_upload_file",this.upload_file);
            next();
        },

        methods : {
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
                }
            },
            next_book() {
                if (this.book_index == this.upload_file.length) {
                    alert("这是最后一册")
                }
                else{
                    this.book_index = this.book_index + 1;
                    this.book_bind = this.book_bind + 1;
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
                if (this.volume_index == this.upload_file[this.book_index].images.length) {
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
                this.varieties_item = this.$store.getters.get_varieties_item;
                this.edition_item = this.$store.getters.get_edition_item;
                this.impression_item = this.$store.getters.get_impression_item;
                this.copy_item = this.$store.getters.get_copy_item;
                this.upload_one_info = this.$store.getters.get_upload1_info;
                this.summary = this.$store.getters.get_book_summary;
                this.responsibility_info.push({
                    location_id:this.varieties_item.varieties_responsibility.location_id,
                    person_id:this.varieties_item.varieties_responsibility.person_id,
                    begin_time:this.varieties_item.varieties_responsibility.begin_time_id,
                    end_time:this.varieties_item.varieties_responsibility.end_time_id,
                    action:this.varieties_item.varieties_responsibility.action,
                    explain:this.varieties_item.varieties_responsibility.explain,
                    confirm:this.varieties_item.varieties_responsibility.confirm,
                    type:this.varieties_item.varieties_responsibility.type,
                    level:1
                });
                this.responsibility_info.push({
                    location_id:this.edition_item.edition_responsibility.location_id,
                    person_id:this.edition_item.edition_responsibility.person_id,
                    begin_time:this.edition_item.edition_responsibility.begin_time_id,
                    end_time:this.edition_item.edition_responsibility.end_time_id,
                    action:this.edition_item.edition_responsibility.action,
                    explain:this.edition_item.edition_responsibility.explain,
                    confirm:this.edition_item.edition_responsibility.confirm,
                    type:this.edition_item.edition_responsibility.type,
                    level:2
                });
                this.responsibility_info.push({
                    location_id:this.impression_item.impression_responsibility.location_id,
                    person_id:this.impression_item.impression_responsibility.person_id,
                    begin_time:this.impression_item.impression_responsibility.begin_time_id,
                    end_time:this.impression_item.impression_responsibility.end_time_id,
                    action:this.impression_item.impression_responsibility.action,
                    explain:this.impression_item.impression_responsibility.explain,
                    confirm:this.impression_item.impression_responsibility.confirm,
                    type:this.impression_item.impression_responsibility.type,
                    level:3
                });
                this.responsibility_info.push({
                    location_id:this.copy_item.copy_responsibility.location_id,
                    person_id:this.copy_item.copy_responsibility.person_id,
                    begin_time:this.copy_item.copy_responsibility.begin_time_id,
                    end_time:this.copy_item.copy_responsibility.end_time_id,
                    action:this.copy_item.copy_responsibility.action,
                    explain:this.copy_item.copy_responsibility.explain,
                    confirm:this.copy_item.copy_responsibility.confirm,
                    type:this.copy_item.copy_responsibility.type,
                    level:4
                });

                this.add_book_obj.english = this.varieties_item.english;
                this.add_book_obj.type_name = this.varieties_item.type_name;
                this.add_book_obj.type_other_name = this.varieties_item.type_other_name;
                this.add_book_obj.type_save = this.varieties_item.type_save;
                this.add_book_obj.type_level = this.varieties_item.type_level;
                this.add_book_obj.type_bu = this.varieties_item.type_bu;
                this.add_book_obj.type_lei = this.varieties_item.type_lei;
                this.add_book_obj.type_shu = this.varieties_item.type_shu;
                this.add_book_obj.type_summary = this.varieties_item.type_summary;
                this.add_book_obj.literature_standard_name = this.varieties_item.literature_standard_name;
                this.add_book_obj.version_volume = this.edition_item.version_volume;
                this.add_book_obj.version_type = this.edition_item.version_type;
                this.add_book_obj.version_age = this.edition_item.version_age;
                this.add_book_obj.version_support = this.edition_item.version_support;
                this.add_book_obj.version_binding = this.edition_item.version_binding;
                this.add_book_obj.version_frame_length = this.edition_item.version_frame_length;
                this.add_book_obj.version_frame_width = this.edition_item.version_frame_width;
                this.add_book_obj.version_format_length = this.edition_item.version_format_length;
                this.add_book_obj.version_format_width = this.edition_item.version_format_width;
                this.add_book_obj.version_paiji_content = this.edition_item.version_paiji_content;
                this.add_book_obj.version_paiji_location = this.edition_item.version_paiji_location;
                this.add_book_obj.version_half_page_line_number = this.edition_item.version_half_page_line_number;
                this.add_book_obj.version_page_line_number = this.edition_item.version_page_line_number;
                this.add_book_obj.version_yuwei = this.edition_item.version_yuwei;
                this.add_book_obj.version_double_page_number = this.edition_item.version_double_page_number;
                this.add_book_obj.version_bianlan = this.edition_item.version_bianlan;
                this.add_book_obj.version_fenlan = this.edition_item.version_fenlan;
                this.add_book_obj.version_shukou = this.edition_item.version_shukou;
                this.add_book_obj.version_banxin_content = this.edition_item.version_banxin_content;
                this.add_book_obj.version_youshuwuer = this.edition_item.version_youshuwuer;
                this.add_book_obj.version_youwujiazhu = this.edition_item.version_youwujiazhu;
                this.add_book_obj.printing_type = this.impression_item.printing_type;
                this.add_book_obj.printing_number = this.impression_item.printing_number;
                this.add_book_obj.duplicate_book_count = this.copy_item.duplicate_book_count;
                this.add_book_obj.duplicate_level = this.copy_item.duplicate_level;
                this.add_book_obj.duplicate_complete = this.copy_item.duplicate_complete;
                this.add_book_obj.duplicate_attachment = this.copy_item.duplicate_attachment;
                this.add_book_obj.name = this.upload_one_info.name;
                this.add_book_obj.standard_name = this.upload_one_info.standard_name;
                this.add_book_obj.pri = this.upload_one_info.pri;
                this.add_book_obj.summary = this.summary;
                this.add_book_obj.responsibility_info = this.responsibility_info;
                this.before_http(this.add_book_obj);
                this.http_json('/ancient_books/create_ancient_book_with_new_literature.action' , 'post' , this.add_book_obj , this.success_post_add,this.fail_post_add);
            },

            success_post_add(response) {
                var vm = this;
                if (response.body.result === 1) {
                    console.log ("success add!");

                    for(var i = 1;i < vm.picture.length+1; i++) {
                        var upload_picture_obj = {};
                        upload_picture_obj.ancient_book_id = response.body.id;
                        upload_picture_obj.book = 1;
                        upload_picture_obj.volume = 1;
                        upload_picture_obj.page = i;
                        upload_picture_obj.picture = vm.images[i-1];
                        upload_picture_obj.content = vm.texts[i-1];
                        upload_picture_obj.book_name = vm.upload_file.book_name;
                        this.before_http(upload_picture_obj);
                        this.http_json('/ancient_books/upload_page.action' , 'post' , upload_picture_obj , this.success_post_picture,this.fail_post_picture);
                    }

                    this.$router.push({path:'/bookstore/book_info'});
                }
                else if (response.body.result === 0) {
                    console.log ("fail add");
                }
            },

            fail_post_add() {
                console.log("fail add!");
            },

            success_post_picture(response) {
                if (response.body.result === 1) {
                    console.log("success upload picture!");
                }
                else if (response.body.result === 0) {
                    console.log ("fail upload picture");
                }
            },

            fail_post_picture() {
                console.log("fail upload picture!");
            },
        },
    }
</script>

<style>
    #div1, #div2
    {float:left; width:198px; height:66px; margin:10px;padding:10px;border:1px solid #aaaaaa;}

    .ry-upload-three button{
        background-color: transparent;
        border: none;
    }

    .ry-btn-submit{
        color: white;
        width: 127px;
        height: 54px;
        background-image: url("../../../../assets/img/upload2/下一步.png");
    }

    .ry-btn-last-step3{
        color: white;
        width: 127px;
        height: 54px;
        background-image: url("../../../../assets/img/upload2/下一步.png");
    }

    .ry-picture-view{
        width: 120px;
        height: 160px;
    }

    .ry-picture-box{
        display: inline-block;
        margin: 15px 30px;
    }

    .height650{
        height: 650px;
    }

    .ry-scroll{
        overflow-y: scroll;
        overflow-x: hidden;
    }

    .ry-add{
        position: relative;
        display: inline-block;
        width: 120px;
        height: 160px;
        background-image:  url("../../../../assets/img/upload3/upload3_add.png");
        background-size: 100%;
        padding-top: 25px;
        padding-left: 40px;
        overflow: hidden;
        text-decoration: none;
        text-indent: 0;
        line-height: 20px;
    }

    .ry-add input{
        position: absolute;
        font-size: 100px;
        right: 0;
        top: 0;
        opacity: 0;
    }

    .ry-hover-modal{
        width:400px;
        background-repeat: no-repeat;
        background-size:400px auto;
    }

    .ry-hover-modal-header{
        color:gainsboro;
        font-size: 18px;
        text-align: center;
        background-image: url("../../../../assets/img/弹框标题.png");
        background-size: contain;
        background-color: transparent;
        width:400px;
        height:50px;
        padding:10px 0 0 0;
    }

    .ry-hover-picture{
        display: inline-block;
        width: 200px;
        height: 400px;
        float: left;
        position: fixed;
    }

    .ry-hover-text{
        display: inline-block;
        width: 200px;
        height: 400px;
        float: right;
        overflow: hidden;
    }

    .ry-fixed-left{
        position: fixed;
        margin-left: 5px;
        margin-top: 360px;
        background-image: url("../../../../assets/img/upload3/change-file.png");
        width: 80px;
        height: 30px;
        background-size: 100%;
        color: white;
        line-height: 30px;
        text-align: center;
        overflow: hidden;
    }

    .ry-fixed-right{
        position: fixed;
        margin-left: 100px;
        margin-top: 360px;
        background-image: url("../../../../assets/img/upload3/change-file.png");
        width: 80px;
        height: 30px;
        background-size: 100%;
        color: white;
        line-height: 30px;
        text-align: center;
        overflow: hidden;
    }

    .ry-fixed-left input{
        position: absolute;
        font-size: 100px;
        right: 0;
        top: 0;
        opacity: 0;
    }

    .ry-fixed-right input{
        position: absolute;
        font-size: 100px;
        right: 0;
        top: 0;
        opacity: 0;
    }
</style>