import React from 'react';
import PropTypes from "prop-types";
import classes from './Button.module.scss';

const Button = ({onClick, children}) => (
    <div>
        <button onClick={onClick} className={classes.customButton}>{children}</button>
    </div>
);

Button.propTypes = {
    onClick: PropTypes.func.isRequired,
    children: PropTypes.string.isRequired
}

export default Button;