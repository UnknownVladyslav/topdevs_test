import {RootState} from "types/redux/index";
import {IEmployee} from "types/types";

const selectors = {
    employees: (state: RootState) => state.employees,
    activeUsers: (state: RootState): IEmployee[] => state.employees.activeEmployeesList,
};

export { selectors };
