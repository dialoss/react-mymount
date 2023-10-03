import React from 'react';
import Separator from "../Separator/Separator";
import Dot from "../Dot/Dot";
import Connector from "../Connector/Connector";
import Body from "../Body/Body";
import AccordionContainer from "ui/Accordion/AccordionContainer";
import {useSelector} from "react-redux";
import Entry from "components/Entry/Entry";
import store from "store";


const Item = ({data, type, connector}) => {
    const entrys = store.getState().elements.entrys;
    return (
        <div className={"timeline-item timeline-item--" + type}>
            <Separator>
                <Dot style={{backgroundColor:data.color.top}}></Dot>
                {connector &&
                    <Connector style={{
                        background: `linear-gradient(${data.color.top}, ${data.color.bottom})`
                    }}/>
                }
            </Separator>
            <Body>
                <AccordionContainer title={data.text}>
                    {!!entrys.length &&
                        <Entry entry={entrys[1]}></Entry>
                    }
                </AccordionContainer>
            </Body>
        </div>
    );
};

export default Item;