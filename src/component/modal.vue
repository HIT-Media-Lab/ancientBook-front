<template id="modal" >
    <div id="dialogs" class="dialogs" :class="{ 'dialog-active': show_modal }">
        <div class="dialog-content">
            <div class="j-close j-rotate">
                <span @click="$emit('fireclose')" style="font-size: 30px;">×</span>
            </div>
            <slot name="header"></slot>
            <slot name="body"></slot>
            <slot name="footer"></slot>
        </div>
        <div id="cover" :class="{ 'cover': show_modal }"></div>
    </div>
</template>

<script>
    export default {
        mounted(){
            if(this.show_modal){
                this.middle();
            }
        },
        data(){
            return {
                hhh: ''
//                show_modal: false
            }
        },
        props: ['show_modal'],
        methods: {
            middle(){
                let x = document.getElementById("dialogs").offsetWidth;
                let y = window.screen.width;
                let z = (y-x)/2;
                alert(z);
                document.getElementById('dialogs').style.left = z + 'px';
            }
        }
    }
</script>
<style>
        .dialogs {
            width: auto;
            height: auto;
            position: fixed;
            /*left: 35%;*/
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
        .dialog-content{
            background-color: white;
            position: relative;
            z-index: 3000;
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
        .cover {
            position:fixed;
            top: 0;
            right:0;
            left: 0;
            bottom:0;
            filter: alpha(opacity=60);
            background-color: #777;
            z-index: -1;
            visibility: visible;
            opacity:0.5;
            -moz-opacity:0.5;
        }
</style>
