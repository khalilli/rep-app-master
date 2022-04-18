import React from 'react';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { makeStyles } from "@material-ui/core/styles";
import {BrowserRouter as Router, Route, Link, Routes} from 'react-router-dom';

const useStyles = makeStyles(theme => ({
    navBar: {
        background: "#D1D1D1",
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
        // <Box sx={{ width: '100%' }}>
        // <Tabs value={value} onChange={handleChange} aria-label="nav tabs example" className={classes.navBar}>
        //     <LinkTab label="Homepage" href="/" className={classes.Tab} />
        //     <LinkTab label="All Tasks" href="/about" className={classes.Tab} />
        //     <Link><LinkTab label="All Tasks" href="/about" className={classes.Tab} /></Link>
        // </Tabs>
        // </Box>
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
          <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav">
              <li class="nav-item">
                <a class="nav-link" href="/otcs/llisapi.dll?func=ll&objId=107301&objAction=RunReport/">Homepage</a>
              </li>
              <li class="nav-item">
              <a class="nav-link" href="/otcs/llisapi.dll?func=ll&objId=107301&objAction=RunReport/displaytasks">All Tasks</a>
              </li>
            </ul>
          </div>
        </nav>   
    );
};
export default Navbar;