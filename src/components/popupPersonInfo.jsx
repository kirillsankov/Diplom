import React, {useState} from 'react';
import classes from './modules/PopupPersonInfo.module.css'
import InputApp from "./InputApp";

const PopupPersonInfo = ({setName, isVisiblePopup, setIsVisiblePopup}) => {

    let [inputName,setInputName] = useState('');


    function resetName() {
        localStorage.setItem('personName', inputName)
        setName(inputName);
        closePopup();
    }

    function closePopup() {
        localStorage.setItem('visible', 'true')
        setIsVisiblePopup(true);
    }

    return (
        <div onClick={() => closePopup()} className={[classes.popup__bg, isVisiblePopup ? classes.popup__hidden : ''].join(" ")}>
            <div onClick={(e) => e.stopPropagation()} className={classes.popup}>
                <h2 className={classes.title}>Введите свое имя:</h2>
                <form action="">
                    <InputApp
                        maskChar=" "
                        mask={"aaaaaaaaaaaaaaaaaaaa"}
                        formatChars = {
                            {
                                'a': '[A-Za-zА-Яа-я]',
                            }
                        }
                        value={inputName}
                        onChange={(e) => setInputName(e.target.value)}
                        className={classes.input}
                        type="text"
                    />
                </form>
                <input onClick={() => resetName()} className={classes.btn} type="submit" value="Сохранить новое имя"/>
                <div onClick={() => closePopup()} className={classes.iconClose}>
                    <div className={[classes.iconClose__line, classes.iconClose__line__top].join(" ")}></div>
                    <div className={[classes.iconClose__line, classes.iconClose__line__bottom].join(" ")}></div>
                </div>
            </div>
        </div>
    );
};

export default PopupPersonInfo;