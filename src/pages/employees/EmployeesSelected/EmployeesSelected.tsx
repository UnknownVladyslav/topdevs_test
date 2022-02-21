import React, { FC, useMemo } from 'react';
import { useAppSelector } from 'types/redux/hooks';
import { employeesSlice } from 'redux/reducers/employeesSlice';
import { IEmployee } from 'types/types';
import { months } from 'pages/employees/constants';
import MonthListItem from 'pages/employees/MonthListItem/MonthListItem';
import moment from 'moment';
import classes from './EmployeesSelected.module.scss';

interface IMonthSortedList {
    month: string;
    employees: IEmployee[];
}

const EmployeesSelected: FC = () => {
  const activeUsers = useAppSelector(employeesSlice.selectors.activeUsers);

  const sortedList = useMemo(() => months.map((month: string): IMonthSortedList => ({
    month,
    employees: activeUsers.filter(({ dob }: { dob: string }): boolean => moment(dob).format('MMMM').includes(month)),
  })), [activeUsers]);

  return (
    <div className={classes.selectedEmployeesContainer}>
      <h2>Employees birthday</h2>
      <div className={classes.birthDateWrapper}>
        {sortedList.map(({ month, employees }) => employees.length > 0 && (
        <div key={month} className={classes.monthItemWrapper}>
          <h3>{month}</h3>
          <MonthListItem employees={employees} />
        </div>
        ))}
      </div>
    </div>
  );
};

export default EmployeesSelected;
