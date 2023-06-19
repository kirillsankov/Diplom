import '../style.css'
import BtnApp from "../components/BtnApp";
import classes from "./modules/Home.module.css";
import {useNavigate} from "react-router-dom";
import H1Anim from "../components/h1Anim";
import PAnim from "../components/pAnim";

const Home = () => {
    const route = useNavigate();

    return (
        <div className={['container', classes.wrapper].join(' ')}>
            <H1Anim className={classes.title}>Привет</H1Anim>
            <PAnim className={classes.description}>Ты зашел на страницу с генератором задач по имитационному моделированию</PAnim>
            <BtnApp onClick={(e) => {
                e.preventDefault();
                route('/task')
            }}>Начать</BtnApp>
        </div>
    );
};

export default Home;