import React from 'react';
import TaskTable from "./TaskTable";
import './TaskTable';

const Tasks = (props) => {
    return(
        <div className='tasks'>     
        {props.show === false ? <div className='task_notification'><p>Choose a correct date range <br/>All tasks are shown below:</p></div> : null}       
        {props.items.map((task, id) => (
            <TaskTable 
            key={task.id}
            date1={task.date}
            username1={task.username}
            data1={task.data}
            items1={props.items}
            button1={props.button}
            />
            ))}
        </div>
    );
};

export default Tasks;