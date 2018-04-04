/**
 * 申诉页，根据申诉状态，控制不同的显示
 */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { compose } from 'ramda';
import { PullToRefresh, ListView } from 'antd-mobile';
import axios from 'axios';
import Notice from './components/notice';
import MyListView from './../../common/components/mylistview';
import renderRow from './components/row';
import ErrorMsg from './../../common/components/error';
import Separator from './components/separator';
import NoData from './components/noData';
import { getSomePropertiesByKeys, changeKeyName, setState } from './../../common/util';
import * as style from './index.scss';
class IllegalRecordMobile extends Component {
    state = {
        loading: true,
        errorMsg: null,
        list: null
    }
    tabHeight = 44.3
    pageSize = Math.ceil((window.innerHeight - this.tabHeight) / 75);
    componentWillMount() {
        this.anchorId = (location.search.match(/anchorId=([^&]*)/i) || [])[1] || 1;
    }
    componentDidMount() {
        this.onPageChange();
    }
    onPageChange = (pageNo = 1, pageSize = this.pageSize) => {
        const promise = new Promise((resolve, reject) => {
            axios.get('/credit-web/anchorCredit/getCreditScoreChanges?anchorId=' + this.anchorId + '&pageNo=' + pageNo + '&pageSize=' + pageSize).then((res) => {
                if (res.data.success) {
                    let data = res.data;
                    const properties = compose(changeKeyName('changeList', 'list'), getSomePropertiesByKeys(['pageNo', 'pageSize', 'totalCount', 'changeList', 'errorMsg']))(data);
                    resolve(properties);
                }
            }).catch(() => {
                reject('数据请求出错');
            })
        });
        promise.then((data) => {
            setState(this)({ loading: false, ...data });
        }).catch((errorMsg) => {
            setState(this)({ loading: false, errorMsg: errorMsg.toString(), list: null, pageNo: 0 });
        });
    }
    render() {
        return (
            <div className={style.illegalWrap}>
                <MyListView
                    {...this.state}
                    renderRow={renderRow}
                    onPageChange={this.onPageChange}
                    NoData={NoData}
                    ErrorMsg={ErrorMsg}
                    Separator={Separator}
                />
            </div>
        )
    }
}

ReactDOM.render(
    <IllegalRecordMobile />, document.getElementById('root')
);