import React from 'react';
import ReactDOM from 'react-dom';
import {
    Route,
    BrowserRouter,
    Switch
} from 'react-router-dom';
// manage route
import indexRoutes from './routes/index.jsx';

import registerServiceWorker from './registerServiceWorker';

import './assets/css/bootstrap.min.css';
import './assets/sass/light-bootstrap-dashboard.css';
import './assets/css/demo.css';
import './assets/css/pe-icon-7-stroke.css';

ReactDOM.render((
    <BrowserRouter>
        {/* just render 1 component at same time */}
        <Switch>
            {
                indexRoutes.map((prop,key) => {
                    return (
                        <Route extract path={prop.path} component={prop.component}  key={key}/>
                    );
                })
            }
        </Switch>
    </BrowserRouter>
), document.getElementById('root'));
registerServiceWorker();
