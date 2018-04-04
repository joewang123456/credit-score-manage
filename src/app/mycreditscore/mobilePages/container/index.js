import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { compose } from 'ramda';
import { Tabs, Badge } from 'antd-mobile';
import axios from 'axios';
import MyListView from './../../../common/components/mylistview';
import renderRow from './../components/row';
import { StickyContainer, Sticky } from 'react-sticky';
import NoData from './../components/noData';
import ErrorMsg from './../../../common/components/error';
import Separator from './../components/separator';
import { getSomePropertiesByKeys, changeKeyName, setState } from './../../../common/util';
import * as style from './index.scss';

const getTabs = (hasWaitAppeal) => {
    //全部0、待申诉1、申诉中2、已仲裁3
    const tabs = [];
    tabs.push({ title: <Badge >全部</Badge>, resultType: 0 });
    if (hasWaitAppeal) {
        tabs.push({ title: <Badge dot>待申诉</Badge>, resultType: 1 });
    } else {
        tabs.push({ title: <Badge >待申诉</Badge>, resultType: 1 });
    }
    tabs.push({ title: <Badge>申诉中</Badge>, resultType: 2 });
    tabs.push({ title: <Badge >已仲裁</Badge>, resultType: 3 });
    return tabs;
}

class IllegalRecord extends Component {

    state = {
        resultType: 0,
        loading: true,
        errorMsg: null,
        list: null,
        hasWaitAppeal: false
    }

    cacheMap = {
        '0': [], //全部
        '1': [], //待申诉
        '2': [], //申诉中
        '3': [] //已仲裁
    }

    delayTime = 1000
    isSticky = false
    tabHeight = 44.3
    pageSize = Math.ceil((window.innerHeight - this.tabHeight) / 75);//计算分页大小，此处针对于不同的屏幕高度，pc端网页的高度，动态计算pageSize大小，使页数正好填满一个页面
    /**
     * 切换tab页
     */
    onTabChange = (tab, index) => {
        setState(this)({ loading: true, resultType: tab.resultType });
        this.onPageChange();
    }

    componentWillMount() {
        this.anchorId = (location.search.match(/anchorId=([^&]*)/i) || [])[1] || 1;
        this.onPageChange();
    }

    componentDidMount() {
        //获取待申诉的记录
        axios.post('/credit-web/anchorCredit/getViolationList', {
            anchorId: this.anchorId,
            resultType: 1,
            pageNo: 1,
            pageSize: 10
        }).then((res) => {
            if (res.data.success) {
                let size = (res.data.violationList || []).length;
                this.setState({ hasWaitAppeal: !!size });
            }
        }).catch(() => {

        });
    }

    onPageChange = (pageNo = 1, pageSize = this.pageSize) => {
        const promise = new Promise((resolve, reject) => {
            axios.post('/credit-web/anchorCredit/getViolationList', {
                anchorId: this.anchorId,
                resultType: this.state.resultType,
                pageNo: pageNo,
                pageSize: pageSize
            }).then((res) => {
                if (res.data.success) {
                    let data = res.data;
                    const properties = compose(changeKeyName('violationList', 'list'), getSomePropertiesByKeys(['pageNo', 'pageSize', 'totalCount', 'violationList', 'errorMsg']))(data);
                    resolve(properties);
                }
            }).catch(() => {
                reject('数据请求出错');
            });
        });
        promise.then((data) => {
            setState(this)({ loading: false, ...data });
        }).catch((errorMsg) => {
            setState(this)({ loading: false, errorMsg: errorMsg.toString(), list: null, pageNo: 0 });
        });
    }

    render() {
        const { hasWaitAppeal } = this.state;
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
                                        <Tabs tabs={getTabs(hasWaitAppeal)}
                                            initialPage={0}
                                            prerenderingSiblingsNumber={0}
                                            onChange={this.onTabChange}
                                            swipeable={false}
                                            tabBarActiveTextColor={'rgb(252, 67, 11)'}
                                            tabBarUnderlineStyle={{ borderColor: 'rgb(252, 67, 11)' }}
                                            tabBarBackgroundColor='#F3F4F5'
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