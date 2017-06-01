<template>
    <div class="zxwcharacter-title">   <!--加背景-->
        <div class="zxwcharacter-row"> <!--分组padding-->
            <button class="zxwcharacter-span"  @click="gotoLetter('a',0)" v-bind:disable="ban[0]">A</button>
            <button class="zxwcharacter-span"  @click="gotoLetter('b',1)" v-bind:disable="ban[1]">B</button>
            <button class="zxwcharacter-span"  @click="gotoLetter('c',2)" v-bind:disable="ban[2]">C</button>
            <button class="zxwcharacter-span"  @click="gotoLetter('d',3)" v-bind:disable="ban[3]">D</button>
            <button class="zxwcharacter-span"  @click="gotoLetter('e',4)" v-bind:disable="ban[4]">E</button>
            <button class="zxwcharacter-span"  @click="gotoLetter('f',5)" v-bind:disable="ban[5]">F</button>
            <button class="zxwcharacter-span"  @click="gotoLetter('g',6)" v-bind:disable="ban[6]">G</button>
        </div>

        <div class="zxwcharacter-row"> <!--分组padding-->
            <button class="zxwcharacter-span"  @click="gotoLetter('h',7)" v-bind:disable="ban[7]">H</button>
            <button class="zxwcharacter-span"  @click="gotoLetter('i',8)" v-bind:disable="ban[8]">I</button>
            <button class="zxwcharacter-span"  @click="gotoLetter('j',9)" v-bind:disable="ban[9]">J</button>
            <button class="zxwcharacter-span"  @click="gotoLetter('k',10)" v-bind:disable="ban[10]">K</button>
            <button class="zxwcharacter-span"  @click="gotoLetter('l',11)" v-bind:disable="ban[11]">L</button>
            <button class="zxwcharacter-span"  @click="gotoLetter('m',12)" v-bind:disable="ban[12]">M</button>
            <button class="zxwcharacter-span"  @click="gotoLetter('n',13)" v-bind:disable="ban[13]">N</button>
        </div>

        <div class="zxwcharacter-row"> <!--分组padding-->
            <button class="zxwcharacter-span"  @click="gotoLetter('o',14)" v-bind:disable="ban[14]">O</button>
            <button class="zxwcharacter-span"  @click="gotoLetter('p',15)" v-bind:disable="ban[15]">P</button>
            <button class="zxwcharacter-span"  @click="gotoLetter('q',16)" v-bind:disable="ban[16]">Q</button>
            <button class="zxwcharacter-span"  @click="gotoLetter('r',17)" v-bind:disable="ban[17]">R</button>
            <button class="zxwcharacter-span"  @click="gotoLetter('s',18)" v-bind:disable="ban[18]">S</button>
            <button class="zxwcharacter-span"  @click="gotoLetter('t',19)" v-bind:disable="ban[19]">T</button>
            <button class="zxwcharacter-span"  @click="gotoLetter('u',20)" v-bind:disable="ban[20]">U</button>
        </div>

        <div class="zxwcharacter-row"> <!--分组padding-->
            <button class="zxwcharacter-span"  @click="gotoLetter('v',21)" v-bind:disable="ban[21]">V</button>
            <button class="zxwcharacter-span"  @click="gotoLetter('w',22)" v-bind:disable="ban[22]">W</button>
            <button class="zxwcharacter-span"  @click="gotoLetter('x',23)" v-bind:disable="ban[23]">X</button>
            <button class="zxwcharacter-span"  @click="gotoLetter('y',24)" v-bind:disable="ban[24]">Y</button>
            <button class="zxwcharacter-span"  @click="gotoLetter('z',25)" v-bind:disable="ban[25]">Z</button>
        </div>
        <h5 class="zxwcharacter-span">#</h5>
    </div>
</template>

<script>
    export default{
        /*created(){
            this.letterCharacter('a');
        },*/

        data(){
            return {
                ban:[false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false]
            }
        },

        methods:{
           gotoLetter(p,q){
                /*let a = this.$parent.successGet;
                let b = this.$parent.failGet;
                this.word = p;
                this.$emit('letter',this.word);
                let new_url = this.url+this.object.value;
                this.$parent.cleanData();
                this.httpJson(new_url,'get',this.object,a,b);*/
                this.ban[q]=true;
                this.$route.params.letterId = p;
                this.$route.params.pageId = 1;
                this.$router.push({name:this.$route.name, params: this.$route.params});
                //console.log(this.$route.name);
            },
        }
    }
</script>

<style>
    .zxwcharacter-title{
        margin-top: 20px;
        padding:0 20px 0 40px;
        border: 2px solid darkred;
        width:750px;
    }

    .zxwcharacter-row{
        width:150px;
        margin-right: 5px;
        display:inline-block;
    }

    .zxwcharacter-span{
        padding-right: 1px;
        display:inline-block;
        background-color: transparent;
        border-color:transparent ;
        width:15px;
    }
</style>