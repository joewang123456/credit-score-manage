import React, { Component } from 'react';
import * as style from './index.scss';

class Input extends Component {

    constructor() {
        super();
        this.state = {
            value: '',
            errorTip: ''
        }
    }

    phoneReg = /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/;

    componentDidMount() {
        const { defaultValue } = this.props;
        if (this.phoneReg.test(defaultValue)) {
            this.setState({ value: defaultValue });
        }
    }

    onChange = (e) => {
        const value = e.target.value;
        if (this.phoneReg.test(value)) {
            this.setState({ value: value, errorTip: null });
            this.props.callback(this.props.name, value);
        } else {
            this.setState({ value: value, errorTip: '请输入正确的手机号码！' });
            this.props.callback(this.props.name, '');
        }

    }

    onFocus = (e) => {
        typeof this.props.scrollIntoView === 'function' && this.props.scrollIntoView(e.target);
    }

    render() {
        const { placeholder } = this.props;
        const { value, errorTip } = this.state;
        return (
            <div className={style.wrap}>
                <input value={value} className={style.textarea + " " + style.myInput} placeholder={placeholder} onFocus={this.onFocus} onChange={this.onChange} />
                {
                    errorTip ? <div className={style.error}>{errorTip}</div> : ''
                }
            </div>
        )
    }
}

export default Input;