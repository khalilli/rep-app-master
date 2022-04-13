import React from 'react';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
    navBar: {
        background: "#041562"
    },
    Tab: {
        color: "white",
    }
  }));

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
    const classes = useStyles(); 

    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
    setValue(newValue);
  };

    return (
        <Box sx={{ width: '100%' }}>
        <Tabs value={value} onChange={handleChange} aria-label="nav tabs example" className={classes.navBar}>
            <LinkTab label="HomePage" href="/drafts" />
            <LinkTab label="Another Page" href="/trash" />
        </Tabs>
        </Box>
    );
};
export default Navbar;