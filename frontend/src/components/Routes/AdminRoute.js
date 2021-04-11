import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';



const AdminRoute = ({ component: Component, ...rest }) => (
 
    <Route
        {...rest}
        render={props => {
            const userInfo=JSON.parse(localStorage.getItem('userInfo'))           
            if (!userInfo.isAdmin) {
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

export default AdminRoute;