import React from 'react';

class CreateCourse extends React.Component {
    constructor() {
        super();
        this.title = React.createRef();
        this.description = React.createRef();
        this.estimatedTime = React.createRef();
        this.materialsNeeded = React.createRef();
    }

    state = {
        errorValidations: []
    };

    addNewCourse = async e => {
        e.preventDefault();
        const course = {
            title: this.title.current.value,
            description: this.description.current.value,
            estimatedTime: this.estimatedTime.current.value,
            materialsNeeded: this.materialsNeeded.current.value
        };
        const response = await this.props.createCourse(course);
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
                <h1>Create Course</h1>
                <div>
                    { valiationBlock }
                    <form>
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
                                    placeholder="Course description..."
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
                                        placeholder="List materials..."
                                        ref={this.materialsNeeded}
                                        >
                                    </textarea>
                                </div>
                            </li>
                            </ul>
                        </div>
                        </div>
                        <div className="grid-100 pad-bottom">
                            <button className="button" onClick={this.addNewCourse} type="submit">Create Course</button>
                            <button className="button button-secondary" onClick={this.backHome}>Cancel</button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default CreateCourse;