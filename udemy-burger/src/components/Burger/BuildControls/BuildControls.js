import React from 'react';

import classes from './BuildControls.css';
import BuildControl from './BuildControl/BuildControl';

const controls = [
    {
        label: 'Salad',
        type: 'salad'
    },
    {
        label: 'Bacon',
        type: 'bacon'
    },
    {
        label: 'Cheese',
        type: 'cheese'
    },
    {
        label: 'Meat',
        type: 'meat'
    }
];

const buildControls = (props) => {
    return (
        <div className={classes.BuildControls}>
            <p>Current price: <strong>${props.price.toFixed(2)}</strong></p>

            {controls.map(ctrl => (
                <BuildControl
                    more={() => props.add(ctrl.type)}
                    less={() => props.remove(ctrl.type)}
                    disabled={props.disable[ctrl.type]}
                    label={ctrl.label}
                    key={ctrl.label}
                />
           ))}

            <button
                className={classes.OrderButton}
                disabled={!props.purchasable}
                onClick={props.showSummary}
                type="button">
                {props.isAuth ? 'Order Now' : 'Sign In to order'}
            </button>

        </div>
    );
};

export default buildControls;
