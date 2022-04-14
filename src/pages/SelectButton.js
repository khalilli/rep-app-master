import React from 'react';
import {useState, useEffect} from 'react';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import { makeStyles } from "@material-ui/core/styles";
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import './DisplayTasks';

const useStyles = makeStyles(theme => ({
  Ctext: {
      color: "#051367"
  },
  color: {
    backgroundColor: 'white'
  },
  root: {
    background: "white"
  }
}));


const Dropdown = () => {
  const classes = useStyles(); 

  const [user, setUser] = React.useState('');
  const handleChange = (event) => {
    setUser(event.target.value);
  };

  const [firstDate, setFirstDate] = useState('');
  const [secondDate, setSecondDate] = useState('');

  const firstDateChange = (event) => {
    setFirstDate(event.target.value);
  };
  const secondDateChange = (event) => {
    setSecondDate(event.target.value);
  };
  const submitHandler = () => {
    // console.log(firstDate)
    // console.log(secondDate)
    console.log("hey");
    console.log("you");
  //   const weeklytables = [];

  //   const firstDate = Date.monday();
  //   const lastDate = Date.today();
  //   const curr = new Date();
  //   for( var i=0; i<tasks.length; i++){
  //     for( var j=firstDate.getDate(); j<=lastDate.getDate(); j++){
  //       const first = j;
  //       const day = moment(curr.setDate(first)).format('LL');
  //       if(tasks[i].date === day){
  //         console.log("Days", tasks[i].date);
  //         console.log("Tasks", tasks[i]);
  //         weeklytables.push(tasks[i]);
  //       }
  //     }
  //   }
  };
  return(
    <div>
      <Grid container direction={"row"} spacing={3} sx={{mt: 4, ml: 3}} className={classes.root}>
        <Grid item container direction={"row"} spacing={3} sx={{mb: 3}}>
          <Grid item>
          <h4 className={classes.Ctext}>Choose a user:</h4>
          </Grid>
          <Grid item>
                <FormControl sx={{minWidth: 120 }} size="small">
                <InputLabel id="demo-select-small" >Users</InputLabel>
                <Select
                    labelId="demo-select-small"
                    id="demo-select-small"
                    value={user}
                    label="User"
                    onChange={handleChange} >
                <MenuItem value="">
                <em>Users</em>
                </MenuItem>
                <MenuItem value={10}>All</MenuItem>
                <MenuItem value={10}>User1</MenuItem>
                <MenuItem value={20}>User2</MenuItem>
                <MenuItem value={30}>User3</MenuItem>
                </Select>
                </FormControl>
          </Grid>
        </Grid>
        <form onSubmit={submitHandler}>
          <Grid item container direction={"row"} spacing={3} sx={{mb: 4}}>
            <Grid item>
                <TextField
                label="From"
                id="firstdate"
                variant="outlined"
                size="small"
                type="date"
                name="firstdate"
                InputLabelProps={{
                    shrink: true,
                  }}
                value={firstDate} 
                onChange={firstDateChange}
                />
            </Grid>
            <Grid item>
                <TextField
                label="To"
                id="seconddate"
                variant="outlined"
                size="small"
                type="date"
                name="seconddate"
                InputLabelProps={{
                    shrink: true,
                  }}
                value={secondDate}
                onChange={secondDateChange} 
                />
            </Grid>
            <Grid item>
            <Button variant="contained" type='submit'>Show</Button>
            </Grid>
          </Grid>
        </form>
      </Grid>
    </div>
  );
};

export default Dropdown;