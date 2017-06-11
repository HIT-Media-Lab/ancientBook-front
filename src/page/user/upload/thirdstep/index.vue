<template>

    <div class="ry-upload-three">

        <!--模块名称-->
        <div class="width950 center">
            <h3 style="display:inline-block">3編輯</h3>
            <button class="float-right ry-btn-cancel-upload">取消上傳</button>
        </div>

        <div class="width1000 center">
            <img src="../../../../assets/img/本体标记/墨水线上.png" height="7" width="974"/>
        </div>

        <upload_edit class="width800 center"></upload_edit>

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
            <button class="ry-btn-submit float-right">發佈</button>
            <button class="ry-btn-last-step3 float-right" @click="last_page()">上一步</button>
        </div>

    </div>

</template>

<script>
    import upload_edit from './upload-edit.vue';
    export default{
        components:{
            upload_edit,
        },

        data() {
            return{
                varieties_item : {},
                edition_item : {},
                impression_item : {},
                copy_item : {},
                upload_one_info : {},
                summary : {},
                upload_file : {},
                responsibility_info :[],
                add_book_obj : {},
            }
        },

        created : function () {

        },

        methods : {
            last_page() {
                this.$router.push({path: '/user/upload2'});
            },

            complete_upload() {
                this.varieties_item = this.$store.getters.get_varieties_item;
                this.edition_item = this.$store.getters.get_edition_item;
                this.impression_item = this.$store.getters.get_impression_item;
                this.copy_item = this.$store.getters.get_copy_item;
                this.upload_one_info = this.$store.getters.get_upload1_info;
                this.summary = this.$store.getters.get_book_summary;
                this.upload_file = this.$store.getters.get_upload_file;

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
</style>