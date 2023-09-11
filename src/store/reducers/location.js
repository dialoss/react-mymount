import {createSlice} from "@reduxjs/toolkit";

export const baseURL = "http://127.0.0.1:8000";

export const location = createSlice({
    name: "location",
    initialState: {
        fullURL : null,
        relativeURL : null,
        pageSlug : null,
    },
    reducers: {
        setLocation: (state) => {
            state.relativeURL = '/' + window.location.href.split('/').slice(3).join('/');
            state.fullURL = baseURL + state.relativeURL;
            state.pageSlug = state.relativeURL.split('/').slice(-2, -1)[0];
        },
    }
});

export const { actions, reducer } = location;