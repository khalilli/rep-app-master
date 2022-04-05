import React from 'react';
import {useState} from 'react';
import NewTask from "../components/TaskForm/NewTask";
import Tasks from "../components/TaskTable/Tasks";
import axios from 'axios';
import moment from 'moment';
import "./Navbar.css"

const Initdata = [
  {
  id:'0',
  date: new Date("March 21, 2022").toDateString(),
  data: 
    [
      {id: '1', stime: '9:00', etime: '10:00', tasktitle: 'test'},
      {id: '2', stime: '11:00', etime: '12:00', tasktitle: 'text'},
      {id: '3', stime: '13:00', etime: '14:00', tasktitle: 'laylay'},
      {id: '4', stime: '14:00', etime: '15:00', tasktitle: 'oaylay'},
    ]
  },
];

const Homepage = () => {
  const [tasks, setTasks] = useState(Initdata);

  const setData = async (id, day, start_time, end_time, task) => {
    // day = moment(day).format('YYYY-MM-DD');
    // const response = await axios.get(`http://192.168.14.33/otcs/llisapi.dll?func=ll&objId=106810&objAction=RunReport&id=${id}&day=${day}&start_time=${start_time}&end_time=${end_time}&task=${task}&nexturl=[LL_REPTAG_NEXTURL /]`);
    var url = "http://192.168.14.33/otcs/llisapi.dll?func=ll&objId=106810&objAction=RunReport";
    if(id){
        url += `&id=${id}`;
    }
    if(day){
         day = moment(day).format('M/D/Y');
         console.log("date format", day);
         url += `&day=${day}`;
    }
    if(start_time){
      url += `&start_time=${start_time}`;
      console.log("time format", start_time);
    }
    if(end_time){
          url += `&end_time=${end_time}`;
    }
    if(task){
          url += `&task=${task}`;
    }
    url += '&nexturl='+ window.nextUrl;
    axios.get(url);
  };

    const AddTaskHandler = (enteredTask) => {
      console.log("Entered", enteredTask)
      setTasks((prevTasks)=>{
        return [enteredTask, ...prevTasks];
      });
      {enteredTask.data.map((task) => (
        setData(enteredTask.id, enteredTask.date, task.stime, task.etime, task.tasktitle)
      ))}
    };
    
      return (
        <div>
          <NewTask onAddTask={AddTaskHandler} />
          <Tasks items={tasks}/>
        </div>
      );
};

export default Homepage;
