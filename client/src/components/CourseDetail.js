import React from 'react';
import { Link, Redirect } from 'react-router-dom';

import CreateCourse from './CreateCourse';

const ReactMarkdown = require('react-markdown/with-html');

class CourseDetail extends React.Component {
    state = {
        course: {}
    };

    componentDidMount() {
        const id = this.props.location.pathname.split('/').pop();
        if (id !== 'create') {
            this.courseTimer = setTimeout(this.getCourse.bind(this, id), 500);
        }
    }

    componentWillUnmount() {
        clearTimeout(this.courseTimer);
    }

    async getCourse(id) {
        const course = await this.props.getCourse(id);
        if (!Object.keys(course).length) {
            return this.props.history.push('/notfound');
        }

        this.setState({
            course: course
        });
    }

    removeCourse = async () => {
        const response = await this.props.deleteCourse(this.props.location.pathname.split('/').pop());
        if (!Object.keys(response).length) {
            return this.props.history.push('/');
        }
    }

    render() {
        if (this.props.match.url === '/courses/create') {
            if (this.props.auth.isAuthenticated) {
                return (
                    <CreateCourse createCourse={this.props.createCourse} {...this.props}/>
                );
            }
            return (
                <Redirect to={{
                    pathname: "/signin",
                    state: this.props.location
                }} />
            );
        }
        const course = this.state.course;
        const courseLink = `/courses/${course._id}/update`;
        let courseMaterials = course.materialsNeeded;
        let isOwner = false;

        if (this.props.auth.user._id) {
            isOwner = this.props.auth.user._id === course.user;
        }

        return (
            <div>
                <div className="actions--bar">
                    <div className="bounds">
                        <div className="grid-100">
                            {isOwner ? <span><Link className="button" to={courseLink}>Update Course</Link><Link className="button" onClick={this.removeCourse} to="#">Delete Course</Link></span> : null}
                            <Link className="button button-secondary" to="/">Return to List</Link>
                        </div>
                    </div>
                </div>
                <div className="bounds course--detail">
                <div className="grid-66">
                    <div className="course--header">
                    <h4 className="course--label">Course</h4>
                    <h3 className="course--title">{course.title}</h3>
                    <p>{course.author}</p>
                    </div>
                    <div className="course--description">
                        {course.description}
                    </div>
                </div>
                <div className="grid-25 grid-right">
                    <div className="course--stats">
                    <ul className="course--stats--list">
                        <li className="course--stats--list--item">
                        <h4>Estimated Time</h4>
                        <h3>{course.estimatedTime}</h3>
                        </li>
                        <li className="course--stats--list--item">
                        <h4>Materials Needed</h4>
                        <ul>
                            <ReactMarkdown source={courseMaterials} escapeHtml={false} />
                        </ul>
                        </li>
                    </ul>
                    </div>
                </div>
                </div>
            </div>
        );
    }
};

export default CourseDetail;