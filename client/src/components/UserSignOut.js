import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const UserSignOut = (props) => {
    props.signout();

    return <Route render={ () => <Redirect to="/" /> } />;
};

export default UserSignOut;