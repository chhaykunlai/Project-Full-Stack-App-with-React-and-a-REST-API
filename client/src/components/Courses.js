import React from 'react';
import { Link } from 'react-router-dom';

class Courses extends React.Component {
  state = {
    courses: []
  };

  componentDidMount() {
    this.courseTimer = setTimeout(this.getCourses.bind(this), 500);
  }

  componentWillUnmount() {
    clearTimeout(this.courseTimer);
  }

  async getCourses() {
    this.setState({
      courses: await this.props.getCourses()
    });
  }

  render() {
    let courses = this.state.courses.map(course => {
      let courseLink = `/courses/${course._id}`;
      return (
        <div className="grid-33" key={course._id}>
          <Link className="course--module course--link" to={courseLink}>
            <h4 className="course--label">Course</h4>
            <h3 className="course--title">{course.title}</h3>
          </Link>
        </div>
      );
    });

    courses.push((
      <div className="grid-33" key="new-course">
        <Link className="course--module course--add--module" to="/courses/create">
          <h3 className="course--add--title"><svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 13 13" className="add">
              <polygon points="7,6 7,0 6,0 6,6 0,6 0,7 6,7 6,13 7,13 7,7 13,7 13,6 "></polygon>
            </svg>New Course</h3>
        </Link>
      </div>
    ));
    return (
      <div className="bounds">
        {courses}
      </div>
    );
  }
};

export default Courses;