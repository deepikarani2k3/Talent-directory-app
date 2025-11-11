import { configureStore } from '@reduxjs/toolkit';
import talentReducer from './talentSlice';

const store = configureStore({
  reducer: {
    talents: talentReducer
  }
});

export default store;
