import React, {useLayoutEffect, useState} from 'react';
import "./MyMasonry.scss";
import {CSSTransition, TransitionGroup} from "react-transition-group";
import {getViewportSize} from "components/helpers/viewport";

const MyMasonry = ({maxColumns=1, widthPoints, children}) => {
    const [layout, setLayout] = useState([]);
    const [count, setCount] = useState(maxColumns);

    function setColumns() {
        const [vw, vh] = getViewportSize();
        let newColumns = 0;
        widthPoints.forEach((point, index) => {
            if (vw >= point) {
                newColumns = index;
            }
        });
        if (newColumns + 1 <= maxColumns) {
            setCount(newColumns + 1);
        }
    }

    useLayoutEffect(() => {
        setColumns();
        let newLayout = [];
        for (let i = 0; i < count; i++) {
            newLayout.push([]);
        }
        for (let i = 0; i < children.length; i++) {
            newLayout[i % count].push(children[i]);
        }
        setLayout(newLayout);
    }, [children, count]);

    useLayoutEffect(() => {
        window.addEventListener('resize', setColumns);
        return () => window.removeEventListener('resize', setColumns);
    }, []);

    return (
        <div className={"masonry__grid"}>
            {
                layout.map((column, i) =>
                    <div className={"masonry__column"}
                         style={{width: 100 / count + "%"}}
                         key={i}>
                        <TransitionGroup key={i}>
                            {
                                column.map((entry) =>
                                    <CSSTransition key={entry.key} timeout={200} classNames={"masonry__item"}>
                                        {entry}
                                    </CSSTransition>
                                )
                            }
                        </TransitionGroup>
                    </div>
                )
            }
        </div>
    );
};

export default MyMasonry;