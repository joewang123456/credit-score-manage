import React, { Component } from 'react';
import Breadcrumb from './../../components/breadcrumb';
import Pagination from './../../components/pagination';
import * as style from './index.scss';
import { routerBaseName } from './../../../../common/config';
import axios from "axios";
import utils from "../../../../common/util";

import loadingImage from './../../images/loading.gif';

const pageSize = 10; //每页显示数据的量

class creditScoreRecord extends Component {
    constructor(props){
        super(props);
        this.state={
            activeTabKey: this.props.activeTabKey || '0', //获取激活tab的key,默认是all
            pageNumCount: 0, //分页的总数
            currentPageNum: 1, //当前分页数字
            listDataSource:[], // 列表数据初始化
            loadingShowFlag: true, //loading显示状态标志
        }
    }

    anchorId = this.props.match.params.anchorId;//获取主播id
    /**
     * 请求信用分值记录
     * @param pageNum
     */
    requestScoreRecord = (pageNum) => {
        const promise = new Promise((resolve, reject) => {
            axios.get('/credit-web/anchorCredit/getCreditScoreChanges?anchorId=' + this.anchorId + '&pageNo=' + pageNum + '&pageSize=' + pageSize).then((res) => {
                if (res.data.success) {
                    resolve(res.data);
                }
            }).catch(() => {
                reject('数据请求出错');
            })
        });
        promise.then((data) => {
            this.setState({
                pageNumCount: data.totalPage, //分页的总数
                currentPageNum: pageNum, //当前分页数字
                listDataSource: data.changeList, //列表数据
                loadingShowFlag: false,
            })
        }).catch((errorMsg) => {

        });
    }

    componentDidMount(){
        this.requestScoreRecord(1);
    }

    /**
     * 分页改变事件
     * @param pageNum 改变分页数字
     */
    onPaginationChange=(pageNum)=>{
        this.setState({loadingShowFlag: true})
        //根据当前tab key，请求新的页面数据
        this.requestScoreRecord(Number(pageNum));
    }

    render() {

        const navObj = [{
            name:'信用',
            link: routerBaseName + '/mycreditscore/web/'+this.anchorId,
            active:false
        }, {
            name:'信用分值记录',
            link:null,
            active:true
        }];

        const listDataSource = this.state.listDataSource;

        return (
            <div style={{'padding':'0 10px'}}>
                <Breadcrumb data = {navObj} />
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
                                <th>变动原因</th>
                                <th>分值变动</th>
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
                                                <div>
                                                    <p>{item.content}</p>
                                                    <p className={style.appealTime}>违规时间：{utils.DateFormat(item.time, 'mm:ss')}</p>
                                                </div>
                                            </td>
                                            <td>{item.deltaScore}</td>
                                            <td><a href={'http://m.ximalaya.com/ops-violation-front/index?recordId='+item.recordId} target='_blank'>查看详情</a></td>
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
            </div>
        )
    }
}

export default creditScoreRecord;