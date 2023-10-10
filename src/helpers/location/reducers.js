import {createSlice} from "@reduxjs/toolkit";

export const locationSlice = createSlice({
    name: "location",
    initialState: {
        baseURL : 'https://8e92-92-101-120-252.ngrok-free.app',
        pages : {},
        pageID : null,
        fullURL : null,
        relativeURL : null,
        pageSlug : null,
        parentURL : null,
        parentSlug : null,
        views: {
            curViews: 0,
            totalViews: 0,
        }
    },
    reducers: {
        setLocation: (state) => {
            state.relativeURL = decodeURI(window.location.href.split('/').slice(3).join('/'));
            if (state.relativeURL[0] !== '/') state.relativeURL = '/' + state.relativeURL;
            if (state.relativeURL.slice(-1) !== '/') state.relativeURL = state.relativeURL + '/';
            state.fullURL = state.baseURL + state.relativeURL;
            state.pageSlug = state.relativeURL.split('/').slice(-2, -1)[0];
            state.parentURL = state.relativeURL.replace(state.pageSlug + '/', '');
            if (state.parentURL === '/') state.parentURL = state.relativeURL;
            state.parentSlug = state.parentURL.replaceAll('/', '');
            state.pageID = state.pages[state.relativeURL];
        },
        setPages: (state, {payload: pages}) => {
            let pagesObj = {};
            pages.forEach(page => {
                pagesObj[page.link] = page.id;
            });
            state.pages = pagesObj;
        }
    }
});

export const { actions, reducer } = locationSlice;