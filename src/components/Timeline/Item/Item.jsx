import React from 'react';
import Separator from "../Separator/Separator";
import Dot from "../Dot/Dot";
import Connector from "../Connector/Connector";
import Body from "../Body/Body";
import MyAccordion from "../Accordion/MyAccordion";


const Item = ({data, type, connector}) => {
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
                <MyAccordion title={data.text}></MyAccordion>
            </Body>
        </div>
    );
};

export default Item;