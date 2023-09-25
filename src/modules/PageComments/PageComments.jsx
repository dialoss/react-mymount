import React from 'react';
import Container from "ui/Container/Container";
import "./Disqus.scss";

import { DiscussionEmbed } from 'disqus-react';
import {useMyLocation} from "hooks/useMyLocation";

const PageComments = () => {
    const location = useMyLocation();
    return (
        <div className={"comments " + location.pageID}>
            <div className="comments__inner">
                <Container>
                    <DiscussionEmbed
                        shortname='my75'
                        config={{
                            url: location.fullURL,
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