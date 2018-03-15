import React, { Component } from 'react';
import { Icon } from 'antd-mobile';
import util from './../../../common/util';
import * as style from './index.scss';
class LoadPage extends Component {
    render() {
        let { isShowLoad } = this.props;
        const isPC = util.getUserAgent();
        return (
            !!isShowLoad && <div className={style.loadingWrap + " " + (isPC ? style.removeLoadingBgColor : '')}>
                <Icon type="loading" />
            </div>
        );
    }
}

export default LoadPage;