<template id="modal">
    <div class="dialogs">
        <div class="modal-dialog" :class="{ 'dialog-active': show_modal }">
            <div class="dialog-content">
                <div class="close rotate">
                    <span class="iconfont icon-close" @click="$emit('fireclose')">×</span>
                </div>
                <slot name="header"></slot>
                <slot name="body">body</slot>
                <slot name="footer">footer</slot>
            </div>
        </div>
        <div class="dialog-overlay"></div>
    </div>
</template>

<script>

    export default {
        data(){
            return {
                show_modal: false
            }
        },
        props: ['show_modal'],
        methods: {
            close () {
                this.show_modal = false
            }
        }
    }
</script>
<style>
    .modal-dialog{
        /*width: 30px;*/
        position: fixed;
        left: 55%;
        top: 6em;
        transform: translateX(-50%);
        z-index: 2000;
        visibility: hidden;
        backface-visibility: hidden;
        perspective: 1300px;
    }
    .dialog-content{
        width: 400px;
        height: 450px;
    }
</style>
