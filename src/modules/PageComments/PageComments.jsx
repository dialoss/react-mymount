import React, {useEffect, useState} from 'react';
import Container from "ui/Container/Container";
import "./Disqus.scss";

import { DiscussionEmbed } from 'disqus-react';
import {useMyLocation} from "hooks/useMyLocation";

const PageComments = () => {
    const location = useMyLocation();
    const url = location.baseURL + "/#!" + location.relativeURL;
    const id = '9812370896'; //String(location.pageID)
    const [visibility, setVisibility] = useState("hidden");
    setTimeout(() => {
        setVisibility("visible");
    }, 500);
    return (
        <div className={"comments " + location.pageID} style={{visibility:visibility}}>
            <div className="comments__inner">
                <Container>
                    <DiscussionEmbed
                        shortname='my75'
                        config={{
                            url,
                            identifier: id,
                            language: 'ru'
                        }}
                    />
                </Container>
            </div>
        </div>
    );
};

export default PageComments;