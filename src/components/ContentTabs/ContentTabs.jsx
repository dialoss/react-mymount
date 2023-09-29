import React, {useEffect, useReducer, useState} from 'react';
import ContentTab from "./ContentTab";
import Navbar from "ui/Navbar/Navbar";
import {useMyLocation} from "../../hooks/useMyLocation";
import {ContentTabsRoutes, EmptyTab} from "./routes";

function reducer(state, action) {
    const id = action.payload.id;
    switch (action.type) {
        case 'TOGGLE':
            let activeTab = state[id];
            activeTab.active = !activeTab.active;
            return {...state, id: activeTab};
        case 'ADD_ENTRYS':
            return {...state, id: {...state[id], entrys: action.payload.entrys}};
        case 'SET':
            return action.payload;
    }
}


const ContentTabs = ({content}) => {
    const location = useMyLocation();
    const [tabs, dispatch] = useReducer(reducer, ContentTabsRoutes[location.pageSlug] || EmptyTab);
    // const [tabs, setTabs] = useState(ContentTabsRoutes[location.pageSlug] || EmptyTab);

    useEffect(() => {
        let newTabs = ContentTabsRoutes[location.pageSlug] || EmptyTab;
        content.forEach(item => {
            newTabs[item.tab_id].entrys.push(item);
        })
        dispatch({type: 'SET', payload: {newTabs}});
    }, [content]);
    return (
        <div className={"content-tabs"}>
            <div className="content-nav">
                {Object.values(tabs).length > 1 &&
                    <Navbar style={{paddingTop:0}}
                            routes={Object.values(tabs).map(tab => {
                                function callback() {
                                    dispatch({type: 'TOGGLE', payload: {tab.id}})
                                }
                                return {
                                    active: (activeTab === tab.id),
                                    text:tab.text,
                                    path:tab.path,
                                    callback,
                                }})}></Navbar>
                }
            </div>
            <div className="content">
                {
                    Object.values(tabs).map(tab =>
                        <ContentTab content={tab.entrys} key={tab.id}>
                        </ContentTab>
                    )
                }
            </div>
        </div>
    );
};

export default ContentTabs;