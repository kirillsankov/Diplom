import React, {useEffect} from 'react';
import {useRef} from "react";
import {useAnimText} from "../hook/useAnimText";

const PAnim = ({children, ...props}) => {
    const ref = useRef();

    const animString = useAnimText(children, ref, 700, 50);

    return (
        <p ref={ref} {...props}>{animString}</p>
    );
};

export default PAnim;