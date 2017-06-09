<template>
    <div class="zxwcreate-word-all">
        <span v-bind:class="{zxwwordhover: this.prams==='build'}">第一步</span>
        <span class="zxwcreate-word" v-bind:class="{zxwwordhover:this.prams==='charactertwo'}">第二步</span>
        <span v-bind:class="{zxwwordhover:this.prams==='characterthree'}">确认</span>
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
        margin:0 230px 0 210px;
    }
    .zxwwordhover{
        color:#a50000;
    }
</style>