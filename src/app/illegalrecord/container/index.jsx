import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import IllegalRecordForm from './../components/illegalrecordform';
import MyTable from './../../common/components/table/index';
import { illegalRecordTableHeader } from './../config';
import utils from './../../common/util';
import { getPageViolationList, changeFilterAction } from './../action/index';
import { routerBaseName } from './../../common/config';
import * as style from './../style/index.scss';

class IllegalRecordReport extends Component {
    constructor(props) {
        super(props);
        //初始化日期控件初始值，默认范围一个月
        this.initDate = {
            startDate: moment().subtract(1, 'months'),
            endDate: moment()
        }

        this.renderOpts = {
            action: [
                { text: '查看详情', type: 'link', url: routerBaseName + this.props.match.url + '/:recordId' },
            ]
        }
    }
    componentDidMount() {
        //请求分页数据
        this.props.getPageViolationList();
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
     * 查询，分页加载
     */
    loadPage = (pagination) => {
        //请求分页数据
        this.props.getPageViolationList(pagination);
    }

    /**
     * 按条件搜索
     */
    doSearch = (filter) => {
        console.log(filter);
        //设置过滤条件
        this.props.changeFilter(filter);
        //加载数据
        this.props.getPageViolationList({ current: 1 });
    }

    handleTableData = (list) => {
        (list || []).forEach((item, index) => {
            //时间戳转换成日期格式
            item['violationCreateTime'] = item['violationCreateTime'] ? utils.DateFormat(item['violationCreateTime'], 'YYYY-MM-dd hh:mm:ss') : '/';
            item['appealSubmitTime'] = item['appealSubmitTime'] ? utils.DateFormat(item['appealSubmitTime'], 'YYYY-MM-dd hh:mm:ss') : '/';
            item['punishmentTime'] = item['punishmentTime'] ? utils.DateFormat(item['punishmentTime'], 'YYYY-MM-dd hh:mm:ss') : '/';
        });
        return list;
    }

    render() {
        const { showLoading, violationList, filter } = this.props;
        return (
            <div className={style.contentWrap}>
                <div className={style.header + " " + style.clearfix}>
                    <div className={style.title}>违规申诉报表</div>
                </div>
                <div className={style.content}>
                    <div className={style.header + " " + style.clearfix}>
                        <IllegalRecordForm doSearch={this.doSearch} defaultValue={{ initDate: this.initDate, filter: filter }} />
                    </div>
                    <div className={style.list}>
                        <MyTable loading={showLoading} rowKey={'recordId'} tableHeader={illegalRecordTableHeader} errorMsg={violationList.errorMsg} dataSource={this.handleTableData(violationList.list)} page={violationList.page} pageKeys={['currPage', 'totalCount']} loadPage={this.loadPage} renderOpts={this.renderOpts} />
                    </div>
                </div>
            </div>
        );
    }
}

// state map to props
const mapStateToProps = (state) => {
    return state;
}

// dispatch actions map to props
const mapDispatchToProps = (dispatch) => {
    return {
        getPageViolationList: (pagination) => {
            dispatch(getPageViolationList(pagination));
        },
        changeFilter: (filter) => {
            dispatch(changeFilterAction(filter));
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(IllegalRecordReport);
