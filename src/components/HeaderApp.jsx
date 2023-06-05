import React from 'react';
import classes from "./modules/HeaderApp.module.css";
import logo from "../assets/logo.webp"
import {Link, BrowserRouter} from "react-router-dom";

const HeaderApp = () => {
    return (
        <header className={classes.header}>
            <div className="container">
                <BrowserRouter>
                    <Link to="/">
                        <div className={classes.logo}>
                            <img src={logo} alt="img"/>
                        </div>
                    </Link>
                </BrowserRouter>
            </div>
        </header>
    );
};

export default HeaderApp;