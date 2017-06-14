<template>
    <div>
        <p class="j-book-word">为您找到2条相关的古籍信息</p>
        <div class="j-searched-book">
            <div class="j-shi1">
                <router-link to="/bookstore/book_info">
                    <img src="../../assets/img/古籍封面1.jpg" class="j-book-img1">
                </router-link>
                <div class="j-book1-word">
                    <router-link to="/bookstore/book_info">
                        <p class="j-book1-word1">诗经</p>
                    </router-link>
                    <p>[品种层] 责任结束时间-朝代 + 责任者 + 责任行为</p>
                    <p>[版本层] 责任结束时间-朝代 + 责任者 + 责任行为</p>
                    <p>[印次层] 责任结束时间-朝代 + 责任者 + 责任行为</p>
                    <p>[复本层] 责任结束时间-朝代 + 责任者 + 责任行为</p>
                </div>
            </div>
            <div class="j-shi1">
                <router-link to="/bookstore/book_info">
                    <img src="../../assets/img/古籍封面2.jpg" class="j-book-img1">
                </router-link>
                <div class="j-book1-word">
                    <router-link to="/bookstore/book_info">
                        <p class="j-book1-word1">山海经</p>
                    </router-link>
                    <p>[品种层] 责任结束时间-朝代 + 责任者 + 责任行为</p>
                    <p>[版本层] 责任结束时间-朝代 + 责任者 + 责任行为</p>
                    <p>[印次层] 责任结束时间-朝代 + 责任者 + 责任行为</p>
                    <p>[复本层] 责任结束时间-朝代 + 责任者 + 责任行为</p>
                </div>
            </div>
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
    .j-shi1{
        margin-bottom: 50px;
    }
    .j-book-word{
        display: inline-block;
        margin-top: 30px;
    }
    .j-searched-book{
        margin-top: 30px;
    }
    .j-book-img1{
        width: 200px;
        vertical-align: top;
    }
    .j-book1-word{
        display: inline-block;
        margin-left: 35px;
    }
    .j-book1-word1{
        color: #0f0f0f;
        text-decoration: underline;
        margin-bottom: 20px;
        font-weight: 900;
        display: inline-block;
    }
    .j-book1-word1:hover{
        color: brown;
    }
</style>