import React, {useMemo, useState} from 'react';
import classes from './modules/PopupPersonInfo.module.css'

const PopupPersonInfo = ({setName, isVisiblePopup, setIsVisiblePopup}) => {

    let [inputName,setInputName] = useState('');


    function resetName() {
        localStorage.setItem('personName', inputName)
        setName(inputName);
        closePopup();
    }

    function closePopup() {
        setIsVisiblePopup(true);
    }

    return (
        <div onClick={() => closePopup()} className={[classes.popup__bg, isVisiblePopup ? classes.popup__hidden : ''].join(" ")}>
            <div onClick={(e) => e.stopPropagation()} className={classes.popup}>
                <h2 className={classes.title}>Введите новое имя:</h2>
                <form action="">
                    <input value={inputName} onChange={(e) => setInputName(e.target.value)} className={classes.input} type="text"/>
                </form>
                <input onClick={() => resetName()} className={classes.btn} type="submit" value="Сохранить новное имя"/>
            </div>
        </div>
    );
};

export default PopupPersonInfo;