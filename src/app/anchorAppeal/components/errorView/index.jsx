import React, { Component } from 'react';
import * as style from './index.scss';
class ErrorView extends Component {
    render() {
        let { errorMsg } = this.props;
        errorMsg = errorMsg + '';
        return (
            <div className={style.errorWrap}>
                {
                    errorMsg
                }
            </div>
        );
    }
}

export default ErrorView;