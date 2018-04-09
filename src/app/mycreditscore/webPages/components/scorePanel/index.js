import React, { Component } from 'react';
import AreaLabel from './../areaLabel';
import * as style from './index.scss';
import axios from "axios/index";

class ScorePanel extends Component {
    constructor(props){
        super(props);
        this.state={
            score: 100, //显示的信用分，默认100
        }
    }

    /**
     * 获取主播的信用分，并设置到state中
     * @param anchorId 主播id
     */
    getScoreValue=(anchorId)=>{
        //请求主播信用分
        axios.get('/credit-web/anchorCredit/getCreditScore?anchorId=' + anchorId)
            .then((res) => {
            if (res.data.success) {
                this.setState({ score: res.data.score });
            }
        }).catch(() => {

        })
    }


    componentDidMount(){
        let anchorId = this.props.anchorId;
        anchorId?this.getScoreValue(anchorId):'';
    }


    render() {
        const score = this.state.score;

        const areaLabelObj = {
            name: '信用分',
            linkObj:{
                name:'喜马拉雅平台规范>>',
                url:"http://www.ximalaya.com/center/announce/show?id=47"
            }
        }

        const showScoreBg = (80 < score && score <= 100)?style.scoreWrapGreen:
            (60 < score && score <= 80)?style.scoreWrapYellow:style.scoreWrapRed;

        const scoreRecodeLink = 'CreditScoreRecord/'+ this.props.anchorId;

        return (
            <div>
                <AreaLabel {...areaLabelObj}/>
                <div className={`${style.scoreWrap} ${showScoreBg}`}>
                    <div className={style.scoreArea}>
                        <div>{score}</div>
                        <a className={style.scoreHistory} href={scoreRecodeLink}>分值记录</a>
                    </div>
                </div>

            </div>
        );
    }
}

export default ScorePanel;