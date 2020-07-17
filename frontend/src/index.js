import React, {StrictMode} from 'react';
import ReactDOM from 'react-dom';

// redux related
import {Provider} from 'react-redux';
import {myStore} from "./redux";


import App from './components/App';


ReactDOM.render(
    <Provider store={myStore}>
        <StrictMode>
            <App/>
        </StrictMode>
    </Provider>,

    document.getElementById('root'),
);