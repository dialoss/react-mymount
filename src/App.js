import React from "react";
import 'styles/App.scss';
import {TemplatePage} from "pages/TemplatePage";
import ActionManager from "modules/ActionManager/components/ActionManager";
import {ActionForm} from "modules/ActionForm";
import CarouselContainer from "components/Modals/Carousel/CarouselContainer";

function App() {
    return (
        <div className="App">
            <TemplatePage/>
            <CarouselContainer></CarouselContainer>
            <ActionManager></ActionManager>
            <ActionForm></ActionForm>
        </div>
    );
}

export default App;
