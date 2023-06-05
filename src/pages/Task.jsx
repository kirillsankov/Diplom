import React, {useEffect, useMemo, useState} from 'react';
import json from '../json/task_6.json';
import classes from "./modules/Task.module.css";
import PAnim from "../components/pAnim";
import TaskText from "../components/TaskText";
import Calculations from "../APIMath/Calculations"
import TicketCounterSimulation from '../components/simulateTicketCounter'

const Task = () => {
    function randomIntFromInterval(min, max) { // min and max included
        return Math.floor(Math.random() * (max - min + 1) + min)
    }
    let numberA= randomIntFromInterval(2, 20);
    let numberAPlus= randomIntFromInterval(3, 10);
    let numberB = randomIntFromInterval(2, 20);
    let numberBPlus = randomIntFromInterval(3, 10);
    let numberC = randomIntFromInterval(2, 30);


    const [string, setString] = useState();
    const [Util, setUtil] = useState();
    const [aveTime, setAveTime] = useState();
    const [aveCont, setAveCont] = useState();
    const [generalAssessment, setGeneralAssessment] = useState();
    const [Assessment, setAssessment] = useState();
    const [rez, setRez] = useState(false);

    useEffect(() => {
        getJson();
    }, [])

    useMemo(() => {
        if(string) {
            parseTask();
        }
    }, [string])


    function getJson() {
        let numberTask = randomIntFromInterval(0, 3);
        setString(json.arr[numberTask]);
    }

    function parseTask() {
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

    function checkRezults(e) {
        e.preventDefault();
       /* let arrivalTimes = Calculations.averageTimeQueue(numberA, numberAPlus, numberB, numberBPlus, numberC);
        let payloadRatio = Calculations.payloadRatio(numberA, numberAPlus, numberB, numberBPlus, numberC);
        let leghtQueue = Calculations.leghtQueue(numberA, numberAPlus, numberB, numberBPlus, numberC);


        if((Util + 0.50 < payloadRatio && Util + 0.50 > payloadRatio)
            && (aveTime + 10 < arrivalTimes && aveTime + 10 > arrivalTimes)
            && (aveCont + 0.50 < leghtQueue && aveCont + 0.50 > leghtQueue)) {
            setRez(true);
        }*/

        Calculations.test();
    }

    return (
        <div className={['container', classes.task__container].join(' ')}>
            <h1 className={classes.title}>Задача №6</h1>
            <TaskText className={classes.task__wrapper}>
                {string}
            </TaskText>
            <form action="">
                <div className="">
                    <p>Значение коэффициента полезной загрузки</p>
                    <input value={Util} onChange={(e) => {setUtil(e.target.value)}} type="number"/>
                </div>
                <div className="">
                    <p>Значение среднего времени ожидания транзактов в очереди</p>
                    <input value={aveTime} onChange={(e) => {setAveTime(e.target.value)}} type="number"/>
                </div>
                <div className="">
                    <p>значение средней длины очереди </p>
                    <input value={aveCont} onChange={(e) => {setAveCont(e.target.value)}} type="number"/>
                </div>
                <div className="">
                    <p>Качественная комплексная оценка эффективности</p>
                    <select onChange={(e) => {setGeneralAssessment(e.target.value)}} name="" id="">
                        <option value="высокая">высокая</option>
                        <option value="выше средней">выше средней</option>
                        <option value="средняя">средняя</option>
                        <option value="ниже средней">ниже средней</option>
                        <option value="низкая">низкая</option>
                    </select>
                </div>
                <input onClick={(e) => checkRezults(e)} type="submit"/>
            </form>
            {
                (rez)
                ? <p>
                        Значения подобраны верно
                </p>
                : <p>Значения подобраны не верно</p>
            }
            {
                (Assessment && rez)
                    ? <p>Оценка корректна</p>
                    : <p>Оценка не корректна</p>
            }
        </div>
    );
};

export default Task;