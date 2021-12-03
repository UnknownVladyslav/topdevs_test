import {loadingStates, offlineUsersList, sliceNames, statusStates} from "../constants";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {employeesService} from "../../pages/employees/employeesService";

export const fetchUsers = createAsyncThunk(
    sliceNames.employeesThunk,
    async function(_, {rejectWithValue}) {
        try {
            let response = await employeesService.getEmployees();

            if (response.status !== 200) {
                throw new Error();
            }

               return response.data.map(employee => ({
                   ...employee, isActive: false,
               }));

        } catch (e) {
            return rejectWithValue(e.message)
        }
    }
);

const employeesSlice = createSlice({
    name: sliceNames.employees,
    initialState: {
        loading: loadingStates.pending,
        status: statusStates.ok,
        employeesList: [],
        activeEmployeesList: [],
        isOfflineMode: false,
    },
    reducers: {
        addActiveEmployee: (state, action) => {
            const toggledEmployee = state.employeesList.find(item => item.id === action.payload);
            toggledEmployee.isActive = !toggledEmployee.isActive;
            state.activeEmployeesList.push(toggledEmployee);
        },
        removeActiveEmployee: (state, action) => {
            const toggledEmployee = state.employeesList.find(item => item.id === action.payload);
            toggledEmployee.isActive = !toggledEmployee.isActive;
            state.activeEmployeesList = state.activeEmployeesList.filter(user => user.id !== action.payload);
        },
        setLocalStorageActiveEmployee: (state, action) => {
            state.activeEmployeesList = action.payload;
        },
        resetSelectedItems: (state) => {
            state.activeEmployeesList = [];
        },
        setOfflineMode: (state) => {
            state.isOfflineMode = true;
            state.employeesList = offlineUsersList;
        },
        setOnlineMode: (state) => {
            if (state.status === statusStates.ok) {
                state.isOfflineMode = false;
                state.employeesList = [];
            }
        }
    },
    extraReducers: {
        [fetchUsers.pending]: (state) => {
            state.loading = loadingStates.pending;
        },
        [fetchUsers.fulfilled]: (state, action) => {
            state.status = statusStates.ok;
            state.loading = loadingStates.resolved;
            state.employeesList = action.payload;
        },
        [fetchUsers.rejected]: (state) => {
            state.status = statusStates.failure;
        },
    }
});

export const {
    addActiveEmployee,
    removeActiveEmployee,
    setLocalStorageActiveEmployee,
    resetSelectedItems,
    setOfflineMode,
    setOnlineMode,
} = employeesSlice.actions;

export default employeesSlice.reducer;