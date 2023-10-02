import React from 'react';

const Connector = ({children, ...props}) => {
    return (
        <div className={"timeline-connector"}>
            <div {...props}></div>
            {children}
        </div>
    );
};

export default Connector;