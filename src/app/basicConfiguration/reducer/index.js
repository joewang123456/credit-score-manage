
import { combineReducers } from 'redux';
import * as actionType from './../actionTypes/index';
import Immutable from 'immutable';

/**
 * 违规类型
 * @param {*} state 
 * @param {*} action 
 */
const defaultRuleTypeList = [{ typeId: 0, name: '全部' }];
const ruleTypeList = (state = [], action) => {
    switch (action.type) {
        case actionType.RECIEVE_RULE_LIST: {
            return defaultRuleTypeList.concat(action.list || []);
        }
        default: {
            return state;
        }
    }
}

/**
 * 惩罚数据
 * @param {*} state 
 * @param {*} action 
 */
const punishmentList = (state = [], action) => {
    switch (action.type) {
        case actionType.RECIEVE_PUNISH_LIST: {
            return action.list;
        }
        default: {
            return state;
        }
    }
}

/**
 * 所属库
 * @param {*} state 
 * @param {*} action 
 */
const library = (state = [], action) => {
    switch (action.type) {
        case actionType.RECIEVE_LIBRARY: {
            return action.list;
        }
        default: {
            return state;
        }
    }
}

const businessList = (state = [], action) => {
    switch (action.type) {
        case actionType.RECIEVE_BUSINESS_LIST: {
            return action.list;
        }
        default: {
            return state;
        }
    }
}

/**
 * 加载loading图标
 * @param {*} state 
 * @param {*} action 
 */
const showLoadIcon = (state = false, action) => {
    switch (action.type) {
        case actionType.SHOW_LOADING: {
            return action.showLoading;
        }
        default: {
            return state;
        }
    }
}

/**
 * 错误处理
 * @param {*} state 
 * @param {*} action 
 */
const errorMsg = (state = null, action) => {
    switch (action.type) {
        case actionType.FETCH_FAILURE: {
            return action.errorMsg;
        }
        default: {
            return null;
        }
    }
}

/**
 * 基础配置违规类型报表
 * @param {*} state 
 * @param {*} action 
 */
const tableList = (state = [], action) => {
    switch (action.type) {
        case actionType.FETCH_TABLE_LIST: {
            return action.list;
        }
        default: {
            return state;
        }
    }
}

/**
 * 过滤条件
 * @param {*} state 
 * @param {*} action 
 */
const filter = (state = { typeId: 0, auditTypeId: 0, state: 0 }, action) => {
    switch (action.type) {
        case actionType.UPDATE_FILTER: {
            return Object.assign({}, state, action.filter);
        }
        default: {
            return state;
        }
    }
}

const initPage = {
    current: 1, //默认分页从1开始
    pageSize: 10,
    totalCount: 0
}
/**
 * 分页
 * @param {*} state 
 * @param {*} action 
 */
const page = (state = initPage, action) => {
    switch (action.type) {
        case actionType.UPDATE_PAGE: {
            return Object.assign({}, state, action.page);
        }
        default: {
            return state;
        }
    }
}

export default combineReducers({
    filter,
    page,
    ruleTypeList,
    businessList,
    showLoadIcon,
    punishmentList,
    library: library,
    tableList,
    errorMsg
});

