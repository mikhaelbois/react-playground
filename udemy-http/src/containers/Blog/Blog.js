import React, { Component, lazy, Suspense } from 'react';
import { Route, Link, NavLink, Switch, Redirect } from 'react-router-dom';

import Posts from './Posts/Posts';
// import NewPost from './NewPost/NewPost';
// import asyncComponent from '../../hoc/asyncComponent';
import './Blog.css';

// Lazy load a Component
// const NewPost = asyncComponent(() => {
//     return import('./NewPost/NewPost');
// });

// Official React way to lazy load | https://reactjs.org/docs/code-splitting.html
const NewPost = lazy(() => import('./NewPost/NewPost'));

class Blog extends Component {
    state = {
        auth: true
    };

    render () {
        return (
            <div className="Blog">
                <header>
                    <ul>
                        <li>
                            <NavLink
                                to="/"
                                exact
                            >
                                Home
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/posts/"
                                exact
                            >
                                Posts
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to={{
                                // Always treated as an absolute path
                                pathname: '/new-post',
                                // Use this to create relative paths
                                // pathname: this.props.match.url + '/new-post',
                                hash: '#submit',
                                search: '?quick-submit=true'
                            }}>New post</NavLink>
                        </li>
                    </ul>
                </header>

                {/* Routes are parsed in order */}
                <Switch>
                    <Route
                        path="/"
                        exact
                        render={() => <h1>Home</h1>}
                    />

                    <Route
                        path="/posts"
                        // exact
                        component={Posts}
                    />

                    {/* this.state.auth ? <Route path="/new-post" component={NewPost} /> : null */}
                    {this.state.auth ? (
                        <Suspense fallback={<div>Loading...</div>}>
                            <Route path="/new-post" render={props => <NewPost {...props} />} />
                        </Suspense>
                    ) : null}

                    <Route
                        path="/404"
                        render={() => <h1>404 - Page Not Found</h1>}
                    />

                    <Redirect from="/" to="/404" />

                </Switch>
            </div>
        );
    };
};

export default Blog;
