import React, { FC, ReactChild, ReactNode } from 'react';
import classes from './Button.module.scss';

interface ButtonProps {
    onClick: () => void,
    children: ReactChild | ReactNode,
    style?: object,
}

const Button: FC<ButtonProps> = ({ onClick, children, style }) => (
  <div>
    <button onClick={onClick} className={classes.customButton} style={style}>{children}</button>
  </div>
);

export default Button;
