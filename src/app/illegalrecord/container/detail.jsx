import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Row, Col, Button, Input } from 'antd';
import { getViolationDetail } from './../action/index';
import ImagePreview from './../../common/components/imagePreview';
import * as style from './../style/index.scss';
import logo from './../img/logo.svg';

class IllegalDetail extends Component {
    constructor() {
        super();
        this.state = {
            status: 1,
            advise: '建议'
        };
    }

    componentDidMount() {
        //获取违规详情
        this.props.getViolationDetail(this.props.match.params.recordId);
    }

    componentWillUnmount = () => {
        this.setState = (state, callback) => {
            return;
        };
    }

    changeStatus = (e) => {
        const status = parseInt(e.target.getAttribute('status'));
        this.setState(Object.assign({}, this.state, { status: status }));
    }

    onChange = (e) => {
        const value = e.target.value;
        this.setState(Object.assign({}, this.state, { advise: value }));
    }

    render() {
        const { status, advise } = this.state;
        const { violationDetail } = this.props;
        const { violationDetailModel = {} } = violationDetail;
        const appealPicUrlList = violationDetailModel.appealPicUrlList || {};
        const stateModelList = violationDetailModel.stateModelList || [];
        console.log(violationDetailModel);
        return (
            <div className={style.contentWrap}>
                <div className={style.header + " " + style.clearfix}>
                    <div className={style.title}>违规处罚详情</div>
                    <div className={style.options}>
                        <Button type="primary" onClick={function () { window.history.back(-1); }}>返回</Button>
                    </div>
                </div>
                <div className={style.content}>
                    <Row className={style.selection}>
                        <Row className={style.selectionHeader}>
                            <Col span={24}>
                                <span>基本资料</span>
                            </Col>
                        </Row>

                        <Row className={style.selectionList}>
                            <Col className={style.selectionItem} xs={{ span: 24 }} sm={{ span: 12 }} md={{ span: 8 }} lg={{ span: 6 }}>
                                <label>主播ID：</label>
                                <span>{violationDetailModel.anchorId}</span>
                            </Col>
                            <Col className={style.selectionItem} xs={{ span: 24 }} sm={{ span: 12 }} md={{ span: 8 }} lg={{ span: 6 }}>
                                <label>主播昵称：</label>
                                <span>{violationDetailModel.nickName}</span>
                            </Col>
                            <Col className={style.selectionItem} xs={{ span: 24 }} sm={{ span: 12 }} md={{ span: 8 }} lg={{ span: 6 }}>
                                <label>认证类型：</label>
                                <span>{violationDetailModel.certification}</span>
                            </Col>
                            <Col className={style.selectionItem} xs={{ span: 24 }} sm={{ span: 12 }} md={{ span: 8 }} lg={{ span: 6 }}>
                                <label>主播等级：</label>
                                <span>{violationDetailModel.grade < 0 ? '无等级' : 'V' + violationDetailModel.grade}</span>
                            </Col>
                            <Col className={style.selectionItem} xs={{ span: 24 }} sm={{ span: 12 }} md={{ span: 8 }} lg={{ span: 6 }}>
                                <label>手机号码：</label>
                                <span>{violationDetailModel.phone}</span>
                            </Col>
                            <Col className={style.selectionItem} xs={{ span: 24 }} sm={{ span: 12 }} md={{ span: 8 }} lg={{ span: 6 }}>
                                <label>真实姓名：</label>
                                <span>{violationDetailModel.realName}</span>
                            </Col>
                            <Col className={style.selectionItem} xs={{ span: 24 }} sm={{ span: 12 }} md={{ span: 8 }} lg={{ span: 6 }}>
                                <label>公司名称：</label>
                                <span>{violationDetailModel.thirdpartyName}</span>
                            </Col>
                            <Col className={style.selectionItem} xs={{ span: 24 }} sm={{ span: 12 }} md={{ span: 8 }} lg={{ span: 6 }}>
                                <label>是否付费：</label>
                                <span>{violationDetailModel.paid ? '是' : '否'}</span>
                            </Col>
                        </Row>
                    </Row>

                    <Row className={style.selection}>
                        <Row className={style.selectionHeader}>
                            <Col span={24}>
                                <span>状态信息</span>
                            </Col>
                        </Row>

                        <Row className={style.selectionList}>
                            {
                                stateModelList.map((item, index) => {
                                    return (
                                        <div key={index}>
                                            <Col className={style.selectionItem} sm={{ span: 8 }} lg={{ span: 6 }}>
                                                <span>{item.date}</span>
                                            </Col>
                                            <Col className={style.selectionItem} sm={{ span: 8 }} lg={{ span: 6 }}>
                                                <span>{item.person}</span>
                                            </Col>
                                            <Col className={style.selectionItem} sm={{ span: 8 }} lg={{ span: 12 }}>
                                                <span>{item.title}</span>
                                            </Col>
                                        </div>
                                    );
                                })
                            }
                        </Row>
                    </Row>

                    <Row className={style.selection}>
                        <Row className={style.selectionHeader}>
                            <Col span={24}>
                                <span>违规信息</span>
                            </Col>
                        </Row>

                        <Row className={style.selectionList}>
                            <Col className={style.selectionItem} xs={{ span: 12 }} sm={{ span: 16 }} md={{ span: 18 }} lg={{ span: 20 }}>
                                <Row>
                                    <Col className={style.selectionItem} xs={{ span: 24 }} sm={{ span: 12 }} md={{ span: 10 }} lg={{ span: 8 }}>
                                        <label>违规类型：</label>
                                        <span>{violationDetailModel.violationType}</span>
                                    </Col>
                                    <Col className={style.selectionItem} xs={{ span: 24 }} sm={{ span: 12 }} md={{ span: 10 }} lg={{ span: 8 }}>
                                        <label>违规内容：</label>
                                        <span>{violationDetailModel.violationContent}</span>
                                    </Col>
                                    <Col className={style.selectionItem} xs={{ span: 24 }} sm={{ span: 12 }} md={{ span: 10 }} lg={{ span: 8 }}>
                                        <label>违规对象：</label>
                                        <span>{violationDetailModel.violationObject}</span>
                                    </Col>
                                    <Col className={style.selectionItem} xs={{ span: 24 }} sm={{ span: 12 }} md={{ span: 10 }} lg={{ span: 8 }}>
                                        <label>违规单号：</label>
                                        <span>{violationDetailModel.violationId}</span>
                                    </Col>
                                    <Col className={style.selectionItem} xs={{ span: 24 }} sm={{ span: 12 }} md={{ span: 10 }} lg={{ span: 8 }}>
                                        <label>违规生成时间：</label>
                                        <span>{violationDetailModel.violationCreateTime}</span>
                                    </Col>
                                    <Col className={style.selectionItem} span={24}>
                                        <label>处理意见：</label>
                                        <span>{violationDetailModel.handleComments}</span>
                                    </Col>
                                    <Col className={style.selectionItem} span={24}>
                                        <label>违规处罚：</label>
                                        <span>{violationDetailModel.publishDesc}</span>
                                    </Col>
                                    <Col className={style.selectionItem} span={24}>
                                        <label>申诉截止日期：</label>
                                        <span>{violationDetailModel.appealDeadLineTime}</span>
                                    </Col>
                                </Row>
                            </Col>
                            <Col className={style.selectionItem + " " + style.rightSelection} xs={{ span: 12 }} sm={{ span: 8 }} md={{ span: 6 }} lg={{ span: 4 }}>
                                <img alt="" src={violationDetailModel.businessPic} />
                                <div className={style.albumTitle}>{violationDetailModel.businessName}</div>
                                <div className={style.albumId}>
                                    <label>{violationDetailModel.violationObject + 'id:'}</label>
                                    <span>{violationDetailModel.businessId}</span>
                                </div>
                            </Col>
                        </Row>
                    </Row>
                    {
                        violationDetailModel.canAppeal &&
                        <Row className={style.selection}>
                            <Row className={style.selectionHeader}>
                                <Col span={24}>
                                    <span>申诉信息</span>
                                </Col>
                            </Row>

                            <Row className={style.selectionList}>
                                <Col span={18}>
                                    <Col className={style.selectionItem} span={12}>
                                        <label>申诉提交时间：</label>
                                        <span>{violationDetailModel.appealSubmitTime}</span>
                                    </Col>
                                    <Col className={style.selectionItem} span={24}>
                                        <label>申诉单号：</label>
                                        <span>{violationDetailModel.appealId ? violationDetailModel.appealId : ''}</span>
                                    </Col>
                                    <Col className={style.selectionItem} span={24}>
                                        <label>申诉理由：</label>
                                        <span>{violationDetailModel.appealReason}</span>
                                    </Col>
                                    <Col className={style.selectionItem} span={24}>
                                        <Col span={2}>
                                            <label>上传凭证:</label>
                                        </Col>
                                        <Col span={22}>
                                            {
                                                appealPicUrlList.length > 0 ? <ImagePreview urls={appealPicUrlList} /> : ''
                                            }

                                        </Col>
                                    </Col>
                                    <Col className={style.selectionItem} span={24}>
                                        <label>申诉结果：</label>
                                        <span>{violationDetailModel.appealResult}</span>
                                    </Col>
                                    <Col className={style.selectionItem} span={24}>
                                        <label>申诉判定意见：</label>
                                        <span>{violationDetailModel.appealComment}</span>
                                    </Col>

                                </Col>
                            </Row>
                        </Row>
                    }
                    <Row className={style.handleSelection}>
                        <Button type="primary" style={{ background: '#199949', border: '#199949' }} onClick={function () { window.history.back(-1); }}>返回</Button>
                    </Row>

                </div>
            </div>
        )
    }
}

// state map to props
const mapStateToProps = (state) => {
    const { violationDetail } = state;
    return { violationDetail };
}

// dispatch actions map to props
const mapDispatchToProps = (dispatch) => {
    return {
        getViolationDetail: (recordId) => {
            dispatch(getViolationDetail(recordId));
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(IllegalDetail);
