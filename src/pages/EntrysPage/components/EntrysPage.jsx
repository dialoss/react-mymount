import React from 'react';
import {EntryListContainer} from "modules/EntryList";
import PageComments from "modules/PageComments/PageComments";

const EntrysPage = ({addComments}) => {
    return (
        <>
            <EntryListContainer/>
            {addComments && <PageComments/>}
        </>
    );
};

export default EntrysPage;