import {useEffect} from "react";

export function useAddEvent(name, func, condition=true) {
    useEffect(() => {
        if (condition) {
            window.addEventListener(name, func);
            return () => {
                window.removeEventListener(name, func);
            }
        }
    }, []);
}

export function addEvent(name, func, condition=true) {
    if (condition) {
        window.addEventListener(name, func);
    }
}