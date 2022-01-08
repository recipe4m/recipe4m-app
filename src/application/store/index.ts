import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../reducer/counter.reducer';

export default configureStore({
  reducer: {
    counter: counterReducer,
  },
});
