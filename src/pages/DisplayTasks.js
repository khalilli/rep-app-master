import React from 'react';
import {useState, useEffect} from 'react';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { makeStyles } from "@material-ui/core/styles";
import TextField from '@mui/material/TextField';
import './DisplayTasks';
import Tasks from '../components/TaskTable/Tasks';
import './DisplayTasks';
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
      // console.log(firstDate)
      // console.log(secondDate)
      console.log(firstDate.getDate());

      const weeklytables = [];
  
      const firstDate = Date.monday();
      const lastDate = Date.today();
      const curr = new Date();
      for( var i=0; i<tasks.length; i++){
        for( var j=firstDate.getDate(); j<=lastDate.getDate(); j++){
          const first = j;
          const day = moment(curr.setDate(first)).format('LL');
          if(tasks[i].date === day){
            console.log("Days", tasks[i].date);
            console.log("Tasks", tasks[i]);
            weeklytables.push(tasks[i]);
          }
        }
      }
      console.log(weeklytables);
      setTasks(weeklytables);
    };

    return(
        <div>
          <div>
            <form onSubmit={submitHandler}>
              <Grid item container direction={"row"} spacing={3} sx={{mt: 3, mb:3}} className={classes.root}>
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
          </div>
          <Tasks items={tasks} />
        </div>
    );
};
export default DisplayTasks;