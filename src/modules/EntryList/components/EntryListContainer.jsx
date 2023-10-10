import React, {useEffect, useReducer, useRef, useState} from 'react';
import {useDispatch} from "react-redux";
import EntryList from "components/EntryList/EntryList";
import {actions} from "../store/reducers";
import {fetchEntrys} from "../api/fetchEntrys";
import {useAddEvent} from "hooks/useAddEvent";
import {sendLocalRequest} from "api/requests";

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
            if (action.payload.delete) return [...state].filter(el => el.id !== action.payload.id);
            else return reducer(state, {...action, type: 'UPDATE'});
    }
}

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

const EntryListContainer = () => {
    const [entrys, dispatch] = useReducer(reducer, []);
    const entrysRef = useRef();
    entrysRef.current = entrys;
    const globalDispatch = useDispatch();
    const [tabs, setTabs] = useState(routes);

    function addEntrys(response) {
        let newEntrys = [...entrysRef.current, ...response.entrys_data];
        dispatch({type: 'SET', payload: newEntrys});
        globalDispatch(actions.setElements({entrys: newEntrys}));

        let newTabs = routes;
        newEntrys.forEach(item => {
            newTabs[item.tab_id].entrys.push(item);
        })
        newTabs.forEach((tab, index) => {
            newTabs[index].content = React.createElement(EntryList, {entrys: tab.entrys})
        });
        setTabs(newTabs);
    }

    useEffect(() => {
        fetchEntrys(addEntrys);
    }, []);

    async function handleElements(event) {
        let actionEntry = null;
        for (const entry of entrysRef.current) {
            if (entry.id === (event.detail.id || event.detail.entry_id)) {
                actionEntry = entry;
                break;
            }
        }
        let requestData = event.detail;
        if (requestData.type !== 'add-entry-quick') requestData = { ...actionEntry, ...requestData};
        const response = await sendLocalRequest("/entry_action/", requestData);
        console.log(requestData, response)
        if (requestData.entry_action_type === 'transform') return;
        let payload = requestData;
        if (Object.keys(response).length !== 0) payload = {...payload, ...response.entrys_data[0]};
        else payload = {id: requestData.id, delete: true};
        let actionType = requestData.event_type;
        if (requestData.entry_action_type === 'paste' && requestData.item_id !== -1) actionType = 'UPDATE';
        dispatch({type: actionType, payload});
    }

    useAddEvent('entrylist:handle-changes', handleElements);

    useEffect(() => {
        globalDispatch(actions.setElements({entrys: entrys}));
    }, [entrys]);

    return (
        <>
            {/*<LabTabs tabs={tabs}></LabTabs>*/}
            <EntryList entrys={entrys}></EntryList>
            {/*<ContentTabs content={entrys}></ContentTabs>*/}
        </>

    );
};

export default EntryListContainer;