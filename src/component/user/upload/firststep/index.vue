<template>

    <!--模块名称-->
    <div>
        <h2>1輸入古籍信息</h2>
        <button>調用其他信息</button>
        <button>取消上傳</button>
    </div>

    <div>
        <h3>古籍規範名稱：</h3>
        <h3>書名</h3>
        <div>
            <p>[品種層]責任結束時間-朝代 + 責任者 + 責任行為</p>
            <p>[版本層]責任結束時間-朝代 + 責任者 + 責任行為</p>
            <p>[印次層]責任結束時間-朝代 + 責任者 + 責任行為</p>
            <p>[複本層]責任結束時間-朝代 + 責任者 + 責任行為</p>
        </div>
    </div>

    <!--4层导航按钮-->
    <div id="form-head">
        <ul>
            <li class="li-now">品种层</li>
            <li>版本层</li>
            <li>印次层</li>
            <li>复本层</li>
        </ul>
    </div>

    <label><input type="checkbox" name="private"/>私密上傳</label>

    <div>
        <button>下一步</button>
    </div>

</template>