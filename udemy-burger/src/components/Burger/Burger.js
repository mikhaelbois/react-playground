import React from 'react';
import { withRouter } from 'react-router-dom';

import BurgerIngredient from './BurgerIngredient/BurgerIngredient';
import classes from './Burger.css';

const burger = (props) => {
    let transformedIngredients = Object.keys(props.ingredients).map(igKey => {
        return [...Array(props.ingredients[igKey])].map((_, idx) => {
            return (
                <BurgerIngredient
                    key={igKey + idx}
                    type={igKey}
                />
            );
        })
    }).reduce((arr, el) => {
        return arr.concat(el);
    }, []);

    if (transformedIngredients.length === 0) {
        transformedIngredients = <p>Please choose some ingredients!</p>
    }

    return (
        <div className={classes.Burger}>
            <BurgerIngredient
                type="bread-top"
            />
            {transformedIngredients}
            <BurgerIngredient
                type="bread-bottom"
            />
        </div>
    );
};

// Gives access to the Router props in Components
export default withRouter(burger);
