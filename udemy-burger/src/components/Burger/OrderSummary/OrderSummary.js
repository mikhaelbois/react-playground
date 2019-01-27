import React, { Fragment } from 'react';

import Button from '../../UI/Button/Button';

const orderSummary = (props) =>  {
    const ingredientSummary = Object.keys(props.ingredients).map((igKey) => {
        if (props.ingredients[igKey] < 1) {
            return false;
        }

        return (
            <li key={igKey}>
                <span style={{textTransform: "capitalize"}}>{igKey}</span>: {props.ingredients[igKey]}
            </li>
        )
    });

    return (
        <Fragment>
            <h2>Check out my burger!</h2>
            <ul>
                {ingredientSummary}
            </ul>
            <h3>Get it for only <span style={{ color: '#5C9210' }}>${props.price.toFixed(2)}</span>?</h3>
            <div>
                <Button
                    click={props.cancel}
                    btnClass="Danger">
                    Nah, thanks!
                </Button>
                <Button
                    click={props.continue}
                    btnClass="Success">
                    Yes, please!
                </Button>
            </div>
        </Fragment>
    );
};

export default orderSummary;
