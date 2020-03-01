import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import Cookies from 'universal-cookie';
const cookies = new Cookies();
export const PrivateRoute = ({ component: Component ,  ...rest }) => (
    <Route {...rest} render={props => (
            cookies.get('user') !== undefined
            ? <Component {...props} />
            : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
    )} />
)