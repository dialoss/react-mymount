import React, {useContext} from 'react';
import Entry from "components/Entry/Entry";
import MyMasonry from "ui/Masonry/MyMasonry";
import Container from "ui/Container/Container";
import {ThemeContext} from "ui/Themes";

const EntryList = ({entrys}) => {
    const style = useContext(ThemeContext).listStyle;
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