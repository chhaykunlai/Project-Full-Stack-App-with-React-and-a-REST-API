import React from 'react';
import { Link } from 'react-router-dom';

const LoggedInHeader = props => {
    return (
        <nav>
            <span>Welcome {`${props.user.firstName} ${props.user.lastName}`}!</span>
            <Link className="signout" to="/signout">Sign Out</Link>
        </nav>
    );
};

export default LoggedInHeader;