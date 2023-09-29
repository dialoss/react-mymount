import React from 'react';
import {Transforms} from "../../config";
import TransformButton from "./TransformButton";

const resizers = {
    width:"100%",
    height:"1px",
    position:"relative"
}

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
        ...(item.position === "absolute" ? {position:"absolute", zIndex: 1}:{})
    };
    return (
        <TransformButton className={"transform-item transform--" + Transforms.parent.name}
                         type={Transforms.parent.name} style={initialTransform}>
            {children}
            <div className={"transform-resizers"} style={resizers}>
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
            </div>

        </TransformButton>
    );
};

export default TransformItem;