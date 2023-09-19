import React from 'react';
import Entry from "components/Entry/Entry";
import MyMasonry from "ui/Masonry/MyMasonry";
import Container from "ui/Container/Container";

const EntryList = ({entrys}) => {
    // const listStyle = theme.listStyle;

    return (
        <div className="entrys">
            <div className="entrys__inner">
                <Container>
                    <MyMasonry maxColumns={3} widthPoints={[400, 500, 800]}>
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