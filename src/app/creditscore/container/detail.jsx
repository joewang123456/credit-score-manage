import React, { Component } from 'react';
import { Row, Col, Button } from 'antd';
import MyTable from './../../common/components/table/index';
import { getSpecifiedViolation } from './../service';
import { creditScoreDetailTableHeader } from './../config';
import { routerBaseName } from './../../common/config';
import utils from './../../common/util';
import * as style from './../style/index.scss';

class CreditScoreDetail extends Component {
    constructor() {
        super();
        this.state = {
            errorMsg: null,
            loading: true,
            detail: {}
        };
        this.renderOpts = {
            action: [
                { text: '查看违规详情', type: 'link', url: routerBaseName + '/illegalRecord/:recordId' }
            ]
        }
        this.anchorId = '';
    }

    componentDidMount() {
        this.anchorId = this.props.match.params.anchorId;
        //获取主播信息
        getSpecifiedViolation(this.anchorId).then((data) => {
            if (data.success) {
                //时间戳处理
                if (data.list) {
                    data.list.forEach((item) => {
                        item['violationCreateTime'] = item['violationCreateTime'] ? utils.DateFormat(item['violationCreateTime'], 'YYYY-MM-dd hh:mm:ss') : '/';
                        item['appealAuditTime'] = item['appealAuditTime'] ? utils.DateFormat(item['appealAuditTime'], 'YYYY-MM-dd hh:mm:ss') : '/';
                        item['appealSubmitTime'] = item['appealSubmitTime'] ? utils.DateFormat(item['appealSubmitTime'], 'YYYY-MM-dd hh:mm:ss') : '/';
                        item['punishmentTime'] = item['punishmentTime'] ? utils.DateFormat(item['punishmentTime'], 'YYYY-MM-dd hh:mm:ss') : '/';
                    });
                }
                this.setState({ detail: data, errorMsg: null, loading: false });
            } else {
                this.setState({ errorMsg: data.errorMsg });
            }
        }).catch((err) => {
            this.setState({ errorMsg: err.toString() });
        });
    }

    /**
     * 组件卸载后，如果还有未处理完成的任务，立即结束
     */
    componentWillUnmount = () => {
        this.setState = (state, callback) => {
            return;
        };
    }

    //数据处理
    handleData = (detail) => {
        //获取惩罚列表中描述字符串
        let punishmentList;
        detail.list && detail.list.map((item) => {
            punishmentList = item.punishmentList;
            let punishmentArr = [];
            if (punishmentList) {
                punishmentList.map((it) => {
                    punishmentArr.push(it.desc);
                });
                item.punishmentStr = punishmentArr.join(';');
            }
        });
    }

    render() {
        const { detail, loading, errorMsg } = this.state;
        this.handleData(detail);
        return (
            <div className={style.contentWrap}>
                <div className={style.header + " " + style.clearfix}>
                    <div className={style.title}>信用分明细</div>
                    <div className={style.options}>
                        <Button type="primary" onClick={function () { window.history.back(-1); }}>返回</Button>
                    </div>
                </div>
                <div className={style.content}>
                    <Row className={style.selection}>
                        <Row className={style.selectionList}>
                            <Col className={style.selectionItem} span={4}>
                                <label>主播ID：</label>
                                <span>{detail.anchorId}</span>
                            </Col>
                            <Col className={style.selectionItem} span={5}>
                                <label>主播昵称：</label>
                                <span>{detail.nickname}</span>
                            </Col>
                            <Col className={style.selectionItem} span={5}>
                                <label>认证类型：</label>
                                <span>{detail.verifyType}</span>
                            </Col>
                            <Col className={style.selectionItem} span={5}>
                                <label>真实姓名：</label>
                                <span>{detail.realName}</span>
                            </Col>
                            <Col className={style.selectionItem} span={5}>
                                <label>公司名称：</label>
                                <span>{detail.thirdpartyName}</span>
                            </Col>
                            <Col className={style.selectionItem} span={4}>
                                <label>信用分：</label>
                                <span>{detail.creditScore || 0}</span>
                            </Col>
                            <Col className={style.selectionItem} span={5}>
                                <label>已扣分分值：</label>
                                <span>{detail.deductedScore || 0}</span>
                            </Col>
                            <Col className={style.selectionItem} span={5}>
                                <label>申诉期的记录：</label>
                                <span>{(detail.appealPeriodSum)}</span>
                            </Col>
                            {/* <Col className={style.selectionItem} span={5}>
                                <label>节点处罚次数：</label>
                                <span>{detail.violationSum}</span>
                            </Col> */}
                            <Col className={style.selectionItem} span={5}>
                                <label>违规处罚次数：</label>
                                <span>{detail.violationSum || 0}</span>
                            </Col>
                            {/* <Col className={style.selectionItem} span={24}>
                                <a style={{ float: 'right', marginRight: '15px' }} href="javascript:;">查看受限权限></a>
                            </Col> */}
                        </Row>
                    </Row>

                    <Row className={style.selection}>
                        <div className={style.list}>
                            <MyTable rowKey={'recordId'} loading={loading} errorMsg={errorMsg} dataSource={detail.list} tableHeader={creditScoreDetailTableHeader} page={{ totalCount: (detail.list || []).length, pageSize: 10 }} pageKeys={['currPage', 'totalCount']} renderOpts={this.renderOpts} />
                        </div>
                    </Row>

                </div>
            </div>
        )
    }
}

export default CreditScoreDetail;
