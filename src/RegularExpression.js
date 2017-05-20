/**
 * Created by Administrator on 2017/5/19.
 */
/**
 * 正则判断，返回true or false 判断用户名 账号 密码
 */
import Vue from 'vue'

Vue.prototype.checkuser = function (account) {
    let success = true;
    if (account.length != 0) {
        if (account.match('[a-zA-Z0-9]{8,10}$')) {
            return success
        } else {
            success = false;
            return success
        }
    }
};


Vue.prototype.checkpwd = function(pwd) {
    let success =true;
    if (pwd.length != 0) {
        if (pwd.match('[a-zA-Z0-9_]{6,16}$')) {
            return success
        } else {
            success=false;
            return success
        }
    }
};

Vue.prototype.checkname = function(name) {
    let success =true;
    if (name.length != 0) {
        if (name.match('^[\u4e00-\u9fa5a-zA-Z0-9]{2,10}$')) {
            return success
        } else {
            success=false;
            return success
        }
    }
};




