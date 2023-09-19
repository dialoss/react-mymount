import React from 'react';
import "./ContentWrapper.scss";

const ContentWrapper = ({children}) => {
    return (
        <div className="content-wrapper">
            <div className="content">
                {children}
            </div>
        </div>
    );
};

export default ContentWrapper;