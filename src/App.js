import React from "react";
import 'styles/App.scss';
import {TemplatePage} from "pages/TemplatePage";
import Giscus from '@giscus/react';

function App() {
    return (
        <div className="App">
            <div className="comments__wrapper">
                <Giscus
                    id="comments"
                    repo="dialoss/react-mymount"
                    repoId="R_kgDOKRa10g"
                    category="Announcements"
                    categoryId="DIC_kwDOKRa10s4CZ9FH"
                    mapping="title"
                    term="Привет!"
                    reactionsEnabled="1"
                    emitMetadata="1"
                    input-position="top"
                    theme="light_high_contrast"
                    lang="ru"
                    loading="lazy"
                />
            </div>


            <TemplatePage/>
        </div>
    );
}

export default App;
