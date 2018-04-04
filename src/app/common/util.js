import { message } from 'antd';
import { curry } from 'ramda';
/**
 * 数组类型判断
 * @param {*} arr 
 */
const isArray = (arr) => {
    return Object.prototype.toString.call(arr) === "[object Array]";
}

/**
 * 将时间戳按format格式转换成日期格式
 * @param {*} time 
 * @param {*} format 
 */
const DateFormat = function (time, format) {
    if (!(/^[0-9]*$/.test(time))) {
        return '';
    }
    time = time - 0;
    const d = new Date(time);
    var date = {
        "M+": d.getMonth() + 1,
        "d+": d.getDate(),
        "h+": d.getHours(),
        "m+": d.getMinutes(),
        "s+": d.getSeconds(),
        "q+": Math.floor((d.getMonth() + 3) / 3),
        "S+": d.getMilliseconds()
    };
    if (/(y+)/i.test(format)) {
        format = format.replace(RegExp.$1, (d.getFullYear() + '').substr(4 - RegExp.$1.length));
    }
    for (var k in date) {
        if (new RegExp("(" + k + ")").test(format)) {
            format = format.replace(RegExp.$1, RegExp.$1.length == 1
                ? date[k] : ("00" + date[k]).substr(("" + date[k]).length));
        }
    }
    return format;
}

/**
 * 在处理post请求时，将json对象转换成表单形式传参(name1=value1&name2=value2...)
 * @param {*} jsonObj 
 */
const getFormParams = (jsonObj) => {
    let params = [];
    for (var key in jsonObj) {
        params.push(key + "=" + jsonObj[key]);
    }
    return params.join('&');
}

/**
 * 设置全局操作成功/失败提示框
 */
export const openPopup = (type, msg) => {
    message.config({
        top: 100,
        duration: 1//单位秒
    });
    switch (type) {
        case 'success': {//成功
            return message.success(msg);
        }
        case 'error': {//失败
            return message.error(msg);
        }
        case 'warning': {//警告
            return message.warning(msg);
        }
        default: {//一般提示
            return message.info(msg);
        }
    }
}

function getUserAgent() {
    var userAgentInfo = navigator.userAgent.toLowerCase();
    var Agents = ["Android", "iPhone",
        "SymbianOS", "Windows Phone",
        "iPad", "iPod"];
    var flag = true;
    for (var v = 0; v < Agents.length; v++) {
        if (userAgentInfo.indexOf(Agents[v].toLowerCase()) > 0) {
            flag = false;
            break;
        }
    }
    return flag ? 'PC' : 'NoPC';
}

const utils = {
    isArray: isArray,
    DateFormat: DateFormat,
    getFormParams: getFormParams,
    openPopup: openPopup,
    getUserAgent: getUserAgent
}

export default utils;

/**
 * 获取对象的一部分属性
 * @param {*} keys 
 */
export const getSomePropertiesByKeys = (keys) => (obj) => {
    let result = {}
    for (var i = 0; i < keys.length; i++) {
        result[keys[i]] = obj[keys[i]];
    }
    return result;
}

/**
 * 修改对象默写属性的key名称
 * @param {*} key 
 * @param {*} newKey 
 * @param {*} obj 
 */
export const changeKeyName = curry((key, newKey, obj) => {
    if (obj.hasOwnProperty(key)) {
        obj[newKey] = obj[key];
        delete obj[key];
    }
    return obj;
});

export const setState = (context) => (args) => {
    context.setState.call(context, Object.assign(context.state, { ...args }));
}