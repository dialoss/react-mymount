import React from 'react';
import {ModalManager} from "components/ModalManager";
import {Carousel} from "components/Modals/Carousel";

const CarouselContainer = () => {
    return (
        <ModalManager><Carousel/></ModalManager>
    );
};

export default CarouselContainer;