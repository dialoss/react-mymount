import React from 'react';

const Accordion = ({isOpened, content}) => {
    return (
        <div className={"accordion " + (isOpened ? "opened" : "closed")}>
            {content}
        </div>
    );
};

export default Accordion;