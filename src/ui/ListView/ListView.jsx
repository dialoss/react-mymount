import React from 'react';
import {ThemeContext, themes} from "ui/ListView/Themes";

const ListView = ({children}) => {
    return (
        <ThemeContext.Provider value={themes}>
            {children}
        </ThemeContext.Provider>
    );
};

export default ListView;