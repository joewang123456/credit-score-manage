import React, { Component } from 'react';
import * as style from './index.scss';
class TextOver extends Component {

    state = {
        showDot: false
    }

    componentDidMount() {
        this.setShowDot();
        window.onresize = () => {
            setTimeout(() => {
                this.setShowDot();
            }, 100);
        }
    }

    //计算是否是否显示...
    setShowDot = () => {
        const { rows, text, textIndent } = this.props;
        const { titleWrapDom, hiddenSpanDom } = this.refs;
        const hiddenSpanDomWidth = this.refs.hiddenSpanDom ? this.refs.hiddenSpanDom.offsetWidth : 0;//实际宽度
        const titleWrapDomWidth = this.refs.titleWrapDom ? this.refs.titleWrapDom.offsetWidth : 0;//外层div宽度
        this.setState({ showDot: hiddenSpanDomWidth - ((rows - 1) * titleWrapDomWidth + titleWrapDomWidth - textIndent) >= 0 });
    }

    render() {
        const { text } = this.props;
        const { showDot } = this.state;
        return (
            <div className={style.titleWrap + " " + (showDot ? style.overflow : '')} ref="titleWrapDom">
                <span className={style.title} title={text}>{text}</span>
                <span className={style.hiddenSpan} ref="hiddenSpanDom">{text}</span>
            </div>
        );
    }
}

export default TextOver;