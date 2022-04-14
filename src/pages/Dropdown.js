import React from 'react';
import {useState, useEffect} from 'react';
import Tasks from '../components/TaskTable/Tasks';
import Grid from '@mui/material/Grid';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import { makeStyles } from "@material-ui/core/styles";
import Select from '@mui/material/Select';

const useStyles = makeStyles(theme => ({
    Dropdwn: {
        background: "white"
    },
  }));

const Dropdown = () => {
    const classes = useStyles(); 

    const [user, setUser] = React.useState('');

    const handleChange = (event) => {
      setUser(event.target.value);
    };

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
        <MenuItem value={10}>User1</MenuItem>
        <MenuItem value={20}>User2</MenuItem>
        <MenuItem value={30}>User3</MenuItem>
    </Select>
    </FormControl>

};

export default Dropdown;