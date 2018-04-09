/**
 * 申诉页，根据申诉状态，控制不同的显示
 */
import React, { Component } from 'react';
import IllegalRecord from './IllegalRecord';
import ScorePanel from './../../components/scorePanel';
import Breadcrumb from './../../components/breadcrumb';

class myCreditScoreWeb extends Component {

    render() {
        const anchorId = this.props.match.params.anchorId;//获取主播id
        const navObj = [{
            name:'我的信用分',
            link:null,
            active:false
        }];

        return (
            <div style={{'padding':'0 10px'}}>
                <Breadcrumb data = {navObj} />
                <ScorePanel anchorId = {anchorId}/>
                <IllegalRecord anchorId = {anchorId}/>
            </div>
        )
    }
}

export default myCreditScoreWeb;