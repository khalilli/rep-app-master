import React from 'react';
import {useState} from 'react';
import NewTask from "../components/TaskForm/NewTask";
import Tasks from "../components/TaskTable/Tasks";
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
      {id: '4', stime: '13:00', etime: '14:00', tasktitle: 'oaylay'},
    ]
  },
  {
    id:'1',
    date: new Date("March 21, 2022").toDateString(),
    data: 
      [
        {id: '1', stime: '9:00', etime: '10:00', tasktitle: 'test'},
        {id: '2', stime: '11:00', etime: '12:00', tasktitle: 'text'},
        {id: '3', stime: '13:00', etime: '14:00', tasktitle: 'naynay'},
        {id: '4', stime: '13:00', etime: '14:00', tasktitle: 'oaynay'},
      ]
    },
    {
      id:'2',
      date: new Date("March 21, 2022").toDateString(),
      data: 
        [
          {id: '1', stime: '9:00', etime: '10:00', tasktitle: 'test'},
          {id: '2', stime: '11:00', etime: '12:00', tasktitle: 'text'},
          {id: '3', stime: '13:00', etime: '14:00', tasktitle: 'oaybay'},
        ]
      },
      {
        id:'3',
        date: new Date("March 21, 2022").toDateString(),
        data: 
          [
            {id: '1', stime: '9:00', etime: '10:00', tasktitle: 'test'},
            {id: '2', stime: '11:00', etime: '12:00', tasktitle: 'text'},
            {id: '3', stime: '13:00', etime: '14:00', tasktitle: 'oayhay'},
          ]
        },
];

const Homepage = () => {
  const [tasks, setTasks] = useState(Initdata);
  const deleteTask = (index) => {
      console.log(tasks[index].data);
      const rows = [...tasks];
      let nay = rows[index].data;
      nay.splice(index,1);
      setTasks(rows);  

    // console.log(tasks)
    // const newTasks = tasks.filter((item) => item.id !== index);
    // setTasks(newTasks);
   
  };

    const AddTaskHandler = (enteredTask) => {
      console.log("Entered", enteredTask)
      console.log("Existed", tasks[0]);
      setTasks((prevTasks)=>{
        return [enteredTask, ...prevTasks];
      });
    };
    
      return (
        <div>
          <NewTask onAddTask={AddTaskHandler} />
          <Tasks items={tasks} removeTask={deleteTask}/>
        </div>
      );
};

export default Homepage;
