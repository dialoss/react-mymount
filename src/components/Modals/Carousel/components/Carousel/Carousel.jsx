import React from 'react';
import CarouselNav from "../Navigation/Navigation";

import InfoBlock from "ui/InfoBlock/InfoBlock";
import "./Carousel.scss";
import WindowButton from "ui/Buttons/WindowButton/WindowButton";

const Carousel = ({item}) => {
    return (
        <div className="carousel">
            <div className="carousel__content">
                <img className="carousel__image" src={item.image} alt=""/>
                <InfoBlock data={item.info}></InfoBlock>
            </div>
            <CarouselNav></CarouselNav>
            <WindowButton type={'close'}/>
        </div>
    );
};

export default Carousel;