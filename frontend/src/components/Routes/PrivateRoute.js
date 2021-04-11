import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ component: Component, ...rest }) => (
 
    <Route
        {...rest}
        render={props => {
          const userInfo=localStorage.getItem('userInfo')
            if (!userInfo) {
                // not logged in so redirect to login page with the return url
                return (
                    <Redirect
                        to={{ pathname: '/', state: { from: props.location } }}
                    />
                );
            }

            // authorised so return component
            return <Component {...props} />;
        }}
    />
);

export default PrivateRoute;