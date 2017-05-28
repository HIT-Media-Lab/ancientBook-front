<template>
    <div class="noumenom">
        <navigation_bar></navigation_bar>

        <div class="noumenom-body">
            <div class="noumenom-header ">
                <h4 class="noumenom-title">人物本体</h4>
            </div>

            <div class="character-title">   <!--加背景-->
                <div class="character-row"> <!--分组padding-->
                    <button class="character-span"  @click="letterCharacter('a')">A</button>
                    <button class="character-span"  @click="letterCharacter('b')">B</button>
                    <button class="character-span"  @click="letterCharacter('c')">C</button>
                    <button class="character-span"  @click="letterCharacter('d')">D</button>
                    <button class="character-span"  @click="letterCharacter('e')">E</button>
                    <button class="character-span"  @click="letterCharacter('f')">F</button>
                    <button class="character-span"  @click="letterCharacter('g')">G</button>
                </div>

                <div class="character-row"> <!--分组padding-->
                    <button class="character-span"  @click="letterCharacter('h')">H</button>
                    <button class="character-span"  @click="letterCharacter('i')">I</button>
                    <button class="character-span"  @click="letterCharacter('j')">J</button>
                    <button class="character-span"  @click="letterCharacter('k')">K</button>
                    <button class="character-span"  @click="letterCharacter('l')">L</button>
                    <button class="character-span"  @click="letterCharacter('m')">M</button>
                    <button class="character-span"  @click="letterCharacter('n')">N</button>
                </div>

                <div class="character-row"> <!--分组padding-->
                    <button class="character-span"  @click="letterCharacter('o')">O</button>
                    <button class="character-span"  @click="letterCharacter('p')">P</button>
                    <button class="character-span"  @click="letterCharacter('q')">Q</button>
                    <button class="character-span"  @click="letterCharacter('r')">R</button>
                    <button class="character-span"  @click="letterCharacter('s')">S</button>
                    <button class="character-span"  @click="letterCharacter('t')">T</button>
                    <button class="character-span"  @click="letterCharacter('u')">U</button>
                </div>

                <div class="character-row"> <!--分组padding-->
                    <button class="character-span"  @click="letterCharacter('v')">V</button>
                    <button class="character-span"  @click="letterCharacter('w')">W</button>
                    <button class="character-span"  @click="letterCharacter('x')">X</button>
                    <button class="character-span"  @click="letterCharacter('y')">Y</button>
                    <button class="character-span"  @click="letterCharacter('z')">Z</button>
                </div>
                <h5 class="character-span">#</h5>
            </div>

            <div class="bottom-container">
                <div class="row" v-for="(item,index) in character_data">
                <p class="noumenom-row" @click="character()">item[index]</p>
                <p class="noumenom-row" @click="character()">item[index+1]</p>
                </div>

            </div>
            <page-component :cur_max=this.total_page :cur_object="this.get_letter" :cur_url="this.word_url" v-on:pre_page="prePagecount" v-on:next_page="nextPagecount" v-on:skip_page="skiPagecount"></page-component>
            <router-link :to="{name:'characterM',params:{id:'hhhhh'}}">测试</router-link>
        </div>
    </div>
</template>

<script>
   /* let Mock = require('mockjs');

    //显示用户列表
    Mock.mock('/ancient_books/get_person_list_by_word.action?word=a&&page_count=1','get',{
        "content|30":[{
            'standard_name|1-100':100,
            'noumenon_id|1-100':1,
        }]
    });*/

    import pageComponent from '../../../component/paginator.vue';
    import navigation_bar from '../../../component/noumenon-navbar.vue';
    export default{
        created(){
            this.letterCharacter('a');
        },
        components:{
            pageComponent,
            navigation_bar,
        },

        data(){
            return{
                word:'',
                total_page:3,   //总页数
                page_count:1,   //当前页数
                letter:['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'],
                get_letter:{},
                character_data:[],
                characterid_data:[],
                word_url:'/ancient_books/get_person_list_by_word.action'
            }
        },

        methods:{
            successGet(response){
                this.word=p;
                console.log("p="+this.word+"字母显示本体列表成功");
                this.total_page = response.body.total_page;
                for(let i = 0; i <response.body.content.length; i++){
                    this.character_data[i]= response.body.content[i].standard_name;
                    this.characterid_data[i]=response.body.content[i].noumenon_id;
                }
            },

            failGet(){
                console.log("字母显示本体列表失败");
            },

            letterCharacter(p){
                this.get_letter.value='?word='+p+'&&page_count=1';
                let new_url = this.word_url+this.get_letter.value;
                this.HttpJson(new_url,'get',this.get_letter,this.successGet,this.failGet);
            },

            character(){
                this.$router.push({path:'/charater_noumenon_check'});
            },

            prePagecount(p){
                this.page_count = p;
                console.log(this.word,this.page_count);
                this.get_letter.value = '?word='+this.word+'&&page_count='+this.page_count;
            },

            nextPagecount(p){
                this.page_count = p;
                console.log(this.word,this.page_count);
                this.get_letter.value = '?word='+this.word+'&&page_count='+this.page_count;
            },

            skiPagecount(p){
                this.page_count = p;
                console.log(this.word,this.page_count);
                this.get_letter.value = '?word='+this.word+'&&page_count='+this.page_count;
            },

            cleanData(){
                console.log('hhh');
                this.character_data.splice(0, this.character_data.length);
                this.characterid_data.splice(0,this.characterid_data.length);
            }
        }

    }
</script>

<style>
    .character-title{
        margin-top: 20px;
        padding:0 20px 0 40px;
        border: 2px solid darkred;
        width:750px;
    }

    .character-row{
        width:150px;
        margin-right: 5px;
        display:inline-block;
    }

    .character-span{
        padding-right: 1px;
        display:inline-block;
        background-color: transparent;
        border-color:transparent ;
        width:15px;
    }

    .bottom-container{
        width:750px;
        padding-top: 20px;
    }
</style>