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

  // const fetchData = async (id, taskdate, start_time, end_time, task) => {
  //   var response = await axios.get('http://192.168.14.33/otcs/llisapi.dll?func=ll&objId=113704&objAction=RunReport&nexturl=%2Fotcs%2Fllisapi%2Edll%3Ffunc%3Dll%26objId%3D113704%26objAction%3Daudit%26nexturl%3D%252Fotcs%252Fllisapi%252Edll%253Ffunc%253Dll%2526objId%253D113704%2526objAction%253Daudit%2526nexturl%253D%25252Fotcs%25252Fllisapi%25252Edll%25253Ffunc%25253Dll%252526objId%25253D113704%252526objAction%25253Dreferences%252526nexturl%25253D%2525252Fotcs%2525252Fllisapi%2525252Edll%2525253Ffunc%2525253Dll%25252526objId%2525253D113704%25252526objAction%2525253DEditView%25252526nexturl%2525253D%252525252Fotcs%252525252Fllisapi%252525252Edll%252525253Ffunc%252525253Dll%2525252526objId%252525253D113704%2525252526objAction%252525253DSource%2525252526nexturl%252525253D%25252525252Fotcs%25252525252Fllisapi%25252525252Edll%25252525253Ffunc%25252525253Dll%252525252526objId%25252525253D113704%252525252526objAction%25252525253DEditView%252525252526viewType%25252525253D1%252525252526nexturl%25252525253D%2525252525252Fotcs%2525252525252Fllisapi%2525252525252Edll%2525252525253Ffunc%2525252525253Dll%25252525252526objid%2525252525253D100991%25252525252526objAction%2525252525253Dbrowse%25252525252526sort%2525252525253Dname%25252525252526viewType%2525252525253D1');


  // };



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
      console.log("Entered", enteredTask);
      setTasks((prevTasks)=>{
        return [enteredTask, ...prevTasks];
      });
      {enteredTask.data.map((task) => (
        setData(enteredTask.id, enteredTask.date, task.stime, task.etime, task.tasktitle)
      ))}

      setLoading(true);

      useEffect(() => {
        axios.get('http://192.168.14.33/otcs/llisapi.dll?func=ll&objId=113704&objAction=RunReport&nexturl=%2Fotcs%2Fllisapi%2Edll%3Ffunc%3Dll%26objId%3D113704%26objAction%3DEditView%26viewType%3D1%26nexturl%3D%252Fotcs%252Fllisapi%252Edll%253Ffunc%253Dll%2526objid%253D100991%2526objAction%253Dbrowse%2526sort%253Dname')
          .then(res => {
            console.log(res.data);
            setTasks(res.data);
            setLoading(false);
          })
      }, []);

    };
    
      return (
        <div>
          <NewTask onAddTask={AddTaskHandler} />
          <Tasks items={tasks} load={loading}/>
        </div>
      );
};

export default Homepage;
