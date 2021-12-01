import React, {useCallback, useEffect, useState} from 'react';
import PropTypes from "prop-types";
import {employeeShape, radioLabels} from "../constants";
import CustomRadioInput from "../../../ui/CustomRadioInput/CustomRadioInput";
import {addActiveEmployee, removeActiveEmployee} from "../../../redux/reducers/employeesSlice";
import {useDispatch} from "react-redux";
import classes from './EmployeeCard.module.scss';

const EmployeeCard = ({id, firstName, lastName, activeUsers}) => {

    const [isActive, setActive] = useState(false);

    const dispatch = useDispatch();

    useEffect(() => {
        if (activeUsers.find(user => user.id === id)) {
            setActive(true);
        } else {
            setActive(false);
        }
    }, [activeUsers, id])

    const onSetActiveStatus = useCallback(() => {
        dispatch(addActiveEmployee(id));
    }, [dispatch, id]);

    const onSetInactiveStatus = useCallback(() => {
        dispatch(removeActiveEmployee(id));
    }, [dispatch, id]);

    return (
        <div className={classes.personCardWrapper}
             style={{borderColor: isActive ? '#9ec2e6' : 'inherit'}}
        >
            <p style={{
                color: isActive ? '#9ec2e6' : 'inherit',
                transition: '.3s color ease'
            }}
            >{`${firstName} ${lastName}`}</p>

            <div className={classes.inputGroup} >
                <CustomRadioInput
                    checked={isActive}
                    label={radioLabels.active}
                    onChange={onSetActiveStatus}
                />

                <CustomRadioInput
                    checked={!isActive}
                    label={radioLabels.notActive}
                    onChange={onSetInactiveStatus}
                />

            </div>
        </div>
    );
};

EmployeeCard.propTypes = {
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    activeUsers: PropTypes.arrayOf(employeeShape),
}

EmployeeCard.defaultProps = {
    activeUsers: [],
}

export default EmployeeCard;