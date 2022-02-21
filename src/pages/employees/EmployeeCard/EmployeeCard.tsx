import React, {
  FC, useCallback, useEffect, useState,
} from 'react';
import { employeesSlice } from 'redux/reducers/employeesSlice';
import { useAppDispatch } from 'types/redux/hooks';
import { radioLabels } from 'pages/employees/constants';
import { IEmployee } from 'types/types';
import CustomRadioInput from 'ui/CustomRadioInput/CustomRadioInput';
import classes from './EmployeeCard.module.scss';

interface CardProps {
    id: string,
    firstName: string,
    lastName: string,
    activeUsers: IEmployee[] | [],
}

const EmployeeCard: FC<CardProps> = ({
  id, firstName, lastName, activeUsers,
}) => {
  const dispatch = useAppDispatch();
  const [isActive, setActive] = useState<boolean>(false);

  useEffect(() => {
    if (activeUsers.find((user: IEmployee): boolean => user.id === id)) {
      setActive(true);
    } else {
      setActive(false);
    }
  }, [activeUsers, id]);

  const onSetActiveStatus = useCallback(() => {
    dispatch(employeesSlice.actions.addActiveEmployee(id));
  }, [dispatch, id]);

  const onSetInactiveStatus = useCallback(() => {
    dispatch(employeesSlice.actions.removeActiveEmployee(id));
  }, [dispatch, id]);

  return (
    <div
      className={classes.personCardWrapper}
      style={{ borderColor: isActive ? '#9ec2e6' : 'inherit' }}
    >
      <p style={{
        color: isActive ? '#9ec2e6' : 'inherit',
        transition: '.3s color ease',
      }}
      >{`${firstName} ${lastName}`}
      </p>

      <div className={classes.inputGroup}>
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

export default EmployeeCard;
