import React, { useState, useEffect, useRef } from 'react';

import Card from '../UI/Card';
import useHttp from '../../hooks/http';
import ErrorModal from '../UI/ErrorModal';
import './Search.css';

const Search = React.memo(props => {
  const { onLoadIngredients } = props;
  const [enteredFilter, setEnteredFilter] = useState('');
  const inputRef = useRef();

  // Custom hook
  const { isLoading, error, data, sendRequest, clear } = useHttp();

  useEffect(() => {
    const timer = setTimeout(() => {

      // Compares the new value with the current one
      if (enteredFilter === inputRef.current.value) {
        const queryParams = enteredFilter.length === 0 ? '' : `orderBy="title"&equalTo="${enteredFilter}"`;

        sendRequest(
          `https://udemy-react-hooks-6bfb6.firebaseio.com/ingredients.json?${queryParams}`
        );

        // fetch(`https://udemy-react-hooks-6bfb6.firebaseio.com/ingredients.json?${queryParams}`).then(response => {
        //   return response.json();
        // }).then(responseData => {
        //   const loadedIngredients = [];

        //   for (const key in responseData) {
        //     if (responseData.hasOwnProperty(key)) {
        //       loadedIngredients.push({
        //         id: key,
        //         title: responseData[key].title,
        //         amount: responseData[key].amount
        //       });
        //     }
        //   }

        //   onLoadIngredients(loadedIngredients);
        // });
      }

    }, 500);

    // Cleans up on unmount
    return () => {
      clearTimeout(timer);
    };
  }, [enteredFilter, inputRef, sendRequest]);


  // Listens to custom hook responses and updates component
  useEffect(() => {
    if (!isLoading && !error && data) {
      const loadedIngredients = [];

      for (const key in data) {
        if (data.hasOwnProperty(key)) {
          loadedIngredients.push({
            id: key,
            title: data[key].title,
            amount: data[key].amount
          });
        }
      }

      onLoadIngredients(loadedIngredients);
    }
  }, [isLoading, data, error, onLoadIngredients]);

  return (
    <section className="search">
      {error && <ErrorModal onClose={clear}>{error}</ErrorModal>}

      <Card>
        <div className="search-input">
          <label>Filter by Title</label>

          {isLoading && <span>Loadin...</span>}

          <input
            ref={inputRef}
            type="text"
            value={enteredFilter}
            onChange={event => setEnteredFilter(event.target.value)}
          />
        </div>
      </Card>
    </section>
  );
});

export default Search;
