import React from 'react';
import CarouselNav from "./CarouselNav";
import InfoBlock from "components/Entry/Info/InfoBlock";
import {useSelector} from "react-redux";
import "styles/carousel/Carousel.scss";

const Carousel = () => {
    const carouselState = useSelector(state => state.modal['carousel']);
    const currentImage = carouselState.currentImage || "";
    const imageData = carouselState.imageData || {};
    return (
        <div className="carousel">
            <div className="carousel__content">
                <img className="carousel__image" src={currentImage} alt=""/>
                <InfoBlock data={imageData}></InfoBlock>
            </div>
            <CarouselNav></CarouselNav>
        </div>
    );
};

export default Carousel;