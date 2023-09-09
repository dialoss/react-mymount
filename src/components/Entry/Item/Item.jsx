import React from 'react';
import InfoBlock from "../Info/InfoBlock";
import styles from 'styles/item/item.module.scss';
import ItemData from "./ItemData/ItemData";

const EntryItem = ({item}) => {
    return (
        <div className={styles.wrapper}>
            <div className={`item-${item.id} ${styles.item} item-${item.type}`}>
                <ItemData data={item}></ItemData>
                <InfoBlock title={item.media_title} description={item.media_description} filename={item.file_name}></InfoBlock>
                <div className="item__transform item__resize item__resize--right"></div>
                <div className="item__transform item__resize item__resize--left"></div>
            </div>
        </div>
    );
};

export default EntryItem;