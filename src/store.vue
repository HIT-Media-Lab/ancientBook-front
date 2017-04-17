<template>
    <div id="store" class="store">
        <div>
            <router-link to="/bookstore">
            <p class="bookstore">古籍库</p>
            </router-link>
        </div>
        <div>
            <router-link to="/noumenon_store">
            <p class="noumenon_store">本体库</p>
            </router-link>
        </div>
        <div>
            <router-link to="/user">
                <p class="user_name">用户名</p>
            </router-link>
        </div>
    </div>
</template>

<script>

</script>

<style>
    .store{
        position: absolute;
        z-index:1;
        top: 0;
        left: 0;
        padding: 10px;
        background-color:#dac8c8;
        height: 20px;
        width: 100%;
    }

    .bookstore{
        position:absolute;
        margin: 0;
        right: 300px;
        font-weight:700;
        font-style:normal;
        font-size:16px;
        color:#999999;
    }

    .noumenon_store{
        margin: 0;
        position:absolute;
        right:180px;
        font-weight:700;
        font-style:normal;
        font-size:16px;
        color:#999999;
    }

    .user_name{
        margin: 0;
        position:absolute;
        right: 70px;
        font-weight:700;
        font-style:normal;
        font-size:16px;
        color:#999999;
        text-align:center;
    }
</style>