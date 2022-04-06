import React from 'react';
import TaskTable from "./TaskTable";

const Tasks = (props) => {
    console.log("Tasks.js",props.items);
    return(
        <div>            
            {props.items.map((task, id) => (
                <TaskTable 
                key={task.id}
                date1={task.date}
                data1={task.data}
                // removeTask={()=> props.removeTask(task.id)}
                />
            ))}
        </div>
    );
};

export default Tasks;