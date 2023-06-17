import React from 'react';
import classes from './modules/SuccessPage.module.css'
import BtnApp from "../components/BtnApp";
import {useNavigate} from "react-router-dom";


const SuccessPage = () => {

    const route = useNavigate();

    return (
        <section>
            <div className={['container', classes.container].join(' ')}>
                <h1 className={classes.title}>Успешно</h1>
                <div className={classes.container__btn}>
                    <BtnApp onClick={() => route(-1)}>Следующая задача</BtnApp>
                    <BtnApp onClick={() => route('/task')}>Вернуться к списку задач</BtnApp>
                </div>
            </div>
        </section>
    );
};

export default SuccessPage;