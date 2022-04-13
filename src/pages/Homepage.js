import React from 'react';
import {useState, useEffect} from 'react';
import NewTask from "../components/TaskForm/NewTask";
import Tasks from "../components/TaskTable/Tasks";
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Navbar from '../components/Navbar.js'
import IconButton from '@mui/material/IconButton';
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import { makeStyles } from "@material-ui/core/styles";
import axios from 'axios';
import moment from 'moment';
import { v4 as uuid } from 'uuid';

const Initdata = [];

const useStyles = makeStyles(theme => ({
  backButton: {
      color: "#041562"
  },
}));

const Homepage = () => {
  const classes = useStyles(); 
  const [tasks, setTasks] = useState(Initdata);

  const getData = async(userid, staskdate, etaskdate) => {
  var url = "http://192.168.14.33/otcs/llisapi.dll?func=ll&objId=113704&objAction=RunReport";
  if(userid){
    url += `&userid=${userid}`;
  }
  if(staskdate){
    url += `&staskdate=${staskdate}`;
  }
  if(etaskdate){
    url += `&etaskdate=${etaskdate}`;
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

  console.log("Just check", window.userId);

  const setData = async (id, day, start_time, end_time, task, userid) => {
    var url = "http://192.168.14.33/otcs/llisapi.dll?func=ll&objId=106810&objAction=RunReport";
    if(id){
        url += `&id=${id}`;
    }
    if(day){
        day = moment(day).format("MM/DD/YYYY");
        url += `&day=${day}`;
    }
    if(start_time){
        url += `&start_time=${start_time}`;
    }
    if(end_time){
        url += `&end_time=${end_time}`;
    }
    if(task){
        url += `&task=${task}`;
    }
    if(userid){
      url += `&userid=${userid}`;
    }
    url += '&nexturl='+ window.nextUrl;
    axios.get(url);
  };

  const sendWeeklydata = async (tasks) =>{
    console.log("Length", tasks.length);
    const formData = new FormData();
    formData.append('func', 'll');
    formData.append('objId', 115288);
    formData.append('objAction', 'RunReport');
    formData.append('user_name', window.user_name);
    formData.append('datelength', 5);
    const curr = Date.monday();
    for(var k=0;k<tasks.length;k++){
      for (var i=1 ;i<=5; i++){
        const first = curr.getDate() - curr.getDay() + i 
        const day = moment(curr.setDate(first)).format('LL');
        if( tasks[k].date === day){
          // console.log("date", tasks[k].date, "i", i);

          formData.append('taskdate'+ i, tasks[k].date);
          formData.append('datalength', tasks[k].data.length);
          for(var j=0;j<tasks[k].data.length;j++){
            // console.log("stime", tasks[k].data[j].stime, "ij",i, j);
            // console.log("etime", tasks[k].data[j].etime, "ij", i, j);
            // console.log("tasktitle", tasks[k].data[j].tasktitle, "ij", i, j);

            formData.append('stime' + i + (j+1), tasks[k].data[j] ? tasks[k].data[j].stime : undefined);
            formData.append('etime' + i + (j+1), tasks[k].data[j] ? tasks[k].data[j].etime : undefined); 
            formData.append('tasktitle' + i + (j+1),tasks[k].data[j] ? tasks[k].data[j].tasktitle : undefined); 
          }
        }
      }
    
    };
    formData.append('nexturl', window.nextUrl);
    const result = await axios({
      method: 'POST',
      url: window.baseUrl,
      data: formData,
      headers: {
          'Content-Type': 'multipart/form-data'
      }
    });
  }


  const AddTaskHandler = (enteredTask) => {
    console.log("Entered", enteredTask);

    setTasks((prevTasks)=>{
      return [enteredTask, ...prevTasks];
    });

    enteredTask.data.map((task) => (
      setData(enteredTask.id, enteredTask.date, task.stime, task.etime, task.tasktitle, window.userId)
    ))
  };

  const sendData = () => {
    sendWeeklydata(tasks);
  };
  // const previousWeek = () => {
  //   const weeklytables = [];

  //   const firstDate = Date.monday();
  //   const lastDate = Date.today();
  //   const curr = new Date();
  //   for( var i=0; i<groupedTables.length; i++){
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
  // }
      return (
        <div>
          <Navbar />
          <NewTask onAddTask={AddTaskHandler} />
          <Grid container direction="column" alignItems="center">
            <Grid item>
              <Button variant="contained" type="submit" sx={{mb: "10px" }} onClick={sendData}>
                Send
              </Button>
              {/* <Grid item>
                <IconButton onClick={previousWeek}>
                  <ArrowCircleLeftIcon className={classes.backButton} />
                </IconButton> 
              </Grid> */}
            </Grid>
          </Grid>
          <Tasks items={tasks} />
        </div>
      );
};

export default Homepage;