<template>

    <div>
        <!--模块名称-->
        <div class="width800 center">
            <h2 style="display:inline-block">1輸入古籍信息</h2>
            <button class="float-right">取消上傳</button>
            <button class="float-right">調用其他信息</button>
        </div>

        <div class="width800 center">
            <h3 style="display:inline-block" class="float-left">古籍規範名稱：</h3>
            <h4 id="bookName" style="display:inline-block" class="float-left">{{ bookname }}</h4>
            <div style="display:inline-block">
                <p>[品種層]責任結束時間-朝代 + 責任者 + 責任行為</p>
                <p>[版本層]責任結束時間-朝代 + 責任者 + 責任行為</p>
                <p>[印次層]責任結束時間-朝代 + 責任者 + 責任行為</p>
                <p>[複本層]責任結束時間-朝代 + 責任者 + 責任行為</p>
            </div>
        </div>

        <div class="width800 center">
            <menuBar></menuBar>
            <div id="layer-body">
                <router-view></router-view>
            </div>
        </div>

        <div class="width800 center">
            <synopsis></synopsis>
        </div>

        <div class="width600 center">
            <button class="float-right" @click="next_page">下一步</button>
            <label class="float-right"><input type="checkbox" name="private">私密上傳</label>
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
                bookname : 'hello',
                get_menu_items : {},
                menuIndex : 4,
                menuItems : [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
            }
        },

        created : function () {
            this.get_menuItems()
        },

        mounted : function () {

        },

        methods : {

            /**
             * 获得下拉菜单内容
             */
            get_menuItems() {
                for (i = 4; i <= 23; i++) {
                    this.get_menu_items.model_id = i;
                    this.get_menu_items.item_1_id = 0;
                    this.get_menu_items.item_2_id = 0;
                    this.HttpJson ('/ancient_books/get_menu_items.action' , 'get' , this.get_menu_items , this.success_get_menuItems(response,i-4) , this.fail_get_menuItems);
                }
            },

            success_get_menuItems(response,k) {
                console.log ("success get menu items ");
                //将后端数据显示在前端页面里
                if (response.body.length === 0) {
                    console.log ("没有返回数组！");
                }
                else {
                    for (j = 0; j <= response.body.length-1; j++) {
                        this.menuItems[k].push({
                            chinese_name: response.body[j].chinese_name
                        });
                    }
                }
            },

            fail_get_menuItems() {
                console.log ("fail get menu items!");
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

    .float-right{
        float: right;
    }
    .float-left{
        float: left;
    }

    .center{
        margin: 0 auto;
    }
</style>