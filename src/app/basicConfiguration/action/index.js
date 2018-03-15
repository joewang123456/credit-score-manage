import * as actionTypes from './../actionTypes/index';
import util from './../../common/util';
import { HOST, APIPREFIX } from './../../common/config';
import {
    getSimpleTypeInfoUrl,
    createRuleTypeUrl,
    createNewRuleUrl,
    modifyRuleUrl,
    createBusinessTypeUrl,
    modifyBusinessContentUrl,
    createBusinessContentUrl,
    unOrEnabledTypeUrl,
    searchRulesUrl
} from './../config';
//统一设置api请求url的前戳api
const getApiUrl = (url) => HOST + APIPREFIX + url;

/**
 * 请求前设置loading图标显示
 */
const showLoading = (isShow) => {
    return {
        type: actionTypes.SHOW_LOADING,
        showLoading: isShow
    }
}

/**
 * 请求失败后，接收数据
 */
const reciveFailureMsg = (err) => {
    return {
        type: actionTypes.FETCH_FAILURE,
        errorMsg: err
    }
}

/**
 * 接收违规类型
 */
const recieveruleTypeList = (list) => {
    return {
        type: actionTypes.RECIEVE_RULE_LIST,
        list: list
    }
}

/**
 * 接收惩罚数据
 */
const recievePunishmentList = (list) => {
    return {
        type: actionTypes.RECIEVE_PUNISH_LIST,
        list: list
    }
}

/**
 * 接收所属库信息
 * @param {*} list 
 */
const recieveLibraryList = (list) => {
    return {
        type: actionTypes.RECIEVE_LIBRARY,
        list: list
    }
}

/**
 * 接收业务类型数据
 */
const recieveBusinessList = (list) => {
    return {
        type: actionTypes.RECIEVE_BUSINESS_LIST,
        list: list
    }
}

/**
 * 接收配置报表数据
 */
const reciveConfigList = (list) => {
    return {
        type: actionTypes.FETCH_TABLE_LIST,
        list: list
    }
}

/**
 * 更新过滤条件action
 * @param {*} filter 
 */
const updateFilterAction = (filter) => {
    return {
        type: actionTypes.UPDATE_FILTER,
        filter: filter
    }
}

/**
 * 更新过滤条件
 * @param {*} filter 
 */
export const updateFilter = (filter) => {
    return (dispatch) => {
        dispatch(updateFilterAction(filter));
    }
}

/**
 * 更新分页
 * @param {*} page 
 */
const updatePageAction = (page) => {
    return {
        type: actionTypes.UPDATE_PAGE,
        page: page
    }
}
export const updatePage = (page) => {
    return (dispatch) => {
        dispatch(updatePageAction(page));
    }
}


/**
 * 获取规则类型和惩罚数据
 */
export const getRuleTypeAndPunishment = () => {
    return (dispatch, getState) => {
        fetch(getApiUrl(getSimpleTypeInfoUrl), {
            method: "GET",
            credentials: 'include'
        }).then((response) => {
            if (!response.ok) {
                throw Error(response.statusText);
            }
            return response.json();
        }).then((data) => {
            if (data.success) {
                //更新规则类型
                dispatch(recieveruleTypeList((data.ruleTypeModelList || []).sort((a, b) => a.typeId - b.typeId)));
                //更新处罚
                dispatch(recievePunishmentList(data.punishmentModelList));
                //更新业务类型数据
                dispatch(recieveBusinessList((data.businessInfoModelList || []).sort((a, b) => a.id - b.id)));
                //更新所属库
                let libraryList = [];
                for (var key in data.libraryMap) {
                    libraryList.push({ id: key, name: data.libraryMap[key] });
                }

                dispatch(recieveLibraryList(libraryList));
            } else {
                dispatch(reciveFailureMsg(data.errorMsg.toString()));
            }
        }).catch((err) => {
            dispatch(reciveFailureMsg('获取规则类型出错！'));
        });
    }
}

/**
 * 创建规则类型
 * @param {*} ruleTypeObj 
 */
export const createRuleType = (ruleTypeObj) => {
    const promise = new Promise((resolve, reject) => {
        fetch(getApiUrl(createRuleTypeUrl), {
            method: "POST",
            credentials: 'include',
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: util.getFormParams(ruleTypeObj)
        }).then((response) => {
            resolve(response.json());
        })
    });
    return promise;
};

/**
 * 创建/编辑规则内容
 * @param {*} params 
 * @param {*} type 
 */
