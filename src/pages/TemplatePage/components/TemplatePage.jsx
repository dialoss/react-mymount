import React from 'react';
import {Footer} from "modules/Footer";
import ContentWrapper from "ui/ContentWrapper/ContentWrapper";
import {AppRouter} from "pages/AppRouter";
import {BrowserRouter} from "react-router-dom";
import {ThemeManager} from "modules/ThemeManager";

const TemplatePage = () => {
    return (
        <BrowserRouter>
            <ThemeManager/>
            <ContentWrapper>
                <AppRouter/>
            </ContentWrapper>
            <Footer></Footer>
        </BrowserRouter>
    );
};

export default TemplatePage;