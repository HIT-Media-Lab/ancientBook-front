<template>
    <div class="noumenom">
        <build_bar></build_bar>
        <span class="noumenom-name">本体名称：人名（出生时间）</span>
        <div class="character-two">
            <span class="tag-span">人名：</span>
            <input type="text" class="input-span">
            <span class="tag-span">英译：</span>
            <input type="text">
        </div>

        <div class="character-two">
            <span class="tag-span">姓：</span>
            <input type="text" class="input-span">
            <span class="tag-span">氏：</span>
            <input type="text">
        </div>

        <div class="character-two">
            <span class="tag-span">字：</span>
            <input type="text" class="input-span">
            <span class="tag-span">别名：</span>
            <input type="text">
        </div>

        <div class="character-two">
            <span class="tag-span">出生时间：</span>
            <input type="text" class="input-span">
            <span class="tag-span">死亡时间：</span>
            <input type="text">
        </div>

        <div class="character-two">
            <span class="tag-span">父：</span>
            <input type="text" class="input-span">
            <span class="tag-span">母：</span>
            <input type="text">
        </div>

        <div class="character-two">
            <span class="tag-span">兄弟：</span>
            <input type="text" class="input-span">
            <span class="tag-span">姐妹：</span>
            <input type="text">
        </div>

        <div class="character-two">
            <input type="text" class="tag-span" style="width:40px">
            <input type="text">
            <button class="add-button">添加</button>
        </div>
        <div class="step-button">
        <button>上一步</button>
        <button>下一步</button>
        </div>
    </div>
</template>

<script>
    import build_bar from '../build_bar.vue';
    export default{
        components:{
            build_bar
        }
    }
</script>

<style>
    .noumenom-name{
        color:darkred;
        display:block;
        margin: 30px 0 20px 0;
    }

    .character-two{
        margin-bottom: 10px;
    }

    .step-button{
        display: inline-block;
        margin-left: 500px;
    }

    .add-button{
        display: inline-block;
    }

    .tag-span{
        margin-right: 20px;
        text-align: right;
    }
    
    .input-span{
        margin-right: 200px;
    }
</style>
