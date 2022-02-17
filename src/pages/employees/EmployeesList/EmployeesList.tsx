import React, {FC, useMemo} from 'react';
import {IEmployee, ISortedWithLettersList} from "types/types";
import {employeesSlice} from "redux/reducers/employeesSlice";
import {useAppSelector} from "types/redux/hooks";
import {titles} from "pages/employees/constants";
import EmployeesListItem from "pages/employees/EmployeesListItem/EmployeesListItem";
import Button from "ui/Button/Button";
import classes from './EmployeesList.module.scss';

interface EmployeesListProps {
    employees: IEmployee[],
    onResetSelectedUsers: () => void,
}

const EmployeesList: FC<EmployeesListProps> = ({employees, onResetSelectedUsers}) => {

    const sortedList = useMemo<ISortedWithLettersList>(() =>
        titles.map(letter => ({
        title: letter,
        employees: employees.filter(employee => employee.firstName[0] === letter)
    })), [employees]);

    const activeUsers = useAppSelector(employeesSlice.selectors.activeUsers);

    return (
    <div className={classes.listContainer}>
        <div className={classes.titleContainer}>
            <h2>Employees</h2>
            {activeUsers.length ?
                <Button onClick={onResetSelectedUsers}>Reset all</Button> :
                null
            }
        </div>
        <ul>
            {sortedList.map(({title, employees}) =>
                <EmployeesListItem
                    title={title}
                    key={title}
                    employees={employees}
                    activeUsers={activeUsers}
                />
            )}
        </ul>
    </div>
)};

export default EmployeesList;