export const updateRuleContent = (params, type) => {
    const url = type === 'add' ? createNewRuleUrl : modifyRuleUrl;
    const promise = new Promise((resolve, reject) => {
        fetch(getApiUrl(url), {
            method: "POST",
            credentials: 'include',
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: util.getFormParams(params)
        }).then((response) => {
            if (!response.ok) {
                throw Error(response.statusText);
            }
            resolve(response.json());
        }).catch((err) => {
            reject(err);
        });
    });
    return promise;
}

/**
 * 新建业务类型
 * @param {*} ruleTypeObj 
 */
export const createBusinessType = (ruleTypeObj) => {
    const promise = new Promise((resolve, reject) => {
        fetch(getApiUrl(createBusinessTypeUrl), {
            method: "POST",
            credentials: 'include',
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: util.getFormParams(ruleTypeObj)
        }).then((response) => {
            resolve(response.json());
        })
    });
    return promise;
};

/**
 * 新建/更新业务内容
 * @param {*} params 
 * @param {*} type 
 */
export const updateBusinessContent = (params, type) => {
    const url = type === 'add' ? createBusinessContentUrl : modifyBusinessContentUrl;
    const promise = new Promise((resolve, reject) => {
        fetch(getApiUrl(url), {
            method: "POST",
            credentials: 'include',
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: util.getFormParams(params)
        }).then((response) => {
            if (!response.ok) {
                throw Error(response.statusText);
            }
            resolve(response.json());
        }).catch((err) => {
            reject(err);
        });
    });
    return promise;
}

/**
 * 设置规则类型状态
 * @param {*} ruleId 
 * @param {*} state 
 */
export const unOrEnabledType = (ruleId, state) => {
    const promise = new Promise((resolve, reject) => {
        fetch(getApiUrl(unOrEnabledTypeUrl.replace(':ruleId', ruleId).replace(':state', state)), {
            method: "GET",
            credentials: 'include'
        }).then((response) => {
            resolve(response.json());
        })
    });
    return promise;
}

/**
 * 请求所有数据
 */
export const fetchAllList = () => {
    return (dispatch, getState) => {
        //发送请求前设置loading加载
        dispatch(showLoading(true));
        //发送ajax请求
        fetch(getApiUrl(searchRulesUrl.replace(':typeId', 0).replace(':state', 0)), { credentials: 'include' })
            .then(function (response) {
                if (!response.ok) {
                    throw Error(response.statusText);
                }
                return response.json();
            }).then((data) => {
                //设置loading隐藏
                dispatch(showLoading(false));
                //接收数据
                if (data.success) {
                    dispatch(reciveConfigList(handleData(data.ruleInfoModelList || [])));
                } else {
                    dispatch(reciveFailureMsg(data.errorMsg.toString()));
                }
            }).catch((err) => {
                //接收数据
                dispatch(reciveFailureMsg(err.toString()));
            });
    }
}

/**
 * 数据过滤
 * @param {*} dataList 
 */
export const getFilterDataList = (dataList = [], filter) => {
    const { typeId, auditTypeId, state } = filter;
    return dataList.filter((item, index) => {
        return (item.typeId === typeId || typeId === 0)
            && (item.auditTypeId === auditTypeId || auditTypeId === 0)
            && (item.state === state || state === 0);
    });
}

/**
* 数据处理
* @param {*} dataList 
*/
const handleData = (dataList = []) => {
    return dataList.map((item) => {
        //处理积分
        item['deductionCount'] = (item['deduction'] || '0;0;0').split(';').reduce((pre, next) => { return parseInt(pre) + parseInt(next) }, 0);
        //处罚措施
        item['punishmentStr'] = (item['punishmentList'] || []).map((item) => { return item.desc }).join(',');
        //申诉期权限控制
        // item['appealPeriodLimitTxt'] = (!item['shieldAlbum'] || item['shieldAlbum'] === "0") ? '/' : '声音/专辑全站屏蔽';
        //状态处理
        item['stateTxt'] = item['state'] === 1 ? '生效中' : '未启用';
        //时间戳处理
        item['updateTimeFormat'] = util.DateFormat(item['updateTime'], 'YYYY-MM-dd hh:mm:ss');
        //所属库
        item['library'] = item['library'] ? item['library'] : '/';
        return item;
    }).sort((a, b) => {
        return a.ruleId - b.ruleId;
    })
}

export const equal = (keys, pre, next, equalFun) => {
    let preObj = {};
    let nextObj = {};
    for (let key of keys) {
        preObj[key] = pre[key];
        nextObj[key] = next[key];
    }
    return equalFun(preObj, nextObj);
} 