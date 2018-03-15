import React, { Component } from 'react';
import * as style from './index.scss';

class TextArea extends Component {

    constructor() {
        super();
        this.state = {
            value: ''
        }
        this.lock = false;//中文输入控制锁
    }

    /**
     * 开始输入中文
     */
    compositionstart = () => {
        this.lock = true;
    }

    /**
     * 中文输入结束
     */
    onCompositionEnd = (e) => {
        const { limit, name, callback } = this.props || 10;
        this.lock = false;
        let value = e.target.value.substring(0, limit);
        this.setState({ value: value });
        typeof callback === 'function' && callback(name, value);
    }

    /**
     * 输入字符触发事件
     */
    onInput = (e) => {
        let value = e.target.value;
        const { limit, name, callback } = this.props || 10;
        if (!this.lock) {//非中文直接截取
            setTimeout(() => {
                value = value.substring(0, limit);
                this.setState({ value: value });
                typeof callback === 'function' && callback(name, value);
            });
        } else {//中文不截取，在onCompositionEnd中中文选择完成后截取
            this.setState({ value: value });
        }
    }

    componentDidMount() {
        const { defaultValue = '', limit } = this.props;
        this.setState({ value: defaultValue.substring(0, limit) });
    }

    componentWillReceiveProps(nextProps) {
        const { limit, defaultValue = '' } = nextProps;
        if (defaultValue !== this.props.defaultValue) {
            this.setState({ value: defaultValue.substring(0, limit) });
        }
    }

    onChange = () => {

    }

    onFocus = (e) => {
        typeof this.props.scrollIntoView === 'function' && this.props.scrollIntoView(e.target);
    }

    render() {
        const { limit, rows, placeholder } = this.props;
        const { value } = this.state;
        return (
            <div className={style.wrap}>
                <textarea value={value} rows={rows} className={style.textarea} placeholder={placeholder} rows={rows} onInput={this.onInput} onCompositionStart={this.compositionstart} onCompositionEnd={this.onCompositionEnd} onFocus={this.onFocus} onChange={this.onChange}></textarea>
                <div className={style.count}>{value.length + "/" + limit}</div>
            </div>
        )
    }
}

export default TextArea;