import React from 'react';
import { Route,Redirect } from 'react-router';


const PrivateRoute=({component:Component,...rest})=>{
    return(
        <Route {...rest} render={props => (
            localStorage.getItem('auth_token') ?
                <Component {...props} />
            : <Redirect to="/home"/>
        )} />);
}

export default PrivateRoute;