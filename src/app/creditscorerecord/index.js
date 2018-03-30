/**
 * 申诉页，根据申诉状态，控制不同的显示
 */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { PullToRefresh, ListView } from 'antd-mobile';
import axios from 'axios';
import Notice from './components/notice';
import MyListView from './../common/components/mylistview';
import renderRow from './components/row';
import ErrorMsg from './../common/components/error';
import Separator from './components/separator';
import NoData from './components/noData';
import { filterByStatus, setTotalCount, filterByPage, getSomeKeys, compose, setCurrPage, setState } from './../common/util';
import * as style from './index.scss';
class IllegalRecord extends Component {
    state = {
        loading: true,
        errorMsg: null,
        list: null
    }
    delayTime = 1000
    count = 1
    isSticky = false
    tabHeight = 44.3
    pageSize = Math.ceil((window.innerHeight - this.tabHeight) / 80);
    componentDidMount() {
        this.onPageChange();
    }
    onPageChange = (currPage = 1, pageSize = this.pageSize) => {
        const promise = new Promise((resolve, reject) => {
            axios.get('./../data2.json').then((res) => {
                if (res.data.success) {
                    let data = res.data;
                    //模拟分页处理
                    data.list = compose(filterByStatus(this.state.status), setCurrPage(data))(currPage);
                    data.list = compose(filterByPage(data.currPage, data.pageSize, data.totalCount), setTotalCount(data))(data.list.length);
                    const properties = getSomeKeys(['currPage', 'pageSize', 'totalCount', 'list', 'errorMsg', 'showNotice'])(data);
                    setTimeout(() => {
                        if (this.count % 2 !== 0) {
                            this.count++;
                            resolve(properties);
                        } else {
                            this.count++;
                            reject('数据请求出错');
                        }
                    }, 1000);
                }
            }).catch(() => {
                reject('数据请求出错');
            })
        });
        promise.then((data) => {
            setState(this)({ loading: false, errorMsg: null, ...data });
        }).catch((errorMsg) => {
            setState(this)({ loading: false, errorMsg: errorMsg.toString(), list: null, currPage: currPage, });
        });
    }
    render() {
        const { showNotice } = this.state;
        return (
            <div className={style.illegalWrap}>
                {
                    showNotice && <Notice message={"你近期表现良好，点击恢复信用分>>"} url="http://www.baidu.com" />
                }
                <div className={showNotice ? style.moveDown : ''}>
                    <MyListView
                        {...this.state}
                        renderRow={renderRow}
                        onPageChange={this.onPageChange}
                        NoData={NoData}
                        ErrorMsg={ErrorMsg}
                        Separator={Separator}
                    />
                </div>
            </div>
        )
    }
}

ReactDOM.render(
    <IllegalRecord />, document.getElementById('root')
);