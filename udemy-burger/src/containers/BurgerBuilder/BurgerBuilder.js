import React, { Component, Fragment } from 'react';

import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

// Global const
const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    bacon: 1,
    meat: 1.3
};

class BurgerBuilder extends Component {
    state = {
        ingredients: null,
        totalPrice: 4,
        purchasable: false,
        purchasing: false,
        loading: false,
        error: false
    }

    componentDidMount() {
        axios.get('/ingredients.json').then(response => {
            this.setState({
                ingredients: response.data
            });
        }).catch(error => {
            this.setState({
                error: true
            });
        });
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
        const queryParams = [];

        for (let i in this.state.ingredients) {
            queryParams.push(encodeURIComponent(i) + '=' + this.state.ingredients[i]);
        }

        queryParams.push(`price=${this.state.totalPrice}`);
 
        const queryString = queryParams.join('&');

        // this.props.history.push({
        //     pathname: '/checkout/' + response.data.name
        // });

        this.props.history.push({
            pathname: '/checkout',
            search: '?' + queryString
        });
    }

    render() {
        const disabledInfo = {
            ...this.state.ingredients
        };

        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] < 1
        }

        // Show spinner if loading
        let orderSummary = 
            <OrderSummary
                show={this.state.purchasing}
                ingredients={this.state.ingredients}
                cancel={this.cancelPurchaseHandler}
                continue={this.continuePurchaseHandler}
                price={this.state.totalPrice}
            />
        ;

        if (this.state.loading) {
            orderSummary = (
                <div style={{textAlign: 'center'}}>
                    <Spinner />
                </div>
            );
        }

        let burger = (
            <p style={{ textAlign: 'center' }}>
                Error while fetching the ingredients!
            </p>
        );

        if (!this.state.error) {
            burger = (
                <div style={{ textAlign: 'center' }}>
                    <Spinner />
                </div>
            );
        }

        if (this.state.ingredients) {
            burger = (
                <Fragment>
                    <Modal
                        modalClosed={this.cancelPurchaseHandler}
                        show={this.state.purchasing}>
                        {orderSummary}
                    </Modal>
                    <h1>Build your ultimate burger!</h1>
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

        return (
            <Fragment>
                {burger}
            </Fragment>
        );
    }
}

export default withErrorHandler(BurgerBuilder, axios);
