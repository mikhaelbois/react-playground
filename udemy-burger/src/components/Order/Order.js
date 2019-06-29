import React from 'react';

import classes from './Order.css';

const order = (props) => {
    let ingredientsList = [];

    for (const ingredientName in props.ingredients) {
        if (props.ingredients.hasOwnProperty(ingredientName)) {
            const amount = props.ingredients[ingredientName];

            ingredientsList.push({
                name: ingredientName,
                amount: amount
            });
        }
    }

    const ingredientOutput = ingredientsList.map(ig => (
        <span key={ig.name}>
            <label>{ig.name}</label> ({ig.amount})
        </span>
    ));

    return (
        <div className={classes.Order}>
            <p>
                <strong>Ingredients</strong>: {ingredientOutput}
            </p>
            <p>
                Price: <strong>{props.price.toFixed(2)}$</strong>
            </p>
        </div>
    );
};

export default order;
