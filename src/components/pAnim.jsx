import React from 'react';
import {useEffect, useRef, useState} from "@types/react";

const P1Anim = ({children, ...props}) => {
    const ref = useRef();

    const [animString, setAnimString] = useState('');

    useEffect(() => {
        console.log(ref.current);
        console.log(children);
        seeString(children, ref.current)
    }, [])

    async function animateChar(string) {
        let currentString = '';
        let time = 200;
        let step = 200;
        for(let char of string) {
            setTimeout(() => {
                currentString += char;
                setAnimString(currentString);
            }, time += step) ;
        }
    }


    function seeString(string, el) {
        let observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if(entry.isIntersecting) {
                    observer.disconnect();
                    animateChar(string)
                }
            })
        }, { threshold: 0.5 })
        observer.observe(el);
    }

    return (
        <p1 ref={ref} {...props}>{animString}</h1>
    );
};

export default P1Anim;