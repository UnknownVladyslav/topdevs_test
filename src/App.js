import {useCallback, useEffect, useState} from "react";
import {loadingStates, statusStates} from "./redux/constants";
import {useDispatch, useSelector} from "react-redux";
import {fetchUsers, resetSelectedItems, setLocalStorageActiveEmployee} from "./redux/reducers/employeesSlice";
import EmployeesList from "./modules/employees/EmployeesList/EmployeesList";
import EmployeesSelected from "./modules/employees/EmployeesSelected/EmployeesSelected";
import {localStorageKeys} from "./modules/employees/constants";
import classes from './styles/App.module.scss';

const App = () => {
    const [inited, setInit] = useState(false);

    const dispatch = useDispatch();
    const {employeesList, loading, status, activeEmployeesList} = useSelector(state => state.employees);

    const setActiveUsers = useCallback(() => {
        activeEmployeesList.length &&
        localStorage.setItem(localStorageKeys.activeUsers, JSON.stringify(activeEmployeesList));
    }, [activeEmployeesList]);

    const onResetSelected = useCallback(() => {
        dispatch(resetSelectedItems());
        localStorage.removeItem(localStorageKeys.activeUsers);
    }, [dispatch]);

    useEffect(() => {
        loading === loadingStates.resolved && setInit(true);
    }, [loading]);

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
            dispatch(fetchUsers());
        },
        [dispatch])

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
            {status === statusStates.failure && <p>Data fetching failure...</p>}
        </div>
    );
}

export default App;
