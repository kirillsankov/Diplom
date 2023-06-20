import React from 'react';
import classes from './modules/ErrorMessage.module.css'

const ErrorMessage = ({error, message}) => {
    return (
        <div className={[classes.error, error ? classes.showError : ''].join(' ')}>
            {message}
        </div>
    );
};

export default ErrorMessage;