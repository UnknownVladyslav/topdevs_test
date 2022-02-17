import {FC, useCallback, useEffect, useState} from "react";
import {statusStates} from "redux/constants";
import {employeesSlice, EmployeesSliceState} from "redux/reducers/employeesSlice";
import {useAppDispatch, useAppSelector} from "types/redux/hooks";
import {localStorageKeys} from "pages/employees/constants";
import {IEmployee} from "./types/types";
import EmployeesSelected from "pages/employees/EmployeesSelected/EmployeesSelected";
import EmployeesList from "./pages/employees/EmployeesList/EmployeesList";
import Button from "./ui/Button/Button";
import classes from './styles/App.module.scss';

const App:FC = () => {
    const [inited, setInit] = useState<boolean>(false);

    const dispatch = useAppDispatch();
    const {employeesList, loading, status, activeEmployeesList, isOfflineMode}: EmployeesSliceState = useAppSelector(employeesSlice.selectors.employees);

    const setActiveUsers = useCallback(() => {
        activeEmployeesList.length &&
        localStorage.setItem(localStorageKeys.activeUsers, JSON.stringify(activeEmployeesList));
    }, [activeEmployeesList]);

    const onResetSelected = useCallback(() => {
        dispatch(employeesSlice.actions.resetSelectedItems());
        localStorage.removeItem(localStorageKeys.activeUsers);
    }, [dispatch]);

    const turnOfflineMode = useCallback(() => {
        dispatch(employeesSlice.actions.setOfflineMode());
    }, [dispatch])

    useEffect(() => {
        if (!isOfflineMode) {
            !loading && setInit(true);
        } else {
            setInit(true);
        }
    }, [isOfflineMode, loading]);

    useEffect(
        () => {
            window.addEventListener("beforeunload", setActiveUsers);
            return () =>
                window.removeEventListener("beforeunload", setActiveUsers);
        },
        [setActiveUsers]
    );

    useEffect(() => {
            const activeUsersFromLocalStorage: IEmployee[] = JSON.parse(localStorage.getItem(localStorageKeys.activeUsers) || '');
            activeUsersFromLocalStorage &&
            dispatch(employeesSlice.actions.setLocalStorageActiveEmployee(activeUsersFromLocalStorage));
            !isOfflineMode && dispatch(employeesSlice.thunks.fetchUsers());
        },
        [dispatch, isOfflineMode])

    return (
        <div className={classes.App}>
            {inited ?
                <div className={classes.employeesBlockWrapper}>
                    <EmployeesList
                        employees={employeesList}
                        onResetSelectedUsers={onResetSelected}
                    />
                    <EmployeesSelected/>
                </div> :
                status === statusStates.ok && <p>Loading...</p>
            }
            {
                !isOfflineMode && status === statusStates.failure &&
                <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                    <p>Data fetching failure...</p>
                    <Button onClick={turnOfflineMode}>Offline mode</Button>
                </div>
            }
        </div>
    );
}

export default App;
