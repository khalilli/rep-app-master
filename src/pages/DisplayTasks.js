import React from 'react';
import {useState, useEffect} from 'react';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { makeStyles } from "@material-ui/core/styles";
import TextField from '@mui/material/TextField';
import './DisplayTasks';
import Tasks from '../components/TaskTable/Tasks';
import UsersFilter from '../components/UsersFilter';
import './DisplayTasks.css';
import Dropdown from './Dropdown';
import axios from 'axios';
import moment from 'moment';
import { v4 as uuid } from 'uuid';


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

const DisplayTasks = (props) => {
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

  
    const [firstDate, setFirstDate] = useState('');
    const [secondDate, setSecondDate] = useState('');
  
    const firstDateChange = (event) => {
      setFirstDate(event.target.value);
    };
    const secondDateChange = (event) => {
      setSecondDate(event.target.value);
    };

    const submitHandler = (event) => {
      event.preventDefault();

      const weeklytables = [];
      const frstdate = new Date(firstDate);
      const lastDate = new Date(secondDate);
      const curr = new Date();
      for( var i=0; i<tasks.length; i++){
        for( var j=frstdate.getDate(); j<=lastDate.getDate(); j++){
          const first = j;
          const day = moment(curr.setDate(first)).format('LL');
          if(tasks[i].date === day){
            console.log("Days", tasks[i].date);
            console.log("Tasks", tasks[i]);
            weeklytables.push(tasks[i]);
          }
        }
      }
      setTasks(weeklytables);

    };
    const Reset = () => {
        getData(window.userId);
    };

    return(
        <div>
          <div>
            <div className='selection'>
              <UsersFilter/>
              <form onSubmit={submitHandler}>
              <Grid container direction={"row"} spacing={3} sx={{mt: 3, pb:3, pl:2}} >
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
                <Grid item>
                <Button variant="contained" type='submit' onClick={Reset}>Reset</Button>
                </Grid>
              </Grid>
            </form>
            </div>
          </div>
          <Tasks items={tasks} />
        </div>
    );
};
export default DisplayTasks;