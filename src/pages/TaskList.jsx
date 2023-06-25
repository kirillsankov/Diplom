import React from 'react';
import TaskCart from "../components/TaskCart";
import classes from './modules/TaskList.module.css';

const TaskList = () => {
    return (
        <section>
            <div className={['container', classes.container].join(' ')}>
                <h1 className={classes.title}>Список задач:</h1>
             <TaskCart number={1} theme={'Моделирование одноканальных СМО с однородным потоком заявок в GPSS World'}></TaskCart>
             <TaskCart number={2} theme={'Моделирование одноканальных СМО с неоднородным потоком заявок в GPSS World'}></TaskCart>
             <TaskCart number={3} theme={'Моделирование многоканальных СМО с однородным потоком заявок в GPSS World'}></TaskCart>
            </div>
        </section>
    );
};

export default TaskList;