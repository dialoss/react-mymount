import React from "react";
import 'styles/App.scss';
import {TemplatePage} from "pages/TemplatePage";
import {Carousel} from "./components/Modals/Carousel";
import ActionManager from "modules/ActionManager/components/ActionManager";

function App() {
    return (
        <div className="App">
            {/*<TemplatePage/>*/}
            {/*<Carousel items={[*/}
            {/*    {image:"https://drive.google.com/uc?id=1b8McQoAs9hwRvuv7Sf8TR5iiMvTrmaIQ", info:"",id:0},*/}
            {/*    {image:"https://drive.google.com/uc?id=1BoajdyOFW_JuUlXZqtd0XuEVsNljyYtM", info:"",id:2},*/}
            {/*    {image:"https://drive.google.com/uc?id=1H9Xbs9NKiUm9ODq8hFZI32kbyWAISQqB", info:"",id:4},*/}
            {/*    {image:"https://drive.google.com/uc?id=1whT8EZpfVab3cbWInnA1izYxAOX3aScu", info:"",id:5}]} currentItem={0}>*/}
            {/*</Carousel>*/}
            <ActionManager></ActionManager>
        </div>
    );
}

export default App;
