import React from 'react';
import EntryList from "../EntryList/EntryList";

const ContentTab = ({content}) => {
    return (
        <div className={"content-tab"}>
            <EntryList entrys={content}></EntryList>
        </div>
    );
};

export default ContentTab;