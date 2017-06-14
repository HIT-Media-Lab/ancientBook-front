<template>
    <div>
        <p class="j-noumenon-word">为您找到2条相关的本体信息</p>
        <div class="j-searched-noumenon">
            <router-link to="/noumenon/char_detail/1">
                <span class="j-w">李世民 （隋开皇十八年）  【人物】</span>
            </router-link>
            <br/>
            <router-link to="/noumenon/char_detail/1">
                <span class="j-w">参知政事 （唐）  【职官】</span>
            </router-link>
            <br/>
            <router-link to="/noumenon/char_detail/1">
                <span class="j-w">尚书省 （唐）  【机构】</span>
            </router-link>
        </div>
        <page_button></page_button>
    </div>
</template>

<script>
    import page_button from '../../component/paginator.vue'
    export default {
        components:{
            page_button
        },
        data(){
            return{

            }
        },
        methods:{

        }
    }
</script>

<style>
    .j-noumenon-word{
        display: inline-block;
        margin-top: 30px;
    }
    .j-searched-noumenon {
        margin-top: 30px;
        text-decoration: underline;
    }
    .j-w{
        color: #0f0f0f;
        margin-bottom: 15px;
    }
    .j-w:hover{
        color: brown;
    }
</style>