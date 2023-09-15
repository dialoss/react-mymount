import React from 'react';
import CarouselNav from "./CarouselNav";
import InfoBlock from "components/Entry/Info/InfoBlock";
import {connect, useSelector} from "react-redux";
import "styles/carousel/Carousel.scss";
import ButtonComponent from "../UI/Buttons/ButtonComponent";
import {changeModal} from "components/Modal/changeModal";
import useKeypress from "react-use-keypress";
import {changeCarousel} from "./changeCarousel";

const Carousel = () => {

    useKeypress('ArrowRight', () => changeCarousel("right"));
    useKeypress('ArrowLeft', () => changeCarousel("left"));

    const carouselState = useSelector(state => state.modal['carousel'].currentSlide);

    const image = carouselState.image || "";
    const info = carouselState.info || {};
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

function mapStateToProps(state) {
    return {
        carousel: state.modal['carousel']
    };
}

export default Carousel;