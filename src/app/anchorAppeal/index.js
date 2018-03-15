/**
 * 申诉页，根据申诉状态，控制不同的显示
 */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import AnchorAppeal from './container/index';
import util from './../common/util';
import { setTimeout } from 'timers';
class Appeal extends Component {
  render() {
    return (
      <div>
        <AnchorAppeal />
      </div>
    )
  }
}

ReactDOM.render(
  <Appeal />, document.getElementById('root')
);