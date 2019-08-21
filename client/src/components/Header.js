import React from 'react';
import { Link } from 'react-router-dom';

// Imports components
import LoggedInHeader from './LoggedInHeader';
import NotLoggedInHeader from './NotLoggedInHeader';

const Header = props => {
    return (
        <div className="header">
          <div className="bounds">
            <Link to="/"><h1 className="header--logo">Courses</h1></Link>
            { props.auth.isAuthenticated ? <LoggedInHeader user={props.auth.user} /> : <NotLoggedInHeader />}
          </div>
        </div>
    );
};

export default Header;