import React, { Component, Fragment } from 'react';

import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

// Global const
const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    bacon: 1,
    meat: 1.3
};

class BurgerBuilder extends Component {
    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        },
        totalPrice: 4,
        purchasable: false,
        purchasing: false
    }

    updatePurchaseState = (currentIngredients) => {
        const sum = Object.keys(currentIngredients).map(igKey => {
            return currentIngredients[igKey];
        }).reduce((sum, el) => sum + el, 0);

        this.setState({
            purchasable: sum > 0
        });
    }

    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };

        updatedIngredients[type] = updatedCount;

        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;

        this.setState({
            totalPrice: newPrice,
            ingredients: updatedIngredients
        }, this.updatePurchaseState(updatedIngredients));
    }

    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];

        if (oldCount < 1) {
            return;
        }

        const updatedCount = oldCount - 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };

        updatedIngredients[type] = updatedCount;

        const priceSubstraction = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceSubstraction;

        this.setState({
            totalPrice: newPrice,
            ingredients: updatedIngredients
        }, this.updatePurchaseState(updatedIngredients));
    }

    purchaseHandler = () => {
        this.setState({
            purchasing: true
        });
    }

    cancelPurchaseHandler = () => {
        this.setState({
            purchasing: false
        });
    }

    continuePurchaseHandler = () => {
        this.setState({
            purchasing: false
        });
    }

    render() {
        const disabledInfo = {
            ...this.state.ingredients
        };

        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] < 1
        }

        return (
            <Fragment>
                <Modal
                    modalClosed={this.cancelPurchaseHandler}
                    show={this.state.purchasing}>
                    <OrderSummary
                        show={this.state.purchasing}
                        ingredients={this.state.ingredients}
                        cancel={this.cancelPurchaseHandler}
                        continue={this.continuePurchaseHandler}
                        price={this.state.totalPrice}
                    />
                </Modal>
                <Burger
                    ingredients={this.state.ingredients}
                />
                <BuildControls
                    price={this.state.totalPrice}
                    disable={disabledInfo}
                    add={this.addIngredientHandler}
                    remove={this.removeIngredientHandler}
                    purchasable={this.state.purchasable}
                    showSummary={this.purchaseHandler}
                />
            </Fragment>
        );
    }
}

export default BurgerBuilder;
