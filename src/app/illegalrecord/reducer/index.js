
import * as actionType from './../actionTypes/index';
import { combineReducers } from 'redux';
import moment from 'moment';
import Immutable from 'immutable';

const initialState = {
    list: [],
    page: {
        currPage: 1,
        pageSize: 10,
        totalCount: 0
    },
    errorMsg: null
};
/**
 * 违规列表
 * @param {*} state 
 * @param {*} action 
 */
const violationList = (state = initialState, action) => {
    switch (action.type) {
        case actionType.RECIEVE_LIST: {
            const { currPage, totalCount, pageSize } = action.data;
            return Object.assign({}, this.state, { list: action.data.infoList || [] }, { page: { currPage: currPage, totalCount: totalCount, pageSize: pageSize } }, { errorMsg: null });
        }
        case actionType.FETCH_LIST_FAILURE: {
            return Immutable.fromJS(state).set('errorMsg', action.errorMsg).toJS();
        }
        default: {
            return state;
        }
    }
}

/**
 * loading图标加载
 */
const showLoading = (state = false, action) => {
    switch (action.type) {
        case actionType.SHOW_LOADING: {
            return action.isShowLoading;
        }
        default: {
            return state;
        }
    }
}

/**
 * 过滤
 */
const nowSeconds = moment().hours(0).minutes(0).seconds(0).toDate().getTime();
const PreMonthSeconds = moment().hours(23).minutes(59).seconds(59).toDate().getTime();
const initFilter = {
    anchorId: '',
    recordId: '',
    typeId: '',
    appealBTime: '',
    appealETime: '',
    violationBTime: '',
    violationETime: ''
}
/**
 * 过滤状态
 * @param {*} state 
 * @param {*} action 
 */
const filter = (state = initFilter, action) => {
    switch (action.type) {
        case actionType.CHENGE_FILTER: {
            return Object.assign({}, state, action.filter);
        }
        default: {
            return state;
        }
    }
}

const initDetail = {
    detail: null,
    errorMsg: null
}
/**
 * 违规详情
 * @param {*} state 
 * @param {*} action 
 */
const violationDetail = (state = {}, action) => {
    switch (action.type) {
        case actionType.RECIEVE_DETAIL: {
            return action.data;
        }
        case actionType.FETCH_DETAIL_FAILURE: {
            return Immutable.fromJS(state).set('errorMsg', action.errorMsg).toJS();
        }
        default: {
            return state;
        }
    }
}

export default combineReducers({
    violationList,
    showLoading,
    filter,
    violationDetail
});