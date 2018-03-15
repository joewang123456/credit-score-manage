import React, { Component } from 'react';
import { connect } from 'react-redux';
import CreditScoreForm from './../components/creditscoreform';
import MyTable from './../../common/components/table/index';
import { getPageCreditScoreList } from './../service';
import { creditScoreTableHeader } from './../config';
import { routerBaseName } from './../../common/config';
import * as style from './../style/index.scss';

class CreditScoreReport extends Component {
    constructor(props) {
        super(props);
        this.renderOpts = {
            action: [
                { text: '查看信用分明细', type: 'link', url: routerBaseName + this.props.match.url + '/:anchorId' }
            ]
        }
        this.state = {
            loading: true,
            pageList: [],
            errorMsg: null,
            page: {
                currPage: 1,
                pageSize: 10,
                totalCount: 0
            }
        }
    }

    componentDidMount() {
        console.log(this.props.match);
        //请求分页数据
        this.loadPage();
    }

    /**
     * 组件卸载后，如果还有未处理完成的任务，立即结束
     */
    componentWillUnmount = () => {
        this.setState = (state, callback) => {
            return;
        };
    }

    /**
     * 查询，分页，排序
     */
    loadPage = (pagination, filters, sorter) => {
        this.setState({ loading: true });
        const promise = getPageCreditScoreList(pagination, filters, sorter);
        promise.then((data) => {
            this.setState({ loading: false });
            this.setState({ pageList: data.infoList, errorMsg: null, page: Object.assign({}, this.state.page, { currPage: data.currPage, totalCount: data.totalCount }) });
        }).catch((err) => {
            this.setState({ errorMsg: err.toString() });
        });
    }

    /**
     * 按条件搜索
     */
    doSearch = (filters) => {
        this.loadPage({}, filters);
    }
    //数据处理
    handleData = (pageList) => {
        pageList && pageList.map((item) => {
            item.gradeStr = item.grade < 0 ? '无等级' : 'V' + item.grade
        });
    }

    render() {
        // const { showLoading, data } = this.props.creditscoreApp;
        const { pageList, page, loading, errorMsg } = this.state;
        this.handleData(pageList);
        return (
            <div className={style.contentWrap}>
                <div className={style.header + " " + style.clearfix}>
                    <div className={style.title}>主播信用分查询</div>
                </div>
                <div className={style.content}>
                    <div className={style.header + " " + style.clearfix}>
                        <CreditScoreForm doSearch={this.doSearch} />
                    </div>
                    <div className={style.list}>
                        <MyTable rowKey={'anchorId'} loading={loading} errorMsg={errorMsg} dataSource={pageList} tableHeader={creditScoreTableHeader} page={page} pageKeys={['currPage', 'totalCount']} loadPage={this.loadPage} renderOpts={this.renderOpts} />
                    </div>
                </div>
            </div>
        );
    }
}

export default CreditScoreReport;