import {createAsyncThunk} from "@reduxjs/toolkit";
import {sliceNames} from "redux/constants";
import {employeesService} from "pages/employees/employeesService";
import {IEmployee} from "types/types";

export const fetchUsers = createAsyncThunk(
    sliceNames.employeesThunk,
    async function(_, {rejectWithValue}) {
        try {
            let response = await employeesService.getEmployees();

            if (response.status !== 200) {
                throw new Error();
            }

            return response.data.map((employee: IEmployee) => ({
                ...employee, isActive: false,
            }));
        } catch (e: any) {
            return rejectWithValue(e.message)
        }
    }
);

const thunks = {
    fetchUsers,
};

export {thunks};