import React from 'react';
import classes from './modules/BtnApp.module.css'

const BtnApp = ({children, ...props}) => {
    return (
        <button className={classes.btn} {...props}>
            {children}
        </button>
    );
};

export default BtnApp;