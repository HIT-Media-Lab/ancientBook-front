<template>
    <div class="dialogs" v-bind:show.sync="show_change">
        <div class="dialog" v-bind:class="{ 'dialog-active': show_change }">
            <div class="dialog-content">
                <header class="dialog-header">
                    <span class="close rotate iconfont icon-close" @click="closeMotal()">×</span><!--关闭图标-->
                </header>
            </div>
        </div>
    </div>
</template>

<style>

</style>