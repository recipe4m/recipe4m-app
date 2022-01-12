import { createStore } from '@reduxjs/toolkit';
import { persistStore } from 'redux-persist';
import { persistedReducer } from '../reducer';

const store = createStore(persistedReducer);

export const persistor = persistStore(store);

export default store;
