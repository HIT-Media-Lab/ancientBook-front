<template>
    <div class="zxwcreate-word-all">
        <span v-bind:class="{zxwwordhover: this.prams==='build'}">第一步</span>
        <span class="zxwcreate-word" v-bind:class="{zxwwordhover:this.prams==='charactertwo'||this.prams==='placetwo'||this.prams==='institutiontwo'||this.prams==='termstwo'||this.prams === 'timetwo'||this.prams === 'littwo'||this.prams === 'offtwo'}">第二步</span>
        <span v-bind:class="{zxwwordhover:this.prams==='characterthree'||this.prams==='placethree'||this.prams==='institutionthree'||this.prams==='termsthree'||this.prams==='offthree'||this.prams ==='timethree'||this.prams ==='litthree'}">确认</span>
    </div>
</template>

<script>
    export default{
        props:['prams']
    }
</script>

<style>
    .zxwcreate-word-all{
        margin:4px 0 0 185px;
    }
    .zxwcreate-word{
        margin:0 200px 0 180px;
    }
    .zxwwordhover{
        font-weight: bold;
        color:#a50000;
        font-size: 23px;
    }
</style>