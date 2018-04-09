import React, { Component } from 'react';
import * as style from './index.scss';

class areaLabel extends Component {
    render() {
        const {name, linkObj} = this.props;
        return (
            <div className={style.areaLabel}>
                <div className={style.leftIcon}></div>
               <div>{name}</div>
                {
                    linkObj?
                        <div className={style.labelLink}>
                            <a href={linkObj.url} target="_blank">{linkObj.name}</a>
                        </div>
                        :null
                }

            </div>
        );
    }
}

export default areaLabel;