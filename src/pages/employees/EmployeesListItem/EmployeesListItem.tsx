import React, { FC } from 'react';
import { IEmployee } from 'types/types';
import EmployeeCard from 'pages/employees/EmployeeCard/EmployeeCard';
import classes from './EmployeesListItem.module.scss';

interface ListItemProps {
    title: string,
    employees: IEmployee[],
    activeUsers: IEmployee[] | [],
}

const EmployeesListItem: FC<ListItemProps> = ({ title, employees, activeUsers }) => (
  <li>
    <h3>{title}</h3>
    <div className={classes.employeeListWrapper}>
      {employees.length > 0 ? employees.map(({ id, firstName, lastName }) => (
        <EmployeeCard
          activeUsers={activeUsers}
          firstName={firstName}
          lastName={lastName}
          key={id}
          id={id}
        />
      ))
        : <strong>Employees list is empty</strong>}
    </div>
  </li>
);

export default EmployeesListItem;
