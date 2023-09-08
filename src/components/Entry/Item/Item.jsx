import React from 'react';
import InfoBlock from "../Info/InfoBlock";

const EntryItem = ({item}) => {
    return (
        <div className="item-wrapper">
            <div className={`item-${item.id} item item-${item.type}`}>
                <InfoBlock title={item.media_title} description={item.media_description} filename={item.file_name}></InfoBlock>
                <div className="item__transform item__resize item__resize--right"></div>
                <div className="item__transform item__resize item__resize--left"></div>
            </div>
        </div>
    );
};

export default EntryItem;