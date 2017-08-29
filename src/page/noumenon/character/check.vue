
<template>
    <div>
        <noumenon_title :title="this.title"></noumenon_title>
        <div class="zxw-check-noumenon-body">
            <!--左侧滑框-->
            <div class="zxw-scrollbar" id="style-1">
                <div class="zxw-force-overflow">
                    <div v-if="catalogue.length > 0">
                        <div v-for="(item,index) in catalogue" >
                            <button class="zxw-arrow-right" @click="open_ceList(index)" v-if="item.show_ce === false"></button>
                            <button class="zxw-arrow-down"  @click="close_ceList(index)" v-else="item.show_ce === true"></button>
                            <span class="zxw-book-name">{{item.ancient_book_name}}</span>
                            <div class="zxw-ce-list" v-if="item.show_ce === true&& item.book.length > 0" v-for="(value,key) in item.book_name">
                                <button class="zxw-ce-btn"  @click="show_noumenon_location_1(index,key)" v-bind:class="{zxwMarkSelected:key === book_index2&& index === book_index1}">{{value}}</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!--右侧滑框-->
            <div class="zxw-check-right-body">
                <p class="zxw-mark-warning" v-if="catalogue.length === 0">该本体尚无任何标记</p>
                <div class="zxw-check-right-content" v-else>
                    <div class="zxw-check-right-detail">
                        <div v-for="(item,index) in noumenon_location" @mouseover="item.show_btn = true" @mouseout="item.show_btn = false">
                            <button class="zxw-btn" @click="to_ancientBooks(item.volume,item.page_id)">{{item.content}}</button>
                            <button class="zxw-delete-mark-btn" v-show="item.show_btn === true" @click="open_delete_mark(index)">删除</button>
                        </div>
                    </div>
                    <paginator :max="total_page"></paginator>
                </div>
            </div>
        </div>

        <delete_modal :open_modal="this.open_modal" :delete_warning="'确认删除本体标记?'" v-on:close_modal="close_modal" v-on:delete_info="delete_mark"></delete_modal>
    </div>
</template>

