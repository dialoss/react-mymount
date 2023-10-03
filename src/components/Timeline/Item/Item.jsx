import React from 'react';
import Separator from "../Separator/Separator";
import Dot from "../Dot/Dot";
import Connector from "../Connector/Connector";
import Body from "../Body/Body";
import AccordionContainer from "ui/Accordion/AccordionContainer";
import Entry from "components/Entry/Entry";
import store from "store";


const Item = ({data, type, index, connector}) => {
    const entrys = store.getState().elements.entrys;
    return (
        <div className={"timeline-item timeline-item--" + type}>
            <Separator>
                <Dot style={{backgroundColor:data.color.top}}></Dot>
                {connector &&
                    <Connector style={{
                        // background: `linear-gradient(${data.color.top}, ${data.color.bottom})`,
                        backgroundColor: data.color.top,
                    }}/>
                }
            </Separator>
            <Body>
                <AccordionContainer title={data.text}>
                    {!!entrys.length &&
                        <Entry entry={entrys[Math.min(index, entrys.length - 1)]} style={{width: 700}}></Entry>
                    }
                </AccordionContainer>
            </Body>
        </div>
    );
};

export default Item;