import React, {useEffect, useReducer, useRef, useState} from 'react';
import ListView from "ui/ListView/ListView";
import {useDispatch} from "react-redux";
import EntryList from "components/EntryList/EntryList";
import {actions} from "../store/reducers";
import {fetchEntrys} from "../api/fetchEntrys";
import {useAddEvent} from "hooks/useAddEvent";

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
            break;
        case "ADD":
            return state.insert(action.payload.display_pos, action.payload);
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
        const response = await event.detail.response;
        const responseData = response.data.entrys_data[0];
        dispatch({type: 'UPDATE', payload: responseData});
    }

    useAddEvent('element-changed', handleElements);

    return (
        <ListView>
            <EntryList entrys={entrys}/>
        </ListView>
    );
};

export default EntryListContainer;