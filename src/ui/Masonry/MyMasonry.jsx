import React, {useLayoutEffect, useRef, useState} from 'react';
import "./MyMasonry.scss";
import {CSSTransition, TransitionGroup} from "react-transition-group";
import {getViewportSize} from "components/helpers/viewport";
import {useAddEvent} from "../../hooks/useAddEvent";

const MyMasonry = ({maxColumns=1, widthPoints=[400,600,800], children}) => {
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
        for (let i = 0; i < newLayout.length; i++) {
            const lastItem = newLayout[i].slice(-1)[0];
            if (!!lastItem && !!lastItem.ref) console.log(lastItem.ref.current.offsetBottom);
        }
        setLayout(newLayout);
    }, [children, count]);

    useAddEvent('resize', setColumns);

    return (
        <div className={"masonry__grid"}>
            {
                layout.map((column, i) =>
                    <div className={"masonry__column"}
                         style={{width: 100 / count + "%"}}
                         key={i}>
                        <TransitionGroup key={i} component={null}>
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