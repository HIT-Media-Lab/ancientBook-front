<template id="modal">
    <div class="dialogs">
        <div class="modal-dialog" :class="{ 'dialog-active': show_modal }" v-bind:width="width" v-bind:height="height">
            <div class="dialog-content" v-bind:width="width" v-bind:height="height">
                <div class="close rotate">
                    <span class="iconfont icon-close" @click="$emit('fireclose')">×</span>
                </div>
                <slot name="header"></slot>
                <slot name="body"></slot>
                <slot name="footer"></slot>
            </div>
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
        props: ['show_modal','width','height'],
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
            position: fixed;
            left: 40%;
            top: 6em;
            z-index: 2000;
            visibility: hidden;
            backface-visibility: hidden;
        }
        .modal-dialog{
            width: 400px;
            height: 380px;
            /*background: #fff;*/
            background-image: url("../assets/img/modal.png");
            background-size: 100%;
            background-repeat: no-repeat;
        }

        .dialog-active{
            visibility: visible;
        }

        .dialog-active .dialog-content {
            position: relative;
            opacity: 1;
            transform: rotateY(0);
        }

        .dialog-active ~ .dialog-overlay {
            opacity: 1;
            visibility: visible;
        }

        .dialog-content {
            width: 400px;
            height: 375px;
            border-radius: 2px;
            box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
        }


        .close {
            display: inline-block;
            width: 2rem;
            height: 2rem;
            position: absolute;
            top: .5rem;
            right: .5rem;
            transition: .8s ease all;
            -moz-transition: .8s ease all;
            -webkit-transition: .8s ease all;
            border: none;
            border-radius: 3px;
            color: #333;
            text-decoration: none;
            box-sizing: border-box;
            -webkit-box-sizing: border-box;
        }

        .close:hover {
            transition: .8s ease all;
            -moz-transition: .8s ease all;
            -webkit-transition: .8s ease all;
        }

        .close .iconfont {
            font-size: 2rem;
            color: black;
        }

        .rotate {
            cursor: pointer;
        }

        .rotate:hover {
            transition: transform 1.0s ease;
            -moz-transition: -moz-transform 1.0s ease;
            -webkit-transition: -webkit-transform 1.0s ease ;
        }

        .close .iconfont {
            font-size: 2rem;
            color: black;
        }

        .iconfont {
            font-size: 33px;
            font-style: normal;

            -webkit-font-smoothing: antialiased;
            -webkit-text-stroke-width: 0.2px;
            -moz-osx-font-smoothing: grayscale;
        }

</style>
   