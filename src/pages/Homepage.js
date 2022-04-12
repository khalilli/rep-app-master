import React from 'react';
import {useState, useEffect} from 'react';
import NewTask from "../components/TaskForm/NewTask";
import Tasks from "../components/TaskTable/Tasks";
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import axios from 'axios';
import moment from 'moment';
import { v4 as uuid } from 'uuid';
import "./Navbar.css"

const Initdata = [];

const Homepage = () => {
  const [tasks, setTasks] = useState(Initdata);

  const getData = async(TaskTables) => {
  const response = await axios.get("http://192.168.14.33/otcs/llisapi.dll?func=ll&objId=113704&objAction=RunReport&nexturl=%2Fotcs%2Fllisapi%2Edll%3Ffunc%3Dll%26objId%3D113704%26objAction%3DEditView%26viewType%3D1%26nexturl%3D%252Fotcs%252Fllisapi%252Edll%253Ffunc%253Dll%2526objid%253D100991%2526objAction%253Dbrowse%2526sort%253Dname");
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
    console.log("TaskTable", taskTables);

    const groupedTables = [];
    taskTables.forEach(function(item) {
      var existing = groupedTables.filter(function(v, i) {
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
    getData();
  }, []);

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
    const formData = new FormData();
    formData.append('func', 'll');
    formData.append('objId', 115288);
    formData.append('objAction', 'RunReport');
    formData.append('user_name', window.user_name);
    formData.append('datelength', 5);
    const curr = Date.monday();
    tasks.map(task => {
      for (var i=1 ;i<=5; i++){
        const first = curr.getDate() - curr.getDay() + i 
        const day = moment(curr.setDate(first)).format('LL');
        if( task.date === day){
          console.log("date", task.date, "i", i);
          formData.append('taskdate'+ i, task.date);
          formData.append('datalength', task.data.length);
          for(var j=0;j<task.data.length;j++){
            console.log("stime", task.data[j].stime, "j", j);
            console.log("etime", task.data[j].etime, "j", j);
            console.log("tasktitle", task.data[j].tasktitle, "j", j);
            formData.append('stime' + (j+1), task.data[j].stime); //1, 4
            formData.append('etime' + (j+1), task.data[j].etime); //2, 5
            formData.append('tasktitle' + (j+1), task.data[j].tasktitle); //3, 6
          }
        }
      }
    
    });
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

  const sendData = () => {
    sendWeeklydata(tasks);
  };


  const AddTaskHandler = (enteredTask) => {
    console.log("Entered", enteredTask);

    setTasks((prevTasks)=>{
      return [enteredTask, ...prevTasks];
    });

    enteredTask.data.map((task) => (
      setData(enteredTask.id, enteredTask.date, task.stime, task.etime, task.tasktitle, window.userId)
    ))
    };

    console.log("tasks", tasks);
    
      return (
        <div>
          <NewTask onAddTask={AddTaskHandler} />
          <Grid container direction="column" alignItems="center">
            <Grid item>
              <Button variant="contained" type="submit" sx={{mb: "10px" }} onClick={sendData}>
                Send
              </Button>
            </Grid>
          </Grid>
          <Tasks items={tasks} />
        </div>
      );
};

export default Homepage;