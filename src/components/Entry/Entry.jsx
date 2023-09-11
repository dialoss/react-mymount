import React from 'react';
import EntryItem from "./Item/Item";
import InfoBlock from "./Info/InfoBlock";
import styles from 'styles/entry/entry.module.scss';

const Entry = ({entry}) => {
    return (
        <div className={styles.wrapper}>
            <div className={`entry-${entry.id} ${styles.entry} content__tab-${entry.tab_id}`}>
                <div className={styles.data}>
                    <div className={styles.items}>
                        {
                            entry.items.map((item) =>
                                <EntryItem item={item} key={item.id}></EntryItem>
                            )
                        }
                    </div>
                    <InfoBlock data={entry}></InfoBlock>
                </div>
            </div>
        </div>
    );
};

export default Entry;