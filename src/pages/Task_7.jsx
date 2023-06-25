import React, {useEffect, useMemo, useState} from 'react';
import classes from "./modules/Task.module.css";
import TaskText from "../components/TaskText";
import Calculations from "../APIMath/Calculations"
import {useNavigate, useParams} from "react-router-dom";
import InputApp from "../components/InputApp";
import SelectApp from "../components/selectApp";
import ErrorMessage from "../components/ErrorMessage";

const Task_7 = ({functionCount},...props) => {
    function randomIntFromInterval(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min)
    }

    const route = useNavigate();

    const [string, setString] = useState('');
    const [util, setUtil] = useState('');
    const [aveTime, setAveTime] = useState('');
    const [aveCont, setAveCont] = useState('');
    const [generalAssessment, setGeneralAssessment] = useState('');
    const [rez, setRez] = useState(true);
    const [taskNumber, setTaskNumber] = useState(null);

    const [error, setError] = useState(false);
    const [messageError, setMessageError] = useState('');

    const [a, setA] = useState(0);
    const [aPlus, setAPlus] = useState(0);
    const [b, setB] = useState(0);
    const [bPlus, setBPlus] = useState(0);
    const [c, setC] = useState(0);
    const [cPlus, setCPlus] = useState(0);
    const [d, setD] = useState(0);
    const [dPlus, setDPlus] = useState(0);
    const [numberE, setE] = useState(0);

    useMemo(() => {
        getJson().then(json => {

            if(!taskNumber && taskNumber !== 0) return

            setString(json.arr[taskNumber].task)

            let bNumbers = json.arr[taskNumber].bRange.map(item => parseInt(item));

            let numberA = randomIntFromInterval(2, 20);
            let numberAPlus = randomIntFromInterval(3, numberA - 1);
            let numberB = randomIntFromInterval(2, 20);
            let numberBPlus = randomIntFromInterval(3, numberB - 1);
            let numberC = randomIntFromInterval(...bNumbers);
            let numberCPlus = randomIntFromInterval(2, numberC - 1);
            let numberD = randomIntFromInterval(...bNumbers);
            let numberDPlus = randomIntFromInterval(2, numberD - 1);
            let numberE = randomIntFromInterval(2, 12);



            setA(numberA);
            setAPlus(numberAPlus);
            setB(numberB);
            setBPlus(numberBPlus);
            setC(numberC);
            setCPlus(numberCPlus)
            setD(numberD);
            setDPlus(numberDPlus);
            setE(numberE);
        });
    }, [taskNumber])

    useMemo(() => {

        getJson().then(json => {
            let randomNuber = randomIntFromInterval(0, json.arr.length - 1);
            setTaskNumber(randomIntFromInterval(0, randomNuber));
        });

    }, [])

    useMemo(() => {
        parseTask(a, aPlus, b, bPlus, c, cPlus, d, dPlus, numberE);
    }, [string])

    async function getJson() {
        let json = require(`../json/task_7.json`);
        return json;
    }

    function parseTask(numberA, numberAPlus, numberB, numberBPlus, numberC, numberCPlus, numberD, numberDPlus,  numberE) {
        let newString = '';
        if(string.includes('A')
            && string.includes('B')
            && string.includes('C')
            && string.includes('D')
            && string.includes('E')
        ) {
            newString = string.replace('A', `${numberA}±${numberAPlus}`);
            newString = newString.replace('B', `${numberB}±${numberBPlus}`);
            newString = newString.replace('C', `${numberC}±${numberCPlus}`);
            newString = newString.replace('D', `${numberD}±${numberDPlus}`);
            newString = newString.replace('E', `${numberE}`);
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
        if(!(fnCheck(util) && fnCheck(aveCont) && fnCheck(aveTime))) {
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
        let result = await Calculations.getResult(json.programm , a, aPlus, b, bPlus, c, cPlus, d, dPlus, numberE, 7);
        console.log(result);
       let getResult = new Function('utilization', 'content', 'timePerTrans', json.arr[taskNumber].compoAssessment);
       console.log(getResult(result.utilization, result.content, result.timePerTrans));
        if((result.utilization + 0.1 > parseFloat(util) && result.utilization - 0.1 < parseFloat(util))
            && (result.content + 2 > parseFloat(aveCont) && result.content - 2 < parseFloat(aveCont))
            && (result.timePerTrans + 30 > parseFloat(aveTime) && result.timePerTrans - 30 < parseFloat(aveTime))) {

            functionCount(parseInt(localStorage.getItem('countSuccessAnswer'))  + 1);
            route('/SuccessPage', {state: {estimate: getResult(result.utilization, result.content, result.timePerTrans) === generalAssessment.value}});
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
            <h1 className={classes.title}>Задача №2</h1>
            <TaskText className={classes.task__wrapper}>
                {string}
            </TaskText>
            <form className={classes.task__form} action="">
                <div className="">
                    <p className={classes.task__label}>Коэффициент полезной загрузки</p>
                    <InputApp
                        maskChar=" "
                        mask={"199999999"}
                        formatChars = {
                            {   '1': '[0-9]',
                                '9': '[0-9.]',
                            }
                        }
                        className={classes.task__input}
                        value={util}
                        onChange={(e) => {setUtil(e.target.value)}}
                        type="text"
                    />
                </div>
                <div className="">
                    <p className={classes.task__label}>Среднее время ожидания в очереди</p>
                    <InputApp
                        maskChar=" "
                        mask={"199999999"}
                        formatChars = {
                            {   '1': '[0-9]',
                                '9': '[0-9.]',
                            }
                        }
                        className={classes.task__input}
                        value={aveTime}
                        onChange={(e) => {setAveTime(e.target.value)}}
                        type="text"
                    />
                </div>
                <div className="">
                    <p className={classes.task__label}>Средняя длина очереди</p>
                    <InputApp
                        maskChar=" "
                        mask={"199999999"}
                        formatChars = {
                            {   '1': '[0-9]',
                                '9': '[0-9.]',
                            }
                        }
                        className={classes.task__input}
                        value={aveCont}
                        onChange={(e) => {setAveCont(e.target.value)}}
                        type="text"
                    />
                </div>
                <div className="">
                    <p className={classes.task__label}>Качественная комплексная оценка эффективности</p>
                    <SelectApp
                        className={classes.task__select}
                        defaultValue={generalAssessment}
                        value={generalAssessment}
                        onChange={setGeneralAssessment}
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

export default Task_7;