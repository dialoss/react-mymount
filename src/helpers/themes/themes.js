import {createSlice} from "@reduxjs/toolkit";
import {addTheme} from "./index";

export const themesSlice = createSlice({
    name: "themes",
    initialState: {
        themes: {},
    },
    reducers: {
        addTheme: (state, {payload: style}) => {
            state.themes[style.name] = {active: true, style: style.stylesheet};
        },
        clearThemes: (state) => {
            state.themes = {};
        },
        removeTheme: (state, {payload: name}) => {
            if (Object.keys(state).includes(name)) {
                delete state.name;
            }
        },
        toggleTheme: (state, {payload: name}) => {
            let newTheme = {style: state.themes[name].style, active: !state.themes[name].active};
            state.themes = {...state.themes, [name]: newTheme};
        }
    }
});

export const { actions, reducer } = themesSlice;