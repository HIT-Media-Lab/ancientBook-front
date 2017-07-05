<template>

    <div>

        <!--模块名称-->
        <div class="width950 center">
            <h3 style="display:inline-block">2上傳圖文</h3>
            <button class="float-right ry-btn-cancel-upload" @click="cancel_upload">取消上傳</button>
        </div>

        <div class="width1000 center">
            <img src="../../../../assets/img/本体标记/墨水线上.png" height="7" width="974"/>
            <button class="ry-btn-add-book float-right" @click="add_new_book()">添加新冊</button>
        </div>

        <ul class="width600 center">
            <upload></upload>
            <li v-for="item in upload_box">
                <upload></upload>
                <button type="button" class="ry-btn-add-book" @click="remove(item)">刪除本冊</button>
            </li>
        </ul>

        <div class="width600 center">
            <p>请严格遵守命名规范上传文件，并保证对应图文文件的名称一致（可以仅上传图片文件）</p>
            <p>命名规范：“卷-页”，如“卷1-1.jpg”，“卷1-1.txt”</p>
            <p>若分AB页：“卷-页-A/B”，如“卷1-1-A.jpg”，“卷1-1-B.jpg”，“卷1-1-A.txt”，“卷1-1-B.txt”</p>
        </div>

        <div class="width600 center">
            <button class="ry-btn-upload2-next float-right" @click="next_page()">下一步</button>
            <button class="ry-btn-upload2-last float-right" @click="last_page()">上一步</button>
        </div>

    </div>

</template>

<script>
    import upload from './upload.vue';
    export default{
        components:{
            upload,
        },

        data() {
            return{
                upload2 : {
                    book_name : '',
                    book_num : '',
                    images : {},
                    texts : {},
                },
                upload_box : [],
            }
        },

        methods : {
            next_page() {
                this.$router.push({path: '/user/upload3'});
            },
            last_page() {
                this.$router.push({path: '/user/upload1'});
            },

            cancel_upload() {
                this.$router.push({path: '/user'});
            },

            add_new_book() {
                this.upload_box.push({
                    value: null
                })
            },

            remove(item) {
                var i = this.upload_box.indexOf(item)
                this.upload_box.splice(i, 1)
            }
        }
    }
</script>

<style>

</style>