import React from 'react';
import CarouselNav from "../Navigation/Navigation";

import InfoBlock from "ui/InfoBlock/InfoBlock";
import "./Carousel.scss";
import WindowButton from "ui/Buttons/WindowButton/WindowButton";

const Carousel = ({data}) => {
    return (
        <div className="carousel">
            <div className="carousel__content">
                <img className="carousel__image" src={data.image} alt=""/>
                <InfoBlock data={data.info}></InfoBlock>
            </div>
            <CarouselNav></CarouselNav>
            <WindowButton className={"carousel__close-btn"} type={'close'}/>
        </div>
    );
};

export default Carousel;