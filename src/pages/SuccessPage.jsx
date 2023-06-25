import React from 'react';
import classes from './modules/SuccessPage.module.css'
import BtnApp from "../components/BtnApp";
import {useLocation, useNavigate} from "react-router-dom";


const SuccessPage = () => {

    const route = useNavigate();
    const {state} = useLocation();
    const {estimate} = state;

    return (
        <section>
            <div className={['container', classes.container].join(' ')}>
                <h1 className={classes.title}>Успешно</h1>
                {
                    (estimate === 'empty')
                    ? ''
                    :(estimate)
                        ? <p className={classes.success}>и комплексная оценка указана верно</p>
                        : <p className={classes.error}>но комплексная оцценка указана не верно</p>
                }

                <div className={classes.container__btn}>
                    <BtnApp onClick={() => route(-1)}>Следующая задача</BtnApp>
                    <BtnApp onClick={() => route('/task')}>Вернуться к списку задач</BtnApp>
                </div>
            </div>
        </section>
    );
};

export default SuccessPage;