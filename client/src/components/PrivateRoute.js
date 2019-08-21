import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({component: Component, ...args}) => {
    return (
        <Route
            {...args}
            render={ props => args.auth.isAuthenticated ? <Component {...props} {...args} /> : (
                <Redirect to={{
                    pathname: "/signin",
                    state: props.location
                }} />
            ) }
            />
    );
};

export default PrivateRoute;