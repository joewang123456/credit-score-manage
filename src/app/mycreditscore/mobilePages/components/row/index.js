import React, { Component } from 'react';
import { Icon } from 'antd-mobile';
import { typeMap } from './../../../config';
import * as style from './index.scss';

class CardItem extends Component {
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
                onMouseOver={this.setHighLight}
                onMouseOut={this.removeHighLight}
                onTouchCancel={this.removeHighLight}
            >
                <div className={style.imageWrap}>
                    <img src={data.pic} alt="" />
                </div>
                <div className={style.content}>
                    <div className={style.top}>
                        <div className={style.type + " " + style[[typeMap[data.type]['style']]]}>{[typeMap[data.type]['label']]}</div>
                        <div className={style.titleWrap}>
                            <div className={style.title}>{data.title}</div>
                        </div>
                    </div>
                    <div className={style.bottom}>{data.time}</div>
                </div>
                <div className={style.link}>
                    <a href="#">
                        {data.status}
                        <Icon type='right' color={heightLight ? '#fc430b' : '#999999'} />
                    </a>
                </div>
            </div>
        );
    }
}

const renderRow = (data) => (rowData, sectionID, rowID) => {
    return <CardItem key={rowID} data={rowData} />
};

export default renderRow;