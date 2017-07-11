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
            <div class="ry-picture-box" v-for="image in images">
                <img :src="image" class="ry-picture-view" />
                <p class="picture-names" style="text-align: center"></p>
            </div>
            <div class="ry-picture-box">
                <a href="javascript:;" class="ry-add">
                    <input id="add" type="file" @change="onFileChange" multiple name="picture">
                </a>
            </div>
        </div>

        <!--底按鈕欄-->
        <div class="width1000 center">
            <div class="ry-bottom-bar">
                <button class="float-right ry-btn-next-page">下一卷</button>
                <button class="float-right ry-btn-go">GO</button>
                <div class="float-right ry-page">
                    <input class="ry-input-page">
                    <span>/</span>
                    <span>80</span>
                </div>
                <button class="float-right ry-btn-last-page">上一卷</button>
                <button class="ry-btn-last-page">上一冊</button>
                <div style="display: inline-block" class="ry-page">
                    <input class="ry-input-page">
                    <span>/</span>
                    <span>80</span>
                </div>
                <button class="ry-btn-go">GO</button>
                <button class="ry-btn-next-page">下一冊</button>
            </div>
        </div>

        <div class="width1000 center">
            <button class="ry-btn-submit float-right" @click="complete_upload1()">發佈</button>
            <button class="ry-btn-last-step3 float-right" @click="last_page()">上一步</button>
        </div>

    </div>

</template>

<script>
    export default{
        data() {
            return{
                varieties_item : {},
                edition_item : {},
                impression_item : {},
                copy_item : {},
                upload_one_info : {},
                summary : {},
                images : [],
                picture_name : [],
                texts : [],
                upload_file : {},
                responsibility_info :[],
                add_book_obj : {},
            }
        },

        created : function () {
            this.upload_file = this.$store.getters.get_upload_file;
            this.images = this.$store.getters.get_images;
            this.texts = this.$store.getters.get_texts;
            this.picture_name = this.$store.getters.get_picture_name;
        },

        mounted : function () {
            this.view_names();
        },

        beforeRouteLeave(to, from, next) {
            this.$store.commit("get_images",this.images);
            this.$store.commit("get_texts",this.texts);
            this.$store.commit("get_picture_name",this.picture_name);
            next();
        },

        methods : {
            /**
             * 添加上传图片
             */
            onFileChange(e) {
                var files = e.target.files || e.dataTransfer.files;
                if (!files.length)return;
                this.createImage(files);
                var obj = document.getElementById("add");
                for(var i = 0; i < obj.files.length; i++) {
                    var temp = obj.files[i].name;
                    this.picture_name.push(temp);
                }
                this.view_names();
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


            /**
             * 渲染图片文件名称
             */
            view_names() {
                var ps = document.getElementsByClassName("picture-names");
                for(var i = 0; i < ps.length; i++) {
                    ps[i].innerText = this.picture_name[i]
                }
            },


            /**
             * 拖动图片
             */
            drag_image() {
                var images = document.getElementsByClassName("ry-picture-view");
                var sel = window.getSelection();
                var begin = sel.anchorNode.parentNode.id;
                this.begin_add_comment = parseInt(begin);
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

            complete_upload1() {
                this.$router.push({path:'/bookstore/book_info'});
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
                if (response.body.result === 1) {
                    console.log ("success add!");
                    window.location.reload();   //  重新加载
                }
                else if (response.body.result === 0) {
                    console.log ("fail add");
                }
            },

            fail_post_add() {
                console.log("fail add!");
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
        background-image: url("../../../../assets/img/上传2/下一步.png");
    }

    .ry-btn-last-step3{
        color: white;
        width: 127px;
        height: 54px;
        background-image: url("../../../../assets/img/上传2/下一步.png");
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
</style>