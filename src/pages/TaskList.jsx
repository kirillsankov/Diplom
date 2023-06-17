import React from 'react';
import TaskCart from "../components/TaskCart";
import classes from './modules/TaskList.module.css';

const TaskList = () => {
    return (
        <section>
            <div className={['container', classes.container].join(' ')}>
                <h1 className={classes.title}>Список задач по имитационному моделированию:</h1>
             <TaskCart number={6} theme={'Моделирование одноканальных СМО с однородным потоком заявок в GPSS World'}></TaskCart>
             <TaskCart number={7} theme={'Моделирование одноканальных СМО с неоднородным потоком заявок в GPSS World'}></TaskCart>
             <TaskCart number={8} theme={'Моделирование многоканальных СМО с однородным потоком заявок в GPSS World'}></TaskCart>
                npm i gh-pages
            </div>
        </section>
    );
};

export default TaskList;