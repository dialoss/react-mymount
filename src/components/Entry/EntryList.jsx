import React from 'react';
import Entry from "./Entry";
import {CSSTransition, TransitionGroup} from "react-transition-group";
import Masonry, {ResponsiveMasonry} from "react-responsive-masonry";
import {XBlock, XMasonry} from "react-xmasonry";

const EntryList = ({entrys}) => {
    return (
        <div className="entrys">
            <div className="entrys__inner">
                <div className="container">
                    <XMasonry maxColumns={3} responsive={true}>
                        {
                            entrys.map((entry) =>
                                <XBlock key={entry.id}>
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