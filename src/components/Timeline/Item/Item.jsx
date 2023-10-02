import React from 'react';
import Separator from "../Separator/Separator";
import Dot from "../Dot/Dot";
import Connector from "../Connector/Connector";
import Body from "../Body/Body";
import Timeline from "../Timeline";

const Item = ({data, parent, connector}) => {
    return (
        <div className={"timeline-item"}>
            <Separator>
                <Dot style={{backgroundColor:data.color.top || parent.color.top}}></Dot>
                {connector &&
                    <Connector style={{
                        // background: `linear-gradient(${data.color.top}, ${data.color.bottom})`
                        backgroundColor: data.color.top || parent.color.top,
                    }}/>
                }
            </Separator>
            <Body>
                {data.text}
                {data.stages &&
                    <Timeline className={"sub-timeline"} stages={data.stages} parent={data}></Timeline>
                }
            </Body>

        </div>
    );
};

export default Item;