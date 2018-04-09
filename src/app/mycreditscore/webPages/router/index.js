import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { routerBaseName } from './../../../common/config';
import MyCreditScore from './../view/myCreditScore';
import CreditScoreRecord from './../view/creditScoreRecord';

class creditScoreRouter extends React.Component {
    render() {
        return (
            <BrowserRouter
                basename={routerBaseName}
            >
                <div>
                    {/* 我的信用分 */}
                    <Route exact path="/mycreditscore/web/:anchorId" component={MyCreditScore} />
                    {/* 信用分值记录 */}
                    <Route exact path="/mycreditscore/web/CreditScoreRecord/:anchorId" component={CreditScoreRecord} />
                </div>
            </BrowserRouter>
        );
    }
}

export default creditScoreRouter;