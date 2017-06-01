<template id="modal">
    <div class="dialogs">
        <div class="dialog" :class="{ 'dialog-active': show_modal }">
            <div class="dialog-content">
                <div class="close rotate">
                    <span class="iconfont icon-close" @click="close"></span>
                </div>
                <slot name="header">header</slot>
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
