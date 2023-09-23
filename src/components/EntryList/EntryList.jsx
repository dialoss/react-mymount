import React from 'react';
import Entry from "components/Entry/Entry";
import MyMasonry from "ui/Masonry/MyMasonry";
import Container from "ui/Container/Container";
import {useThemes} from "hooks/useThemes";

const EntryList = ({entrys}) => {
    const style = useThemes().listStyle;

    return (
        <div className="entrys" style={{marginBottom: "50px"}}>
            <div className="entrys__inner">
                <Container>
                    <MyMasonry maxColumns={+style.masonry} widthPoints={[400, 500, 800]}>
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