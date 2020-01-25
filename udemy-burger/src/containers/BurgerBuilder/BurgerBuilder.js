import React, { Component, Fragment } from 'react';

import { connect } from 'react-redux';
import * as actions from '../../store/actions';

import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

class BurgerBuilder extends Component {
    state = {
        purchasing: false
    }

    componentDidMount() {
        this.props.onInitIngredients();
    }

    updatePurchaseState = (currentIngredients) => {
        const sum = Object.keys(currentIngredients).map(igKey => {
            return currentIngredients[igKey];
        }).reduce((sum, el) => sum + el, 0);

        return sum > 0;
    }

    purchaseHandler = () => {
        if (this.props.isAuthenticated) {
            this.setState({
                purchasing: true
            });
        } else {
            this.props.onSetAuthRedirect('/checkout');
            this.props.history.push('/auth');
        }
    }

    cancelPurchaseHandler = () => {
        this.setState({
            purchasing: false
        });
    }

    continuePurchaseHandler = () => {
        this.props.onPurchaseInit();
        this.props.history.push({ pathname: '/checkout' });
    }

    render() {
        const disabledInfo = {
            ...this.props.ingredients
        };

        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] < 1
        }

        let orderSummary =
            <OrderSummary
                show={this.state.purchasing}
                ingredients={this.props.ingredients}
                cancel={this.cancelPurchaseHandler}
                continue={this.continuePurchaseHandler}
                price={this.props.totalPrice}
            />
        ;

        let burger = (
            <p style={{ textAlign: 'center' }}>
                Error while fetching the ingredients!
            </p>
        );

        if (!this.props.error) {
            burger = (
                <div style={{ textAlign: 'center' }}>
                    <Spinner />
                </div>
            );
        }

        if (this.props.ingredients) {
            burger = (
                <Fragment>
                    <Modal
                        modalClosed={this.cancelPurchaseHandler}
                        show={this.state.purchasing}>
                        {orderSummary}
                    </Modal>
                    <h1>Build your ultimate burger!</h1>
                    <Burger
                        ingredients={this.props.ingredients}
                    />
                    <BuildControls
                        price={this.props.totalPrice}
                        disable={disabledInfo}
                        add={(ingredientName) => this.props.onIngredientAdded(ingredientName)}
                        remove={(ingredientName) => this.props.onIngredientRemoved(ingredientName)}
                        purchasable={this.updatePurchaseState(this.props.ingredients)}
                        showSummary={this.purchaseHandler}
                        isAuth={this.props.isAuthenticated}
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
}

const mapStateToProps = (state) => {
    return {
        ingredients: state.bub.ingredients,
        totalPrice: state.bub.totalPrice,
        error: state.bub.error,
        purchased: state.ord.purchased,
        isAuthenticated: state.auth.token !== null
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onInitIngredients: () => dispatch(actions.initIngredients()),
        onIngredientAdded: (ingredientName) => dispatch(actions.addIngredient(ingredientName)),
        onIngredientRemoved: (ingredientName) => dispatch(actions.removeIngredient(ingredientName)),
        onPurchaseInit: () => dispatch(actions.purchaseInit()),
        onSetAuthRedirect: (path) => dispatch(actions.setAuthRedirect(path))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));
