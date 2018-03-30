import React from 'react';
import * as style from './index.scss';

export default (props) => {
    return (
        <div className={style.noticeWrap}>
            <a href={props.url}>{props.message}</a>
        </div>
    )
}