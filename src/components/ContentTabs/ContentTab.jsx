import React from 'react';
import EntryList from "../EntryList/EntryList";

const ContentTab = ({content, id}) => {
    return (
        <div className={"content-tab"} data-id={id}>
            <EntryList entrys={content}></EntryList>
        </div>
    );
};

export default ContentTab;