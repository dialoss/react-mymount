import React, {useContext} from 'react';
import Entry from "components/Entry/Entry";
import MyMasonry from "ui/Masonry/MyMasonry";
import Container from "ui/Container/Container";
import {ActiveThemes} from "ui/Themes/index";

const EntryList = ({entrys}) => {
    const style = useContext(ActiveThemes).listStyle;
    return (
        <div className="entrys" style={{marginBottom: "50px"}}>
            <div className="entrys__inner">
                <Container>
                    {!!style && <MyMasonry
                        maxColumns={+style.masonry}
                        widthPoints={JSON.parse(style.widthPoints)}
                    >
                        {
                            entrys.map((entry) =>
                                <Entry entry={entry} key={entry.id}></Entry>
                            )
                        }
                    </MyMasonry>}
                </Container>
            </div>
        </div>
    );
};

export default EntryList;