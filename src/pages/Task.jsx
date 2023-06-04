import React, {useEffect, useState} from 'react';
import json from '../json/task_6.json'

const TaskSix = () => {
    function randomIntFromInterval(min, max) { // min and max included
        return Math.floor(Math.random() * (max - min + 1) + min)
    }

    const [string, setString] = useState();

    useEffect(() => {
        getJson()
    }, [])

    function getJson() {
        setString(json.arr[randomIntFromInterval(0, 4)]);
    }

    return (
        <div>
            {string}
        </div>
    );
};

export default TaskSix;