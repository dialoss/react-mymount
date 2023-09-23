import React from 'react';
import {Transforms} from "../../config";
import TransformButton from "./TransformButton";

const TransformItem = ({children}) => {
    return (
        <TransformButton className={"transform-item transform--" + Transforms.parent.name}
                         type={Transforms.parent.name}>
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