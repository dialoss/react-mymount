import React from 'react';

import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const MyAccordion = ({title, content}) => {
    const [expanded, setExpanded] = React.useState(false);

    const handleChange = () => {
        setExpanded(expanded => !expanded);
    };

    return (
        <Accordion expanded={expanded} onChange={handleChange}>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls={title + "-content"}
                id={title + "-header"}
            >
                {title}
            </AccordionSummary>
            <AccordionDetails>
                Nulla facilisi. Phasellus sollicitudin nulla et quam mattis feugiat.
                Aliquam eget maximus est, id dignissim quam.
            </AccordionDetails>
        </Accordion>
    );
};

export default MyAccordion;