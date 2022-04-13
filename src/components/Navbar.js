import React from 'react';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

function LinkTab(props) {
  return (
    <Tab
      component="a"
      onClick={(event) => {
        event.preventDefault();
      }}
      {...props}
    />
  );
}
const Navbar = () => {
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
    setValue(newValue);
  };

    return (
        <Box sx={{ width: '100%' }}>
        <Tabs value={value} onChange={handleChange} aria-label="nav tabs example">
            <LinkTab label="HomePage" href="/drafts" />
            <LinkTab label="Another Page" href="/trash" />
        </Tabs>
        </Box>
    );
};
export default Navbar;