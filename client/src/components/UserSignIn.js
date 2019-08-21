import React from 'react';
import { Link, Redirect } from 'react-router-dom';

class UserSignIn extends React.Component {
    constructor() {
        super();
        this.username = React.createRef();
        this.password = React.createRef();
    }

    state = {
        errorMessage: ''
    };

    submitForm = event => {
        event.preventDefault();
        const credentials = {
            username: this.username.current.value,
            password: this.password.current.value
        };
        this.props.login(credentials, result => {
            if (result) {
                this.props.history.goBack();
            } else {
                this.setState({
                    errorMessage: 'Incorrect email and password'
                });
            }
        });
    }

    redirectHomePage = () => {
        this.props.history.push('/');
    }

    render() {
        if (this.props.auth.isAuthenticated) {
            return <Redirect to="/" />;
        }
        return (
            <div className="bounds">
                <div className="grid-33 centered signin">
                <h1>Sign In</h1>
                <div>
                    <form onSubmit={this.submitForm} method="post">
                        <div className="error-message">{this.state.errorMessage}</div>
                        <div>
                            <input
                                id="emailAddress"
                                name="emailAddress"
                                type="text"
                                placeholder="Email Address"
                                required
                                ref={this.username}
                                />
                        </div>
                        <div>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                placeholder="Password"
                                required
                                ref={this.password}
                                />
                        </div>
                        <div className="grid-100 pad-bottom">
                            <button className="button" type="submit">Sign In</button>
                            <button className="button button-secondary" onClick={this.redirectHomePage}>Cancel</button>
                        </div>
                    </form>
                </div>
                <p>&nbsp;</p>
                <p>Don't have a user account? <Link to="/signup">Click here</Link> to sign up!</p>
                </div>
            </div>
        );
    }
};

export default UserSignIn;