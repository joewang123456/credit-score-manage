
/**
 * 文件上传插件
 */
import React, { Component } from 'react';
import { Progress } from 'antd';
import { Toast } from 'antd-mobile';
import ImagePreview from './../../../common/components/imagePreview/index';
import axios from 'axios';
import * as style from './index.scss';

class ImagePicker extends Component {
    constructor() {
        super();
        this.state = {
            imagesUrl: [], //保存上传成功的图片
            errorMsg: '',
            loadPercent: 0,
            status: 'normal'
        }
        this.fileInput = null;
    }

    componentDidMount() {
        this.fileInput = this.refs.fileInput;
    }

    uploadFile = () => {
        if (this.fileInput.files.length > 1) {
            const ErrorComponent = (props) => {
                return (
                    <div>
                        {props.errorTip}
                    </div>
                );
            }
            Toast.fail(<ErrorComponent errorTip={'一次只能上传一张图片哦'} />, 2);
            return;
        }
        this.setState({ errorMsg: null, status: 'normal', loadPercent: 1 });
        const { uploadServer } = this.props;
        let formData = new FormData();//创建表单数据对象
        let file = this.fileInput.files[0];
        //文件校验
        let isValidatePass = this.validateFile(file);
        if (!isValidatePass) {
            this.setState({ loadPercent: 0 });
            return;
        }
        formData.append('file', file)
        //上传
        axios({
            method: 'post',
            url: uploadServer,
            // withCredentials: false, // 禁止携带cookie
            data: formData,
            onUploadProgress: this.uploadProgress //进度
        })
            .then(this.uploadComplete)//完成
            .catch(this.uploadFailed);//失败
    }

    /**
     * 上传进度
     */
    uploadProgress = (response) => {
        const { loaded, total } = response;
        let loadPercent = Math.floor(loaded / total * 100);
        //上传成功后，请求会出现一个接受服务器端数据的pending时间，在这段时间设置100%为99%，这样不会对用户造成错觉。上传完成为什么还在pending状态。
        loadPercent = loadPercent > 99 ? 99 : loadPercent
        this.setState({ loadPercent: loadPercent });
    }

    /**
     * 上传成功
     */
    uploadComplete = (response) => {
        try {
            const { callback = () => { } } = this.props;
            let imageUrl = response.data.data[0]['url'];
            if (imageUrl) {
                this.setState({ imagesUrl: [...this.state.imagesUrl, imageUrl], errorMsg: null, loadPercent: 0, status: 'success' });
                callback(this.state.imagesUrl);
            }
        } catch (e) {
            this.setState({ errorMsg: '上传出错,文件太大！', status: 'exception' });
            setTimeout(() => {
                this.setState({ errorMsg: null, loadPercent: 0, status: 'normal' });
            }, 2000);
        }
    }

    /**
     * 上传失败
     */
    uploadFailed = (error) => {
        this.setErrorTip('文件上传失败');
    }

    /**
     * 文件校验
     */
    validateFile = (file) => {
        if (!file) {
            return false;
        }
        const { maxFileSize, fileTypeReg } = this.props;
        if ((file.size - 0) / (1024 * 1024) > maxFileSize) {
            this.setErrorTip('图片已经大于' + maxFileSize + 'M');
            return false;
        }
        if (!fileTypeReg.test(file.type)) {
            this.setErrorTip('文件格式不对');
            return false;
        }
        return true;
    }

    /**
     * 设置错误提示，2秒后消失
     */
    setErrorTip = (errorMsg) => {
        this.setState({ errorMsg: errorMsg, loadPercent: 0 });
        setTimeout(() => {
            this.setState({ errorMsg: null });
        }, 2000);
    }

    deleteImage = (index) => {
        const urls = this.state.imagesUrl.filter((image, i) => { return i !== index; });
        this.setState({ imagesUrl: urls });
        const { callback = () => { } } = this.props;
        callback(urls);
    }

    render() {
        const { imagesUrl, errorMsg, loadPercent, status } = this.state;
        const { maxFileSize } = this.props;
        return (
            <div className={style.imagePicker}>
                <form className={style.uploadForm} encType="multipart/form-data" method="post">
                    <input type="file" name="file" id="file" onChange={this.uploadFile} ref="fileInput" />
                </form>

                <div className={style.previewImage}>
                    <div className={style.imageWrap}>
                        <ImagePreview urls={imagesUrl} enableDelete={true} deleteImage={this.deleteImage} />
                    </div>
                    {/* 加载图标 */}
                    {
                        loadPercent ? <Progress type="circle" width={60} percent={loadPercent} status={status} /> : ''
                    }
                    {/* 上传按钮 */}
                    {
                        loadPercent === 0 && imagesUrl.length < 3 ?

                            // <div className={style.uploadBox}>
                            <label htmlFor="file" className={style.uploadBox}>

                            </label>
                            // </div>
                            : ''
                    }
                </div>
                {
                    errorMsg ? <div className={style.tip + " " + style.error}><p>{errorMsg}</p></div> :
                        <div className={style.tip}>
                            <p>请上传申诉凭证，最多三张，每张大小不宜超过{maxFileSize}M</p>
                            <p>支持jpg、png、bmp格式</p>
                        </div>
                }
            </div>
        );
    }
}

export default ImagePicker;