<template>
    <div class="j-book-navbar">
        <select class="j-book-select">
            <option class="j-option">
                经部
            </option>
        </select>
        <select class="j-book-select">
            <option class="j-option">
                总类
            </option>
        </select>
        <select class="j-book-select" @change="go_to_sortbook()">
            <option class="j-option">
                石经之属
            </option>
            <option class="j-option">
                正文之属
            </option>
            <option class="j-option">
                古注之属
            </option>
            <option class="j-option">
                注疏之属
            </option>
            <option class="j-option">
                传说之属
            </option>
        </select>
    </div>
</template>
<script>
    export default{
        data(){
            return{
                model_id: 8,
                item_1: [],
                item_2: [],
                item_3: [],
                item_1_id: 0,
                item_2_id: 0,
                item_3_id: 0,
                id:{}
            }
        },
        created(){
            this.id={
                'model': 8,
                'item_1_id': 0,
                'item_2_id': 0,
                'item_3_id': 0,
            };
          this.http_json('/ancient_books/get_menu_item.action','get',this.id,this.success1, this.fail1)
        },
        methods:{
            success1(response){
                for (let i = 0; i<response.body.length; i++){
                    this.item_1[i] = response.body[i].chinese_name;
                }
            },
            fail1(){
                console.log("获取部类属失败");
            },
            go_item_2(num){
                this.item_1_id = num;
            },
            go_to_sortbook(){
                this.$router.push({path: "/bookstore/sort_book"});
            }
        }
    }
</script>

<style>
    .j-book-navbar{
        background-image: url("../assets/img/navigation-bar.png");
        margin-top: 35px;
        background-repeat:no-repeat;
        background-position:center;
        width:1038px;
        height:68px;
    }
    .j-book-select{
        margin:21px 90px 40px;
        font-size: 20px;
        color: gainsboro;
        display: inline-block;
        background-color: transparent;
        border: none;

    }
    .j-option{
        background-color: black;
        border: none;
    }
</style>


<!--<div class="j-book-navbar">-->
    <!--<select class="j-book-select">-->
        <!--<option v-for="(item,index) in item_1" @click="go_item_2(index)">-->
            <!--{{item}}-->
        <!--</option>-->
    <!--</select>-->
    <!--<select class="j-book-select">-->
        <!--<option v-for="(item,index) in sort">-->

        <!--</option>-->
    <!--</select>-->
    <!--<select class="j-book-select">-->
        <!--<option v-for="(item,index) in kind">-->

        <!--</option>-->
    <!--</select>-->

<!--</div>-->