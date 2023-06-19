import React, {useMemo, useState} from 'react';
import classes from "./modules/HeaderApp.module.css";
import logo from "../assets/logo.webp"
import PopupPersonInfo from "./popupPersonInfo";

const HeaderApp = ({count, functionCount}, ...props) => {

    function resetPersonInfo() {
        localStorage.setItem('countSuccessAnswer', '')
        localStorage.setItem('personName', 'Анононим')
        functionCount(0);
        setName('Анононим');
    }

    let defaultValue =  localStorage.getItem('personName') ?  localStorage.getItem('personName') : 'Анононим';
    const [isVisible, setIsVisible] = useState(false);
    const [name, setName] = useState(defaultValue);
    let [isVisiblePopup,setIsVisiblePopup] = useState(true);

    useMemo(() => {
        if(count > 0 || name !== 'Анононим') {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    },[count, name])

    function showPopUp() {
        setIsVisiblePopup(false)
    }

    return (
        <header className={classes.header}>
            <div className={["container", classes.container].join(" ")}>
                <a href="/">
                    <div className={classes.logo}>
                        <img className={classes.img} src={logo} alt="img"/>
                    </div>
                </a>
                <div className={classes.personInfo}>
                    <a onClick={() => showPopUp()} className={classes.personInfo__link} href="#">{name}</a>
                    <p className={classes.personInfo__count}>{count}</p>
                    {
                        isVisible
                            ? <a onClick={() => resetPersonInfo()} className={classes.personInfo__link} href="#">Сбросить</a>
                            : null
                    }
                </div>
                <PopupPersonInfo isVisiblePopup={isVisiblePopup} setIsVisiblePopup={setIsVisiblePopup} setName={setName}/>
            </div>
        </header>
    );
};

export default HeaderApp;