import React from 'react';

class UpdateCourse extends React.Component {
  constructor() {
      super();
      this._id = React.createRef();
      this.title = React.createRef();
      this.description = React.createRef();
      this.estimatedTime = React.createRef();
      this.materialsNeeded = React.createRef();
  }

  state = {
      errorValidations: []
  };

  updateExistingCourse  = async e => {
    e.preventDefault();
    const course = {
      _id: this._id.current.value,
      title: this.title.current.value,
      description: this.description.current.value,
      estimatedTime: this.estimatedTime.current.value,
      materialsNeeded: this.materialsNeeded.current.value
    };
    const response = await this.props.updateCourse(course);
    if (response.status === 'Fails') {
        this.setState({
          errorValidations: [{ message: response.message }]
        });
    } else {
      this.setState({
        errorValidations: []
      });
    }
    if (!Object.keys(response).length) {
      return this.props.history.push('/');
    }
  }

  backHome = e => {
      e.preventDefault();
      return this.props.history.push('/');
  }

  render() {
    const courses = this.props.data || [];
    const course = courses.find(course => {
      return course._id === this.props.match.params.id;
    });

    if (!course) {
      return this.props.history.push('/notfound');
    }

    if (course.user !== this.props.auth.user._id) {
      return this.props.history.push('/forbidden');
    }

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
      <div className="bounds course--detail">
        <h1>Update Course</h1>
        <div>
          { valiationBlock }
          <form method="post">
            <div className="grid-66">
              <div className="course--header">
                <h4 className="course--label">Course</h4>
                <div>
                  <input
                    id="title"
                    name="title"
                    type="text"
                    className="input-title course--title--input"
                    placeholder="Course title..."
                    defaultValue={course.title}
                    ref={this.title}
                    />
                </div>
                <p>By Joe Smith</p>
              </div>
              <div className="course--description">
                <div>
                  <textarea
                    id="description"
                    name="description"
                    className=""
                    placeholder="Course description..."
                    defaultValue={course.description}
                    ref={this.description}
                    >
                  </textarea>
                </div>
              </div>
            </div>
            <div className="grid-25 grid-right">
              <div className="course--stats">
                <ul className="course--stats--list">
                  <li className="course--stats--list--item">
                    <h4>Estimated Time</h4>
                    <div>
                      <input
                        id="estimatedTime"
                        name="estimatedTime"
                        type="text"
                        className="course--time--input"
                        placeholder="Hours"
                        defaultValue={course.estimatedTime}
                        ref={this.estimatedTime}
                        />
                    </div>
                  </li>
                  <li className="course--stats--list--item">
                    <h4>Materials Needed</h4>
                    <div>
                      <textarea
                        id="materialsNeeded"
                        name="materialsNeeded"
                        className=""
                        placeholder="List materials..."
                        defaultValue={course.materialsNeeded}
                        ref={this.materialsNeeded}
                        >
                      </textarea>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
            <div className="grid-100 pad-bottom">
              <input id="course_id" type="hidden" defaultValue={course._id} ref={this._id} />
              <button className="button" type="submit" onClick={this.updateExistingCourse}>Update Course</button>
              <button className="button button-secondary" onClick={this.backHome}>Cancel</button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default UpdateCourse;