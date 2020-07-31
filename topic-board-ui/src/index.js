import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';
import './css/Main.css';
import './css/sb2-admin2.css';
import MainContainer from './Main';
import * as serviceWorker from './serviceWorker';

//import 'bootstrap/dist/css/bootstrap.min.css';

ReactDOM.render(
    <React.StrictMode>
        <MainContainer />
    </React.StrictMode>,
    document.getElementById('root')
);

serviceWorker.register();
