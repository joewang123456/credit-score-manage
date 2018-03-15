import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import { routerBaseName } from './../common/config';
import CreditScoreReport from './container/index';
import CreditScoreDetail from './container/detail';

class CreditScore extends React.Component {
    render() {
        return (
            <BrowserRouter
                basename={routerBaseName}
            >
                <div>
                    {/* 主播信用分查询 */}
                    <Route exact path="/creditScore/" component={CreditScoreReport} />
                    {/* 主播信用积分明细 */}
                    <Route exact path="/creditScore/:anchorId" component={CreditScoreDetail} />
                </div>
            </BrowserRouter>
        );
    }
}

ReactDOM.render(
    <CreditScore />, document.getElementById('root')
);