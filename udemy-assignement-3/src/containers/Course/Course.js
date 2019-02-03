import React, { Component } from 'react';

class Course extends Component {
    state = {
        courseId: null,
        courseTitle: null
    };

    componentDidMount() {
        this.loadData();
    };

    componentDidUpdate() {
        this.loadData();
    };

    loadData() {
        if (this.props.match.params.id) {
            const params = new URLSearchParams(document.location.search.substring(1));
            const title = params.get("title");

            if ((this.state.courseTitle !== title) &&
                (this.state.courseId !== +this.props.match.params.id)
            ) {
                this.setState({
                    courseId: this.props.match.params.id,
                    courseTitle: title
                });
            }
        }
    };

    render () {
        return (
            <div>
                <article>
                    <h1>{this.state.courseTitle}</h1>
                    <p>You selected the Course with ID: {this.state.courseId}</p>
                </article>
            </div>
        );
    };
};

export default Course;
