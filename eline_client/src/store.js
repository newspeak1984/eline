import { applyMiddleware, createStore, compose } from "redux";
import { persistStore, persistReducer } from 'redux-persist'
import thunkMiddleware from "redux-thunk";
import storage from 'redux-persist/lib/storage'
import { verifyAuth } from "./actions";
import rootReducer from './reducers';

const persistConfig = {
    key: 'root',
    storage
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

const logger = store => next => action => {
    console.log('dispatching', action)
    let result = next(action)
    console.log('next state', store.getState())
    return result
  }

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(
    persistedReducer,
    composeEnhancers(applyMiddleware(thunkMiddleware, logger))
);
export const persistor = persistStore(store);

