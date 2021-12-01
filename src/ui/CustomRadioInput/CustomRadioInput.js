import React from 'react';
import PropTypes from "prop-types";

const CustomRadioInput = ({label, checked, onChange}) => {
    return <label>
            <input
                type='radio'
                checked={checked}
                onChange={onChange}
            />
            {label}
        </label>
};

CustomRadioInput.propTypes = {
    label: PropTypes.string.isRequired,
    checked: PropTypes.bool.isRequired,
    onChange: PropTypes.func.isRequired,
}

export default CustomRadioInput;