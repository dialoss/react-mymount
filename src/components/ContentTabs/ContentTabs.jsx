import React, {useEffect, useReducer, useState} from 'react';
import ContentTab from "./ContentTab";
import Navbar from "ui/Navbar/Navbar";
import {useMyLocation} from "../../hooks/useMyLocation";
import {ContentTabsRoutes, EmptyTab} from "./routes";

function reducer(state, action) {
    const id = action.payload.id;
    switch (action.type) {
        case 'SET_ACTIVE':
            Object.keys(state).forEach(tab => state[tab].active = false);
            state[id].active = true;
            return state;
            // let newState = Object.values(state).map(tab => {
            //     return {
            //         ...tab,
            //         active: false,
            //     }
            // });
            // newState[id].active = true;
            // return newState;
        case 'ADD_ENTRYS':
            return {...state, id: {...state[id], entrys: action.payload.entrys}};
        case 'SET_STATE':
            return action.payload;
    }
}

const ContentTabs = ({content}) => {
    const location = useMyLocation();
    const [tabs, dispatch] = useReducer(reducer, ContentTabsRoutes[location.pageSlug] || EmptyTab);

    useEffect(() => {
        let newTabs = ContentTabsRoutes[location.pageSlug] || EmptyTab;
        content.forEach(item => {
            newTabs[item.tab_id].entrys.push(item);
        })
        dispatch({type: 'SET_STATE', payload: newTabs});
    }, [content]);
    return (
        <div className={"content-tabs"}>
            <div className="content-nav">
                {Object.values(tabs).length > 1 &&
                    <Navbar style={{paddingTop:0}}
                            routes={Object.values(tabs).map(tab => {
                                function callback() {
                                    dispatch({type: 'SET_ACTIVE', payload: {id:tab.id}})
                                }
                                return {
                                    active: tab.active,
                                    text:tab.text,
                                    path:tab.path,
                                    callback,
                                }})}></Navbar>
                }
            </div>
            <div className="content">
                {
                    Object.values(tabs).map(tab => tab.active &&
                        <ContentTab id={tab.id} content={tab.entrys} key={tab.id}>
                        </ContentTab>
                    )
                }
            </div>
        </div>
    );
};

export default ContentTabs;