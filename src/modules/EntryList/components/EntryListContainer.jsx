import React, {useEffect, useReducer, useRef, useState} from 'react';
import {useDispatch} from "react-redux";
import EntryList from "components/EntryList/EntryList";
import {actions} from "../store/reducers";
import {fetchEntrys} from "../api/fetchEntrys";
import {useAddEvent} from "hooks/useAddEvent";
import {sendLocalRequest} from "api/requests";

const routes = [
    {
        title: "выполненные",
        path: "done",
        entrys: [],
        content: [],
    },
    {
        title: "в работе",
        path: "progress",
        entrys: [],
        content: [],
    }
];

function reducer(state, action) {
    switch (action.method) {
        case "SET":
            return action.payload;
        case "PATCH":
            for (let i = 0; i < state.length; i++) {
                if (state[i].id === action.payload.id) {
                    let newState = [...state];
                    newState[i] = action.payload;
                    return newState;
                }
            }
            return state;
        case "POST":
            {
                let newState = [...state];
                newState.splice(action.payload.display_pos, 0, action.payload);
                return newState;
            }
        case 'DELETE':
        {
            if (action.payload.empty) return [...state].filter(el => el.id !== action.payload.id);
            let newState = [...state];
            for (let i = 0; i < state.length; i++) {
                if (state[i].id === action.payload.id) newState[i] = action.payload;
            }
            return newState;
        }
    }
}

const EntryListContainer = () => {
    const [entrys, dispatch] = useReducer(reducer, []);
    const entrysRef = useRef();
    entrysRef.current = entrys;
    const globalDispatch = useDispatch();

    function addEntrys(newEntrys) {
        let entrys = [...entrysRef.current, ...newEntrys];
        dispatch({method: 'SET', payload: entrys});
    }

    useEffect(() => {
        fetchEntrys(addEntrys);
    }, []);

    async function handleElements(event) {
        let request = event.detail;
        const response = await sendLocalRequest(request.url, request.data, request.method);
        console.log(response)
        dispatch({method: request.method, payload: response});
    }

    useEffect(() => {
        globalDispatch(actions.setElements({entrys}));
    }, [entrys]);

    useAddEvent('entrylist:handle-changes', handleElements);

    return (
        <EntryList entrys={entrys}></EntryList>
    );
};

export default EntryListContainer;