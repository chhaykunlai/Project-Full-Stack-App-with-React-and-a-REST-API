import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { withRouter } from 'react-router';
import './App.css';

// Imports components
import Header from './components/Header';
import Courses from './components/Courses';
import CourseDetail from './components/CourseDetail';
import UserSignIn from './components/UserSignIn';
import UserSignUp from './components/UserSignUp';
import UserSignOut from './components/UserSignOut';
import UpdateCourse from './components/UpdateCourse';
import PrivateRoute from './components/PrivateRoute';
import NotFound from './components/NotFound';
import Forbidden from './components/Forbidden';
import UnhadledError from './components/UnhadledError';

class App extends React.Component {
  state = {
    courses: [],
    Auth: {
        isAuthenticated: false,
        user: {}
    }
  };

  componentDidUpdate(prevProps) {
    if (prevProps.location.pathname !== this.props.location.pathname) {
      this.getCourses();
    }
  }

  getCourses = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/courses');
      if (!response.ok) {
        throw Error(response.statusText);
      }
      const json = await response.json();
      this.setState({
        courses: json.results.courses
      });
    } catch (error) {
      console.error('Fetch Error:', error);
    }
    return this.state.courses;
  }

  getCourse = async id => {
    try {
      const response = await fetch(`http://localhost:5000/api/courses/${id}`);
      if (!response.ok) {
        throw Error(response.statusText);
      }
      const json = await response.json();
      return json.results.course;

    } catch (error) {
      return {};
    }
  }

  createCourse = async course => {
    try {
      const response = await fetch('http://localhost:5000/api/courses', {
        method: 'POST',
        headers: new Headers({
          'Authorization': 'Basic '+btoa(`${this.state.Auth.user.emailAddress}:${this.state.Auth.user.password}`),
          'Content-Type': 'application/json'
        }),
        body: JSON.stringify(course),
      });
      if (!response.ok) {
        throw Error(response.statusText);
      }

      if (response.status === 201) {
        return {};
      }

      return await response.json();
    } catch (error) {
      return {
        status: 'Fails',
        message: 'Error occurred'
      };
    }
  }

  updateCourse = async course => {
    try {
      const response = await fetch(`http://localhost:5000/api/courses/${course._id}`, {
        method: 'PUT',
        headers: new Headers({
          'Authorization': 'Basic '+btoa(`${this.state.Auth.user.emailAddress}:${this.state.Auth.user.password}`),
          'Content-Type': 'application/json'
        }),
        body: JSON.stringify(course),
      });
      if (!response.ok) {
        throw Error(response.statusText);
      }

      if (response.status === 204) {
        return {};
      }

      return await response.json();
    } catch (error) {
      return {
        status: 'Fails',
        message: 'Error occurred'
      };
    }
  }

  deleteCourse = async id => {
    try {
      const response = await fetch(`http://localhost:5000/api/courses/${id}`, {
        method: 'DELETE',
        headers: new Headers({
          'Authorization': 'Basic ' + btoa(`${this.state.Auth.user.emailAddress}:${this.state.Auth.user.password}`),
          'Content-Type': 'application/json'
        }),
      });
      if (!response.ok) {
        throw Error(response.statusText);
      }

      if (response.status === 204) {
        return {};
      }

      return await response.json();
    } catch (error) {
      return {
        status: 'Fails',
        message: 'Error occurred'
      };
    }
  }

  register = async user => {
    try {
      const response = await fetch(`http://localhost:5000/api/users`, {
        method: 'POST',
        headers: new Headers({
          'Content-Type': 'application/json'
        }),
        body: JSON.stringify(user)
      });
      if (!response.ok) {
        throw Error(response.statusText);
      }

      if (response.status === 201) {
        return {};
      }

      return await response.json();
    } catch (error) {
      return {
        status: 'Fails',
        message: 'Error occurred'
      };
    }
  }

  login = ({username, password}, callback) => {
    fetch('http://localhost:5000/api/users', {
      headers: new Headers({
        'Authorization': 'Basic '+btoa(`${username}:${password}`),
        'Content-Type': 'application/json'
      })
    })
      .then(response => response.json())
      .then(data => {
        if (data.status === 'OK') {
          data.result.password = password;
          this.setState({
            Auth: {
              isAuthenticated: true,
              user: data.result
            }
          });

          return callback(true);
        }
        this.setState({
          Auth: {
            isAuthenticated: false,
            user: {}
          }
        });

        return callback(false);
      })
      .catch(err => {
        console.error('Fetch Error:', err);

        return callback(false);
      });
  }

  logout = () => {
    this.setState({
      Auth: {
        isAuthenticated: false
      }
    });
  }

  render() {
    return (
      <Switch>
        <>
          <Header auth={this.state.Auth} />
          <hr></hr>
          <Route exact path="/" render={ () => <Redirect to="/courses" /> } />
          <Route exact path="/courses" render={ () => <Courses getCourses={this.getCourses} /> } />
          <PrivateRoute exact auth={this.state.Auth} data={this.state.courses} path="/courses/:id/update" component={UpdateCourse} updateCourse={this.updateCourse} />
          <Route path="/signin" render={ props => <UserSignIn login={this.login} auth={this.state.Auth} {...props} /> } />
          <Route path="/signup" render={ props => <UserSignUp register={this.register} login={this.login} {...props}/> } />
          <Route path="/signout" render={ () => <UserSignOut auth={ this.state.Auth } signout={ this.logout } />} />
          <Route exact path="/courses/:id" render={ props => <CourseDetail auth={this.state.Auth} data={this.state.courses} getCourse={this.getCourse} createCourse={this.createCourse} deleteCourse={this.deleteCourse} {...props} /> } />
          <Route path="/notfound" render={ () => <NotFound /> } />
          <Route path="/forbidden" render={ () => <Forbidden /> } />
          <Route path="/error" render={ () => <UnhadledError /> } />
        </>
      </Switch>
    );
  }
}

export default withRouter(props => <App {...props}/>);
