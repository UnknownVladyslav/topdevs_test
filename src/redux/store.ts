import { configureStore } from '@reduxjs/toolkit';
import employeesSlice from './reducers/employeesSlice';

const store = configureStore({
  reducer: {
    employees: employeesSlice,
  },
});

export default store;
