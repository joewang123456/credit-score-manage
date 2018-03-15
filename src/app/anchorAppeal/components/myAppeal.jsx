import React, { Component } from 'react';
import { WhiteSpace, Button, Toast, InputItem } from 'antd-mobile';
import ImagePicker from './imagePicker';
import TextArea from './textArea';
import Input from './input';
import { uploadImageServer } from './../config';
import util from './../../common/util';
import * as style from './../style/index.scss';
class MyAppeal extends Component {

    state = {
        appealStep: 1 //1:我要申诉；2:提交申诉
    }

    //上传文件
    uploadFile = {
        maxFileSize: 3,
        fileTypeReg: /^(image\/bmp|image\/jpg|image\/jpeg|image\/png)$/i
    }

    //表单字段
    formInfo = {
        mobile: '', //手机号
        appeal: '', //申诉内容
        urls: ''//申诉提交凭证图片的url
    }

    //单击我要申诉按钮，显示申诉视图
    showAppealView = () => {
        this.setState({ appealStep: 2 });
    }

    /**
    * 虚拟键盘引起视图滚动
    */
    scrollIntoView = (pannel) => {
        if (util.getUserAgent() !== 'PC') {
            pannel.scrollIntoView();
            typeof pannel.scrollIntoViewIfNeeded === 'function' && pannel.scrollIntoViewIfNeeded();
        }
    }

    //单击提交申诉按钮，提交申诉信息
    sumitAppeal = () => {
        let errorTip = [];
        if (!this.formInfo.mobile) {
            errorTip.push('请填写正确的手机号！');
        }
        if (!this.formInfo.appeal) {
            errorTip.push('请填写申诉理由！');
        }
        if (!this.formInfo.urls) {
            errorTip.push('请上传凭证！')
        }
        if (errorTip.length > 0) {
            const ErrorComponent = (props) => {
                return (
                    <div>
                        {
                            props.errorTip.map((item, index) => {
                                return <div key={index}>{item}</div>
                            })
                        }
                    </div>
                );
            }
            Toast.fail(<ErrorComponent errorTip={errorTip} />, 2);
            return;
        }
        const submitAppeal = this.props.submitAppeal;
        typeof submitAppeal === 'function' && submitAppeal(this.formInfo);

    }

    //更新上传文件urls
    updateImageFileUrl = (urls) => {
        this.formInfo.urls = (urls || []).join(',');
    }

    //更新输入框内容
    updateAppealContent = (name, value) => {
        this.formInfo[name] = value;
    }

    //切换视图
    chageStepView = () => {
        switch (this.state.appealStep) {
            case 1: {
                return (
                    <div className={style.footer}>
                        <Button className={style.submitBtn + " " + style.abled} type="warning" size="small" onClick={this.showAppealView}>我要申诉</Button><WhiteSpace />
                    </div>
                );
            }
            case 2: {
                return (
                    <div>
                        <div className={style.selection + " " + style.row}>
                            <div className={style.header + " " + style.clearfix}>
                                <div className={style.left}>手机号<span className={style.required}>(必填)</span></div>
                            </div>
                            <div className={style.body}>
                                <Input name="mobile" placeholder="请填写手机号" callback={this.updateAppealContent} scrollIntoView={this.scrollIntoView} />
                            </div>
                        </div>

                        <div className={style.selection}>
                            <div className={style.header + " " + style.clearfix}>
                                <div className={style.left}>我要申诉<span className={style.required}>(必填)</span></div>
                            </div>
                            <div className={style.body}>
                                <TextArea name="appeal" placeholder="请填写申诉理由" className={style.textArea} rows={6} limit={400} callback={this.updateAppealContent} scrollIntoView={this.scrollIntoView} />
                            </div>
                        </div>

                        <div className={style.selection}>
                            <div className={style.body}>
                                <ImagePicker uploadServer={uploadImageServer} maxFileSize={this.uploadFile.maxFileSize} fileTypeReg={this.uploadFile.fileTypeReg} callback={this.updateImageFileUrl} />
                            </div>
                        </div>

                        <div className={style.footer}>
                            <Button className={style.submitBtn + " " + style.abled} type="warning" size="small" onClick={this.sumitAppeal}>提交申诉</Button><WhiteSpace />
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
        const { appealStep } = this.state;
        return (
            <div>
                {
                    this.chageStepView()
                }
            </div>
        );
    }
}

export default MyAppeal;