<template>
    <modal>
        <div slot="header" class="zxw-time-header">
            <span>添加关系属性</span>
        </div>

        <div slot="body">
            <input type="checkbox">
        </div>
    </modal>
</template>

<script>
    import modal from "../component/modal.vue";
    export default{
        components:{
            modal
        }
    }
</script>

<style>

</style>