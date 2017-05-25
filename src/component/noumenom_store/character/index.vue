<template>
    <div class="noumenom">
        <navigation_bar></navigation_bar>

        <div class="noumenom-body">
            <div class="noumenom-header ">
                <h4 class="noumenom-title">人物本体</h4>
                <build_noumenom></build_noumenom>
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
            <page-component :cur_max=this.total_page v-on:prePage="prePagecount" v-on:nextPage="nextPagecount" v-on:skiPage="skiPagecount"></page-component>
        </div>
    </div>
</template>

<script>
    import pageComponent from '../../../pageComponent.vue';
    import navigation_bar from '../navigation_bar.vue';
    import build_noumenom from '../../../build_noumenom.vue';
    export default{
        created(){
            this.letterCharacter('a');
        },
        components:{
            pageComponent,
            navigation_bar,
            build_noumenom
        },

        data(){
            return{
                word:'',
                total_page:1,   //总页数
                page_count:1,   //当前页数
                letter:['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'],
                get_letter:{},
                character_data:[],
                word_url:'/ancient_books/get_person_list_by_word.action'
            }
        },

        methods:{
            successLetter(response){
                this.word=p;
                console.log("p="+this.word+"字母显示本体列表成功");
                this.total_page = response.body.total_page;
                for(let i = 0; i <response.body.content.length; i++){
                    this.character_data[i]= response.body.content[i].standard_name;
                }
            },

            failLetter(){
                console.log("字母显示本体列表失败");
            },

            letterCharacter(p){
                this.get_letter.value='word='+p+'&&page_count='+this.page_count;
                this.word_url = this.word_url+'?'+this.get_letter.value;
                this.HttpJson(this.word_url,'get',this.get_letter,this.successLetter,this.failLetter);
            },

            character(){
                this.$router.push({path:'/charater_noumenon_check'});
            },

            prePagecount(p){
                this.page_count = p;
                this.cleanCharacter();
                this.letterCharacter(this.word);
            },

            nextPagecount(p){
                this.page_count = p;
                this.cleanCharacter();
                this.letterCharacter(this.word);
            },

            skiPagecount(p){
                this.page_count = p;
                this.cleanCharacter();
                this.letterCharacter(this.word)
            },

            cleanCharacter(){
                this.character_data.splice(0, this.character_data.length);
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