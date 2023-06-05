import React from 'react';
import classes from "../pages/modules/Task.module.css";
import PAnim from "./pAnim";

const TaskText = ({children, ...props}) => {
    return (
        <div {...props}>
            {
                (!children)
                    ? <p>Загрузка...</p>
                    : <PAnim>
                        {children}
                    </PAnim>
            }
        </div>
    );
};

export default TaskText;