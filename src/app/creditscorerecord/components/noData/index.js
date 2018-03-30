import React, { Component } from 'react';
import * as style from './index.scss';
export default () => {
    return (
        <div className={style.noDataWrap}>
            <div className={style.tip}>当前没有违规，请注意保持哦~</div>
            <div className={style.ruleLink}>
                <a href="">查阅《喜马拉雅平台规范》</a>
            </div>
        </div>
    )
}