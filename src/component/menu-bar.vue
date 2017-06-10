<template>

    <!--4层导航按钮-->
    <div class="ry-menu-bar">
        <ul id="layer-head">
            <router-link to="/user/upload1">
                <li id="layer-head-variety">品種層</li>
            </router-link>
            <router-link to="/user/upload1/edition">
                <li id="layer-head-edition">版本層</li>
            </router-link>
            <router-link to="/user/upload1/impression">
                <li id="layer-head-impression">印次層</li>
            </router-link>
            <router-link to="/user/upload1/copy">
                <li id="layer-head-copy">複本層</li>
            </router-link>
        </ul>
    </div>

</template>

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

    #layer-head li:focus{
        text-decoration: underline;
    }

</style>