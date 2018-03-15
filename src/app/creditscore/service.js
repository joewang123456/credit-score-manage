import { HOST, APIPREFIX } from './../common/config';
import { creditScoreListUrl, specifiedViolationUrl } from './config';

//统一设置api请求url的前戳api
const getApiUrl = (url) => HOST + APIPREFIX + url;

/**
 * 所有主播积分列表
 * @param {*} page 
 * @param {*} filters 
 * @param {*} sort 
 */
export const getPageCreditScoreList = (page, filters = {}, sort) => {
    const { current = 1, pageSize = 9 } = page || {};
    const { anchorId = '' } = filters;
    const promise = new Promise((resolve, reject) => {
        fetch(getApiUrl(creditScoreListUrl) + "?pageSize=" + pageSize + "&currPage=" + current + "&anchorId=" + anchorId, { credentials: 'include' })
            .then(function (response) {
                if (!response.ok) {
                    throw Error(response.statusText);
                }
                return response.json();
            }).then((data) => {
                if (data.success) {
                    //接收数据
                    resolve(data);
                } else {
                    reject(data.errorMsg);
                }
            }).catch((err) => {
                reject(err);
            });
    });
    return promise;
}


/**
 * 单个主播违规记录
 * @param {*} anchorId 
 */
export const getSpecifiedViolation = (anchorId) => {
    const promise = new Promise((resolve, reject) => {
        fetch(getApiUrl(specifiedViolationUrl + "?anchorId=" + anchorId), {
            method: "GET",
            credentials: 'include'
        }).then((response) => {
            resolve(response.json());
        })
    });
    return promise;
}