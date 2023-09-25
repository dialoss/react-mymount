import React, {useContext} from 'react';
import Entry from "components/Entry/Entry";
import MyMasonry from "ui/Masonry/MyMasonry";
import Container from "ui/Container/Container";
import {ThemeContext} from "ui/Themes";
import {useAddEvent} from "../../hooks/useAddEvent";
import {initContainerHeight} from "../../ui/ObjectTransform/helpers";

const EntryList = ({entrys}) => {
    const style = useContext(ThemeContext).listStyle;
    // function initContainer(event) {
    //     console.log(event.detail)
    //     initContainerHeight(event.detail);
    // }
    // useAddEvent("init-container", initContainer);
    // const width = 100 / +style.masonry * Math.min(1100, getViewportSize()[0]) - 12;
    return (
        <div className="entrys" style={{marginBottom: "50px"}}>
            <div className="entrys__inner">
                <Container>
                    <MyMasonry maxColumns={+style.masonry} widthPoints={JSON.parse(style.widthPoints)}>
                        {
                            entrys.map((entry) =>
                                <Entry entry={entry} key={entry.id}></Entry>
                            )
                        }
                    </MyMasonry>
                </Container>
            </div>
        </div>
    );
};

export default EntryList;