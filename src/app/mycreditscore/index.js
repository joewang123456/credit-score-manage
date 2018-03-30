/**
 * 申诉页，根据申诉状态，控制不同的显示
 */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import IllegalRecord from './container/index';
import ScorePanel from './components/scorePanel';
class MyCreditScore extends Component {

    render() {
        return (
            <div>
                <ScorePanel />
                <IllegalRecord />
            </div>
        )
    }
}

ReactDOM.render(
    <MyCreditScore />, document.getElementById('root')
);