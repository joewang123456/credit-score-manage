import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createLogger } from 'redux-logger';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk'
import { BrowserRouter, Route } from 'react-router-dom';
import IllegalRecordReport from './container/index';
import { routerBaseName } from './../common/config';
import IllegalDetail from './container/detail';
import reducer from './reducer/index';


const logger = createLogger({});
const store = createStore(reducer, applyMiddleware(thunk));
class IllegalRecord extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <BrowserRouter
                    basename={routerBaseName}
                >
                    <div>
                        {/* 违规记录报表*/}
                        <Route exact path='/illegalRecord/' component={IllegalRecordReport} />
                        {/* 违规记录明细 */}
                        <Route exact path='/illegalRecord/:recordId' component={IllegalDetail} />
                    </div>
                </BrowserRouter>
            </Provider>
        );
    }
}

ReactDOM.render(
    <IllegalRecord />, document.getElementById('root')
);