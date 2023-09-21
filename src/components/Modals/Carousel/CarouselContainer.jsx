import React, {useLayoutEffect, useState} from 'react';
import Carousel from "./components/Carousel/Carousel.jsx";
import useKeypress from "react-use-keypress";
import {triggerEvent} from "helpers/events";
import {useAddEvent} from "hooks/useAddEvent";
import {useSelector} from "react-redux";
import {ModalManager} from "components/ModalManager";

function bounds(n, bound) {
    return (n + bound) % bound;
}

const CarouselContainer = () => {
    const entrys = useSelector(state => state.elements.entrys);
    let itemsWrapper = [];
    const [items, setItems] = useState([]);

    const [currentItem, setCurrent] = useState(0);
    let currentWrapper = 0;
    const forward = () => {
        currentWrapper += 1;
        setCurrent(bounds(currentWrapper, items.length));
    }
    const back = () => {
        currentWrapper -= 1;
        setCurrent(bounds(currentWrapper, items.length));
    }

    function openCarousel(event) {
        for (let i = 0; i < itemsWrapper.length; i++) {
            if (itemsWrapper[i].id === event.detail) {
                setCurrent(i);
                triggerEvent('carousel-window', {isOpened: true});
                return;
            }
        }
    }

    useAddEvent("open-carousel", openCarousel);
    useAddEvent("carousel-right", forward);
    useAddEvent("carousel-left", back);

    useLayoutEffect(() => {
        // items.forEach(item => new Image().src = item.image);
        itemsWrapper = [];
        entrys.forEach(entry => {
            entry.items.forEach(item => {
                if (item.type !== 'images') return;
                itemsWrapper.push({
                    id: item.id,
                    image: item.img,
                    info: {
                        title: item.title || entry.title,
                        description: item.description || entry.description,
                        filename: item.file,
                    }
                });
            })
        })
        console.log(items, itemsWrapper);
        setItems(itemsWrapper);
    }, [entrys]);

    useKeypress('ArrowRight', () => triggerEvent('carousel-right'));
    useKeypress('ArrowLeft', () => triggerEvent('carousel-left'));
    return (
        <>
            {
                !!items.length &&
                <ModalManager name={'carousel-window'}>
                    <Carousel style={{background: {}}} item={items[currentItem]}/>
                </ModalManager>
            }
        </>
    );
};

export default CarouselContainer;