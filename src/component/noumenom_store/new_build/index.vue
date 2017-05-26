<template>
    <div class="noumenom">
        <build_bar></build_bar>
        <div class="step-select">
            <span>选择本体类型：</span>
            <select>
                <option>人物</option>
                <option>文献</option>
                <option>术语</option>
                <option>时间</option>
                <option>机构</option>
                <option>地名</option>
            </select>
        </div>
        <button class="next1">下一步</button>
    </div>
</template>

<script>
    import build_bar from './build_bar.vue';
    export default{
        components:{
            build_bar
        }
    }
</script>

<style>
   .step-select{
      margin: 80px 0 0 280px;
   }

    .next1{
        margin:30px 0 0 320px;
    }
</style>