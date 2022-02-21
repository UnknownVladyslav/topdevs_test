import { RootState } from 'types/redux/index';
import { IEmployee } from 'types/types';
import { EmployeesSliceState } from './employeesSlice';

const selectors = {
  employees: (state: RootState): EmployeesSliceState => state.employees,
  activeUsers: (state: RootState): IEmployee[] => state.employees.activeEmployeesList,
};

export { selectors };
