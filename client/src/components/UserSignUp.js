import React from 'react';
import { Link } from 'react-router-dom';

class UserSignUp extends React.Component {
    constructor() {
        super();
        this.firstName = React.createRef();
        this.lastName = React.createRef();
        this.email = React.createRef();
        this.password = React.createRef();
        this.confirmPassword = React.createRef();
    }

    state = {
        errorValidations: []
    };

    signup = async e => {
        e.preventDefault();
        const password = this.password.current.value;
        const confirmPassword = this.confirmPassword.current.value;
        if (password !== confirmPassword) {
            this.setState({
                errorValidations: [{ message: 'Passwords are not matched.' }]
            });
            return;
        }
        const user = {
            firstName: this.firstName.current.value,
            lastName: this.lastName.current.value,
            emailAddress: this.email.current.value,
            password: password
        };
        const response = await this.props.register(user);
        if (response.status === 'Fails') {
            this.setState({
                errorValidations: [{ message: response.message }]
            });
        } else {
            this.setState({
                errorValidations: []
            });
        }

        const credentials = {
            username: this.email.current.value,
            password: password
        };
        this.props.login(credentials, result => {
            if (result) {
                const pathName = this.props.location.state ? this.props.location.state.pathname : '/';
                this.props.history.push(pathName);
            }
        });
    }

    redirectHomePage = () => {
        this.props.history.push('/');
    }

    render() {
        const errorMessage = this.state.errorValidations.map((errorValidation, key) => {
            return <li key={key}>{ errorValidation.message }</li>
        });
        const valiationBlock = this.state.errorValidations.length ? (
            <div>
                <h2 className="validation--errors--label">Validation errors</h2>
                <div className="validation-errors">
                    <ul>
                        { errorMessage }
                    </ul>
                </div>
            </div>
        ) : '';

        return (
            <div className="bounds">
                <div className="grid-33 centered signin">
                <h1>Sign Up</h1>
                <div>
                    { valiationBlock }
                    <form>
                        <div>
                            <input id="firstName" name="firstName" type="text" placeholder="First Name" ref={this.firstName} />
                        </div>
                        <div>
                            <input id="lastName" name="lastName" type="text" placeholder="Last Name" ref={this.lastName} />
                        </div>
                        <div>
                            <input id="emailAddress" name="emailAddress" type="text" placeholder="Email Address" ref={this.email} />
                        </div>
                        <div>
                            <input id="password" name="password" type="password" placeholder="Password" ref={this.password} />
                        </div>
                        <div>
                            <input id="confirmPassword" name="confirmPassword" type="password" placeholder="Confirm Password" ref={this.confirmPassword} />
                        </div>
                        <div className="grid-100 pad-bottom">
                            <button className="button" type="submit" onClick={this.signup}>Sign Up</button>
                            <button className="button button-secondary" onClick={this.redirectHomePage}>Cancel</button>
                        </div>
                    </form>
                </div>
                <p>&nbsp;</p>
                <p>Already have a user account? <Link to="/signin">Click here</Link> to sign in!</p>
                </div>
            </div>
        );
    }
};

export default UserSignUp;