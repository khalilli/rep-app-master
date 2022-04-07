import React from 'react';
import TaskTable from "./TaskTable";
import './TaskTable';
const Tasks = (props) => {
    console.log("Tasks js", props.items);
    return(
        <div className='tasks'>            
            {props.items.map((task, id) => (
                <TaskTable 
                key={task.id}
                date1={task.date}
                data1={task.data}
                />
            ))}
        </div>
    );
};

export default Tasks;