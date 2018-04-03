import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Tabs, Badge } from 'antd-mobile';
import axios from 'axios';
import MyListView from './../../../common/components/mylistview';
import renderRow from './../components/row';
import { StickyContainer, Sticky } from 'react-sticky';
import NoData from './../components/noData';
import ErrorMsg from './../../../common/components/error';
import Separator from './../components/separator';
import * as style from './index.scss';
import pic from './../../images/default.png';
import { setTimeout } from 'timers';
import { filterByStatus, setTotalCount, filterByPage, getSomeKeys, compose, setCurrPage, setState } from './../../../common/util';

const tabs = [
    { title: <Badge >全部</Badge>, status: 'all' },
    { title: <Badge >待申诉</Badge>, status: '待申诉' },
    { title: <Badge >申诉中</Badge>, status: '申诉中' },
    { title: <Badge dot>已仲裁</Badge>, status: '已仲裁' }
];

class IllegalRecord extends Component {

    state = {
        status: 'all',
        loading: true,
        errorMsg: null,
        list: null
    }
    delayTime = 1000
    isSticky = false
    tabHeight = 44.3
    pageSize = 4 || Math.ceil((window.innerHeight - this.tabHeight) / 80);//计算分页大小，此处针对于不同的屏幕高度，pc端网页的高度，动态计算pageSize大小，使页数正好填满一个页面
    /**
     * 切换tab页
     */
    onTabChange = (tab, index) => {
        setState(this)({ loading: true, status: tab.status });
        this.onPageChange();
    }

    onPageChange = (currPage = 1, pageSize = this.pageSize) => {
        const promise = new Promise((resolve, reject) => {
            axios.get('./../../data.json').then((res) => {
                if (res.data.success) {
                    let data = res.data;
                    //模拟分页处理
                    data.list = compose(filterByStatus(this.state.status), setCurrPage(data))(currPage);
                    data.list = compose(filterByPage(data.currPage, (pageSize || data.pageSize), data.totalCount), setTotalCount(data))(data.list.length);
                    const properties = getSomeKeys(['currPage', 'pageSize', 'totalCount', 'list', 'errorMsg'])(data);

                    setTimeout(() => {
                        resolve(properties);
                    }, 1000);
                }
            }).catch(() => {
                reject('数据请求出错');
            })
        });
        promise.then((data) => {
            setState(this)({ loading: false, ...data });
        }).catch((errorMsg) => {
            setState(this)({ loading: false, errorMsg: errorMsg.toString(), list: null, currPage: 0 });
        });
    }

    componentDidMount() {
        this.onPageChange();
    }

    render() {
        return (
            <div className={style.illeagalList}>
                <div className={style.header}>违规记录</div>
                <StickyContainer>
                    <Sticky >
                        {/*
                            此处的参数参考react-sticky插件使用
                        */}
                        {
                            ({
                                isSticky
                            }) => {
                                return (
                                    <div className={isSticky ? style.sticky : ''}>
                                        <Tabs tabs={tabs}
                                            initialPage={0}
                                            prerenderingSiblingsNumber={0}
                                            onChange={this.onTabChange}
                                            swipeable={false}
                                            tabBarActiveTextColor={'rgb(252, 67, 11)'}
                                            tabBarUnderlineStyle={{ borderColor: 'rgb(252, 67, 11)' }}
                                        ></Tabs>
                                    </div>

                                )
                            }
                        }
                    </Sticky>
                    {/*
                        43.5是指tab条的高度
                    */}
                    <div style={{ minHeight: window.innerHeight - this.tabHeight }}>
                        <MyListView
                            {...this.state}
                            renderRow={renderRow}
                            onPageChange={this.onPageChange}
                            NoData={NoData}
                            ErrorMsg={ErrorMsg}
                            Separator={Separator}
                        />
                    </div>
                </StickyContainer>
            </div>
        )
    }
}

export default IllegalRecord;