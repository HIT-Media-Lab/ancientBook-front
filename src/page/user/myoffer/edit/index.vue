<template>
    <div class="all">
        <recent_title class="j-edit-bar" :title="'我的贡献/本体编辑' + '（共' + this.count + '条）'">
            <select class="j-edit-select" v-model="sort" slot="children">
                <option>全部本体</option>
                <option>人物本体</option>
                <option>文献本体</option>
                <option>术语本体</option>
                <option>时间本体</option>
                <option>职官本体</option>
                <option>机构本体</option>
                <option>地点本体</option>
            </select>
        </recent_title>
        <div class="j-edit">
            <table class="table table-bordered j-table-box">
                <thead>
                <tr>
                    <th style="width: 400px">本体名称</th>
                    <th style="width: 200px">贡献</th>
                    <th style="width: 200px">时间</th>
                </tr>
                </thead>
                <tbody>
                <tr > <!--v-for循环数据里的数组数据-->
                    <td class="j-edit-table" style="width: 400px"></td>
                    <td class="j-edit-table" style="width: 200px"></td>
                    <td class="j-edit-table" style="width: 200px"></td>
                </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
    import recent_title from '../../../../component/noumenon-title.vue'
    import page_button from '../../../../component/paginator.vue'
    export default{
        components:{
            recent_title,
            page_button
        },
        data(){
            return{
                count: 0,
                sort: '全部本体',
                name: '',
                offer: '',
                time: '',
            }
        },
        methods:{

        }
    }
</script>

<style>
    .j-edit-bar{
        margin: -65px auto
    }
    .j-edit-select{
        margin-top: 70px;
        float: right;
    }
    .j-edit{
        margin: 110px auto;
        width: 900px ;
        height: auto ;
    }
    .j-table-box {
        width:900px;
        table-layout: fixed;    /*表格每个宽度确定*/
        text-align: center;
    }
    .j-edit-table{
        overflow:hidden;
        white-space:nowrap;
        text-overflow:ellipsis
    }
</style>