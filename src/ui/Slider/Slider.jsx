import React, {cloneElement, useEffect, useRef, useState} from 'react';
import "./Slider.scss";

const Slider = ({children, togglers, opened, closed, defaultOpened=true}) => {
    const [isOpened, setOpened] = useState(defaultOpened);

    // const state = (isOpened ? "opened" : "closed");
    const [width, setWidth] = useState(300);
    const state = (isOpened ? width : closed);
    const ref = useRef();
    useEffect(() => {
        let w = ref.current.getBoundingClientRect().width;
        if (w !== 0) setWidth(w);
    }, []);

    useEffect(() => {
        setOpened(defaultOpened);
    }, [defaultOpened]);

    return (
        <div className={"slider "} style={{maxWidth: state}} ref={ref}>
            <div className={"slider__body"}>
                {children}
                <div className="slider__togglers">
                    {
                        togglers.map((toggler, index) => {
                            return cloneElement(toggler.element, {onClick: () => {
                                    toggler.callback();
                                    const action = toggler.action;
                                    setOpened(opened => {
                                        if (action === 'toggle') return !opened;
                                        return action === 'open';
                                    });
                                }, key: index});
                        })
                    }
                </div>
            </div>
        </div>
    );
};

export default Slider;