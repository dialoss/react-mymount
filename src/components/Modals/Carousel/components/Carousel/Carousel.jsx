import React from 'react';
import CarouselNav from "../Navigation/Navigation";

import InfoBlock from "ui/InfoBlock/InfoBlock";
import "./Carousel.scss";
import useKeypress from "react-use-keypress";
import {changeCarousel} from "../../controller";
import WindowButton from "ui/Buttons/WindowButton/WindowButton";

const Carousel = ({data}) => {

    useKeypress('ArrowRight', () => changeCarousel("right"));
    useKeypress('ArrowLeft', () => changeCarousel("left"));

    return (
        <div className="carousel">
            <div className="carousel__content">
                <img className="carousel__image" src={data.image} alt=""/>
                <InfoBlock data={data.info}></InfoBlock>
            </div>
            <CarouselNav></CarouselNav>
            <WindowButton callback={() => changeModal('carousel', {isOpened:false})}
                             className={"carousel__close-btn"} type={'close'}/>
        </div>
    );
};

export default Carousel;