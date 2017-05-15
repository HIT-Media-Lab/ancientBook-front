<template>
    <div class="search">
        <input placeholder=" 请输入你要搜索的内容" class="search-input" v-model="sort_box" v-on:keydown.enter="enter">
        <div>
           <router-link to="/search_index">
              <span class="sort_box1" v-show="sort_box.length!=0" @click="hide">搜古籍：{{sort_box}}</span>
           </router-link>
           <router-link to="/search_index">
               <span class="sort_box2" v-show="sort_box.length!=0" @click="hide">搜本体：{{sort_box}}</span>
           </router-link>
        </div>
    </div>
</template>

<script type="text/javascript">
    import store from '../../store/index'
    export default{
        data(){
            return{
                sort_box:'',
            }
        },
        methods:{
            hide:function () {
                this.sort_box = ''
            },
            enter:function () {
                this.sort_box = '';
                this.$router.push({path: '/search_index'});
            }
        }
    }
</script>

<style>
    .search{
        display: inline-block;
    }
    .search-input{
        margin-top:-5px;
        margin-left: 950px;
        width: 220px;
    }
    .sort_box1{
        margin-top:30px;
        margin-left: 950px;
    }
    .sort_box2{
        margin-top:50px;
        margin-left: 950px;
    }
</style>