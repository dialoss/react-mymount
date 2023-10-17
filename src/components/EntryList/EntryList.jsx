import React, {useContext, useState} from 'react';
import Entry from "components/Entry/Entry";
import MyMasonry from "ui/Masonry/MyMasonry";
import Container from "ui/Container/Container";
import {ActiveThemes} from "ui/Themes/index";
import ActionButton from "../../ui/Buttons/ActionButton/ActionButton";
import NavButton from "../../ui/Navbar/Button/NavButton";

const EntryList = ({entrys}) => {
    const style = useContext(ActiveThemes).listStyle;
    let columns = style && +style.masonry;
    let points = style && JSON.parse(style.widthPoints);
    const [forceColumns, setColumns] = useState(0);
    return (
        <div className="entry-list">
            <NavButton style={{maxWidth: 200, margin: '0 auto 20px auto'}}
                       data={{text: 'Change Layout', callback: () => setColumns(c => ((4 + (c + 1)) % 4))}}>
            </NavButton>
            <Container style={{marginBottom: "50px"}}>
                {!!style && <MyMasonry
                    maxColumns={columns}
                    widthPoints={points}
                    forceColumns={forceColumns}
                >
                    {
                        entrys.map((entry) => <Entry entry={entry} key={entry.id}></Entry>
                        )
                    }
                </MyMasonry>}
            </Container>
        </div>
    );
};

export default EntryList;