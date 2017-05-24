<template>
    <div class="noumenom-body">
        <div class="noumenom-header ">
            <h4 class="noumenom-title">人物本体</h4>
            <button class="noumenom-button">新建本体</button>
        </div>

        <div class="character-title">   <!--加背景-->
            <div class="character-row"> <!--分组padding-->
                <h5 class="character-span">A</h5>
                <h5 class="character-span">B</h5>
                <h5 class="character-span">C</h5>
                <h5 class="character-span">D</h5>
                <h5 class="character-span">E</h5>
                <h5 class="character-span">F</h5>
                <h5 class="character-span">G</h5>
            </div>

            <div class="character-row"> <!--分组padding-->
                <h5 class="character-span">H</h5>
                <h5 class="character-span">I</h5>
                <h5 class="character-span">J</h5>
                <h5 class="character-span">K</h5>
                <h5 class="character-span">L</h5>
                <h5 class="character-span">M</h5>
                <h5 class="character-span">N</h5>
            </div>

            <div class="character-row"> <!--分组padding-->
                <h5 class="character-span">O</h5>
                <h5 class="character-span">P</h5>
                <h5 class="character-span">Q</h5>
                <h5 class="character-span">R</h5>
                <h5 class="character-span">S</h5>
                <h5 class="character-span">T</h5>
                <h5 class="character-span">U</h5>
            </div>

            <div class="character-row"> <!--分组padding-->
                <h5 class="character-span">V</h5>
                <h5 class="character-span">W</h5>
                <h5 class="character-span">X</h5>
                <h5 class="character-span">Y</h5>
                <h5 class="character-span">Z</h5>
            </div>
            <h5 class="character-span">#</h5>
        </div>

        <div class="bottom-container">
            <div class="row">
                <h5 class="col-md-6">人名 （出生时间）</h5>
                <h5 class="col-md-6">人名 （出生时间）</h5>
            </div>
            <div class="row">
                <h5 class="col-md-6">人名 （出生时间）</h5>
                <h5 class="col-md-6">人名 （出生时间）</h5>
            </div>
            <div class="row">
                <h5 class="col-md-6">人名 （出生时间）</h5>
                <h5 class="col-md-6">人名 （出生时间）</h5>
            </div>
            <div class="row">
                <h5 class="col-md-6">人名 （出生时间）</h5>
                <h5 class="col-md-6">人名 （出生时间）</h5>
            </div>
            <div class="row">
                <h5 class="col-md-6">人名 （出生时间）</h5>
                <h5 class="col-md-6">人名 （出生时间）</h5>
            </div>
            <div class="row">
                <h5 class="col-md-6">人名 （出生时间）</h5>
                <h5 class="col-md-6">人名 （出生时间）</h5>
            </div>
            <div class="row">
                <h5 class="col-md-6">人名 （出生时间）</h5>
                <h5 class="col-md-6">人名 （出生时间）</h5>
            </div>
            <div class="row">
                <h5 class="col-md-6">人名 （出生时间）</h5>
                <h5 class="col-md-6">人名 （出生时间）</h5>
            </div>
            <div class="row">
                <h5 class="col-md-6">人名 （出生时间）</h5>
                <h5 class="col-md-6">人名 （出生时间）</h5>
            </div>
            <div class="row">
                <h5 class="col-md-6">人名 （出生时间）</h5>
                <h5 class="col-md-6">人名 （出生时间）</h5>
            </div>
            <div class="row">
                <h5 class="col-md-6">人名 （出生时间）</h5>
                <h5 class="col-md-6">人名 （出生时间）</h5>
            </div>
            <div class="row">
                <h5 class="col-md-6">人名 （出生时间）</h5>
                <h5 class="col-md-6">人名 （出生时间）</h5>
            </div>
            <div class="row">
                <h5 class="col-md-6">人名 （出生时间）</h5>
                <h5 class="col-md-6">人名 （出生时间）</h5>
            </div>
            <div class="row">
                <h5 class="col-md-6">人名 （出生时间）</h5>
                <h5 class="col-md-6">人名 （出生时间）</h5>
            </div>
        </div>
        <page-component></page-component>
    </div>
</template>

<script>
    import pageComponent from '../../../pageComponent.vue'
    export default{
        components:{
            pageComponent
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
        padding-right: 15px;
        display:inline-block;
    }

    .character-span{
        padding-right: 5px;
        display:inline-block;
    }

    .bottom-container{
        width:750px;
        padding-top: 20px;
    }
</style>