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
                    <input id="add" type="file" @change="onFileChange" accept="image/jpeg" name="picture">
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
                posts_index2 : 0,
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
                this.hover_modal = false;
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

                    var key = 0;
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
                        key = 1;
                    }
                    else if (!second.test(two)) {
                        alert("上传文件名不符合规范，第二个字符应为数字，请重新上传");
                        key = 1;
                    }
                    else if (!third.test(three)) {
                        alert("上传文件名不符合规范，第三个字符应为数字，请重新上传");
                        key = 1;
                    }
                    else if (!fourth.test(four)) {
                        alert("上传文件名不符合规范，第四个字符应为数字，请重新上传");
                        key = 1;
                    }
                    else if (five != fifth) {
                        alert("上传文件名不符合规范，第五个字符应为“-”，请重新上传");
                        key = 1;
                    }
                    else if (!sixth.test(six)) {
                        alert("上传文件名不符合规范，第六个字符应为数字，请重新上传");
                        key = 1;
                    }
                    else if (!seventh.test(seven)) {
                        alert("上传文件名不符合规范，第七个字符应为数字，请重新上传");
                        key = 1;
                    }
                    else if (!eighth.test(eight)) {
                        alert("上传文件名不符合规范，第八个字符应为数字，请重新上传");
                        key = 1;
                    }
                    reader.onload = function(e) {
                        if (key == 0){
                            vm.$set(vm.upload_file[index].images,vm.index,{
                                show:true,
                                picture:e.target.result,
                                pic_name:name,
                                pic_size:size
                            });
                        }
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

                    var key = 0;
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
                        key = 1;
                    }
                    else if (!second.test(two)) {
                        alert("上传文件名不符合规范，第二个字符应为数字，请重新上传");
                        key = 1;
                    }
                    else if (!third.test(three)) {
                        alert("上传文件名不符合规范，第三个字符应为数字，请重新上传");
                        key = 1;
                    }
                    else if (!fourth.test(four)) {
                        alert("上传文件名不符合规范，第四个字符应为数字，请重新上传");
                        key = 1;
                    }
                    else if (five != fifth) {
                        alert("上传文件名不符合规范，第五个字符应为“-”，请重新上传");
                        key = 1;
                    }
                    else if (!sixth.test(six)) {
                        alert("上传文件名不符合规范，第六个字符应为数字，请重新上传");
                        key = 1;
                    }
                    else if (!seventh.test(seven)) {
                        alert("上传文件名不符合规范，第七个字符应为数字，请重新上传");
                        key = 1;
                    }
                    else if (!eighth.test(eight)) {
                        alert("上传文件名不符合规范，第八个字符应为数字，请重新上传");
                        key = 1;
                    }
                    reader.onload = function(e) {
                        if(key == 0){
                            vm.upload_file[index].images.push({
                                show:true,
                                picture:e.target.result,
                                pic_name:name,
                                pic_size:size
                            });
                        }
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
                this.varieties_item = this.$store.getters.get_varieties_item;
                this.edition_item = this.$store.getters.get_edition_item;
                this.impression_item = this.$store.getters.get_impression_item;
                this.copy_item = this.$store.getters.get_copy_item;
                this.upload_one_info = this.$store.getters.get_upload1_info;
                this.summary = this.$store.getters.get_book_summary;

                for (var i = 0; i < this.varieties_item.varieties_responsibility.length; i++) {
                    this.responsibility_info.push({
                        order:i,
                        location_id:this.varieties_item.varieties_responsibility[i].location_id,
                        name_id:this.varieties_item.varieties_responsibility[i].person_id,
                        begin_time_id:this.varieties_item.varieties_responsibility[i].begin_time_id,
                        end_time_id:this.varieties_item.varieties_responsibility[i].end_time_id,
                        action:this.varieties_item.varieties_responsibility[i].action,
                        explain:this.varieties_item.varieties_responsibility[i].explain,
                        confirm:this.varieties_item.varieties_responsibility[i].confirm,
                        type:this.varieties_item.varieties_responsibility[i].type,
                        level:1
                    })
                }

                for (var j = 0; j < this.edition_item.edition_responsibility.length; j++) {
                    this.responsibility_info.push({
                        order:j,
                        location_id:this.edition_item.edition_responsibility[j].location_id,
                        name_id:this.edition_item.edition_responsibility[j].person_id,
                        begin_time_id:this.edition_item.edition_responsibility[j].begin_time_id,
                        end_time_id:this.edition_item.edition_responsibility[j].end_time_id,
                        action:this.edition_item.edition_responsibility[j].action,
                        explain:this.edition_item.edition_responsibility[j].explain,
                        confirm:this.edition_item.edition_responsibility[j].confirm,
                        type:this.edition_item.edition_responsibility[j].type,
                        level:2
                    })
                }

                for (var k = 0; k < this.impression_item.impression_responsibility.length; k++) {
                    this.responsibility_info.push({
                        order:k,
                        location_id:this.impression_item.impression_responsibility[k].location_id,
                        name_id:this.impression_item.impression_responsibility[k].person_id,
                        begin_time_id:this.impression_item.impression_responsibility[k].begin_time_id,
                        end_time_id:this.impression_item.impression_responsibility[k].end_time_id,
                        action:this.impression_item.impression_responsibility[k].action,
                        explain:this.impression_item.impression_responsibility[k].explain,
                        confirm:this.impression_item.impression_responsibility[k].confirm,
                        type:this.impression_item.impression_responsibility[k].type,
                        level:3
                    })
                }

                for (var m = 0; m < this.copy_item.copy_responsibility.length; m++) {
                    this.responsibility_info.push({
                        order:m,
                        location_id:this.copy_item.copy_responsibility[m].location_id,
                        name_id:this.copy_item.copy_responsibility[m].person_id,
                        begin_time_id:this.copy_item.copy_responsibility[m].begin_time_id,
                        end_time_id:this.copy_item.copy_responsibility[m].end_time_id,
                        action:this.copy_item.copy_responsibility[m].action,
                        explain:this.copy_item.copy_responsibility[m].explain,
                        confirm:this.copy_item.copy_responsibility[m].confirm,
                        type:this.copy_item.copy_responsibility[m].type,
                        level:4
                    })
                }

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
                this.add_book_obj.version_volume = parseInt(this.edition_item.version_volume_str);
                this.add_book_obj.version_type = this.edition_item.version_type;
                this.add_book_obj.version_age = this.edition_item.version_age;
                this.add_book_obj.version_support = this.edition_item.version_support;
                this.add_book_obj.version_binding = this.edition_item.version_binding;
                this.add_book_obj.version_frame_length = parseInt(this.edition_item.version_frame_length_str);
                this.add_book_obj.version_frame_width = parseInt(this.edition_item.version_frame_width_str);
                this.add_book_obj.version_format_length = parseInt(this.edition_item.version_format_length_str);
                this.add_book_obj.version_format_width = parseInt(this.edition_item.version_format_width_str);
                this.add_book_obj.version_paiji_content = this.edition_item.version_paiji_content;
                this.add_book_obj.version_paiji_location = this.edition_item.version_paiji_location;
                this.add_book_obj.version_half_page_line_number = parseInt(this.edition_item.version_half_page_line_number_str);
                this.add_book_obj.version_page_line_number = parseInt(this.edition_item.version_page_line_number_str);
                this.add_book_obj.version_yuwei = this.edition_item.version_yuwei;
                this.add_book_obj.version_double_page_number = parseInt(this.edition_item.version_double_page_number_str);
                this.add_book_obj.version_bianlan = this.edition_item.version_bianlan;
                this.add_book_obj.version_fenlan = this.edition_item.version_fenlan;
                this.add_book_obj.version_shukou = this.edition_item.version_shukou;
                this.add_book_obj.version_banxin_content = this.edition_item.version_banxin_content;
                this.add_book_obj.version_youshuwuer = this.edition_item.version_youshuwuer;
                this.add_book_obj.version_youwujiazhu = this.edition_item.version_youwujiazhu;
                this.add_book_obj.printing_type = this.impression_item.printing_type;
                this.add_book_obj.printing_number = this.impression_item.printing_number;
                this.add_book_obj.duplicate_book_count = parseInt(this.copy_item.duplicate_book_count_str);
                this.add_book_obj.duplicate_level = this.copy_item.duplicate_level;
                this.add_book_obj.duplicate_complete = this.copy_item.duplicate_complete;
                this.add_book_obj.duplicate_attachment = this.copy_item.duplicate_attachment;
                this.add_book_obj.name = this.upload_one_info.name;
                this.add_book_obj.standard_name = this.upload_one_info.standard_name;
                this.add_book_obj.pri = this.upload_one_info.pri;
                this.add_book_obj.summary = this.summary;
                this.add_book_obj.responsibility_info = this.responsibility_info;
                this.before_http(this.add_book_obj);
                this.http_json('/ancient_books/create_ancient_book_with_new_literature.action' , 'post' , this.add_book_obj , this.success_post_add , this.fail_post_add);
            },

            success_post_add(response) {
                var vm = this;
                if (response.body.result === 1) {
                    console.log("success add!");

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

                            //验证是否有无token
                            upload_picture_obj.token = this.$store.getters.GetToken;
                            this.before_http(upload_picture_obj);
                            upload_picture_obj.token =this.$store.getters.GetToken;
                            this.$http.post('/ancient_books/upload_page.action' , upload_picture_obj ,
                                    {emulateJSON: true}
                            ).then(function (response) {
                                this.response_post(response,this.success_post_picture,this.fail_post_picture);
                            },function () {
                                this.error();
                            })
                        }
                    }
                }
                else if (response.body.result === 0) {
                    console.log("fail add");
                    this.responsibility_info = [];
                }
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
                store.commit("change_token",response.body.token);
            },

            error () {

            },

            fail_post_add() {
                console.log("fail add!");
                this.responsibility_info = [];
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
        background-image: url("../../../../assets/img/button/create-next-step.png");
    }

    .ry-btn-last-step3{
        color: white;
        width: 127px;
        height: 54px;
        background-image: url("../../../../assets/img/button/create-next-step.png");
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
        overflow-y: auto;
        overflow-x: hidden;
    }

    .ry-add{
        position: relative;
        display: inline-block;
        width: 120px;
        height: 160px;
        background-image: url("../../../../assets/img/picture-button/upload3_add.png");
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
        background-image: url("../../../../assets/img/no-use-picture/modal-header.png");
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
        background-image: url("../../../../assets/img/button/change-file.png");
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
        background-image: url("../../../../assets/img/button/change-file.png");
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

    .ry-del-pic{
        position: absolute;
        margin-left: 105px;
    }

</style>