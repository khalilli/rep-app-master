import React from 'react';
import {useState} from 'react';
import NewTask from "../components/TaskForm/NewTask";
import Tasks from "../components/TaskTable/Tasks";
import "./Navbar.css"
const Initdata = [
  {
  id:'1',
  date: new Date("March 21, 2022").toDateString(),
  data: 
    [
      {id: '1', stime: '9:00', etime: '10:00', tasktitle: 'test'},
      {id: '2', stime: '11:00', etime: '12:00', tasktitle: 'text'},
    ]
  },
];

const Homepage = () => {
  const [tasks, setTasks] = useState(Initdata);

    const AddTaskHandler = (enteredTask) => {
      console.log("Entered", enteredTask)
      console.log("Existed", tasks[0]);
      setTasks((prevTasks)=>{
        return [enteredTask, ...prevTasks];
      });

      };
    // const AddDateHandler = (enteredDate) => {
    //   console.log(enteredDate);
    // }
    
      return (
        <div>
          <NewTask onAddTask={AddTaskHandler} />
          <Tasks items={tasks} />
        </div>
      );
};

export default Homepage;