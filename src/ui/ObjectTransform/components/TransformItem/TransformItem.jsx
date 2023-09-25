import React, {useEffect, useState} from 'react';
import {Transforms} from "../../config";
import TransformButton from "./TransformButton";

const TransformItem = ({children}) => {
    const item = children.props.item;
    function formatProperty(name, property, sign) {
        if (property !== "0" || (item.position === "absolute" && name !== 'width'))
            return property + sign;
        return "auto";
    }
    const initialTransform = {
        width: formatProperty('width',item.max_width, "%"),
        left: formatProperty('left',item.left, "%"),
        top: formatProperty('top', item.top,"px"),
        ...(item.position === "absolute" ? {position:"absolute", zIndex: 1}:{position: "relative"})
    };
    // let dims = {width: -1, height:-1};
    // let contWidth = container.current.getBoundingClientRect().width;
    // const ratio = item.media_height / item.media_width;
    // let itemWidth = 0;
    // if (item.max_width !== "0") {
    //     itemWidth = +item.max_width * contWidth / 100;
    // } else {
    //     itemWidth = contWidth / row - 2 * +theme.listStyle.mypadding;
    // }
    // itemWidth = Math.min(itemWidth, item.media_width);
    // setDims({width: itemWidth, height: itemWidth * ratio});

    return (
        <TransformButton className={"transform-item transform--" + Transforms.parent.name}
                         type={Transforms.parent.name} style={initialTransform}>
            {children}
            {Object.keys(Transforms.child).map(name => {
                const tr = Transforms.child[name];
                return tr.buttons.map(btn => {
                    return React.createElement(TransformButton, {
                        className: "transform--" + btn.name + ' ' + btn.style,
                        key: btn.name,
                        type: btn.name,
                    });
                })
            })}
        </TransformButton>
    );
};

export default TransformItem;