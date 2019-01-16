import React from 'react';

const minLength = 5;
const maxLength = 10;
const validationComponent = (props) => {
	let validationMessage = null;

	if (props.length < minLength) {
		validationMessage = "Text too short";
	} else if (props.length > maxLength) {
		validationMessage = "Text too long";
	}

	return (
		<div className="validation-component">
			{validationMessage}
		</div>
	);
}

export default validationComponent;
