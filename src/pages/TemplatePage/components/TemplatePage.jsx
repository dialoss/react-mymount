import React from 'react';
import {Navigation} from "modules/Navigation";
import Footer from "ui/Footer/Footer";
import ContentWrapper from "ui/ContentWrapper/ContentWrapper";

const TemplatePage = ({children}) => {
    return (
        <>
            <ContentWrapper>
                <Navigation></Navigation>
                {children}
            </ContentWrapper>
            <Footer totalViews={0} currentViews={0}></Footer>
        </>
    );
};

export default TemplatePage;