import {createSlice} from "@reduxjs/toolkit";
import {addTheme} from "./index";

export const themesSlice = createSlice({
    name: "themes",
    initialState: {
        themes: {},
        editTheme: {
            active: false,
            stylesheet: null,
        },
    },
    reducers: {
        addTheme: (state, {payload: style}) => {
            state.themes[style.name] = style.stylesheet;
        },
        clearThemes: (state) => {
            state.themes = {};
        },
        removeTheme: (state, {payload: name}) => {
            if (Object.keys(state).includes(name)) {
                delete state.name;
            }
        },
        toggleEdit: (state) => {
            state.editTheme.active = !state.editTheme.active;
            if (state.editTheme.active) {
                // addTheme()
            }
        }
    }
});

export const { actions, reducer } = themesSlice;