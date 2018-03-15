/**
 * 申诉页，根据申诉状态，控制不同的显示
 */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { WhiteSpace, Button, Toast } from 'antd-mobile';
import axios from 'axios';
import ImagePreview from './../../common/components/imagePreview/index';
import MyAppeal from './../components/myAppeal';
import ErrorView from './../components/errorView';
import LoadPage from './../components/loadPage';
import TextOver from './../components/textOver';
import util from './../../common/util';
import {
    typeMap,
    appealIconMap,
    xmlyRuleDocUrl,
    notCanAppeal,
    canAppeal,
    inAppeal,
    appealSuccess,
    appealFail,
    publishMap
} from './../config';
import * as style from './../style/index.scss';
import { setInterval, setTimeout } from 'timers';

class AnchorAppeal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            illegalInfo: {},
            isShowLoad: true,
            errorMsg: null,
            titleOverflow: false
        };
    }
    recordId = 0
    errorTip = '获取数据出错！'

    componentDidMount() {
        this.recordId = (location.search.match(/recordId=([^&]*)/i) || [])[1] || 1;
        //获取申诉详情
        //PC端内嵌到主播工作台中，通过iframe内嵌，会导致此app多次render，导致闪动，此处设置延时，目的等到外面框架加载后在render当前组件
        if (util.getUserAgent() === 'PC') {
            document.getElementsByTagName('html')[0].style.height = "auto";
            setTimeout(() => {
                this.getAppealInfo();
            }, 500);
        } else {
            this.getAppealInfo();
        }
    }

    componentWillReceiveProps() {
        // this.getAppealInfo();
    }

    //获取申诉
    getAppealInfo = () => {
        if (this.recordId < 0) {
            this.setState({ errorMsg: '违规记录没有发现！', isShowLoad: false });
            return;
        }
        axios({
            url: '/ops-violation-front/getViolation?recordId=' + this.recordId,
            method: 'get',
            withCredentials: true //跨域加上cookie
        }).then((res) => {
            if ((res.status >= 200 && res.status <= 300) || res.status === 304) {
                const result = res.data;
                if (result.code === 200) {
                    //日期处理
                    let appeal = JSON.parse(result.msg);
                    // if (!appeal.appeal) {
                    //     appeal = { "appeal": "还哈哈哈哈哈哈哈哈哈哈哈哈", "businessId": 458647, "businessName": "16", "canAppeal": 1, "content": "测试申诉123(可申诉)", "deductedScore": 8, "isOverdue": 0, "message": "您好，您的声音《16》因【哼(测试下架私信)】，违反了《喜马拉雅平台规范》如需申诉，请于【2018-03-17 13:54:30】前提交申诉理由和凭证。申诉期间此声音将无法搜索到，也不会被推荐；若逾期不申诉或申诉失败将进行下架处理，且系统将记录您的违规行为，请遵守规则规范哦。", "pic": "http://fdfs.test.ximalaya.com/group1/M00/FE/14/wKgDplpEjN2AN-t6AAOE8eOUllU811.jpg", "punishment": "underCarriage", "result": null, "state": 2, "type": 3, "urls": "http://fdfs.test.ximalaya.com/group1/M00/CE/81/wKgD3lqouo-ASKZWAALFayaW0xc159.jpg", "violationCreateTime": 1521006871000 }
                    // }

                    appeal.violationCreateTime = util.DateFormat(appeal.violationCreateTime, 'YYYY-MM-dd hh:mm:ss');//日期格式转换
                    appeal.punishmentStr = publishMap[appeal.punishment];
                    this.setState({ illegalInfo: appeal, isShowLoad: false, errorMsg: null });
                } else {
                    if (result.code === '501') {
                        this.setState({ errorMsg: result.msg, isShowLoad: false });
                    } else {
                        Toast.fail(this.errorTip, 1);
                        this.setState({ errorMsg: this.errorTip, isShowLoad: false });
                    }
                }
            } else {
                throw Error(res.statusText);
            }
        }).catch((e) => {
            Toast.fail(this.errorTip, 1);
            this.setState({ errorMsg: this.errorTip, isShowLoad: false });
        });
    }

    //提交申诉
    submitAppeal = (appealInfo = {}) => {
        //加载load
        this.setState({ isShowLoad: true });
        //添加recordId
        appealInfo.recordId = this.recordId;
        axios({
            url: '/ops-violation-front/submit',
            method: 'post',
            headers: {
                "Content-Type": "application/json"
            },
            data: JSON.stringify(appealInfo),
            withCredentials: true //跨域加上cookie
        }).then((res) => {
            this.setState({ isShowLoad: false })
            if ((res.status >= 200 && res.status <= 300) || res.status === 304) {
                const result = res.data;
                if (result.code === 200) {
                    Toast.success(result.msg, 2);
                    //提交成功,进入到申诉中状态
                    this.setState({ illegalInfo: { ...this.state.illegalInfo, state: inAppeal, appeal: appealInfo.appeal, result: '仲裁进行中，请耐心等待哦~', urls: appealInfo.urls } })
                } else {
                    Toast.fail('提交失败!', 2);
                }
            } else {
                throw Error(res.statusText);
            }
        }).catch((err) => {
            Toast.fail('提交出错!', 2);
        });
    }

    //根据申诉状态，动态加载视图
    getViewByState = (state) => {
        switch (state) {
            case notCanAppeal: {//不可以申诉
                return (
                    <div className={style.selection}>
                        <div className={style.body}>
                            <div className={style.guifan}>
                                <div>立即查阅
                                {util.getUserAgent() === 'PC' ? <a href={xmlyRuleDocUrl} target="_blank">《喜马拉雅平台规范》</a> : <a href={xmlyRuleDocUrl}>《喜马拉雅平台规范》</a>}
                                </div>
                                <div>请务必遵守哦~</div>

                            </div>
                        </div>
                    </div>
                );
            }
            case canAppeal: {//可以申诉，且还未申诉
                //过期标识1：过期，0：未过期
                let { isOverdue } = this.state.illegalInfo;
                return (
                    isOverdue === 1 ?
                        <div>
                            <div className={style.footer}>
                                <Button className={style.submitBtn + " " + style.disabled} type="warning" size="small">我要申诉</Button><WhiteSpace />
                            </div>
                            <div className={style.tip}>
                                已过申诉期，不能提交申诉
                            </div>
                        </div>
                        : <MyAppeal submitAppeal={this.submitAppeal} />
                );
            }
            case inAppeal://申诉中
            case appealSuccess://申诉成功
            case appealFail: {//申诉失败
                let { urls, result, appeal } = this.state.illegalInfo;
                return (
                    <div>
                        <div className={style.selection}>
                            <div className={style.header + " " + style.clearfix}>
                                <div className={style.left}>我的申诉</div>
                            </div>
                            <div className={style.body}>
                                <div className={style.item}>
                                    {appeal}
                                </div>

                                <div className={style.body}>
                                    <ImagePreview urls={(urls || []).split(',')} />
                                </div>
                            </div>
                        </div>
                        <div className={style.selection} style={{ marginTop: '0px' }}>
                            <div className={style.header + " " + style.clearfix}>
                                <div className={style.left}>平台仲裁</div>
                            </div>
                            <div className={style.body}>
                                {
                                    <div className={style.item} style={state === inAppeal ? { textAlign: 'center', color: '#999999' } : {}}>
                                        {result}
                                    </div>
                                }

                            </div>
                        </div>
                    </div>
                );
            }
            default: {
                return '';
            }
        }
    }

    render() {
        const { illegalInfo = {}, isShowLoad, errorMsg } = this.state;
        const isPC = (util.getUserAgent() === 'PC');
        return (
            <div className={style.app}>
                {
                    errorMsg && <ErrorView errorMsg={errorMsg} />
                }
                {
                    !errorMsg && isPC && <div className={style.navHeader}>
                        违规详情
                    </div>
                }
                {
                    !errorMsg && !isShowLoad &&
                    <div className={style.content}>
                        <div className={style.myCard}>
                            <div className={style.left}>
                                <img src={illegalInfo.pic} />
                            </div>
                            <div className={style.right}>
                                <div className={style.top}>
                                    <div className={style.iconWrap}>
                                        <div className={style.icon + " " + style[(typeMap[illegalInfo.type] || {})['style']]}>{(typeMap[illegalInfo.type] || {})['label']}</div>
                                    </div>
                                    {
                                        illegalInfo.businessName ? <TextOver rows={2} text={illegalInfo.businessName} textIndent={40} /> : ''
                                    }
                                </div>
                                <div className={style.bottom + " " + (isPC ? style.pc : '')}>
                                    违规时间：{illegalInfo.violationCreateTime}
                                </div>
                            </div>
                            <img className={style.appealStateIcon} src={appealIconMap[illegalInfo.state]} />
                        </div>

                        <div className={style.selection}>
                            <div className={style.header + " " + style.clearfix}>
                                <div className={style.left}>违规原因</div>
                                {
                                    isPC ? <div className={style.right}><a href={xmlyRuleDocUrl} target="_blank">喜马拉雅平台规范>></a></div>
                                        : <div className={style.right}><a href={xmlyRuleDocUrl}>喜马拉雅平台规范>></a></div>
                                }
                            </div>
                            <div className={style.body}>
                                <div className={style.item}>{illegalInfo.content}</div>
                            </div>
                        </div>

                        <div className={style.selection}>
                            <div className={style.header + " " + style.clearfix}>
                                <div className={style.left}>处罚方式</div>
                            </div>
                            <div className={style.body}>
                                <div className={style.item}>{illegalInfo.punishmentStr}</div>
                            </div>
                        </div>

                        <div className={style.selection}>
                            <div className={style.header + " " + style.clearfix}>
                                <div className={style.left}>平台处理意见</div>
                            </div>
                            <div className={style.body}>
                                <div className={style.item}>
                                    {illegalInfo.message}
                                </div>
                            </div>
                        </div>
                        {
                            this.getViewByState(illegalInfo.state)
                        }
                    </div>
                }
                <LoadPage isShowLoad={isShowLoad} />
            </div>
        )
    }
}

export default AnchorAppeal;