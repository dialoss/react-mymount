import React, {useEffect, useReducer, useRef, useState} from 'react';
import ListView from "ui/ListView/ListView";
import {useDispatch} from "react-redux";
import EntryList from "components/EntryList/EntryList";
import {actions} from "../store/reducers";
import {fetchEntrys} from "../api/fetchEntrys";
import {useAddEvent} from "hooks/useAddEvent";
import {sendLocalRequest} from "../../../api/requests";

function reducer(state, action) {
    switch (action.type) {
        case "SET":
            return action.payload;
        case "UPDATE":
            for (let i = 0; i < state.length; i++) {
                if (state[i].id === action.payload.id) {
                    let newState = [...state];
                    newState[i] = action.payload;
                    return newState;
                }
            }
            return state;
        case "ADD":
            let newState = [...state];
            newState.splice(action.payload.display_pos, 0, action.payload);
            return newState;
        case 'DELETE':
            return [...state].filter(el => el.id !== action.payload.id);
    }
}

const EntryListContainer = () => {
    const [entrys, dispatch] = useReducer(reducer, []);
    const entrysRef = useRef();
    entrysRef.current = entrys;
    const globalDispatch = useDispatch();

    function addEntrys(response) {
        let newEntrys = [...entrysRef.current, ...response.entrys_data];
        dispatch({type: 'SET', payload: newEntrys});
        globalDispatch(actions.setElements({entrys: newEntrys}));
    }

    useEffect(() => {
        fetchEntrys(addEntrys);
    }, []);

    async function handleElements(event) {
        let actionEntry = null;
        for (const entry of entrysRef.current) {
            if (entry.id === (event.detail.id || event.detail.entry_id)) {
                actionEntry = entry;
            }
        }
        let requestData = {...actionEntry, ...event.detail};
        const response = await sendLocalRequest("/entry_action/", requestData);
        if (Object.keys(response).length === 0) return;
        dispatch({type: event.detail.event_type, payload: (response.entrys_data[0] || requestData)});
    }

    useAddEvent('element-changed', handleElements);

    return (
        <ListView>
            <EntryList entrys={entrys}/>
        </ListView>
    );
};

export default EntryListContainer;