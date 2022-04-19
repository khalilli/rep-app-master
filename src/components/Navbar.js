import React from 'react';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { makeStyles } from "@material-ui/core/styles";

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
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <a className="nav-link" href={window.baseUrl + '/homepage' + '?func=ll&objId=' + window.currentWebreportId + '&objAction=RunReport'}>Homepage</a>
              </li>
              <li className="nav-item">
              <a className="nav-link" href={window.baseUrl + '/displaytasks' + '?func=ll&objId=' + window.currentWebreportId + '&objAction=RunReport'}>All Tasks</a>
              </li>
            </ul>
          </div>
        </nav>   
    );
};
export default Navbar;