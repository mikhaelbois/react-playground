import React from 'react';
import './UserInput.css';

const userInput = (props) => {
    return (
    	<div className="UserInput">
    		<input type="text" onChange={props.updateName} value={props.userName} />
    	</div>
    );
}

export default userInput;
