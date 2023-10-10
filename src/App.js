import React from "react";
import 'styles/App.scss';
import {TemplatePage} from "pages/TemplatePage";
import Giscus from '@giscus/react';

function App() {
    return (
        <div className="App">
            {/*<script data-isso="http://127.0.0.1:8000/"*/}
            {/*        src="http://127.0.0.1:8000/js/embed.min.js"></script>*/}

            {/*<section id="isso-thread">*/}
            {/*</section>*/}
            {/*<script>{*/}
            {/*    `*/}
            {/*    var remark_config = {*/}
            {/*    host: 'http://127.0.0.1:8000/',*/}
            {/*    site_id: 'mymount',*/}
            {/*}`}*/}
            {/*</script>*/}
            {/*<script>{`!function(e,n){for(var o=0;o<e.length;o++){var r=n.createElement("script"),c=".js",d=n.head||n.body;"noModule"in r?(r.type="module",c=".mjs"):r.async=!0,r.defer=!0,r.src=remark_config.host+"/web/"+e[o]+c,d.appendChild(r)}}(remark_config.components||["embed"],document);`}</script>*/}
            {/*<div id="remark42"></div>*/}

            <div className="comments__wrapper">
                {/*<Giscus*/}
                {/*    id="comments"*/}
                {/*    repo="dialoss/react-mymount"*/}
                {/*    repoId="R_kgDOKRa10g"*/}
                {/*    category="Announcements"*/}
                {/*    categoryId="DIC_kwDOKRa10s4CZ9FH"*/}
                {/*    mapping="title"*/}
                {/*    term="Привет!"*/}
                {/*    reactionsEnabled="1"*/}
                {/*    emitMetadata="1"*/}
                {/*    input-position="top"*/}
                {/*    theme="light"*/}
                {/*    lang="ru"*/}
                {/*    loading="lazy"*/}
                {/*/>*/}
            </div>


            <TemplatePage/>
        </div>
    );
}

export default App;
