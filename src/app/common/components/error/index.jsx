import React, { Component } from 'react';
import * as style from './index.scss';
class ErrorComponent extends Component {
    render() {
        return (
            <div className={style.errorStyle}>
                {this.props.errorMsg}
            </div>
        );
    }
}

export default ErrorComponent;
