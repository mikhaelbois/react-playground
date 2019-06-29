import React from 'react';

import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';
import classes from './CheckoutSummary.css';

const checkoutSummary = (props) => {
    return (
        <div className={classes.CheckoutSummary}>
            <h1>Hope you like this dope burger!</h1>
            <div style={{width: '100%', margin: 'auto'}}>
                <Burger
                    ingredients={props.ingredients}
                />
            </div>

            <Button
                click={props.cancel}
                btnClass="Danger">
                No! Please NO!
            </Button>
            <Button
                click={props.continue}
                btnClass="Success">
                Give me that burger!
            </Button>
        </div>
    );
};

export default checkoutSummary;
