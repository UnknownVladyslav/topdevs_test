import React from 'react';
import PropTypes from "prop-types";
import {employeeShape} from "../constants";
import EmployeeCard from "../EmployeeCard/EmployeeCard";
import classes from './EmployeesListItem.module.scss';

const EmployeesListItem = ({title, employees, activeUsers}) => (
    <li>
        <h3>{title}</h3>
        <div className={classes.employeeListWrapper}>
            {employees.length > 0 ?
                employees.map(({id, firstName, lastName}) =>
                <EmployeeCard
                    activeUsers={activeUsers}
                    firstName={firstName}
                    lastName={lastName}
                    key={id}
                    id={id}
                />
            ) :
            <strong>Employees list is empty</strong>
            }
        </div>
    </li>
);

EmployeesListItem.propsType = {
    title: PropTypes.string.isRequired,
    employees: PropTypes.arrayOf(employeeShape).isRequired,
    activeUsers: PropTypes.arrayOf(employeeShape),
}

EmployeesListItem.defaultProps = {
    activeUser: [],
}

export default EmployeesListItem;