import React, { Component } from 'react';
import { Icon } from 'antd-mobile';
import utils from './../../../../common/util';
import * as style from './index.scss';

class Row extends Component {
    state = {
        heightLight: false
    }

    setHighLight = () => {
        this.setState({ heightLight: true });
    }

    removeHighLight = () => {
        this.setState({ heightLight: false });
    }
    render() {
        const { data } = this.props;
        const { heightLight } = this.state;
        return (
            <div className={style.cardItem + " " + (heightLight ? style.highlight : '')}
                onTouchStart={this.setHighLight}
                onTouchEnd={this.removeHighLight}
            >
                <div className={style.content}>
                    <div className={style.top}>
                        <div className={style.titleWrap}>
                            <div className={style.title}>{data.content}</div>
                        </div>
                    </div>
                    <div className={style.bottom}>{'违规时间：' + utils.DateFormat(data.time, 'YYYY-MM-dd hh:mm:ss')}</div>
                </div>
                <div className={style.link}>
                    <a href="#">
                        {data.deltaScore}
                        <Icon type='right' />
                    </a>
                </div>
            </div>
        );
    }
}

const renderRow = (data) => (rowData, sectionID, rowID) => {
    return <Row key={rowID} data={rowData} />
};

export default renderRow;