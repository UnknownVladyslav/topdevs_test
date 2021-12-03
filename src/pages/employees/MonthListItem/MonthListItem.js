import React from 'react';
import moment from "moment";
import PropTypes from "prop-types";
import {employeeShape} from "../constants";
import classes from "../EmployeesSelected/EmployeesSelected.module.scss";

const MonthListItem = ({employees}) => (
    <>
        {employees.map(({id, firstName, lastName, dob}) =>
            <div className={classes.birthDateItem} key={id}>
                <span>{`${firstName} ${lastName}`}</span>
                <span>{moment(dob).format('LL')}</span>
            </div>
        )}
    </>
);

MonthListItem.propTypes = {
    employees: PropTypes.arrayOf(employeeShape).isRequired,
}

export default MonthListItem;