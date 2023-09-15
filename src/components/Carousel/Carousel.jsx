import React from 'react';
import CarouselNav from "./CarouselNav";
import InfoBlock from "components/Entry/Info/InfoBlock";
import {connect, useSelector} from "react-redux";
import "styles/carousel/Carousel.scss";
import ButtonComponent from "../UI/Buttons/ButtonComponent";
import {changeModal} from "components/Modal/changeModal";

const Carousel = () => {
    const carouselState = useSelector(state => state.modal['carousel']);
    // const carouselState = this.props.carousel;
    const currentImage = carouselState.currentImage || "";
    const imageText = carouselState.imageText || {};
    console.log(carouselState);
    return (
        <div className="carousel">
            <div className="carousel__content">
                <img className="carousel__image" src={currentImage} alt=""/>
                <InfoBlock data={imageText}></InfoBlock>
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

export default connect(mapStateToProps)(Carousel);