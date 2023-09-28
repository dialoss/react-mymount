import React, {useContext, useState} from 'react';
import Entry from "components/Entry/Entry";
import MyMasonry from "ui/Masonry/MyMasonry";
import Container from "ui/Container/Container";
import {ActiveThemes} from "../../pages/AppRouter/components/AppRoutes";

const EntryList = ({entrys}) => {
    const [vars, setVars] = useState(null);
    const stylePath = useContext(ActiveThemes).listStyle;
    import("ui/Themes/" + stylePath).then(data => {
        console.log(data.default)
        setVars(data.default);
    });
    return (
        <div className="entrys" style={{marginBottom: "50px"}}>
            <div className="entrys__inner">
                <Container>
                    {!!vars && <MyMasonry
                        maxColumns={+vars.masonry}
                        widthPoints={JSON.parse(vars.widthPoints)}
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