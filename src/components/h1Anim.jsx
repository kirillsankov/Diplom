import React from 'react';
import {useRef} from "react";
import {useAnimText} from "../hook/useAnimText";

const H1Anim = ({children, ...props}) => {

    const ref = useRef();

   const animString = useAnimText(children, ref, 0, 100);

    return (
        <h1 ref={ref} {...props}>{animString}</h1>
    );
};

export default H1Anim;