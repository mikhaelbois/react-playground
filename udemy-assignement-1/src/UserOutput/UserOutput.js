import React from 'react';

const userOutput = (props) => {
    const style = {
		background: "#ccc",
		borderBottom: "3px solid #999",
		padding: "1em",
		margin: "1em auto 0",
		maxWidth: "600px"
    };

    return (
    	<div style={style}>
    		<p>User Name = {props.userName}</p>
    		<p>I'm the best!</p>
    	</div>
    );
}

export default userOutput;
