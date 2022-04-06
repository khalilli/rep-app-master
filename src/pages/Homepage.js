import React from 'react';
import {useState, useEffect} from 'react';
import NewTask from "../components/TaskForm/NewTask";
import Tasks from "../components/TaskTable/Tasks";
import axios from 'axios';
import moment from 'moment';
import "./Navbar.css"

const Initdata = [
  // {
  // id:'0',
  // date: new Date("March 21, 2022").toDateString(),
  // data: 
  //   [
  //     {id: '1', stime: '9:00', etime: '10:00', tasktitle: 'test'},
  //     {id: '2', stime: '11:00', etime: '12:00', tasktitle: 'text'},
  //     {id: '3', stime: '13:00', etime: '14:00', tasktitle: 'laylay'},
  //     {id: '4', stime: '14:00', etime: '15:00', tasktitle: 'oaylay'},
  //   ]
  // },
];

const Homepage = () => {
  const [tasks, setTasks] = useState(Initdata);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    axios
      .get(
        "http://192.168.14.33/otcs/llisapi.dll?func=ll&objId=113704&objAction=RunReport&nexturl=%2Fotcs%2Fllisapi%2Edll%3Ffunc%3Dll%26objId%3D113704%26objAction%3DEditView%26viewType%3D1%26nexturl%3D%252Fotcs%252Fllisapi%252Edll%253Ffunc%253Dll%2526objid%253D100991%2526objAction%253Dbrowse%2526sort%253Dname"
      )
      .then((response) => {
        console.log("length",response.data.length);
        for (var i=0; i<response.data.length-1; i++){
          var taskdate = moment(response.data[i].taskdate).format("DD-MM-YYYY");
          const Task = {
            date: taskdate,
            data: [{stime: response.data[i].start_time,
                    etime: response.data[i].end_time,
                    tasktitle: response.data[i].task}, ]
          };
          console.log("homepage task", Task);
          setTasks((prevTasks)=>{
            return [Task, ...prevTasks];
          });
        }
      });
  }, []);

  
  const setData = async (id, day, start_time, end_time, task) => {
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
    url += '&nexturl='+ window.nextUrl;
    axios.get(url);
  };

    const AddTaskHandler = (enteredTask) => {
      // setLoading(true);
      console.log("Entered", enteredTask);
      setTasks((prevTasks)=>{
        return [enteredTask, ...prevTasks];
      });
      // setLoading(false);
      {enteredTask.data.map((task) => (
        setData(enteredTask.id, enteredTask.date, task.stime, task.etime, task.tasktitle)
      ))}

    };
    
      return (
        <div>
          <NewTask onAddTask={AddTaskHandler} />
          <Tasks items={tasks} load={loading}/>
        </div>
      );
};

export default Homepage;