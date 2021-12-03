import React, {useMemo} from 'react';
import {useSelector} from "react-redux";
import {months} from "../constants";
import moment from 'moment';
import MonthListItem from "../MonthListItem/MonthListItem";
import classes from './EmployeesSelected.module.scss';

const EmployeesSelected = () => {
    const activeUsers = useSelector(state => state.employees.activeEmployeesList);

    const sortedList = useMemo( () =>
        months.map(month => ({
            month,
            employees: activeUsers.filter(({dob}) => moment(dob).format('MMMM').includes(month))
        })),[activeUsers]);

    return (
        <div className={classes.selectedEmployeesContainer}>
            <h2>Employees birthday</h2>
            <div className={classes.birthDateWrapper}>
                {sortedList.map(({month, employees}) =>
                    employees.length > 0 &&
                    <div key={month} className={classes.monthItemWrapper}>
                        <h3>{month}</h3>
                        <MonthListItem employees={employees} />
                    </div>
                )}
            </div>
        </div>
    );
};

export default EmployeesSelected;