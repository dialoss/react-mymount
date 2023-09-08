import React from 'react';
import Entry from "./Entry";

const EntryList = ({entrys}) => {
    return (
        <div className="entrys">
            <div className="entrys__inner">
                {
                    entrys.map((entry) => {
                        return <Entry entry={entry} key={entry.id}></Entry>
                    })
                }
            </div>
        </div>
    );
};

export default EntryList;