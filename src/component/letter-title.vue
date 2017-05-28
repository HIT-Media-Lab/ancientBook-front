<template>
    <div class="zxwcharacter-title">   <!--加背景-->
        <div class="zxwcharacter-row"> <!--分组padding-->
            <button class="zxwcharacter-span"  @click="letterCharacter('a')">A</button>
            <button class="zxwcharacter-span"  @click="letterCharacter('b')">B</button>
            <button class="zxwcharacter-span"  @click="letterCharacter('c')">C</button>
            <button class="zxwcharacter-span"  @click="letterCharacter('d')">D</button>
            <button class="zxwcharacter-span"  @click="letterCharacter('e')">E</button>
            <button class="zxwcharacter-span"  @click="letterCharacter('f')">F</button>
            <button class="zxwcharacter-span"  @click="letterCharacter('g')">G</button>
        </div>

        <div class="zxwcharacter-row"> <!--分组padding-->
            <button class="zxwcharacter-span"  @click="letterCharacter('h')">H</button>
            <button class="zxwcharacter-span"  @click="letterCharacter('i')">I</button>
            <button class="zxwcharacter-span"  @click="letterCharacter('j')">J</button>
            <button class="zxwcharacter-span"  @click="letterCharacter('k')">K</button>
            <button class="zxwcharacter-span"  @click="letterCharacter('l')">L</button>
            <button class="zxwcharacter-span"  @click="letterCharacter('m')">M</button>
            <button class="zxwcharacter-span"  @click="letterCharacter('n')">N</button>
        </div>

        <div class="zxwcharacter-row"> <!--分组padding-->
            <button class="zxwcharacter-span"  @click="letterCharacter('o')">O</button>
            <button class="zxwcharacter-span"  @click="letterCharacter('p')">P</button>
            <button class="zxwcharacter-span"  @click="letterCharacter('q')">Q</button>
            <button class="zxwcharacter-span"  @click="letterCharacter('r')">R</button>
            <button class="zxwcharacter-span"  @click="letterCharacter('s')">S</button>
            <button class="zxwcharacter-span"  @click="letterCharacter('t')">T</button>
            <button class="zxwcharacter-span"  @click="letterCharacter('u')">U</button>
        </div>

        <div class="zxwcharacter-row"> <!--分组padding-->
            <button class="zxwcharacter-span"  @click="letterCharacter('v')">V</button>
            <button class="zxwcharacter-span"  @click="letterCharacter('w')">W</button>
            <button class="zxwcharacter-span"  @click="letterCharacter('x')">X</button>
            <button class="zxwcharacter-span"  @click="letterCharacter('y')">Y</button>
            <button class="zxwcharacter-span"  @click="letterCharacter('z')">Z</button>
        </div>
        <h5 class="zxwcharacter-span">#</h5>
    </div>
</template>

<script>
    export default{
        created(){
            this.letterCharacter('a');
        },

        props:[
            'url',
            'object'
        ],
        data(){
            return{
                word:''
            }
        },

        methods:{
            letterCharacter(p){
                let a = this.$parent.successGet;
                let b = this.$parent.failGet;
                this.word = p;
                this.$emit('letter',this.word);
                let new_url = this.url+this.object.value;
                this.$parent.cleanData();
                this.httpJson(new_url,'get',this.object,a,b);
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