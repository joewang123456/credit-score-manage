import React, { Component } from 'react';
import * as style from './index.scss';

class breadcrumb extends Component {

    render() {
        const showData = this.props.data;
        const length = showData.length||0;
        return (
            <div className={style.breadcrumb}>
                {
                    showData.map((value, index)=>{
                        return (
                            <a key={index} className={value.active ? style.active:''} href={value.link}>
                               <span> {value.name}</span>
                                {/* 最后一项，不显示箭头 */}
                                {index===(length-1)? null:<span className={style.separator}>></span>}
                            </a>
                        );
                    })
                }
            </div>
        );
    }
}


export default breadcrumb;