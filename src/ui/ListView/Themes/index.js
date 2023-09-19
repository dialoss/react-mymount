import React from "react";
import childStyle from "./child.module.scss";
import parentStyle from "./parent.module.scss";
import editStyle from "./edit.module.scss";

export const ThemeContext = React.createContext({});

export const themes = {
    childStyle, parentStyle, editStyle
}