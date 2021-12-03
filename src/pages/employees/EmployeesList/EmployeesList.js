import React, {useMemo} from 'react';
import {employeeShape, titles} from "../constants";
import EmployeesListItem from "../EmployeesListItem/EmployeesListItem";
import {useSelector} from "react-redux";
import PropTypes from "prop-types";
import Button from "../../../ui/Button/Button";
import classes from './EmployeesList.module.scss';

const EmployeesList = ({employees, onResetSelectedUsers, setOnlineMode}) => {

    const sortedList = useMemo(() =>
        titles.map(letter => ({
        title: letter,
        employees: employees.filter(employee => employee.firstName[0] === letter)
    })), [employees]);

    const {activeEmployeesList: activeUsers, isOfflineMode} = useSelector(state => state.employees);

    return (
    <div className={classes.listContainer}>
        <div className={classes.titleContainer}>
            <h2>Employees</h2>
            {isOfflineMode &&
                <div className={classes.onlineMode}>
                    <Button onClick={setOnlineMode} style={{flexGrow: '1'}}>Online mode</Button>
                    <span>No connection</span>
                </div>
            }
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

EmployeesList.propTypes = {
    employees: PropTypes.arrayOf(employeeShape).isRequired,
    onResetSelectedUsers: PropTypes.func.isRequired,
    setOnlineMode: PropTypes.func.isRequired,
    connectionStatus: PropTypes.string.isRequired,
}

export default EmployeesList;