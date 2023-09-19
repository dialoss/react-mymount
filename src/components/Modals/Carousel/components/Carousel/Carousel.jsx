import React from 'react';
import CarouselNav from "../Navigation/Navigation";

import InfoBlock from "ui/InfoBlock/InfoBlock";
import "styles/carousel/Carousel.scss";
import ButtonComponent from "ui/Buttons/WindowButton/WindowButton";
import useKeypress from "react-use-keypress";
import {changeCarousel} from "../../controller";

const Carousel = ({image, info}) => {

    useKeypress('ArrowRight', () => changeCarousel("right"));
    useKeypress('ArrowLeft', () => changeCarousel("left"));

    return (
        <div className="carousel">
            <div className="carousel__content">
                <img className="carousel__image" src={image} alt=""/>
                <InfoBlock data={info}></InfoBlock>
            </div>
            <CarouselNav></CarouselNav>
            <ButtonComponent callback={() => changeModal('carousel', {isOpened:false})}
                             className={"carousel__close-btn"} type={'close'}/>
        </div>
    );
};

export default Carousel;