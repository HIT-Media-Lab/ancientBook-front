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
                <p id="v-standard-name">[品种层]{{varieties_item.varieties_responsibility[0].end_time}} + {{varieties_item.varieties_responsibility[0].person}} + {{varieties_item.varieties_responsibility[0].action_value}}</p>
                <p id="e-standard-name">[版本层]{{edition_item.edition_responsibility[0].end_time}} + {{edition_item.edition_responsibility[0].person}} + {{edition_item.edition_responsibility[0].action_value}}</p>
                <p id="i-standard-name">[印次层]{{impression_item.impression_responsibility[0].end_time}} + {{impression_item.impression_responsibility[0].person}} + {{impression_item.impression_responsibility[0].action_value}}</p>
                <p id="c-standard-name">[复本层]{{copy_item.copy_responsibility[0].end_time}} + {{copy_item.copy_responsibility[0].person}} + {{copy_item.copy_responsibility[0].action_value}}</p>
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
                <label class="float-right"><input id="ry-one-pri" type="checkbox" name="private" class="ry-check-pri">私密上传</label>
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
            this.varieties_item.literature_standard_name = document.getElementById("v-standard-name").innerText;
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

