import React, { Component } from 'react';
import * as style from './index.scss';
class Loading extends Component {
    render() {
        let { loading } = this.props;
        return (
            loading ? <div className={style.loadingWrap}>
                loading...
            </div> : ''
        );
    }
}

export default Loading;