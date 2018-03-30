import React, { Component } from 'react';
import axios from 'axios';
import * as style from './index.scss';

class ScorePanel extends Component {
    render() {
        const { score = 80 } = this.props;
        return (
            <div className={style.scoreWrap}>
                <div className={style.header}>
                    <div className={style.title}>信用分</div>
                    <a href="#">喜马拉雅平台规范>></a>
                </div>
                <div className={style.body}>
                    <div className={style.scoreTxt}>{score}</div>
                    <div className={style.scoreHistory}>
                        <a>
                            <span>分值记录</span>
                            <span>></span>
                        </a>
                    </div>
                </div>

            </div>
        );
    }
}

export default ScorePanel;