<template>
    <div class="j-book-navbar">
        <select class="j-book-select" v-model="select_1" id="bu" @change="go_item_2()">
            <option selected v-bind:value="{id: 'bu',name: ''}">部</option>
            <option v-for="item in item_1" class="j-option" v-bind:value="{id: item.item_1_id, name: item.chinese_name}">
                {{item.chinese_name}}
            </option>
        </select>
        <select class="j-book-select" v-model="select_2" id="lei" @change="go_item_3()">
            <option selected v-bind:value="{id: 'lei', name: ''}">类</option>
            <option v-for="item in item_2" class="j-option" v-bind:value="{id: item.item_2_id, name: item.chinese_name}">
                {{item.chinese_name}}
            </option>
        </select>
        <select class="j-book-select" v-model="select_3" id="shu" @change="go_to_sortbook()">
            <option selected v-bind:value="{id: 'shu', name: ''}">属</option>
            <option v-for="item in item_3" class="j-option" v-bind:value="{id: item.item_3_id, name: item.chinese_name}">
                {{item.chinese_name}}
            </option>
        </select>
        <!--<button @click="go_to_sortbook()">sdfsdf</button>-->
    </div>
</template>
<script>
    export default{
        data(){
            return{
                select_1:{
                    id: 'bu',
                    name: ''
                },
                select_2:{
                    id: 'lei',
                    name: ''
                },
                select_3:{
                    id: 'shu',
                    name: ''
                },
                model_id: 8,
                item: {
                    'bu': 0,
                    'lei': 0,
                    'shu': 0
                },
                item_name: {
                    'bu': '',
                    'lei': '',
                    'shu': ''
                },
                get_item_url: '/ancient_books/get_menu_items.action',
                item_1: [],
                item_2: [],
                item_3: [],
                item_1_id: 0,
                item_2_id: 0,
                item_3_id: 0
            }
        },
        created(){
            this.id = this.get_item_url + '?model_id=' + 8 + '&&item_1_id=' + 0 + '&&item_2_id=' + 0;
            this.http_json(this.id,'get',{}, this.success1, this.fail1);
            this.id = this.get_item_url + '?model_id=' + 8 + '&&item_1_id=' + 1 + '&&item_2_id=' + 0;
            this.http_json(this.id,'get',{}, this.success2, this.fail2);
            this.id = this.get_item_url + '?model_id=' + 8 + '&&item_1_id=' + 1 + '&&item_2_id=' + 1;
            this.http_json(this.id,'get',{}, this.success3, this.fail3);
        },
        methods:{
            success1(response){
                 this.item_1 = response.body
            },
            fail1(){
                console.log("获取部失败");
            },
            go_item_2(){
                this.item_1_id = this.select_1.id;
                this.item_name.bu = this.select_1.name;
                this.id = this.get_item_url + '?model_id=' + 8 + '&&item_1_id=' + this.item_1_id + '&&item_2_id=' + 0;
                this.http_json(this.id,'get',this.id,this.success2, this.fail2);
                this.id = this.get_item_url + '?model_id=' + 8 + '&&item_1_id=' + this.item_1_id + '&&item_2_id=' + 1;
                this.http_json(this.id,'get',{}, this.success3, this.fail3);
                this.item.bu = this.item_1_id;
                this.select_2 = {id: 'lei', name: ''};
                console.log(this.select_1);
            },
            success2(response){
                this.item_2 = response.body;

            },
            fail2(){
                console.log("获取类失败");
            },
            go_item_3(){
                this.item_2_id = this.select_2.id;
                this.item_name.lei = this.select_2.name;
                this.id = this.get_item_url + '?model_id=' + 8 + '&&item_1_id=' + this.item_1_id + '&&item_2_id=' + this.item_2_id;
                this.http_json(this.id,'get',this.id,this.success3, this.fail3);
                this.item.lei = this.item_2_id;
                this.select_3 = {id: 'shu', name: ''};
                console.log(this.select_2);
            },
            success3(response){
                this.item_3 = response.body;

            },
            fail3(){
                console.log("获取属失败");
            },
            go_to_sortbook(){
                this.item_3_id = this.select_3.id;
                this.item.shu = this.item_3_id;
                this.item_name.shu = this.select_3.name;
                console.log(this.item.bu);
                console.log(this.item.lei);
                console.log(this.item.shu);
                this.$route.params.bu = this.item_name.bu;
                this.$route.params.lei = this.item_name.lei;
                this.$route.params.shu = this.item_name.shu;
                this.$route.params.bu_id = this.item.bu;
                this.$route.params.lei_id = this.item.lei;
                this.$route.params.shu_id = this.item.shu;
                this.$route.params.pageId = 1;
                if (this.item.bu != 0 && this.item.lei != 0){
                    this.select_1 = {id: 'bu', name: ''};
                    this.select_2 = {id: 'lei', name: ''};
                    this.select_3 = {id: 'shu', name: ''};
                    this.$router.push({name: 'sort_book', params: this.$route.params});
                }
            }
        }
    }
</script>

<style>
    .j-book-navbar{
        background-image: url("../assets/img/no-use-picture/navigation-bar.png");
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
        background-color: #a50000;
        border: transparent;
    }
    .j-option :hover{
        background-color: grey;
    }
</style>
