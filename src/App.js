import {useCallback, useEffect, useState} from "react";
import {loadingStates, statusStates} from "./redux/constants";
import {useDispatch, useSelector} from "react-redux";
import {
    fetchUsers,
    resetSelectedItems,
    setLocalStorageActiveEmployee,
    setOfflineMode
} from "./redux/reducers/employeesSlice";
import EmployeesList from "./modules/employees/EmployeesList/EmployeesList";
import EmployeesSelected from "./modules/employees/EmployeesSelected/EmployeesSelected";
import {localStorageKeys} from "./modules/employees/constants";
import classes from './styles/App.module.scss';
import Button from "./ui/Button/Button";

const App = () => {
    const [inited, setInit] = useState(false);

    const dispatch = useDispatch();
    const {employeesList, loading, status, activeEmployeesList, isOfflineMode} = useSelector(state => state.employees);

    const setActiveUsers = useCallback(() => {
        activeEmployeesList.length &&
        localStorage.setItem(localStorageKeys.activeUsers, JSON.stringify(activeEmployeesList));
    }, [activeEmployeesList]);

    const onResetSelected = useCallback(() => {
        dispatch(resetSelectedItems());
        localStorage.removeItem(localStorageKeys.activeUsers);
    }, [dispatch]);

    const turnOfflineMode = useCallback(() => {
        dispatch(setOfflineMode());
    }, [dispatch])

    useEffect(() => {
        if (!isOfflineMode) {
            loading === loadingStates.resolved && setInit(true);
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
            const activeUsersFromLocalStorage = JSON.parse(localStorage.getItem(localStorageKeys.activeUsers));
            activeUsersFromLocalStorage &&
            dispatch(setLocalStorageActiveEmployee(activeUsersFromLocalStorage));
            !isOfflineMode && dispatch(fetchUsers());
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
                status === statusStates.failure &&
                <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                    <p>Data fetching failure...</p>
                    <Button onClick={turnOfflineMode}>Offline mode</Button>
                </div>
            }
        </div>
    );
}

export default App;