<template>
    <modal :show_modal="show_info">
        
    </modal>
</template>

<script>
    import modal from '../component/modal.vue';
    export default{
        components:{
            modal
        },
        props:['show_info'],

        data(){
            return {

            }
        }
    }
</script>

<style>

</style>