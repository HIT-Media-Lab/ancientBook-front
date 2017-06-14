<template id="modal">
    <div class="dialogs " :class="{ 'dialog-active': show_modal }">
        <div class="dialog-content">
            <div class="j-close j-rotate">
                <img src="../assets/img/叉.png" @click="$emit('fireclose')">
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
        .strap{
            padding-bottom: 0.5em;
        }

        .dialogs {
            width: auto;
            height: auto;
            position: fixed;
            left: 37%;
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

        .dialog-active .dialog-con4tent {
            position: relative;
            opacity: 1;
            transform: rotateY(0);
        }

        .dialog-active ~ .dialog-overlay {
            opacity: 1;
            visibility: visible;
        }



        .j-close {
            width:auto;
            height: auto;
            position: absolute;
            top: .5rem;
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