<script>
    /*let Mock = require('mockjs');

    Mock.mock('/ancient_books/getNLocationCatalogue.action?id=1&&type=1','get',{
        'n_name':'李世明（1996）',
        'content':[
            {
                "ancient_book_name":"全唐书",
                "id":"123456789",
                "book|1":1,
                "book_name":"册一"
            },
            {
                "ancient_book_name":"全唐书",
                "id":"123456789",
                "book|2":2,
                "book_name":"册二"
            },
            {
                "ancient_book_name":"诗经",
                "id":"123",
                "book|5":5,
                "book_name":"册五"
            },
            {
                "ancient_book_name":"诗经",
                "id":"123",
                "book|6":6,
                "book_name":"册六"
            },
            {
                "ancient_book_name":"春秋",
                "id":"456",
                "book|7":1,
                "book_name":"册七"
            },
            {
                "ancient_book_name":"新唐书",
                "id":"789",
                "book|41":41,
                "book_name":"册四十一"
            }
        ]
    });


    Mock.mock('/ancient_books/getNLocations.action?type=1&&id=1&&book=2&&ancient_book_id=123456789&&page=1','get',{
        'total_page|5':5,
        'content|20':[{
            'id|987654321':1,
            'page_id|1':1,
            'content':'整句话的内容剑荡四方该动画你还能如果还好',
            'target':'内容',
            'volume|3':3
        }]
    });

    Mock.mock('/ancient_books/getNLocations.action?type=1&&id=1&&book=2&&ancient_book_id=123456789&&page=2','get',{
        'total_page|5':5,
        'content|2':[{
            'id|987654321':1,
            'page_id|1':1,
            'content':'大声疾呼生活费和回复我',
            'target':'生活费',
            'volume|1':1
        }]
    });

    Mock.mock('/ancient_books/getNLocations.action?type=1&&id=1&&book=5&&ancient_book_id=123&&page=1','get',{
        'total_page|3':3,
        'content|2':[{
            'id|987654321':1,
            'page_id|1':1,
            'content':'大范甘迪很高评价分行贷款',
            'target':'甘迪',
            'volume|1':1
        }]
    });

    Mock.mock('/ancient_books/delete_mark.action','post', {
        "status|200":200,
        "result|1":1,
    });

    Mock.mock('/ancient_books/getToken.action','get', {
        "token|100":100,
    });*/

    import noumenon_title from '../../../component/noumenon-title.vue';
    import delete_modal from '../../../component/delete_modal.vue';
    import paginator from '../../../component/paginator.vue';
    export default{
        components:{
            noumenon_title,
            delete_modal,
            paginator
        },
        data(){
            return{
                title:'',
                get_catalogue_url:'/ancient_books/getNLocationCatalogue.action',
                get_noumenon_location:'/ancient_books/getNLocations.action',
                delete_mark_url:'/ancient_books/delete_mark.action',
                catalogue:[],
                noumenon_location:[],
                delete_mark_index:null,
                book_index1:0,
                book_index2:0,
                open_modal:false,
                total_page:null
            }
        },
        created(){
            this.get_catalogue();
        },

        watch:{
            '$route'(){
                this.clean_data();
                this.show_noumenon_location_2(this.book_index1,this.book_index2);
            }
        },

        methods:{
            //得到出现本体的所有古籍
            get_catalogue(){
                let object = {};
                let new_url=this.get_catalogue_url+'?id='+this.$route.params.nouId+'&&type=1';
                this.http_json(new_url,'get',object,this.success_catalogue,this.fail_catalogue);
            },

            success_catalogue(response){
                this.title = response.body.n_name;
                if(response.body.content.length !== 0){
                    for(let i = 0; i < response.body.content.length;i++){
                        if(this.catalogue.length === 0){
                            this.catalogue.push({
                                show_ce:true,
                                ancient_book_name:response.body.content[i].ancient_book_name,
                                id:response.body.content[i].id,
                                book:[],
                                book_name:[]
                            });
                            this.catalogue[i].book.push(response.body.content[i].book);
                            this.catalogue[i].book_name.push(response.body.content[i].book_name);
                        } else{
                            let t = 0;
                            for(let m = 0;m < this.catalogue.length;m++){
                                if(response.body.content[i].id === this.catalogue[m].id){
                                    this.catalogue[m].book.push(response.body.content[i].book);
                                    this.catalogue[m].book_name.push(response.body.content[i].book_name);
                                    t++;
                                }
                            }
                            if(t === 0){
                                this.catalogue.push({
                                    show_ce:false,
                                    ancient_book_name:response.body.content[i].ancient_book_name,
                                    id:response.body.content[i].id,
                                    book:[],
                                    book_name:[]
                                });
                                this.catalogue[this.catalogue.length-1].book.push(response.body.content[i].book);
                                this.catalogue[this.catalogue.length-1].book_name.push(response.body.content[i].book_name);
                            }
                        }
                    }
                    console.log(JSON.stringify(this.catalogue));
                    this.show_noumenon_location_1(0,0);
                }
            },

            fail_catalogue(){
                console.log('获取本体所在的古籍失败');
            },

            //展开，关闭古籍册数
            open_ceList(index){
                this.catalogue[index].show_ce = true;
            },

            close_ceList(index){
                this.catalogue[index].show_ce = false;
            },

            //得到指定古籍所在册数的本体位置信息
            /*监听翻页组件参数变化的请求*/
            show_noumenon_location_2(index1,index2){
                this.book_index1 = index1;
                this.book_index2 = index2;
                let object = {};
                let new_url = this.get_noumenon_location+'?type=1&&id='+this.$route.params.nouId+'&&book='+this.catalogue[index1].book[index2]+'&&ancient_book_id='+this.catalogue[index1].id+'&&page='+this.$route.params.pageId;
                this.http_json(new_url,'get',object,this.success_show_location,this.fail_show_location);
            },

            /*点击相应册名或进入该页面执行的请求*/
            show_noumenon_location_1(index1,index2){
                this.clean_data();
                this.book_index1 = index1;
                this.book_index2 = index2;
                this.$route.params.pageId = 1;
                this.$router.push({name:this.$route.name, params: this.$route.params});
                let object = {};
                let new_url = this.get_noumenon_location+'?type=1&&id='+this.$route.params.nouId+'&&book='+this.catalogue[index1].book[index2]+'&&ancient_book_id='+this.catalogue[index1].id+'&&page=1';
                this.http_json(new_url,'get',object,this.success_show_location,this.fail_show_location);
            },


            success_show_location(response){
                this.total_page = response.body.total_page;
                if(response.body.content.length > 0){
                    for(let i = 0;i < response.body.content.length;i++){
                        this.noumenon_location.push({
                            show_btn:false,
                            id:response.body.content[i].id,
                            page_id:response.body.content[i].page_id,
                            content:response.body.content[i].content,
                            target:response.body.content[i].target,
                            volume:response.body.content[i].volume
                        });
                    }
                    console.log(JSON.stringify(this.noumenon_location));
                    /*let buttons = document.getElementsByClassName("zxw-btn");

                    for(let j = 0; j < this.noumenon_location.length; j++) {
                        let length = this.noumenon_location[j].target.length;
                        let index = this.noumenon_location[j].content.indexOf(this.noumenon_location[j].target);
                        //文本逐字遍历
                        for (let m = 0; m < this.noumenon_location[j].content.length; m++) {

                            //按顺序依次获得文本中的字
                            let p = this.noumenon_location[j].content.charAt(m);
                            if(m >= index && m < index+length){
                                //该字在搜索关键字中
                                let span1 = document.createElement("span");
                                let text1 = document.createTextNode(p);
                                span1.appendChild(text1);
                                span1.setAttribute("class", "text");
                                buttons[j].appendChild(span1);
                            }else{
                                //该字不在搜索关键字中
                                let span2 = document.createElement("span");
                                let text2 = document.createTextNode(p);
                                span2.appendChild(text2);
                                buttons[j].appendChild(span2);
                            }
                        }
                    }*/
                }
            },

            fail_show_location(){
                console.log('获取册数具体本体位置失败');
            },

            clean_data(){
                this.noumenon_location.splice(0,this.noumenon_location.length);
            },

            open_delete_mark(index){
                this.delete_mark_index = index;
                this.open_modal = true;
            },

            close_modal(){
                this.open_modal = false;
                this.delete_mark_index = null;
            },

            delete_mark(){
                let object = {};
                object.mark_id = this.noumenon_location[this.delete_mark_index].id;
                this.http_json(this.delete_mark_url,'post',object,this.success_delete_mark,this.fail_delete_mark);
            },

            success_delete_mark(response){
                this.noumenon_location.splice(this.delete_mark_index,1);
                this.close_modal();
            },

            fail_delete_mark(){
                console.log('删除本体标记位置失败');
            },

            //前往图文对照页
            to_ancientBooks(volume,page){
                console.log(this.catalogue[this.book_index1].id);
                console.log(this.catalogue[this.book_index1].book[this.book_index2]);
                console.log(page);
                console.log(volume);
                this.$router.push({name:'ancientbook',params:{
                    book_name:this.catalogue[this.book_index1].id,
                    book:this.catalogue[this.book_index1].book[this.book_index2],
                    volume:volume,
                    pageId:page
                }})
            }
        }
    }
