import React from 'react';
import BtnApp from "./BtnApp";
import classes from './modules/TaskCart.module.css';
import {useNavigate} from "react-router-dom";

const TaskCart = ({number, theme}, ...props) => {
    const route = useNavigate();
    return (
        <div className={classes.container}>
            <div className={classes.textContainer}>
                <p>Задание №{number}</p>
                <p>Тема: "{theme}"</p>
            </div>
            <BtnApp onClick={() => route(`/task/${number}`)} >
                Открыть задачу
            </BtnApp>
        </div>
    );
};

export default TaskCart;