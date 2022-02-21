import React, { FC } from 'react';
import { IEmployee } from 'types/types';
import moment from 'moment';
import classes from '../EmployeesSelected/EmployeesSelected.module.scss';

interface MonthListItemProps {
    employees: IEmployee[]
}

const MonthListItem: FC<MonthListItemProps> = ({ employees }) => (
  <>
    {employees.map(({
      id, firstName, lastName, dob,
    }) => (
      <div className={classes.birthDateItem} key={id}>
        <span>{`${firstName} ${lastName}`}</span>
        <span>{moment(dob).format('LL')}</span>
      </div>
    ))}
  </>
);

export default MonthListItem;
