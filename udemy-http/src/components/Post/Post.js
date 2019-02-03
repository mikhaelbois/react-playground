import React from 'react';

// Used to be able to access Router props
// import { withRouter } from 'react-router-dom';

import './Post.css';

const post = (props) => (
    <article className="Post" onClick={props.clicked}>
        <h1>{props.title}</h1>
        <div className="Info">
            <div className="Author">{props.author}</div>
        </div>
    </article>
);

// Used to be able to access Router props
// export default withRouter(post);
export default post;
