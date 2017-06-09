<template>

    <div>
        <div id="upload2-box">
            <div>
                <span>
                    <span>冊號:</span>
                    <input class="ry-input-upload2" v-model="upload2.book_num">
                    <button class="ry-btn-add-book" @click="add_new_book()">添加新冊</button>
                </span>
                <br>
                <span>
                    <span>冊名:</span>
                    <input class="ry-input-upload2" v-model="upload2.book_name">
                </span>

                <div class="width800">
                    <a href="javascript:;" class="ry-file-picture">上傳圖片
                        <input type="file" @change="onFileChange" name="picture">
                    </a>
                    <a href="javascript:;" class="ry-file-text">上傳文本
                        <input type="file" @change="onTextChange" name="text">
                    </a>
                </div>
            </div>
        </div>

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
    export default{
        watch:{
            $route(){
                this.$store.commit("get_upload_file",this.upload2);
            }
        },

        data() {
            return{
                upload2 : {
                    book_name : '',
                    book_num : '',
                    images : {},
                    texts : {},
                },
            }
        },

        methods :{
            add_new_book() {
                var upload_box = document.getElementById("upload2-box");
                var upload_file = upload_box.firstChild;
                upload_box.appendChild(upload_file);
            },

            next_page() {
                this.$router.push({path: '/user/upload3'});
            },
            last_page() {
                this.$router.push({path: '/user/upload1'});
            },

            onFileChange(e) {
                var files = e.target.files || e.dataTransfer.files;
                if (!files.length)return;
                this.createImage(files);
            },
            createImage(file) {
                if(typeof FileReader==='undefined'){
                    alert('您的浏览器不支持图片上传，请升级您的浏览器');
                    return false;
                }
                var vm = this;
                var leng=file.length;
                for(var i=0;i<leng;i++){
                    var reader = new FileReader();
                    reader.readAsDataURL(file[i]);
                    reader.onload =function(e){
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
                if(typeof FileReader==='undefined'){
                    alert('您的浏览器不支持图片上传，请升级您的浏览器');
                    return false;
                }
                var vm = this;
                var leng=file.length;
                for(var i=0;i<leng;i++){
                    var reader = new FileReader();
                    reader.readAsDataURL(file[i]);
                    reader.onload =function(e){
                        vm.texts.push(e.target.result);
                    };
                }
            },
        },
    }
</script>

<style>
    a:hover, a:visited, a:link, a:active{
        color: white;
        text-decoration: none;
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