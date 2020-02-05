import React, { useState, useReducer, useEffect, useCallback, useMemo } from 'react';

import IngredientForm from './IngredientForm';
import IngredientList from './IngredientList';
import ErrorModal from '../UI/ErrorModal';
import Search from './Search';
import useHttp from '../../hooks/http';

// Not to be mistaken with Redux Reducers
const ingredientsReducer = (ingredientsState, action) => {
  switch (action.type) {
    case 'SET':
      return action.ingredients;
    case 'ADD':
      return [...ingredientsState, action.ingredient];
    case 'DELETE':
      return ingredientsState.filter(el => el.id !== action.id);
    default:
      throw new Error('You can\'t be here!');
  }
}

const Ingredients = props => {
  const [ingredients, dispatch] = useReducer(ingredientsReducer, []);
  // const [ingredients, setIngredients] = useState([]);

  // Custom hook
  const { isLoading, error, data, sendRequest, extra, identifier, clear } = useHttp();


  // const [http, dispatchHttp] = useReducer(httpReducer, {loading: false, error: null});
  // const [isLoading, setIsLoading] = useState(false);
  // const [error, setError] = useState();

  // Used cached version instead of creating a new one
  const filteredIngredientsHandler = useCallback((filteredIngredients) => {
    dispatch({
      type: 'SET',
      ingredients: filteredIngredients
    });

    // setIngredients(filteredIngredients);
  }, []);

  // Executes after and for every render cycle
  // useEffect(() => {

  //   fetch('https://udemy-react-hooks-6bfb6.firebaseio.com/ingredients.json').then(response => {
  //     return response.json();
  //   }).then(responseData => {
  //     const loadedIngredients = [];

  //     for (const key in responseData) {
  //       if (responseData.hasOwnProperty(key)) {
  //         loadedIngredients.push({
  //           id: key,
  //           title: responseData[key].title,
  //           amount: responseData[key].amount
  //         });
  //       }
  //     }

  //     setIngredients(loadedIngredients);
  //   });

  // }, []);
  // Empty array will execute only on first render

  useEffect(() => {
    // console.log('RENDERING ON MOUNT AND ON EVERY CYLE');
  });

  useEffect(() => {
    // console.log('RENDERING ONLY WHEN DEPENDANCIS ARE UPDATED', ingredients);
  }, [ingredients]);

  const addIngredientHandler = useCallback((ingredient) => {
    sendRequest(
      'https://udemy-react-hooks-6bfb6.firebaseio.com/ingredients.json',
      'POST',
      JSON.stringify(ingredient),
      ingredient,
      'ADD_INGREDIENT'
    );

    // dispatchHttp({
    //   type: 'SEND'
    // });
    // // setIsLoading(true);

    // fetch('https://udemy-react-hooks-6bfb6.firebaseio.com/ingredients.json', {
    //   method: 'POST',
    //   body: JSON.stringify(ingredient),
    //   headers: { 'Content-Type': 'application/json' }
    // }).then(response => {
    //   return response.json();
    // }).then(responseData => {
    //   dispatchHttp({
    //     type: 'RESPOND'
    //   });
    //   // setIsLoading(false);

    //   dispatch({
    //     type: 'ADD',
    //     ingredient: { id: responseData.name, ...ingredient }
    //   });

    //   // setIngredients(prevIngredients => {
    //   //   return [
    //   //     ...prevIngredients,
    //   //     {
    //   //       id: responseData.name,
    //   //       ...ingredient
    //   //     }
    //   //   ];
    //   // });
    // }).catch(error => {
    //   dispatchHttp({
    //     type: 'ERROR',
    //     error: error.message
    //   });

    //   // setIsLoading(false);
    //   // setError(error.message);
    // });
  }, [sendRequest]);

  const removeIngredientHandler = useCallback((ingredientId) => {
    sendRequest(
      `https://udemy-react-hooks-6bfb6.firebaseio.com/ingredients/${ingredientId}.json`,
      'DELETE',
      null,
      ingredientId,
      'REMOVE_INGREDIENT'
    );

    // dispatchHttp({
    //   type: 'SEND'
    // });
    // // setIsLoading(true);

    // fetch(`https://udemy-react-hooks-6bfb6.firebaseio.com/ingredients/${ingredientId}.json`, {
    //   method: 'DELETE'
    // }).then(response => {
    //   dispatchHttp({
    //     type: 'RESPOND'
    //   });
    //   // setIsLoading(false);

    //   dispatch({
    //     type: 'DELETE',
    //     id: ingredientId
    //   });

    //   // setIngredients(prevIngredients => {
    //   //   return prevIngredients.filter(ig => ig.id !== ingredientId);
    //   // });
    // }).catch(error => {
    //   dispatchHttp({
    //     type: 'ERROR',
    //     error: error.message
    //   });

    //   // setIsLoading(false);
    //   // setError(error.message);
    // });

  }, [sendRequest]);

  // const clearError = useCallback(() => {
    // dispatchHttp({
    //   type: 'CLEAR'
    // });

    // States are batched together https://github.com/facebook/react/issues/10231#issuecomment-316644950
    // setIsLoading(false);
    // setError(null);
  // }, []);


  // Listens to custom hook responses and updates component
  useEffect(() => {
    if (!isLoading && !error && identifier === 'ADD_INGREDIENT') {
      dispatch({
        type: 'ADD',
        ingredient: { id: data.name, ...extra }
      });
    } else if (!isLoading && !error && identifier === 'REMOVE_INGREDIENT') {
      dispatch({
        type: 'DELETE',
        id: extra
      });
    }
  }, [isLoading, data, extra, identifier, error]);

  // Serve cached version of element when component rerenders
  const ingredientList = useMemo(() => {
    return (
      <IngredientList
        ingredients={ingredients}
        onRemoveItem={removeIngredientHandler}
      />
    );
  }, [ingredients, removeIngredientHandler]);

  return (
    <div className="App">
      {error && <ErrorModal onClose={clear}>{error}</ErrorModal>}

      <IngredientForm onAddIngredient={addIngredientHandler} loading={isLoading} />

      <section>
        <Search onLoadIngredients={filteredIngredientsHandler} />
        {ingredientList}
      </section>
    </div>
  );
}

export default Ingredients;
