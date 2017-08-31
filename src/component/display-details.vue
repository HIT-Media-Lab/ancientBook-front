<template>
    <div class="zxw-display-details">
        <div class="zxw-display-details-1" v-if="if_1" @click="show_tipinfo()">
            <div class="zxw-details_padding">
                <p v-model="details_list" v-if="selected_details_1 === 1">{{details_list}}</p>
                <p v-for="item in details_list" v-else="selected_details_1 === 0">{{item}}</p>
            </div>
        </div>
        <div class="zxw-display-details-2" v-else="if_2"></div>
    </div>
</template>

<script>
    export default{
        props:[ 'if_1','if_2','details_list','selected_details_1'],

        data(){
            return{

            }
        },

        methods:{
            show_tipinfo(){
                this.$emit('show_tipinfo');
            }
        }
    }
</script>

<style>
    .zxw-display-details{
        display:inline-block;
        opacity: 0.8;
    }

    .zxw-display-details-1{
        width: 330px;
        height: auto;
        background-color: darkgrey;
        display: inline-block;
        cursor: pointer;
        color: black;
    }

    .zxw-details_padding{
        padding: 10px 0 10px 20px;
    }

    .zxw-display-details-2{
        width: 330px;
        height: auto;
        display: inline-block;
        cursor: pointer;
    }

    .zxw-display-details-top{
        margin-right: 200px;
    }

</style>