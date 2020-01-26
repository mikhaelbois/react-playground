import React from 'react';

const user = (props) => {
    return (
        <div>
            <h1>{props.name}</h1>
            <p>{props.age}</p>

            <style jsx>
                {`
                    h1 {color: red; margin: 0;}
                    p {margin-top: 1em;}
                `}
            </style>
        </div>
    );
}

export default user;
