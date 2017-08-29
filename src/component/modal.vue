<!--模态框组件-->
<template id="modal" >
    <div id="dialogs" class="dialogs" :class="{ 'dialog-active': show_modal }">
        <div class="dialog-content">
            <div class="j-close j-rotate" v-model="show_fork" v-show="show_fork">
                <span @click="$emit('fireclose')" style="font-size: 30px;">×</span>
            </div>
            <slot name="header"></slot> <!--模态框组件头部-->
            <slot name="body"></slot>   <!--模态框组件正文部-->
            <slot name="footer"></slot> <!--模态框组件脚部-->
        </div>
        <div id="cover" :class="{ 'cover': show_modal }"></div>  <!--模态框组件遮罩-->
    </div>
</template>

<script>
    import store from '../store'
    import bus from '../lib/bus'
    export default {
        watch: {
            show_modal: function () {
                this.show_fork = this.$store.getters.get_fork;   //控制叉的显隐
            }
        },
        mounted(){
            if(!this.show_modal){
                this.middle();
            }
        },
        data(){
            return {
                show_fork: true
        }
        },
        props: ['show_modal'],   //控制模态框的显隐
        methods: {
            /**
             * 控制模态框在不同大小居中
             */
            middle(){
                for (let i = 0; i < document.getElementsByClassName('dialogs').length; i++){
                    let x = document.getElementsByClassName("dialogs")[i].offsetWidth;  //获得模态框的宽度
                    let y = window.screen.width;   //获得显示屏分辨率
                    let z = (y-x)/2;
                    document.getElementsByClassName("dialogs")[i].style.left = z + 'px';  //使得对应模态框居中
                }
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
            background-color: #fef7e5;
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
