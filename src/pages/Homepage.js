import React from 'react';
import {useState, useEffect} from 'react';
import NewTask from "../components/TaskForm/NewTask";
import Tasks from "../components/TaskTable/Tasks";
import { makeStyles } from "@material-ui/core/styles";
import axios from 'axios';
import moment from 'moment';

const Initdata = [];


const Homepage = () => {
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
    if(response.data[i].status === 'true'){
      const Task = {
        id: response.data[i].id,
        date: moment(response.data[i].taskdate).format('LL'),
        adddate: response.data[i].adddate,
        data: [{
          row_id: response.data[i].row_id,
          status: response.data[i].status,
          seq: response.data[i].SEQ,
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
        return v.date === item.date;
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

  }

  useEffect(() => {
    getData(window.userId);
  }, []);

  const setData = async (id, day, start_time, end_time, task, userid, row_id, username, status, adddate) => {
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
    if(row_id){
      url += `&row_id=${row_id}`;
    }
    if(username){
      url += `&username=${username}`;
    }
    if(status){
      url += `&status=${status}`;
    }
    if(adddate){
      url += `&adddate=${adddate}`;
    }
    url += '&nexturl='+ window.nextUrl;
    axios.get(url);
  };

  const adddate = moment(new Date()).format('LL');

  const AddTaskHandler = (enteredTask) => {
    setTasks((prevTasks)=>{
      return [enteredTask, ...prevTasks];
    });
    
    enteredTask.data.map((task) => (
      setData(enteredTask.id, enteredTask.date, task.stime, task.etime, task.tasktitle, window.userId, task.row_id, window.userName, 'true', adddate)
    ))
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

  const sendData = () => {
    sendWeeklydata(tasks);
  };
      return (
        <div>
          {console.log("Actual user name", window.userName)}
          {console.log("Actual user id", window.userId)}
          {console.log("Actual group name", window.groupName)}
          {console.log("'group' leader id",window.groupLeaderId)}
          <NewTask onAddTask={AddTaskHandler} />
          {/* <Grid container direction="column" alignItems="center">
            <Grid item>
              <Button variant="contained" type="submit" sx={{mb: "10px" }} onClick={sendData}>
                Send
              </Button>
            </Grid>
          </Grid> */}
          <Tasks items={tasks} />
        </div>
      );
};

export default Homepage;