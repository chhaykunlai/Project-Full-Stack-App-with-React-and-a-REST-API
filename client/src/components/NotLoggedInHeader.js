import React from 'react';
import { Link } from 'react-router-dom';

const NotLoggedInHeader = () => {
    return (
        <nav>
            <Link className="signup" to="/signup">Sign Up</Link>
            <Link className="signin" to="/signin">Sign In</Link>
        </nav>
    );
};

export default NotLoggedInHeader;