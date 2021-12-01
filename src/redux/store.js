import {configureStore} from "@reduxjs/toolkit";
import usersReducer from "./reducers/employeesSlice";

const store = configureStore({
    reducer: {
        employees: usersReducer,
    },
});

export default store;