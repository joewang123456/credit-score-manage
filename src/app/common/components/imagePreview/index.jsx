/**
 * 图片放大预览组件
 */
import React, { Component } from 'react';
import Modal from 'react-modal';
import { Icon } from 'antd-mobile';
import * as style from './index.scss';

//图片预览弹出框样式配置
let customStyles = {
    overlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)'
    },
    content: {
        position: "absolute",
        border: "none",
        background: "transparent",
        borderRadius: 4,
        outline: "none",
        padding: 0,
        left: "50%",
        top: "50%",
        transform: "translate(-50%,-50%)",
        right: "none",
        bottom: "none",
        overflow: 'none'

    }
}

class ImagePreview extends Component {
    state = {
        isShowModal: false,
        loading: false,
        width: 0,
        height: 0,
        errorMsg: ''
    }

    config = {
        zoom: 1.3//按zoom倍缩小
    }
    //图片预览索引
    url = 0;

    openModal = (url) => {
        this.setState({ isShowModal: true, loading: true });
        //浏览器窗口的宽度与高度
        var clientW = document.documentElement.clientWidth || document.body.clientWidth;
        var clientH = document.documentElement.clientHeight || document.body.clientHeight;
        this.url = url;
        //计算图片的尺寸
        let img = new Image()
        img.onload = () => {
            let { width, height } = img;
            //宽度为0，置为1
            width = width || 1;
            height = height || 1;
            // console.log(width)
            let newWidth = 1, newHeight = 1;
            if (width / height > clientW / clientH) {
                newWidth = (width < clientW) ? width : (clientW / this.config.zoom);
                newHeight = height * (newWidth / width);
            } else {
                newHeight = (height < clientH) ? height : (clientH / this.config.zoom);
                newWidth = width * (newHeight / height);
            }
            this.setState({ isShowModal: true, loading: false, width: newWidth, height: newHeight, errorMsg: null });
        }
        img.onerror = () => {
            this.setState({ errorMsg: '图片加载失败！', loading: false });
        }
        img.src = url;
    }

    closeModal = () => {
        this.setState({ isShowModal: false });
    }

    //删除
    deleteImage = (index) => {
        const { deleteImage = () => { } } = this.props;
        deleteImage(index);
    }

    render() {
        const { urls, enableDelete, className = style.imageList } = this.props;
        const { isShowModal, width, height, errorMsg, loading } = this.state;
        return (
            <div className={className}>
                {
                    (urls && urls.length > 0) ? urls.map((item, index) => {
                        return (
                            <div className={style.imageBox} key={index} >
                                {
                                    enableDelete ? <div className={style.closewrap} onClick={this.deleteImage.bind(this, index)}></div> : ''
                                }
                                <img src={item} onClick={this.openModal.bind(this, item)} />
                            </div>
                        )
                    }) : ''
                }
                <Modal
                    isOpen={isShowModal}
                    shouldCloseOnOverlayClick={true}
                    onRequestClose={this.closeModal}
                    style={customStyles}
                    ariaHideApp={false}
                >
                    {
                        loading ? <Icon type="loading" /> : (!errorMsg ?
                            <div className={style.previewImageBox}>
                                <div className={style.closeModal} onClick={this.closeModal}></div>
                                <img src={this.url} style={{ width: width, height: height }} />
                            </div> :
                            <div style={{ color: 'red' }}>{errorMsg}</div>)
                    }
                </Modal>
            </div>
        );
    }
}

export default ImagePreview;