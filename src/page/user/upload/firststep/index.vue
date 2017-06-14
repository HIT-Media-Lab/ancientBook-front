<template>

    <div class="ry-upload">
        <!--模块名称-->
        <div class="width950 center">
            <h3 style="display:inline-block">1輸入古籍名稱</h3>
            <button class="float-right ry-btn-cancel-upload">取消上傳</button>
            <button class="float-right ry-btn-use-other">調用其他信息</button>
        </div>

        <div class="width1000 center">
            <img src="../../../../assets/img/本体标记/墨水线上.png" height="7" width="974"/>
        </div>

        <div class="width950 center">
            <h3 style="display:inline-block" class="float-left">古籍規範名稱：</h3>
            <h4 id="bookName" style="display:inline-block" class="float-left ry-book-name">{{ varieties_item.type_name }}</h4>
            <div class="ry-4layers" style="display:inline-block">
                <p>[品種層]責任結束時間-朝代 + 責任者 + 責任行為</p>
                <p>[版本層]責任結束時間-朝代 + 責任者 + 責任行為</p>
                <p>[印次層]責任結束時間-朝代 + 責任者 + 責任行為</p>
                <p>[複本層]責任結束時間-朝代 + 責任者 + 責任行為</p>
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
                <label class="float-right"><input type="checkbox" name="private" class="ry-check-pri">私密上傳</label>
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
                i : 0,
                varieties_item : {},
                upload_one_info : {
                    pri : 0,
                    standard_name : '',
                    name : '',
                },
                get_menu_items_obj : {},
                menu_index : 4,
                menu_items : [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
            }
        },

        created : function () {
//            this.get_menu_items();
//            this.put_into_vue();
        },

        mounted : function () {

        },

        watch:{
            $route(){
                this.varieties_item = this.$store.getters.get_varieties_item
            }
        },

        methods : {
            /**
             * 获得下拉菜单内容
             */
            get_menu_items() {
                for (this.i = 4; this.i <= 23; this.i++) {
                    this.get_menu_items_obj.model_id = this.i;
                    this.get_menu_items_obj.item_1_id = 0;
                    this.get_menu_items_obj.item_2_id = 0;
                    this.http_json ('/ancient_books/get_menu_items.action' , 'get' , this.get_menu_items_obj , this.success_get_menu_items(response,this.i-4) , this.fail_get_menu_items);
                }
            },

            success_get_menu_items(response,k) {
                console.log ("success get menu items ");
                //将后端数据显示在前端页面里
                if (response.body.length === 0) {
                    console.log ("没有返回数组！");
                }
                else {
                    for (j = 0; j <= response.body.length-1; j++) {
                        this.menu_items[k].push({
                            chinese_name: response.body[j].chinese_name
                        });
                    }
                }
            },

            fail_get_menu_items() {
                console.log ("fail get menu items!");
            },

            put_into_vue() {
                this.$store.commit("get_menu_contents",this.menu_items);
                this.$store.commit("get_upload1_info",this.upload_one_info);
            },

            next_page() {
                this.$router.push({path: '/user/upload2'});
            },


        }
    }
</script>

<style>
    *{
        margin: 0;
        padding: 0;
    }

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
        background-image: url("../../../../assets/img/上传1/取消上传按钮.png");
    }

    .ry-btn-use-other{
        width: 148px;
        height: 44px;
        color: white;
        background-image: url("../../../../assets/img/上传1/调用其它信息按钮.png");
    }

    .ry-form-upload{
        padding:0 80px;
        width: 968px;
        height: 991px;
        background-image: url("../../../../assets/img/上传1/边框.png");
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
        background-image: url("../../../../assets/img/上传1/书名什么的.png");
    }

    .layer-input label{
        margin-top: 10px;
    }

    .layer-input select{
        width: 225px;
        height: 33px;
        background-image: url("../../../../assets/img/上传1/品级信息.png");
    }

    .ry-btn-add{
        width: 103px;
        height: 44px;
        color: white;
        background-image: url("../../../../assets/img/上传1/添加按钮.png");
    }

    .ry-btn-del{
        width: 103px;
        height: 44px;
        color: white;
        background-image: url("../../../../assets/img/上传1/添加按钮.png");
    }

    .ry-check-pri{
        background-color: transparent;
        width: 18px;
        height: 19px;
        background-image: url("../../../../assets/img/上传1/私密上传复选框.png");
    }

    .ry-btn-next-step{
        color: white;
        margin-left: 50px;
        width: 127px;
        height: 54px;
        background-image: url("../../../../assets/img/上传1/下一步按钮.png");
    }
</style>