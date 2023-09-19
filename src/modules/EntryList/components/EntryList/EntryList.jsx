import React, {useContext} from 'react';
import Entry from "components/Entry/Entry";
import MyMasonry from "../MyMasonry/MyMasonry";

const EntryList = ({entrys, theme}) => {
    const listStyle = theme.listStyle;

    return (
        <div className="entrys">
            <div className="entrys__inner">
                <div className="container">
                    <MyMasonry maxColumns={+listStyle.masonry} widthPoints={[400, 500, 800]}>
                        {
                            entrys.map((entry) =>
                                    <Entry entry={entry} key={entry.id}></Entry>

                            )
                        }
                    </MyMasonry>
                </div>
            </div>
        </div>
    );
};

export default EntryList;