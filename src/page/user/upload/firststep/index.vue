<template>

    <div class="ry-upload">
        <!--模块名称-->
        <div class="width950 center">
            <h3 style="display:inline-block">1输入古籍名称</h3>
            <button class="float-right ry-btn-cancel-upload" @click="cancel_upload">取消上传</button>
            <button class="float-right ry-btn-use-other">调用其他信息</button>
        </div>

        <div class="width1000 center">
            <img src="../../../../assets/img/no-use-picture/ink-line-long.png" height="7" width="974"/>
        </div>

        <div class="width950 center">
            <h3 style="display:inline-block" class="float-left">古籍规范名称：</h3>
            <h4 id="bookName" style="display:inline-block" class="float-left ry-book-name">{{ varieties_item.type_name }}</h4>
            <div class="ry-4layers" style="display:inline-block">
                <p id="v-standard-name"><span v-show="v_standard_name">([</span>{{varieties_item.varieties_responsibility[0].end_time}}<span v-show="v_standard_name">]</span>{{varieties_item.varieties_responsibility[0].person}}{{varieties_item.varieties_responsibility[0].action_value}}<span v-show="v_standard_name">)</span></p>
                <p id="e-standard-name"><span v-show="e_standard_name">([</span>{{edition_item.edition_responsibility[0].end_time}}<span v-show="e_standard_name">]</span>{{edition_item.edition_responsibility[0].person}}{{edition_item.edition_responsibility[0].action_value}}<span v-show="e_standard_name">)</span></p>
                <p id="i-standard-name"><span v-show="i_standard_name">([</span>{{impression_item.impression_responsibility[0].end_time}}<span v-show="i_standard_name">]</span>{{impression_item.impression_responsibility[0].person}}{{impression_item.impression_responsibility[0].action_value}}<span v-show="i_standard_name">)</span></p>
                <p id="c-standard-name"><span v-show="c_standard_name">([</span>{{copy_item.copy_responsibility[0].end_time}}<span v-show="c_standard_name">]</span>{{copy_item.copy_responsibility[0].person}}{{copy_item.copy_responsibility[0].action_value}}<span v-show="c_standard_name">)</span></p>
            </div>
        </div>

        <div class="width950 center">
            <menuBar class="ry-border-top"></menuBar>
            <div class="ry-border-center">
                <div id="layer-body" class="ry-form-body">
                    <router-view></router-view>
                </div>
                <synopsis class="ry-form-body"></synopsis>
                <div class="ry-form-body">
                    <label class="ry-pri-label"><input id="ry-one-pri" type="checkbox" name="private" class="ry-check-pri">私密上传</label>
                    <button class="ry-btn-next-step" @click="next_page">下一步</button>
                </div>
            </div>
            <div class="ry-border-bottom"></div>
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
                v_standard_name : false,
                e_standard_name : false,
                i_standard_name : false,
                c_standard_name : false,
            }
        },

        created : function () {
            this.varieties_item = this.$store.getters.get_varieties_item;
            this.edition_item = this.$store.getters.get_edition_item;
            this.impression_item = this.$store.getters.get_impression_item;
            this.copy_item = this.$store.getters.get_copy_item;
        },

        mounted : function () {
            this.standard_name()
        },

        beforeRouteLeave (to, from, next) {
            this.varieties_item.literature_standard_name = this.varieties_item.type_name + document.getElementById("v-standard-name").innerText;
            this.get_upload_one_info();
            this.$store.commit("get_varieties_contents",this.varieties_item);
            this.$store.commit("get_upload1_info",this.upload_one_info);
            next();
        },

        watch:{
            $route(){

            }
        },

        methods : {
            standard_name(){
                if (this.varieties_item.varieties_responsibility[0].end_time != ''){
                    this.v_standard_name = true;
                }
                if (this.edition_item.edition_responsibility[0].end_time != ''){
                    this.e_standard_name = true;
                }
                if (this.impression_item.impression_responsibility[0].end_time != ''){
                    this.i_standard_name = true;
                }
                if (this.copy_item.copy_responsibility[0].end_time != ''){
                    this.c_standard_name = true;
                }
            },


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
                var d = document.getElementById("c-standard-name").innerText;
                this.upload_one_info.standard_name = this.varieties_item.type_name + a + b + c + d;
            },

            next_page() {
                if (this.varieties_item.type_name == '') {
                    alert("请填写书名");
                }
                else if (this.varieties_item.varieties_responsibility[0].begin_time == '') {
                    alert("请填写品种层责任开始时间");
                }
                else if (this.varieties_item.varieties_responsibility[0].end_time == '') {
                    alert("请填写品种层责任结束时间");
                }
                else if (this.varieties_item.varieties_responsibility[0].person == '') {
                    alert("请填写品种层责任者名称");
                }
                else if (this.edition_item.edition_responsibility[0].begin_time == '') {
                    alert("请填写版本层责任开始时间");
                }
                else if (this.edition_item.edition_responsibility[0].end_time == '') {
                    alert("请填写版本层责任结束时间");
                }
                else if (this.edition_item.edition_responsibility[0].person == '') {
                    alert("请填写版本层责任者名称");
                }
                else if (this.impression_item.impression_responsibility[0].begin_time == '') {
                    alert("请填写印次层责任开始时间");
                }
                else if (this.impression_item.impression_responsibility[0].end_time == '') {
                    alert("请填写印次层责任结束时间");
                }
                else if (this.impression_item.impression_responsibility[0].person == '') {
                    alert("请填写印次层责任者名称");
                }
                else if (this.copy_item.copy_responsibility[0].begin_time == '') {
                    alert("请填写复本层责任开始时间");
                }
                else if (this.copy_item.copy_responsibility[0].end_time == '') {
                    alert("请填写复本层责任结束时间");
                }
                else if (this.copy_item.copy_responsibility[0].person == '') {
                    alert("请填写复本层责任者名称");
                }
                else{
                    this.get_upload_one_info();
                    let url = '/ancient_books/check_if_ancient_book_already_exist.action?name=' + this.upload_one_info.standard_name;
                    var check_obj = '';
                    this.http_json (url , 'get' , check_obj , this.success_check , this.fail_check);
                }
            },

            success_check(response) {
                if (response.body.length === 0) {
                    console.log ("没有返回判断值！");
                }
                else{
                    if (response.body.result === 1) {
                        alert("古籍规范名称重复")
                    }
                    else{
                        this.$router.push({path: '/user/upload2'});
                    }
                }
            },

            fail_check() {
                console.log("error!")
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

    .ry-4layers{
        margin: 25px 50px;
    }

    .ry-book-name{
        margin-top: 25px;
        margin-left: 50px;
    }

    .ry-form-body{
        margin: 50px;
    }

    .form-center input{
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
        background-image: url("../../../../assets/img/picture-button/pinjixinxi.png");
    }

    .ry-check-pri{
        background-color: transparent;
        width: 18px;
        height: 19px;
        background-image: url("../../../../assets/img/modal-box/secret-upload-box.png");
    }

    .ry-pri-label{
        margin-left: 600px;
    }

    .ry-btn-next-step{
        color: white;
        width: 127px;
        height: 54px;
        background-image: url("../../../../assets/img/button/create-next-step.png");
    }

    .ry-border-top{
        padding-left:75px;
        width:960px;
        background-image: url("../../../../assets/img/modal-box/lit_top1.png");
        background-position: top;
        background-repeat: no-repeat;
        background-size: 100%;
        height: 100px;
    }

    .ry-border-center{
        margin-top: -52px;
        padding-bottom: 10px;
        margin-left: 2px;
        height: auto;
        background-image: url("../../../../assets/img/modal-box/lit_centre.png");
        width:953px;
        background-position: center;
        background-repeat: repeat-y;
        background-size: 100%;
    }

    .ry-border-bottom{
        background-image: url("../../../../assets/img/modal-box/lit_bottom.png");
        margin-left: 1px;
        width:955px;
        height:30px;
        background-position: bottom;
        background-size: 100%;
    }
</style>