import React, {useEffect} from 'react';
import editStyle from "ui/Themes/edit.module.scss";
import store from "store";
import {actions} from "helpers/themes/themes";

const ThemeManager = () => {
    function toggleThemes(event) {
        if (event.ctrlKey && event.altKey && event.key === 'e') {
            store.dispatch(actions.toggleEdit());
        }
    }
    useEffect(() => {
        store.dispatch(actions.addTheme({name:"editStyle", stylesheet:editStyle}));
        window.addEventListener("keydown", toggleThemes);
        return () => {
            window.removeEventListener("keydown", toggleThemes);
        }
    }, [])

    return (
        <></>
    );
};

export default ThemeManager;