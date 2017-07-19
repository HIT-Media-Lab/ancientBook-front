<template>

    <div class="ry-upload">
        <!--模块名称-->
        <div class="width950 center">
            <h3 style="display:inline-block">1輸入古籍名稱</h3>
            <button class="float-right ry-btn-cancel-upload" @click="cancel_upload">取消上傳</button>
            <button class="float-right ry-btn-use-other">調用其他信息</button>
        </div>

        <div class="width1000 center">
            <img src="../../../../assets/img/no-use-picture/ink-line-long.png" height="7" width="974"/>
        </div>

        <div class="width950 center">
            <h3 style="display:inline-block" class="float-left">古籍規範名稱：</h3>
            <h4 id="bookName" style="display:inline-block" class="float-left ry-book-name">{{ varieties_item.type_name }}</h4>
            <div class="ry-4layers" style="display:inline-block">
                <p id="v-standard-name">[品種層]{{ varieties_item.varieties_responsibility[0].end_time }} + {{ varieties_item.varieties_responsibility[0].person }} + {{ varieties_item.varieties_responsibility[0].action_value }}</p>
                <p id="e-standard-name">[版本層]{{ edition_item.edition_responsibility[0].end_time }} + {{ edition_item.edition_responsibility[0].person }} + {{ edition_item.edition_responsibility[0].action_value }}</p>
                <p id="i-standard-name">[印次層]{{ impression_item.impression_responsibility[0].end_time }} + {{ impression_item.impression_responsibility[0].person }} + {{ impression_item.impression_responsibility[0].action_value }}</p>
                <p id="c-standard-name">[複本層]{{ copy_item.copy_responsibility[0].end_time }} + {{ copy_item.copy_responsibility[0].person }} + {{ copy_item.copy_responsibility[0].action_value }}</p>
            </div>
        </div>

        <div class="width800 center ry-form-upload">
            <menuBar></menuBar>
            <div id="layer-body" class="ry-form-body">
                <router-view></router-view>
            </div>
            <synopsis></synopsis>
            <div>
                <button class="float-right ry-btn-next-step" @click="next_page">下一步</button>
                <label class="float-right"><input id="ry-one-pri" type="checkbox" name="private" class="ry-check-pri">私密上傳</label>
            </div>
        </div>

    </div>

</template>

<script>
    import synopsis from './synopsis.vue';
    import copy from './copy.vue';
    import edition from './edition.vue';
    import impression from './impression.vue';
    import varieties from './varieties.vue';
    import menuBar from '../../../../component/menu-bar.vue';
    export default{
        components:{
            synopsis,
            copy,
            edition,
            impression,
            varieties,
            menuBar,
        },

        data() {
            return{
                varieties_item : {},
                edition_item : {},
                impression_item : {},
                copy_item : {},
                upload_one_info : {
                    pri : 0,
                    standard_name : '',
                    name : '',
                },
            }
        },

        created : function () {
            this.varieties_item = this.$store.getters.get_varieties_item;
            this.edition_item = this.$store.getters.get_edition_item;
            this.impression_item = this.$store.getters.get_impression_item;
            this.copy_item = this.$store.getters.get_copy_item;
        },

        mounted : function () {

        },

        beforeRouteLeave (to, from, next) {
            this.get_upload_one_info();
            this.$store.commit("get_upload1_info",this.upload_one_info);
            next();
        },

        watch:{
            $route(){

            }
        },

        methods : {
            get_upload_one_info() {
                var pri_check = document.getElementById("ry-one-pri");
                if (pri_check.checked ==true) {
                    this.upload_one_info.pri = 1;
                }
                else {
                    this.upload_one_info.pri = 0;
                }
                this.upload_one_info.name = this.varieties_item.type_name;
                var a = document.getElementById("v-standard-name").innerText;
                var b = document.getElementById("e-standard-name").innerText;
                var c = document.getElementById("i-standard-name").innerText;
                var d = document.getElementsByClassName("c-standard-name").innerText;
                this.upload_one_info.standard_name = a + b + c + d;
            },

            next_page() {
                this.$router.push({path: '/user/upload2'});
            },

            cancel_upload() {
                this.$router.push({path: '/user'});
            }
        }
    }
</script>

<style>
    .ry-upload input{
        border: none;
        background-color: transparent;
        padding-left: 4px;
    }

    .ry-upload button{
        background-color: transparent;
        border: none;
    }

    .ry-upload select{
        margin: 5px 0px;
        -webkit-appearance: none;
        -moz-appearance: none;
        appearance: none;
        padding-left: 10px;
        border: none;
        background-color: transparent;
    }

    /*红色星号*/
    .star{
        color: red;
    }

    .width600{
        width: 600px;
    }
    .width800{
        width: 800px;
    }
    .width950{
        width: 950px;
    }

    .float-right{
        float: right;
    }
    .float-left{
        float: left;
    }

    .center{
        margin: 0 auto;
    }

    .ry-btn-cancel-upload{
        width: 148px;
        height: 44px;
        color: white;
        background-image: url("../../../../assets/img/button/build-button.png");
    }

    .ry-btn-use-other{
        width: 148px;
        height: 44px;
        color: white;
        background-image: url("../../../../assets/img/button/build-button.png");
    }

    .ry-form-upload{
        padding:0 80px;
        width: 968px;
        height: 991px;
        background-image: url("../../../../assets/img/modal-box/box.png");
    }

    .ry-4layers{
        margin: 25px 50px;
    }

    .ry-book-name{
        margin-top: 25px;
        margin-left: 50px;
    }

    .ry-form-body{
        margin-top: 50px;
    }

    .layer-input input{
        margin: 5px 0px;
        width: 225px;
        height: 33px;
        background-image: url("../../../../assets/img/modal-box/book-name.png");
    }

    .layer-input label{
        margin-top: 10px;
    }

    .layer-input select{
        width: 225px;
        height: 33px;
        background-image: url("../../../../assets/img/picture-button/pin ji xin xi.png");
    }

    .ry-check-pri{
        background-color: transparent;
        width: 18px;
        height: 19px;
        background-image: url("../../../../assets/img/modal-box/secret-upload-box.png");
    }

    .ry-btn-next-step{
        color: white;
        margin-left: 50px;
        width: 127px;
        height: 54px;
        background-image: url("../../../../assets/img/button/create-next-step.png");
    }
</style>