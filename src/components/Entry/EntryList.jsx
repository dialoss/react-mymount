import React, {useContext, useEffect, useState} from 'react';
import Entry from "./Entry";
import {XBlock, XMasonry} from "react-xmasonry";
import {ThemeContext} from "components/Pages/ListView";

const EntryList = ({entrys}) => {
    const listStyle = useContext(ThemeContext);
    const [props, setProps] = useState({});
    useEffect(() => {
        const vw = window.innerWidth;
        let newProps = {
            cols:+listStyle.masonry,
            width: (+listStyle.masonry === 1 ? 1200 : vw / 3)
        }
        setProps(newProps);
    }, [listStyle]);
    return (
        <div className="entrys">
            <div className="entrys__inner">
                <div className="container">
                    <XMasonry targetBlockWidth={400} maxColumns={3} responsive={true}>
                        {
                            entrys.map((entry) =>
                                <XBlock width={4 - props.cols} key={entry.id}>
                                    <Entry entry={entry}></Entry>
                                </XBlock>
                            )
                        }
                    </XMasonry>
                </div>
            </div>
        </div>
    );
};

export default EntryList;