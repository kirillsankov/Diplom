import React, {useEffect, useMemo, useState} from 'react';
import classes from "./modules/Task.module.css";
import TaskText from "../components/TaskText";
import Calculations from "../APIMath/Calculations"
import {useNavigate, useParams} from "react-router-dom";
import InputApp from "../components/InputApp";
import ErrorMessage from "../components/ErrorMessage";

const Task_8 = ({functionCount},...props) => {
    function randomIntFromInterval(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min)
    }

    const route = useNavigate();




    const [string, setString] = useState('');
    const [count, setCount] = useState('');
    const [rez, setRez] = useState(true);

    const [a, setA] = useState(0);
    const [aPlus, setAPlus] = useState(0);
    const [b, setB] = useState(0);
    const [bPlus, setBPlus] = useState(0);
    const [c, setC] = useState(0);

    const [error, setError] = useState(false);
    const [messageError, setMessageError] = useState('');

    useMemo(() => {
        getJson().then(json => {
            let numberTask = randomIntFromInterval(0, json.arr.length - 1);
            setString(json.arr[numberTask])
        });

        let numberA = randomIntFromInterval(2, 10);
        let numberAPlus = randomIntFromInterval(3, numberA - 1);
        let numberB = randomIntFromInterval(10, 30);
        let numberBPlus = randomIntFromInterval(3, numberB - 1);
        let numberC = randomIntFromInterval(2, 12);



        setA(numberA);
        setAPlus(numberAPlus);
        setB(numberB);
        setBPlus(numberBPlus);
        setC(numberC);
    }, [])

    useMemo(() => {
        parseTask(a, aPlus, b, bPlus, c);
    }, [string])

    async function getJson() {
        let json = require(`../json/task_8.json`);
        return json;
    }

    function parseTask(numberA, numberAPlus, numberB, numberBPlus, numberC) {
        let newString = '';
        if(string.includes('A')
            && string.includes('B')
            && string.includes('C')
        ) {
            newString = string.replace('A', `${numberA}±${numberAPlus}`);
            newString = newString.replace('B', `${numberB}±${numberBPlus}`);
            newString = newString.replace('C', `${numberC}`);
            setString(newString);
        }
    }

    function showError(string) {
        setMessageError(string);
        setError(true);

        setTimeout(() => {
            setError(false)
        }, 5000);
    }
    function checkValidate() {
        let fnCheck = Calculations.validateField;
        if(!(fnCheck(count))) {
            showError('Некорректные данные');

            return true;
        }
        return false;
    }

   async function checkRezults(e) {
        e.preventDefault();
       if(checkValidate()) {
           return;
       }
       setRez(false);
        let json = await getJson();
        let result = await Calculations.getResultTask8(json.programm ,a, aPlus, b, bPlus, c, null, null, null, null, 8);
        console.log(result);
        if(result + 1 >= parseInt(count) && result - 1 <= parseInt(count)) {
            functionCount(parseInt(localStorage.getItem('countSuccessAnswer'))  + 1);
            route('/SuccessPage', {state: {estimate: "empty"}});
        } else {
            setRez(true);

            showError('Задание решено не верно, попробуй еще раз');
        }
    }


    return (
        <div className={['container', classes.task__container].join(' ')}>
            <ErrorMessage error={error} message={messageError}/>
            <a onClick={(e) => {
                e.preventDefault();
                route('/task')
            }} className={classes.task__btBack} href="#">Вернутся ко всем задачам</a>
            <h1 className={classes.title}>Задача №3</h1>
            <TaskText className={classes.task__wrapper}>
                {string}
            </TaskText>
            <form className={[classes.task__form, classes.task__form__full].join(' ')} action="">
                <div className="">
                    <p className={classes.task__label}>Введите оптимальное количество заявок:</p>
                    <InputApp
                        maskChar=" "
                        mask={"9999999999"}
                        className={classes.task__input}
                        value={count} onChange={(e) => {setCount(e.target.value)}}
                        type="text"
                    />
                </div>
                {
                    (rez)
                        ? <input className={classes.task__btn} onClick={(e) => checkRezults(e)} type="submit"/>
                        : <div className={classes.preloader}>
                            <div className={classes.loader}></div>
                    </div>
                }
            </form>

        </div>
    );
};

export default Task_8;