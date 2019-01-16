import React from 'react';

const style = {
	display: 'inline-block',
	verticalAlign: 'middle',
	padding: '0 1.1em',
	textAlign: 'center',
	margin: '1.1em',
	background: '#ccc',
	border: 'none',
	borderBottom: '3px solid #999',
	cursor: 'pointer',
	lineHeight: '3em',
	height: '3em',
	width: '3em'
}

const charComponent = (props) => {
	return (
		<button type="button" style={style} onClick={props.clicked}>
			{props.char}
		</button>
	);
}

export default charComponent;
