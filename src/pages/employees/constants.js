import PropTypes from "prop-types";


export const titles = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

export const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

export const employeeShape = PropTypes.shape({
    id: PropTypes.string.isRequired,
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    dob: PropTypes.string.isRequired,
});

export const radioLabels = {
    active: 'Active',
    notActive: 'Not active'
}

export const localStorageKeys = {
    activeUsers: 'activeUsers',
}

