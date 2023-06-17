import React, {useEffect, useMemo, useState} from 'react';
import classes from "./modules/Task.module.css";
import TaskText from "../components/TaskText";
import Calculations from "../APIMath/Calculations"
import {useNavigate, useParams} from "react-router-dom";

const Task_7 = () => {
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
            let numberTask = randomIntFromInterval(0, json.arr.length - 1);
            setString(json.arr[numberTask])
        });

        let numberA = randomIntFromInterval(2, 20);
        let numberAPlus = randomIntFromInterval(3, numberA - 1);
        let numberB = randomIntFromInterval(2, 20);
        let numberBPlus = randomIntFromInterval(3, numberB - 1);
        let numberC = randomIntFromInterval(2, 30);
        let numberCPlus = randomIntFromInterval(2, numberC - 1);
        let numberD = randomIntFromInterval(2, 30);
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
    function getEstimate(utilization, content, timePerTrans) {
        if(utilization < 0.50 || content > 30 || timePerTrans > 30) {
            return 'низкая';
        } else if(utilization < 0.60 || content > 15 || timePerTrans > 15) {
            return 'ниже средней';
        } else if(utilization < 0.70 || content > 10 || timePerTrans > 10) {
            return 'средняя';
        } else if(utilization < 0.80 || content > 5 || timePerTrans > 5) {
            return 'выше средней';
        }
        return 'высокая';
    }

   async function checkRezults(e) {
        e.preventDefault();
        setRez(false);
        let json = await getJson();
        let result = await Calculations.getResult(json.programm , a, aPlus, b, bPlus, c, cPlus, d, dPlus, numberE, 7);
        console.log(result);
        console.log(getEstimate(result.utilization, result.content, result.timePerTrans))
        if((result.utilization + 0.1 > parseFloat(util) && result.utilization - 0.1 < parseFloat(util))
            && (result.content + 2 > parseFloat(aveCont) && result.content - 2 < parseFloat(aveCont))
            && (result.timePerTrans + 30 > parseFloat(aveTime) && result.timePerTrans - 30 < parseFloat(aveTime))) {
            route('/SuccessPage');
        } else {
            setRez(true);
        }
    }

    return (
        <div className={['container', classes.task__container].join(' ')}>
            <a onClick={() => route('/task')} className={classes.task__btBack} href="#">Вернутся ко всем задачам</a>
            <h1 className={classes.title}>Задача №7</h1>
            <TaskText className={classes.task__wrapper}>
                {string}
            </TaskText>
            <form className={classes.task__form} action="">
                <div className="">
                    <p className={classes.task__label}>Коэффициент полезной загрузки</p>
                    <input className={classes.task__input} value={util} onChange={(e) => {setUtil(e.target.value)}} type="text"/>
                </div>
                <div className="">
                    <p className={classes.task__label}>Среднее время ожидания в очереди</p>
                    <input className={classes.task__input} value={aveTime} onChange={(e) => {setAveTime(e.target.value)}} type="text"/>
                </div>
                <div className="">
                    <p className={classes.task__label}>Средняя сдина очереди</p>
                    <input className={classes.task__input} value={aveCont} onChange={(e) => {setAveCont(e.target.value)}} type="text"/>
                </div>
                <div className="">
                    <p className={classes.task__label}>Качественная комплексная оценка эффективности</p>
                    <select className={classes.task__input} value={generalAssessment} onChange={(e) => {setGeneralAssessment(e.target.value)}} name="" id="">
                        <option value="">Выберите вариант</option>
                        <option value="высокая">высокая</option>
                        <option value="выше средней">выше средней</option>
                        <option value="средняя">средняя</option>
                        <option value="ниже средней">ниже средней</option>
                        <option value="низкая">низкая</option>
                    </select>
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