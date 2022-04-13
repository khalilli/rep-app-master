import React from 'react';
import {useState, useEffect} from 'react';
import Tasks from '../components/TaskTable/Tasks';
import Grid from '@mui/material/Grid';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import { makeStyles } from "@material-ui/core/styles";
import Select from '@mui/material/Select';
import './Somepage';
import axios from 'axios';
import moment from 'moment';
import { v4 as uuid } from 'uuid';

const useStyles = makeStyles(theme => ({
    Ctext: {
        color: "white"
    },
    Dropdwn: {
        background: "white"
    }
  }));

const Somepage = (props) => {
    const classes = useStyles(); 

    const [tasks, setTasks] = useState([]);

    const getData = async(userid) => {
        var url = "http://192.168.14.33/otcs/llisapi.dll?func=ll&objId=113704&objAction=RunReport";
        if(userid){
            url += `&userid=${userid}`;
        }
        url += '&nexturl='+ window.nextUrl;
        const response = await axios.get(url);
        const taskTables = [{},];
        for (var i=0; i<response.data.length-1; i++){
            const Task = {
            id: response.data[i].id,
            date: moment(response.data[i].taskdate).format('LL'),
            data: [{
                id: uuid(),
                stime: response.data[i].start_time,
                etime: response.data[i].end_time,
                tasktitle: response.data[i].task}, ]
            };
            taskTables.unshift(Task);
        } 
            const groupedTables = [];
            taskTables.forEach(function(item) {
            var existing = groupedTables.filter(function(v) {
                return v.id === item.id;
            });
            if (existing.length) {
                var existingIndex = groupedTables.indexOf(existing[0]);
                groupedTables[existingIndex].data = groupedTables[existingIndex].data.concat(item.data);
            } else {
                if (typeof item.data == 'string')
                item.data = [item.data];
                groupedTables.push(item);
            }
            });
            groupedTables.pop();
            setTasks(groupedTables);
    }
    useEffect(() => {
        getData(window.userId);
    }, []);
    const [user, setUser] = React.useState('');

    const handleChange = (event) => {
      setUser(event.target.value);
    };
    return(
        <div>
            <Grid container direction={"column"} spacing={5}>
                <Grid item container direction={"row"} spacing={3} sx={{mt: 4, ml: 3}} >
                    <Grid item>
                        <p className='classes.Ctext'>Choose a user:</p>
                    </Grid>
                    <Grid item>
                        <div className='selectUser'>
                        <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                        <InputLabel id="demo-select-small" >Age</InputLabel>
                        <Select
                            labelId="demo-select-small"
                            id="demo-select-small"
                            value={user}
                            label="User"
                            onChange={handleChange}
                            className='classes.dropdwn' >
                            <MenuItem value="">
                            <em>Users</em>
                            </MenuItem>
                            <MenuItem value={10}>User1</MenuItem>
                            <MenuItem value={20}>User2</MenuItem>
                            <MenuItem value={30}>User3</MenuItem>
                        </Select>
                        </FormControl>
                        </div>
                    </Grid>
                </Grid>
                <Grid item>
                    <Tasks items={tasks} />
                </Grid>
            </Grid>
        </div>
    );
};
export default Somepage;