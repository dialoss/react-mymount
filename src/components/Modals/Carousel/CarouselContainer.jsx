import React, {useCallback, useLayoutEffect, useReducer, useRef, useState} from 'react';
import Carousel from "./components/Carousel/Carousel.jsx";
import useKeypress from "react-use-keypress";
import {triggerEvent} from "helpers/events";
import {useAddEvent} from "hooks/useAddEvent";
import {useSelector} from "react-redux";
import {ModalManager} from "components/ModalManager";

function bounds(n, bound) {
    return (n + bound) % bound;
}

function reducer(state, action) {
    return action;
}

const CarouselContainer = () => {
    const entrys = useSelector(state => state.elements.entrys);
    const [items, dispatch] = useReducer(reducer, []);
    const itemsRef = useRef();
    itemsRef.current = items;

    const [currentItem, setCurrent] = useState(0);

    const forward = useCallback(() => {
        setCurrent(currentItem => bounds(currentItem + 1, itemsRef.current.length));
    }, []);
    const back = useCallback(() => {
        setCurrent(currentItem => bounds(currentItem - 1, itemsRef.current.length));
    }, []);

    const windowName = 'carousel-window:toggle';

    const openCarousel = useCallback(event => {
        for (let i = 0; i < itemsRef.current.length; i++) {
            if (itemsRef.current[i].id === event.detail) {
                setCurrent(i);
                triggerEvent(windowName, {isOpened: true});
                return;
            }
        }
        dispatch([event.detail]);
        setCurrent(0);
        triggerEvent(windowName, {isOpened: true});
    }, []);

    useAddEvent("carousel:open", openCarousel);
    useAddEvent("carousel:right", forward);
    useAddEvent("carousel:left", back);

    useLayoutEffect(() => {
        let newItems = [];
        entrys.forEach(entry => {
            entry.items.forEach(item => {
                if (item.type !== 'image') return;
                newItems.push({
                    id: item.id,
                    image: item.url,
                    info: {
                        title: item.title || entry.title,
                        description: item.description || entry.description,
                        filename: item.file,
                    }
                });
            })
        })
        dispatch(newItems);
    }, [entrys]);

    useLayoutEffect(() => {
        if (!!currentItem) {
            new Image().src = items[currentItem].url
        }
    }, [currentItem]);

    useKeypress('ArrowRight', () => triggerEvent('carousel:right'));
    useKeypress('ArrowLeft', () => triggerEvent('carousel:left'));
    return (
        <>
            {!!items.length && currentItem < items.length &&
                <ModalManager name={windowName} key={windowName}>
                    <Carousel style={{win: 'centered'}} item={items[currentItem]}/>
                </ModalManager>
            }
        </>
    );
};

export default CarouselContainer;