import { offlineUsersList, sliceNames, statusStates } from 'redux/constants';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IEmployee } from 'types/types';
import { thunks } from './thunks';
import { selectors } from './selectors';

export interface EmployeesSliceState {
    loading: boolean;
    status: statusStates;
    employeesList: IEmployee[];
    activeEmployeesList: IEmployee[];
    isOfflineMode: boolean;
}

const initialState: EmployeesSliceState = {
  loading: false,
  status: statusStates.ok,
  employeesList: [],
  activeEmployeesList: [],
  isOfflineMode: false,
};

const slice = createSlice({
  name: sliceNames.employees,
  initialState,
  reducers: {
    addActiveEmployee: (state, action: PayloadAction<string>) => {
      const toggledEmployee: IEmployee | undefined = state.employeesList.find((item: IEmployee): boolean => item.id === action.payload);
      if (toggledEmployee) {
        toggledEmployee.isActive = !toggledEmployee.isActive;
        state.activeEmployeesList.push(toggledEmployee);
      }
    },
    removeActiveEmployee: (state, action: PayloadAction<string>) => {
      const toggledEmployee: IEmployee | undefined = state.employeesList.find((item: IEmployee) => item.id === action.payload);
      if (toggledEmployee) {
        toggledEmployee.isActive = !toggledEmployee.isActive;
        state.activeEmployeesList = state.activeEmployeesList.filter((user) => user.id !== action.payload);
      }
    },
    setLocalStorageActiveEmployee: (state, action: PayloadAction<IEmployee[]>) => {
      state.activeEmployeesList = action.payload;
    },
    resetSelectedItems: (state) => {
      state.activeEmployeesList = [];
    },
    setOfflineMode: (state) => {
      state.isOfflineMode = true;
      state.employeesList = offlineUsersList;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(thunks.fetchUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(thunks.fetchUsers.fulfilled, (state, { payload }: { payload: IEmployee[] }) => {
        state.status = statusStates.ok;
        state.loading = false;
        state.employeesList = payload;
      })
      .addCase(thunks.fetchUsers.rejected, (state) => {
        state.status = statusStates.failure;
      });
  },
});

const employeesSlice = {
  actions: slice.actions,
  thunks,
  selectors,
};

export { employeesSlice };
export default slice.reducer;
