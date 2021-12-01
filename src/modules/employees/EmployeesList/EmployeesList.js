import React, {useMemo} from 'react';
import {employeeShape, titles} from "../constants";
import EmployeesListItem from "../EmployeesListItem/EmployeesListItem";
import {useSelector} from "react-redux";
import PropTypes from "prop-types";
import classes from './EmployeesList.module.scss';

const EmployeesList = ({employees, onResetSelectedUsers}) => {

    const sortedList = useMemo(() =>
        titles.map(letter => ({
        title: letter,
        employees: employees.filter(employee => employee.firstName[0] === letter)
    })), [employees]);

    const activeUsers = useSelector(state => state.employees.activeEmployeesList);

    return (
    <div className={classes.listContainer}>
        <div className={classes.titleContainer}>
            <h2>Employees</h2>
            {activeUsers.length ?
                <button onClick={onResetSelectedUsers}>Reset all</button> :
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

EmployeesList.propTypes = {
    employees: PropTypes.arrayOf(employeeShape).isRequired,
    onResetSelectedUsers: PropTypes.func.isRequired,
}

export default EmployeesList;