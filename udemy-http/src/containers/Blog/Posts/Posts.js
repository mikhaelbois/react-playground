import React, { Component } from 'react';
// import axios from 'axios';
import axiosInstance from '../../../axios';
import { Route, Link } from 'react-router-dom';

import Post from '../../../components/Post/Post';
import FullPost from '../FullPost/FullPost';
import './Posts.css';

class Posts extends Component {
    state = {
        posts: [],
        selectedPostId: null,
        error: false
    };

    componentDidMount() {
        axiosInstance.get('/posts').then(response => {
            const posts = response.data.slice(0, 4);
            const updatedposts = posts.map(post => {
                return { ...post, author: 'Max' };
            });

            this.setState({
                posts: updatedposts
            });
        }).catch(error => {
            console.error(error);
            // this.setState({
            //     error: true
            // });
        });
    };

    postSelectedHandler = (id) => {
        // this.props.history.push({pathname: '/posts/' + id});
        this.props.history.push('/posts/' + id);
        // this.setState({
        //     selectedPostId: id
        // });
    };

    render() {
        let posts = <p style={{ textAlign: 'center', color: 'red' }}>Ooops! Something went wrong!</p>;

        if (!this.state.error) {
            posts = this.state.posts.map(post => {
                return (
                    // <Link
                    //     key={post.id}
                    //     to={'/posts/' + post.id}>
                    <Post
                        key={post.id}
                        title={post.title}
                        author={post.author}
                        clicked={() => this.postSelectedHandler(post.id)}
                    />
                    // </Link>
                );
            });
        }

        return (
            <div>
                <section className="Posts">
                    {posts}
                </section>

                <Route
                    path={this.props.match.url + '/:id'}
                    exact
                    component={FullPost}
                />
            </div>
        );
    };
};

export default Posts;
