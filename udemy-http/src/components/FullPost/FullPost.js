import React, { Component } from 'react';
import axios from 'axios';

import './FullPost.css';

class FullPost extends Component {
    state = {
        selectedPost: null
    };

    componentDidUpdate() {
        if (this.props.id) {
            if (!this.state.selectedPost ||
                (this.state.selectedPost && this.state.selectedPost.id !== this.props.id)
            ) {
                axios.get('/posts/' + this.props.id).then(response => {
                    this.setState({
                        selectedPost: response.data
                    });
                });
            }
        }
    }

    deletePostHandler = () => {
        axios.delete('/posts/' + this.props.id).then(response => {
            // Axios Delete example
        });
    }

    render () {
        let post = <p style={{textAlign: 'center'}}>Please select a Post!</p>;

        if (this.state.selectedPost) {
            post = (
                <div className="FullPost">
                    <h1>{this.state.selectedPost.title}</h1>
                    <p>{this.state.selectedPost.body}</p>
                    <div className="Edit">
                        <button className="Delete" onClick={this.deletePostHandler}>Delete</button>
                    </div>
                </div>
            );
        }

        return post;
    }
}

export default FullPost;
