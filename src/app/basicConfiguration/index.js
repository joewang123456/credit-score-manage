import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createLogger } from 'redux-logger';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk'
import BasicConfiguration from './container/app';
import reducer from './reducer/index';

const logger = createLogger({});
const store = createStore(reducer, applyMiddleware(thunk));

class BasicConfigurationApp extends React.Component {

    render() {
        return (
            <Provider store={store}>
                <BasicConfiguration />
            </Provider>
        );
    }
}

ReactDOM.render(
    <BasicConfigurationApp />, document.getElementById('root')
);