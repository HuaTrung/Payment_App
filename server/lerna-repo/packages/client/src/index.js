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

import store from './redux/store';

import jwt_decode from 'jwt-decode';
import setAuthToken from 'admin_module/src/utils/setAuthToken';
import { setCurrentAccount, logoutAccountAdmin } from './redux/actions/auth.action';
import { Provider } from 'react-redux';

// Check for token:
if(localStorage.jwtToken) {
    // set auth token header auth:
    setAuthToken(localStorage.jwtToken);
    // decode token and get data:
    const decode = jwt_decode(localStorage.jwtToken);
    // set user and isAuthenticated
    store.dispatch(setCurrentAccount(decode));

    // check expire token:
    const currentTime = Date.now()/1000;
    if(decode.exp < currentTime){
        store.dispatch(logoutAccountAdmin());
         // redirect to login:
        window.location.href = '/Pages/LoginPage';
    }
}


ReactDOM.render((
    <Provider store = { store } >        
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
    </Provider>
), document.getElementById('root'));
registerServiceWorker();
