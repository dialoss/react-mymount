import React, {useLayoutEffect, useState} from 'react';
import Footer from "ui/Footer/Footer";
import {useMyLocation} from "hooks/useMyLocation";
import {sendLocalRequest} from "api/requests";

const FooterContainer = () => {
    const [views, setViews] = useState({curViews: 0, totalViews: 0});
    const location = useMyLocation();
    useLayoutEffect(() => {
        (async () => {
            const response = await sendLocalRequest('/get_page_views/');
            setViews({curViews: response.page_views, totalViews: response.total_views});
        })();
    }, [location]);
    return (
        <Footer totalViews={views.totalViews} currentViews={views.curViews}></Footer>
    );
};

export default FooterContainer;