import React from 'react';
import EntryItem from "./Item/Item";
import InfoBlock from "./Info/InfoBlock";


const Entry = ({entry}) => {
    return (
        <div className="entry__wrapper">
            <div className={`entry-${entry.id} entry content__tab-${entry.tab_id}`}>
                <div className="entry__data">
                    <div className="entry__items">
                        {
                            entry.items.map((item) => {
                                return <EntryItem item={item} key={item.id}></EntryItem>
                            })
                        }
                    </div>
                    <InfoBlock title={entry.title} description={entry.description} date={entry.date}></InfoBlock>
                </div>
            </div>
        </div>
    );
};

export default Entry;