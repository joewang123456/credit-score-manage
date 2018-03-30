import { message } from 'antd';
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


//测试使用
export const filterByStatus = (status) => (list) => {
    let result = list.filter((item) => {
        if (status === 'all') {
            return true;
        } else {
            return item.status === status;
        }
    });
    return result;
}

export const setTotalCount = (data) => (totalCount) => {
    data.totalCount = totalCount;
    return data.list;
}

export const filterByPage = (currPage, pageSize, total) => (list = []) => {
    const start = (currPage - 1) * pageSize
    const end = (currPage * pageSize - 1) > list.length ? list.length : (currPage * pageSize - 1);
    let result = list.filter((item, index) => {
        return index >= start && index <= end;
    });
    return result;
}

export const getSomeKeys = (keys) => (obj) => {
    let result = {}
    for (var i = 0; i < keys.length; i++) {
        result[keys[i]] = obj[keys[i]];
    }
    return result;
}

const pipe = (f1, f2) => (...args) => f1.call(this, f2.apply(this, args));
export const compose = (...args) => args.reduce(pipe, args.shift());

export const setCurrPage = (data) => (currPage) => {
    data.currPage = currPage;
    return data.list;
}

export const setState = (context) => (args) => {
    context.setState.call(context, Object.assign(context.state, { ...args }));
}