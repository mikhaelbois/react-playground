import React, { useState, useEffect, useCallback, Fragment } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../../store/actions';

import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

const burgerBuilder = props => {
    const [purchasing, setPurchasing] = useState(false);

    const dispatch = useDispatch();

    // To prevent the component from regenerating everytime it rerenders, we use useCallback to use a cached version
    const onInitIngredients = useCallback(() => dispatch(actions.initIngredients()), [dispatch]);

    const onIngredientAdded = (ingredientName) => dispatch(actions.addIngredient(ingredientName));
    const onIngredientRemoved = (ingredientName) => dispatch(actions.removeIngredient(ingredientName));
    const onPurchaseInit = () => dispatch(actions.purchaseInit());
    const onSetAuthRedirect = (path) => dispatch(actions.setAuthRedirect(path));

    const ingredients = useSelector(state => state.bub.ingredients);
    const totalPrice = useSelector(state => state.bub.totalPrice);
    const error = useSelector(state => state.bub.error);
    const isAuthenticated = useSelector(state => state.auth.token !== null);

    useEffect(() => {
        onInitIngredients();
    }, [onInitIngredients]);

    const updatePurchaseState = (currentIngredients) => {
        const sum = Object.keys(currentIngredients).map(igKey => {
            return currentIngredients[igKey];
        }).reduce((sum, el) => sum + el, 0);

        return sum > 0;
    }

    const purchaseHandler = () => {
        if (isAuthenticated) {
            setPurchasing(true);
        } else {
            onSetAuthRedirect('/checkout');
            props.history.push('/auth');
        }
    }

    const cancelPurchaseHandler = () => {
        setPurchasing(false);
    }

    const continuePurchaseHandler = () => {
        onPurchaseInit();
        props.history.push({ pathname: '/checkout' });
    }

    const disabledInfo = {
        ...ingredients
    };

    for (let key in disabledInfo) {
        disabledInfo[key] = disabledInfo[key] < 1
    }

    let orderSummary =
        <OrderSummary
            show={purchasing}
            ingredients={ingredients}
            cancel={cancelPurchaseHandler}
            continue={continuePurchaseHandler}
            price={totalPrice}
        />
    ;

    let burger = (
        <p style={{ textAlign: 'center' }}>
            Error while fetching the ingredients!
        </p>
    );

    if (!error) {
        burger = (
            <div style={{ textAlign: 'center' }}>
                <Spinner />
            </div>
        );
    }

    if (ingredients) {
        burger = (
            <Fragment>
                <Modal
                    modalClosed={cancelPurchaseHandler}
                    show={purchasing}>
                    {orderSummary}
                </Modal>
                <h1>Build your ultimate burger!</h1>
                <Burger
                    ingredients={ingredients}
                />
                <BuildControls
                    price={totalPrice}
                    disable={disabledInfo}
                    add={(ingredientName) => onIngredientAdded(ingredientName)}
                    remove={(ingredientName) => onIngredientRemoved(ingredientName)}
                    purchasable={updatePurchaseState(ingredients)}
                    showSummary={purchaseHandler}
                    isAuth={isAuthenticated}
                />
            </Fragment>
        );
    }

    return (
        <Fragment>
            {burger}
        </Fragment>
    );
}



// Using alternative with useDispatch and useSelector

// const mapStateToProps = (state) => {
//     return {
//         ingredients: state.bub.ingredients,
//         totalPrice: state.bub.totalPrice,
//         error: state.bub.error,
//         purchased: state.ord.purchased,
//         isAuthenticated: state.auth.token !== null
//     };
// };

// const mapDispatchToProps = (dispatch) => {
//     return {
//         onInitIngredients: () => dispatch(actions.initIngredients()),
//         onIngredientAdded: (ingredientName) => dispatch(actions.addIngredient(ingredientName)),
//         onIngredientRemoved: (ingredientName) => dispatch(actions.removeIngredient(ingredientName)),
//         onPurchaseInit: () => dispatch(actions.purchaseInit()),
//         onSetAuthRedirect: (path) => dispatch(actions.setAuthRedirect(path))
//     };
// };

// export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(burgerBuilder, axios));

export default withErrorHandler(burgerBuilder, axios);
