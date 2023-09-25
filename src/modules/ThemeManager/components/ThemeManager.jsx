import React from 'react';
import editStyle from "ui/Themes/edit.module.scss";
import store from "store";
import {actions} from "helpers/themes/themes";
import {useAddEvent} from "hooks/useAddEvent";

const ThemeManager = () => {
    store.dispatch(actions.addTheme({name:"editStyle", stylesheet:editStyle}));
    function toggleThemes(event) {
        if (event.ctrlKey && event.altKey && event.key === 'e') {
            store.dispatch(actions.toggleTheme('editStyle'));
        }
    }
    useAddEvent("keydown", toggleThemes);

    return (
        <></>
    );
};

export default ThemeManager;