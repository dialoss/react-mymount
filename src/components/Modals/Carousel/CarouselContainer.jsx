import React from 'react';
import {ModalManager} from "components/ModalManager";
import {Carousel} from "components/Modals/Carousel";
import {CarouselContext} from "./store/context";
import {useSelector} from "react-redux";
import useKeypress from "react-use-keypress";
import {changeCarousel} from "./controller";

const CarouselContainer = () => {
    const entrys = useSelector(state => state.entrys).entrys;

    const image = carouselState.image || "";
    const info = carouselState.info || {};

    useKeypress('ArrowRight', () => changeCarousel("right"));
    useKeypress('ArrowLeft', () => changeCarousel("left"));

    return (
        <CarouselContext.Provider value={}>
            <ModalManager>
                <Carousel data={{info, image}}/>
            </ModalManager>
        </CarouselContext.Provider>
    );
};

export default CarouselContainer;