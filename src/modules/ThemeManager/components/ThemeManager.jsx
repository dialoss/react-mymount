import React, {createContext, useCallback, useEffect, useReducer, useRef, useState} from 'react';
import {useAddEvent} from "hooks/useAddEvent";

function reducer(state, action) {
    let name = action.payload.name;
    switch (action.type) {
        case 'ADD':
            // state.themes = {...state.themes, name: action.payload};
            // state.themes[name] = action.payload;
            return {themes:{...state.themes, name: action.payload}};
        case 'TOGGLE':
            let newTheme = {...state.themes[name]};
            newTheme.active = !newTheme.active;
            // state.themes[name].active = !state.themes[name].active;
            return {themes:{...state.themes, name: newTheme}};
    }
}

// export const ActiveThemes = createContext([]);

const ThemeManager = ({children}) => {
    const [themes, dispatch] = useReducer(reducer, {themes: {}});
    const [activeThemes, setActiveThemes] = useState({});
    const themesRef = useRef();
    themesRef.current = themes;

    function toggleThemes(event) {
        if (event.ctrlKey && event.altKey && event.key === 'e') {
            dispatch({type:"TOGGLE", payload:{name:"editStyle"}});
        }
    }

    function addTheme(event) {
        const theme = event.detail;
        console.log(theme)
        dispatch({type: "ADD", payload: {name:theme.name, stylesheet:theme.path, active:true}});
    }

    useAddEvent("themes:add", addTheme);
    useAddEvent("keydown", toggleThemes);

    const [component, setComponent] = useState(<></>);

    useEffect(() => {
        setComponent(children);
    }, [children]);

    useEffect(() => {
        addTheme({detail: {name:'editStyle', path:"edit.scss"}});
    }, []);

    useEffect(() => {
        Object.values(themes.themes).forEach(theme => {
            if (theme.active) {
                 const stylesheet = import("ui/Themes/" + theme.stylesheet);
                 console.log(stylesheet)
                 stylesheet.then(data => {
                    setActiveThemes(activeThemes => {
                        console.log(data)
                        data.disabled = true;
                        return {
                            ...activeThemes,
                            [theme.name]: {...theme, variables: data.default}
                        };
                    })
                });
            }
        })
    }, [themes]);
    console.log(themes.themes)
    // console.log(activeThemes)
    return (
        <>
            {component}
        </>

        // <ActiveThemes.Provider value={activeThemes}>

        // </ActiveThemes.Provider>
    );
};

export default ThemeManager;