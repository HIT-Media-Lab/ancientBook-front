<template>

    <!--4层导航按钮-->
    <div class="ry-menu-bar">
        <ul id="layer-head">
            <router-link to="{name:'book_varieties', params: this.$route.params.ancient_book_id}">
                <li id="layer-head-variety" @click="click_variety"><span v-show="variety_text">品种层</span><img v-show="variety_pic" src="../../../assets/img/picture-button/variety.png" height="31" width="134"/></li>
            </router-link>
            <router-link to="{name:'book_edition', params: this.$route.params.ancient_book_id}">
                <li id="layer-head-edition" @click="click_edition"><span v-show="edition_text">版本层</span><img v-show="edition_pic" src="../../../assets/img/picture-button/edition.png" height="30" width="133"/></li>
            </router-link>
            <router-link to="{name:'book_impression', params: this.$route.params.ancient_book_id}">
                <li id="layer-head-impression" @click="click_impression"><span v-show="impression_text">印次层</span><img v-show="impression_pic" src="../../../assets/img/picture-button/impression.png" height="30" width="133"/></li>
            </router-link>
            <router-link to="{name:'book_copy', params: this.$route.params.ancient_book_id}">
                <li id="layer-head-copy" @click="click_copy"><span v-show="copy_text">复本层</span><img v-show="copy_pic" src="../../../assets/img/picture-button/copy.png" height="30" width="133"/></li>
            </router-link>
        </ul>
    </div>

</template>

<script>
    export default{
        data() {
            return {
                ancient_book_id : '',
                variety_text : false,
                variety_pic : true,
                edition_text :true,
                edition_pic : false,
                impression_text : true,
                impression_pic : false,
                copy_text : true,
                copy_pic : false,
            }
        },

        methods: {
            /**
             * 通过路由获得古籍id
             */
            get_ancient_book_id() {
                this.ancient_book_id = this.$route.params.ancient_book_id;
            },


            click_variety() {
                this.variety_text = false;
                this.variety_pic = true;
                this.edition_text = true;
                this.edition_pic = false;
                this.impression_text = true;
                this.impression_pic = false;
                this.copy_text = true;
                this.copy_pic = false;
            },
            click_edition() {
                this.variety_text = true;
                this.variety_pic = false;
                this.edition_text = false;
                this.edition_pic = true;
                this.impression_text = true;
                this.impression_pic = false;
                this.copy_text = true;
                this.copy_pic = false;
            },
            click_impression() {
                this.variety_text = true;
                this.variety_pic = false;
                this.edition_text = true;
                this.edition_pic = false;
                this.impression_text = false;
                this.impression_pic = true;
                this.copy_text = true;
                this.copy_pic = false;
            },
            click_copy() {
                this.variety_text = true;
                this.variety_pic = false;
                this.edition_text = true;
                this.edition_pic = false;
                this.impression_text = true;
                this.impression_pic = false;
                this.copy_text = false;
                this.copy_pic = true;
            },
        },
    }
</script>

<style>
    .ry-menu-bar input{
        background-color: transparent;
    }

    #layer-head li{
        margin-top:15px;
        color: white;
        font-size: large;
        list-style: none;
        cursor: pointer;
        display: inline-block;
        height: 30px;
        width: 194px;
        text-align: center;
        line-height: 30px;
    }

    #layer-head li:visited{
        text-decoration: underline;
    }

</style>