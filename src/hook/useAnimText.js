import {useEffect, useState} from "react";



export let useAnimText = (string, el, timeVal, stepVal) => {
    const [animString, setAnimString] = useState('');

    useEffect(() => {
        if(string) {
            observEl()
        }
    }, [])

    function animateChar(string) {
        let currentString = '';
        let time = timeVal;
        let step = stepVal;
        for(let char of string) {
            setTimeout(() => {
                currentString += char;
                setAnimString(currentString);
            }, time += step) ;
        }
    }

    function observEl() {
        let observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if(entry.isIntersecting) {
                    observer.disconnect();
                    animateChar(string)
                }
            })
        }, { threshold: 0.5 })
        observer.observe(el.current);
    }

    return animString;
}


