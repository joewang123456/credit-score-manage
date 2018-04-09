import React, { Component } from 'react';
import * as style from './index.scss';
import Pagination from './../pagination';
import defaultImage from './../../../../common/images/default.png'
import axios from "axios";
import utils from "./../../../../common/util";

import loadingImage from './../../images/loading.gif';

const pageSize = 10; //每页显示数据的量
//违规对象的map
const typeMap = {
    1: { label: '主播', style: 'iconAnchor' },
    2: { label: '专辑', style: 'iconAlbum' },
    3: { label: '声音', style: 'iconArtical' },
}

//申述状态的map
const appealMap = {
    'APPEAL_NOT':'不支持申诉',
    'APPEAL_WAITING':'待申诉',
    'APPEALING':'申诉中',
    'APPEAL_SUCCESS':'申诉成功',
    'APPEAL_FAIL':'申诉失败'
}


class violationRecord extends Component {
    constructor(props){
        super(props);
        this.state={
            activeTabKey: this.props.activeTabKey || '0', //获取激活tab的key,默认是all
            pageNumCount: 2, //分页的总数
            currentPageNum: 1, //当前分页数字
            listDataSource: [], //列表数据
        }
    }

    componentWillReceiveProps(nextProps){
        //props更新对象中包含activeTabKey时，触发tab切换请求
        let resultType = nextProps.activeTabKey; //请求类型
        if(resultType == this.props.activeTabKey) {
            this.getViolationList(resultType, 1);//请求新的列表
        }
    }

    /**
     * 获取违规列表
     * @param resultType 列表类型：全部0、待申诉1、申诉中2、已仲裁3
     * @param pageNo 页面
     */
    getViolationList = (resultType, pageNo) => {
        this.setState({activeTabKey: resultType}); //把获取的tab Key设置到state中
        //设置发送请求的参数
        let params = {
            anchorId: this.props.anchorId,
            resultType: Number(resultType),
            pageNo: pageNo,
            pageSize: pageSize,
        }
        console.log(params)
        axios.post('/credit-web/anchorCredit/getViolationList', params)
            .then((res) => {
            if (res.data.success) {
                console.log(res.data);
                let resData = res.data;
                this.setState({
                    pageNumCount: resData.totalPage, //分页的总数
                    currentPageNum: pageNo, //当前分页数字
                    listDataSource: resData.violationList, //列表数据
                })
            }
        }).catch(() => {

        });
    }

    /**
     * 分页改变事件
     * @param pageNum 改变分页数字
     */
    onPaginationChange=(pageNum)=>{
        //根据当前tab key，请求新的页面数据
        this.getViolationList(this.state.activeTabKey, Number(pageNum));
    }

    render() {
        return (
            <div>
                <div className={style.zhiBoWebList}>
                    {
                        this.state.loadingShowFlag?
                            (
                                <div className={style.loadingStyle}>
                                    <img src={loadingImage}/>
                                </div>
                            ):null
                    }
                    <table>
                        <thead>
                            <tr>
                                <th>声音</th>
                                <th>申述状态</th>
                                <th>操作</th>
                            </tr>
                        </thead>
                        <tbody>
                        {
                            this.state.listDataSource.length != 0 ?
                            this.state.listDataSource.map((item, index) => {
                                return (
                                    <tr key={index}>
                                        <td>
                                            <img src={defaultImage} alt=""/>
                                            <div>
                                                <p><span className={style[typeMap[item.type].style]}>{typeMap[item.type].label}</span>{item.businessName}</p>
                                                <p className={style.appealTime}>违规时间：{utils.DateFormat(item.violationTime, 'mm:ss')}</p>
                                            </div>
                                        </td>
                                        <td className={style[item.state]}>{appealMap[item.state]}</td>
                                        <td><a href={'http://m.ximalaya.com/ops-violation-front/index?recordId='+item.recordId}  target='_blank'>查看详情</a></td>
                                    </tr>
                                )
                            }):(<tr><td colSpan={3} style={{'textAlign':'center'}}>暂无数据</td></tr>)
                        }
                        </tbody>
                    </table>
                </div>
                <Pagination count={this.state.pageNumCount}
                            currentPageNum = {this.state.currentPageNum}
                            onChange={this.onPaginationChange}/>
            </div>
        );
    }
}

export default violationRecord;