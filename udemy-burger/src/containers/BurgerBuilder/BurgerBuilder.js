import React, { Component, Fragment } from 'react';

import { connect } from 'react-redux';
import * as actionTypes from './../../store/actions';

import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

class BurgerBuilder extends Component {
    state = {
        purchasing: false,
        loading: false,
        error: false
    }

    componentDidMount() {
    //     axios.get('/ingredients.json').then(response => {
    //         this.setState({
    //             ingredients: response.data
    //         });
    //     }).catch(error => {
    //         this.setState({
    //             error: true
    //         });
    //     });
    }

    updatePurchaseState = (currentIngredients) => {
        const sum = Object.keys(currentIngredients).map(igKey => {
            return currentIngredients[igKey];
        }).reduce((sum, el) => sum + el, 0);

        return sum > 0;
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
        this.props.history.push({ pathname: '/checkout' });
    }

    render() {
        const disabledInfo = {
            ...this.props.ingredients
        };

        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] < 1
        }

        // Show spinner if loading
        let orderSummary = 
            <OrderSummary
                show={this.state.purchasing}
                ingredients={this.props.ingredients}
                cancel={this.cancelPurchaseHandler}
                continue={this.continuePurchaseHandler}
                price={this.props.totalPrice}
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
        ingredients: state.ingredients,
        totalPrice: state.totalPrice
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onIngredientAdded: (ingredientName) => dispatch({ type: actionTypes.ADD_INGREDIENT, ingredientName }),
        onIngredientRemoved: (ingredientName) => dispatch({ type: actionTypes.REMOVE_INGREDIENT, ingredientName })
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));
