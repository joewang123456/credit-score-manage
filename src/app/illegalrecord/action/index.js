import * as actionTypes from './../actionTypes/index.js';
import { HOST, APIPREFIX } from './../../common/config';
import moment from 'moment';
import {
    getSimpleTypeInfoUrl,
    allViolationListUrl,
    violationDetailUrl
} from './../config'
import utils from './../../common/util';
//统一设置api请求url的前戳api
const getApiUrl = (url) => HOST + APIPREFIX + url;


/**
 * 过滤条件
 * @param {*} filter 
 */
export const changeFilterAction = (filter) => {
    return {
        type: actionTypes.CHENGE_FILTER,
        filter: filter
    }
}

/**
 *接收违规记录列表
 */
const reciveViolationList = (list) => {
    return {
        type: actionTypes.RECIEVE_LIST,
        data: list
    }
}
/**
 * 接收违规详情
 * @param {*} detail 
 */
const reciveViolationDetail = (detail) => {
    return {
        type: actionTypes.RECIEVE_DETAIL,
        data: detail
    }
}

/**
 * 失败接收
 * @param {*} err 
 */
const reciveListFailureMsg = (err) => {
    return {
        type: actionTypes.FETCH_LIST_FAILURE,
        errorMsg: err
    }
}

/**
 * 失败接收
 * @param {*} err 
 */
const reciveDetailFailureMsg = (err) => {
    return {
        type: actionTypes.FETCH_DETAIL_FAILURE,
        errorMsg: err
    }
}

/**
 * 设置loading图标显示
 */
const showLoading = (isShow) => {
    return {
        type: actionTypes.SHOW_LOADING,
        isShowLoading: isShow
    }
}

/**
 * 获取规则类型列表
 */
export const getRuleTypeInfo = () => {
    const promise = new Promise((resolve, reject) => {
        fetch(getApiUrl(getSimpleTypeInfoUrl), {
            method: "GET",
            credentials: 'include'
        }).then((response) => {
            resolve(response.json());
        })
    });
    return promise;
}

/**
 * 在处理post请求时，将json对象转换成表单形式传参(name1=value1&name2=value2...)
 * @param {*} jsonObj 
 */
const getParams = (jsonObj) => {
    let params = [];
    for (var key in jsonObj) {
        params.push(key + "=" + jsonObj[key]);
    }
    return params.join('&');
}

/**
 * 请求违规列表
 */
export const getPageViolationList = (pagination) => {
    return (dispatch, getState) => {
        const { violationList, filter } = getState();
        let { currPage, pageSize } = violationList.page;
        //当分页时，设置当前页
        if (pagination) {
            currPage = pagination.current;
        }
        //发送请求前设置loading加载
        dispatch(showLoading(true));
        //发送ajax请求
        fetch(getApiUrl(allViolationListUrl + "?" + getParams({ currPage, pageSize }) + '&' + getParams(filter)), {
            method: "GET",
            credentials: 'include'
        }).then(function (response) {
            if (!response.ok) {
                throw Error(response.statusText);
            }
            return response.json();
        }).then((data) => {
            //设置loading隐藏
            dispatch(showLoading(false));
            //接收数据
            if (data.success) {
                dispatch(reciveViolationList(data));
            } else {
                dispatch(reciveListFailureMsg(data.errorMsg.toString()));
            }
        }).catch((err) => {
            //接收数据
            dispatch(reciveListFailureMsg(err.toString()));
        });
    }
}

/**
 * 请求违规详情
 * @param {*} recordId 
 */
export const getViolationDetail = (recordId) => {
    return (dispatch, getState) => {
        //发送请求前设置loading加载
        dispatch(showLoading(true));
        fetch(getApiUrl(violationDetailUrl + "?recordId=" + recordId), {
            method: "GET",
            credentials: 'include'
        }).then(function (response) {
            if (!response.ok) {
                throw Error(response.statusText);
            }
            return response.json();
        }).then((data) => {
            //设置loading隐藏
            dispatch(showLoading(false));
            //接收数据
            if (data.success) {
                handleDetailData(data.violationDetailModel, ['appealDeadLineTime', 'appealSubmitTime', 'violationCreateTime']);
                dispatch(reciveViolationDetail(data));
            } else {
                dispatch(reciveDetailFailureMsg(data.errorMsg.toString()));
            }
        }).catch((err) => {
            //接收数据
            dispatch(reciveDetailFailureMsg(err.toString()));
        });
    }
}

const handleDetailData = (violationDetailModel = {}, keys = []) => {
    //时间戳转换成日期格式
    keys.map((item) => {
        violationDetailModel[item] = violationDetailModel[item] ? utils.DateFormat(violationDetailModel[item], 'YYYY-MM-dd hh:mm:ss') : '';
    });
    //状态时间转换成日期
    let stateModelList = violationDetailModel.stateModelList || [];
    stateModelList.map((item) => {
        item.date = utils.DateFormat(item.date, 'YYYY-MM-dd hh:mm:ss');
    });
    //是否屏蔽
    violationDetailModel.publishDesc = violationDetailModel.deductedScore ? '扣除信用分' + violationDetailModel.deductedScore : '';//扣除信用积分
    // violationDetailModel.publishDesc += violationDetailModel.shieldAlbum ? '申诉期间推荐屏蔽' : '';//推荐屏蔽
    violationDetailModel.punishment ? violationDetailModel.publishDesc += "," + violationDetailModel.punishment.desc : '';//惩罚措施
}