</script>

<style>
    .zxw-check-noumenon-body{
        width:950px;
        margin-top:10px;
        margin-left:auto;
        margin-right:auto;
    }

    /*滚动条*/
    .zxw-scrollbar
    {
        margin-left: 10px;
        float: left;
        height: 400px;
        width: 200px;
        background-color: transparent;
        overflow-y: scroll;
        margin-bottom: 25px;
    }


    #style-1::-webkit-scrollbar-track
    {
        -webkit-box-shadow: inset 0 0 2px white;
        border-radius: 10px;
        background-color:whitesmoke;
    }

    #style-1::-webkit-scrollbar
    {
        width: 10px;
        background-color: transparent;
    }

    #style-1::-webkit-scrollbar-thumb
    {
        border-radius: 10px;
        -webkit-box-shadow: inset 0 0 2px white;
        background-color: grey;
    }

    .zxw-force-overflow{
        min-height:2000px;
    }

    /*向右三角样式*/
    .zxw-arrow-right{
        width:0px;
        height:0px;
        border-bottom:5px solid transparent;  /* left arrow slant */
        border-top:5px solid transparent; /* right arrow slant */
        border-left:5px solid #2f2f2f; /* bottom, add background color here */
        font-size:0px;
        line-height:0px;
    }

    /*向下三角样式*/
    .zxw-arrow-down{
        width:0px;
        height:0px;
        border-left:5px solid transparent;
        border-right:5px solid transparent;
        border-top:5px solid #2f2f2f;
        font-size:0px;
        line-height:0px;
    }

    .zxw-book-name{
        vertical-align: text-top;
        font-weight: 700
    }

    .zxw-ce-list{
        margin-left: 5px;
        text-align: left
    }

    .zxw-ce-btn{
        width:80px;
        font-size: 18px;
    }

    .zxw-check-right-body{
        width:740px;
        height:auto;
        margin-bottom: 20px;
        padding-left: 100px;
        padding-right: 10px;
        float:right;
    }

    .zxw-delete-mark-btn{
        background-image: url("../../../assets/img/button/add-button.png");
        background-color: transparent;
        background-size: 60px 30px;
        background-position: center;
        background-repeat: no-repeat;
        width:60px;
        height:30px;
        color: gainsboro;
        font-size: 16px;
        float: right;
    }

    .text{
        color: red;
    }

    .zxwMarkSelected{
        font-weight: bold;
    }

    .zxw-mark-warning{
        width: 300px;
        font-weight: bold;
        text-align: center;
        margin-top: 200px;
        margin-left: 150px;
    }

    .zxw-check-right-content{
        height:650px;
    }

    .zxw-check-right-detail{
        height:570px;
    }
</style>