
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import {useState} from "react";

const LabTabs = ({tabs}) => {
    const [value, setValue] = useState('1');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Box sx={{ width: '100%', typography: 'body1' }}>
            <TabContext value={value}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <TabList onChange={handleChange} aria-label="lab API tabs example">
                        {
                            tabs.map((tab, index) => <Tab label={tab.title} value={String(index)} key={index}/>)
                        }
                    </TabList>
                </Box>
                {
                    tabs.map((tab, index) => <TabPanel value={String(index)} key={index}>{tab.content}</TabPanel>)
                }
            </TabContext>
        </Box>
    );
}

export default LabTabs;