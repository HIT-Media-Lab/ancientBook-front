<template id="modal">
    <div class="dialogs " :class="{ 'dialog-active': show_modal }">
        <div class="dialog-content">
            <div class="j-close j-rotate">
                <span @click="$emit('fireclose')" style="font-size: 30px;">×</span>
            </div>
            <slot name="header"></slot>
            <slot name="body"></slot>
            <slot name="footer"></slot>
        </div>
    </div>
</template>

<script>
    export default {
        data(){
            return {
//                show_modal: false
            }
        },
        props: ['show_modal','w','height'],
        methods: {
//            close () {
//                this.show_modal = false
//            }
        }
    }
</script>
<style>
        .dialogs {
            width: auto;
            height: auto;
            position: fixed;
            left: 35%;
            /*margin: 0 0 0 -201px;*/
            top: 100px;
            z-index: 2000;
            visibility: hidden;
            backface-visibility: hidden;
            border-radius: 2px;
            box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
            background-color: white;
        }
        .dialog-active{
            visibility: visible;
        }
        .j-close {
            width:auto;
            height: auto;
            position: absolute;
            right: .5rem;
            border: none;
            border-radius: 3px;
            color: #333;
            box-sizing: border-box;
            -webkit-box-sizing: border-box;
        }

        .j-rotate {
            cursor: pointer;
        }
</style>
