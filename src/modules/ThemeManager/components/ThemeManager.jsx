import React, {useEffect, useReducer, useRef, useState} from 'react';
import {useAddEvent} from "hooks/useAddEvent";
import {ActiveThemes} from "ui/Themes";
import {useUserAuth} from "hooks/useUserAuth";

function reducer(state, action) {
    let name = action.payload.name;
    switch (action.type) {
        case 'ADD':
            return {themes:{...state.themes, [name]: action.payload}};
        case 'TOGGLE':
            let newTheme = {...state.themes[name]};
            newTheme.active = !newTheme.active;
            return {themes:{...state.themes, [name]: newTheme}};
    }
}

const ThemeManager = ({children}) => {
    const [themes, dispatch] = useReducer(reducer, {themes: {}});
    const [activeThemes, setActiveThemes] = useState({});
    const themesRef = useRef();
    themesRef.current = themes;
    const userAuth = useUserAuth();

    function toggleThemes(event) {
        if (userAuth && event.ctrlKey && event.altKey && event.key === 'e') {
            dispatch({type:"TOGGLE", payload:{name:"editStyle"}});
        }
    }

    function addTheme(event) {
        const theme = event.detail;
        if (theme.clear) setActiveThemes({});
        dispatch({type: "ADD", payload: {name:theme.name, stylesheet:theme.path, active:theme.active, imported:false}});
    }

    useAddEvent("themes:add", addTheme);
    useAddEvent("keydown", toggleThemes);

    const [component, setComponent] = useState(<></>);

    useEffect(() => {
        setComponent(children);
    }, [children]);

    useEffect(() => {
        if (userAuth) {
            addTheme({detail: {name:'editStyle', path:"edit.module.scss", clear:false, active:true}});
        }
    }, [userAuth]);

    useEffect(() => {
        Object.values(themes.themes).forEach(theme => {
            if (theme.active) {
                if (theme.imported) return;
                const style = import("ui/Themes/" + theme.stylesheet);
                style.then(data => {
                    setActiveThemes(activeThemes => {
                        return {
                            ...activeThemes,
                            [theme.name]: data.default
                        };
                    })
                });
            } else {
                delete activeThemes[theme.name];
            }
        })
    }, [themes]);

    return (
        <ActiveThemes.Provider value={activeThemes}>
            {component}
        </ActiveThemes.Provider>
    );
};

export default ThemeManager;