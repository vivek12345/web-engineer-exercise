import { createStore, applyMiddleware, compose } from 'redux';
import reduxThunk from 'redux-thunk';
import reducers from '../reducers/root-reducer';
import { api } from '../helpers/ApiLibrary';

export default (initialState = {}) => {
  const composeEnhancers =
    (typeof window !== 'undefined' &&
      window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
    compose;

  const store = createStore(
    reducers,
    initialState,
    composeEnhancers(
      applyMiddleware(
        reduxThunk.withExtraArgument({
          api
        })
      )
    )
  );
  return store;
};
