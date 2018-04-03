/**
 * 申诉页，根据申诉状态，控制不同的显示
 */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
class IllegalRecordWeb extends Component {

    render() {
        return (
            <div>
                IllegalRecord webpages
            </div>
        )
    }
}

ReactDOM.render(
    <IllegalRecordWeb />, document.getElementById('root')
);