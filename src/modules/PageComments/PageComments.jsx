import React from 'react';
import Container from "ui/Container/Container";

import { DiscussionEmbed } from 'disqus-react';
import {useMyLocation} from "../../hooks/useMyLocation";

const PageComments = () => {
    const location = useMyLocation();
    return (
        <div className={"comments " + location.pageID} style={{display:"none"}}>
            <div className="comments__inner">
                <Container>
                    <DiscussionEmbed
                        shortname='example'
                        config={{
                            url: location.relativeURL,
                            identifier: location.pageID,
                            language: 'ru'
                        }}
                    />
                </Container>
            </div>
        </div>
    );
};

export default PageComments;