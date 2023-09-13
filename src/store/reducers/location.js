import {createSlice} from "@reduxjs/toolkit";

export const baseURL = "http://127.0.0.1:8000";

export const location = createSlice({
    name: "location",
    initialState: {
        fullURL : null,
        relativeURL : null,
        pageSlug : null,
        views: {
            curViews: 0,
            totalViews: 0,
        }
    },
    reducers: {
        setLocation: (state) => {
            state.relativeURL = window.location.href.split('/').slice(3).join('/');
            if (state.relativeURL[0] !== '/') state.relativeURL = '/' + state.relativeURL;
            if (state.relativeURL.slice(-1) !== '/') state.relativeURL = state.relativeURL + '/';
            state.fullURL = baseURL + state.relativeURL;
            state.pageSlug = state.relativeURL.split('/').slice(-2, -1)[0];
        },
    }
});

export const { actions, reducer } = location;