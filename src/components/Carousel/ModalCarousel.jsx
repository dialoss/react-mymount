import React from 'react';
import CarouselNav from "./CarouselNav";
import InfoBlock from "components/Entry/Info/InfoBlock";

const ModalCarousel = () => {
    return (
        <div className="modal-carousel">
            <img className="carousel__image" src="" alt=""/>
            <CarouselNav></CarouselNav>
            <InfoBlock></InfoBlock>
        </div>
    );
};

export default ModalCarousel;