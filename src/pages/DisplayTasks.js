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
import axios from 'axios';
import moment from 'moment';
import { v4 as uuid } from 'uuid';

const DisplayTasks = (props) => {
    const [tasks, setTasks] = useState([]);
    const [alltasks, setAllTasks] = useState([]);
    const [showtasks, setShowTasks] = useState(false);
    const removeButton = false;

    const getData = async(userid) => {
      var url = "http://192.168.14.33/otcs/llisapi.dll?func=ll&objId=117629&objAction=RunReport";
      url += '&nexturl='+ window.nextUrl;
      const response = await axios.get(url);
        console.log("response", response);
        const taskTables = [{},];
        for (var i=0; i<response.data.length-1; i++){
          if(response.data[i].status === 'true'){
            const Task = {
            id: response.data[i].id,
            date: moment(response.data[i].taskdate).format('LL'),
            userid: response.data[i].userid,
            username: response.data[i].username,
            data: [{
                row_id: response.data[i].row_id,
                status: response.data[i].status,
                stime: response.data[i].start_time,
                etime: response.data[i].end_time,
                tasktitle: response.data[i].task}, ]
            };
            taskTables.unshift(Task);
          }
        } 
            const groupedTables = [];
            taskTables.forEach(function(item) {
            var existing = groupedTables.filter(function(v) {
                return (v.date === item.date && v.userid === item.userid);
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
            for( var i=0; i<groupedTables.length; i++){
              if(groupedTables[i].data.length > 0){
                  groupedTables[i].data.sort(function compare(a, b) {
                  var dateA = new Date('1970/01/01 ' + a.stime);
                  var dateB = new Date('1970/01/01 ' + b.stime);
                  return dateA - dateB;
                  });
              }
            }
            setTasks(groupedTables);
            setAllTasks(groupedTables);
    }
    useEffect(() => {
        getData();
    }, []);

    const [filteredUser, setFilteredUser] = useState('0');

    const filterChange = selectedUser => {
      setFilteredUser(selectedUser);
    };
  
    const [firstDate, setFirstDate] = useState('');
    const [secondDate, setSecondDate] = useState('');
  
    const firstDateChange = (event) => {
      setFirstDate(event.target.value);
    };
    const secondDateChange = (event) => {
      setSecondDate(event.target.value);
    };


    const filteredTasks = [];
    for(var i=0;i<tasks.length;i++){
      if(tasks[i].userid === filteredUser){
        filteredTasks.push(tasks[i]);
      }
      else if(filteredUser === '0'){
        filteredTasks.push(tasks[i]);
      }
    }
    console.log("Filtered Tasks", filteredTasks);
    console.log("Tasks", tasks);

    const weeklytables = [];
    const frstdate = new Date(firstDate);
    console.log("firstday", frstdate);
    const lastDate = new Date(secondDate);
    const curr = new Date();
    for( var i=0; i<filteredTasks.length; i++){
      for( var j=frstdate.getDate(); j<=lastDate.getDate(); j++){
        const first = j;
        const day = moment(curr.setDate(first)).format('LL');
        if(filteredTasks[i].date === day){
          weeklytables.push(filteredTasks[i]);
        }
      }
    }
    console.log("Weeklytables", weeklytables);


    let tasksContent = <div className='task_notification'><p>No tasks added by this user.</p><p>All tasks are shown below:</p></div>
    if(filteredTasks.length > 0){
      tasksContent = <Tasks items={filteredTasks} button={removeButton} show={showtasks} />
      if(weeklytables.length > 0){
        tasksContent = <Tasks items={weeklytables} button={removeButton} />
      }
    }
  

    const submitHandler = (event) => {
      // event.preventDefault();
      // const weeklytables = [];
      // const frstdate = new Date(firstDate);
      // console.log("firstday", frstdate);
      // const lastDate = new Date(secondDate);
      // const curr = new Date();
      // for( var i=0; i<filteredTasks.length; i++){
      //   for( var j=frstdate.getDate(); j<=lastDate.getDate(); j++){
      //     const first = j;
      //     const day = moment(curr.setDate(first)).format('LL');
      //     if(filteredTasks[i].date === day){
      //       weeklytables.push(filteredTasks[i]);
      //     }
      //   }
      // }
      // setTasks(weeklytables);
    };

    const resetButton = () => {
      window.location.reload(true);
    };

    return(
        <div>
          <div>
            <div className='selection'>
              <UsersFilter selected={filteredUser} onChangefilter={filterChange} items={alltasks} />
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
                <Button variant="contained" size="small" type='submit' onClick={resetButton}>Show all time</Button>
                </Grid>
              </Grid>
            </form>
            </div>
          </div>
          {/* <Tasks items={tasks} /> */}
          {tasksContent}
        </div>
    );
};
export default DisplayTasks;