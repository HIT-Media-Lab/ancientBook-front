<!--<template>-->
    <!--<div class="dialogs" v-show="show">-->
        <!--<div class="dialog">-->
            <!--<div class="dialog-content">-->
                <!--<header class="dialog-header">-->
                    <!--<slot name="header">header</slot>-->
                    <!--<span class="close rotate iconfont icon-close" @click="closeDialog()">×</span>&lt;!&ndash;关闭图标&ndash;&gt;-->
                <!--</header>-->

                <!--<div class="dialog-body" >-->
                    <!--<slot name="main">main</slot>-->
                <!--</div>-->
                <!--<footer class="dialog-footer">-->
                    <!--&lt;!&ndash;按钮&ndash;&gt;-->
                    <!--<div>-->
                        <!--<button class="btn-general" style="margin-right: 10%" @click="closeDialog()" tabindex="-1">取消</button>-->
                        <!--<slot name="footer">footer</slot>-->
                    <!--</div>-->
                <!--</footer>-->
            <!--</div>-->
        <!--</div>-->
    <!--</div>-->
<!--</template>-->

<!--<script>-->
    <!--export default{-->
        <!--data(){-->
            <!--return{-->
                <!--show : true-->
            <!--}-->
        <!--},-->
        <!--methods:{-->
            <!--closeDialog() {-->
                <!--this.$emit('cancel');-->
                <!--this.show = false;-->
            <!--},-->
        <!--}-->
    <!--}-->

<!--</script>-->

<!--<style>-->

    <!--/*按钮样式*/-->
    <!--.btn-general{-->
        <!--background-color:sienna;   /*按钮填充颜色*/-->
        <!--color: #F2F2F2; /*按钮边框颜色*/-->
        <!--width:70px;-->
        <!--height: 28px;-->
        <!--border-radius: 8px;-->
        <!--border-color: transparent;-->
    <!--}-->

    <!--/*创建按钮的位置*/-->

    <!--.dialog {-->
        <!--width: 480px;-->
        <!--position: fixed;-->
        <!--left: 50%;-->
        <!--top: 6em;-->
        <!--transform: translateX(-50%);-->
        <!--z-index: 2000;-->
        <!--visibility: hidden;-->
        <!--backface-visibility: hidden;-->
        <!--perspective: 1300px;-->
    <!--}-->


    <!--.dialog-active .dialog-content {-->
        <!--position: relative;-->
        <!--opacity: 1;-->
        <!--transform: rotateY(0);-->
    <!--}-->

    <!--.dialog-content {-->
        <!--border-radius: 2px;-->
        <!--background: #fff;-->
        <!--overflow: hidden;-->
        <!--box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);-->
        <!--transition: .5s ease-in-out;-->
        <!--opacity: 0;-->
        <!--transform-style: preserve-3d;-->
        <!--transform: rotateY(-70deg);-->
    <!--}-->

    <!--.dialog-header {-->
        <!--background: #fff;-->
        <!--margin-top: 5%;-->
    <!--}-->

    <!--.dialog-body {-->
        <!--padding: 2em;-->
    <!--}-->

    <!--.dialog-footer {-->
        <!--padding: 3% 0;-->
        <!--text-align: center;-->
        <!--border-top: 1px solid rgba(0, 0, 0, 0.1);-->
    <!--}-->

    <!--.close {-->
        <!--display: inline-block;-->
        <!--width: 2rem;-->
        <!--height: 2rem;-->
        <!--position: absolute;-->
        <!--top: .5rem;-->
        <!--right: .5rem;-->
        <!--transition: .8s ease all;-->
        <!-- -moz-transition: .8s ease all;-->
        <!-- -webkit-transition: .8s ease all;-->
        <!--border: none;-->
        <!--border-radius: 3px;-->
        <!--color: #333;-->
        <!--text-decoration: none;-->
        <!--box-sizing: border-box;-->
        <!-- -webkit-box-sizing: border-box;-->
    <!--}-->

    <!--.close:hover {-->
        <!--transition: .8s ease all;-->
        <!-- -moz-transition: .8s ease all;-->
        <!-- -webkit-transition: .8s ease all;-->
    <!--}-->

    <!--.close .iconfont {-->
        <!--font-size: 2rem;-->
        <!--color: black;-->
    <!--}-->

    <!--.rotate {-->
        <!--cursor: pointer;-->
    <!--}-->

    <!--.rotate:hover {-->
        <!--transition: transform 1.0s ease;-->
        <!-- -moz-transition: -moz-transform 1.0s ease;-->
        <!-- -webkit-transition: -webkit-transform 1.0s ease ;-->
    <!--}-->

    <!--.close .iconfont {-->
        <!--font-size: 2rem;-->
        <!--color: black;-->
    <!--}-->

    <!--.iconfont {-->
        <!--font-size: 33px;-->
        <!--font-style: normal;-->

        <!-- -webkit-font-smoothing: antialiased;-->
        <!-- -webkit-text-stroke-width: 0.2px;-->
        <!-- -moz-osx-font-smoothing: grayscale;-->
    <!--}-->

<!--</style>-->