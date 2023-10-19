import React from 'react';
import CarouselNav from "../Navigation/Navigation";

import InfoBlock from "ui/InfoBlock/InfoBlock";
import "./Carousel.scss";
import buttonStyle from "./CarouselButton.module.scss";
import WindowButton from "ui/Buttons/WindowButton/WindowButton";

const Carousel = ({item}) => {
    return (
        <div className="carousel">
            <div className="carousel__content content-inner">
                <img className="carousel__image" src={item.url} alt=""/>
                {item.info && <InfoBlock data={item.info}></InfoBlock>}
            </div>
            <div className="content-outer" style={{display: 'none'}}>
                <CarouselNav></CarouselNav>
                <WindowButton type={'close'} className={buttonStyle['window-close']}/>
            </div>
        </div>
    );
};

export default Carousel;