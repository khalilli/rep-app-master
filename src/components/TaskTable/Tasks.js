import React from 'react';
import TaskTable from "./TaskTable";

const Tasks = (props) => {
    console.log("Tasks.js",props.items);
    console.log("key in tasks", props.items[0].id);
    // const arr = [];
    // for (i=0; i<props.items.length-1; i++){
    //     for(j=i+1; j<props.items.length; j++){
    //         if (props.items[i].id == props.items[j].id){

    //         }
    //     }
    // }
    return(
        <div>            
            {props.items.map((task) => (
                <TaskTable 
                key={task.id}
                taskdate1={task.taskdate}
                start_time1={task.start_time}
                end_time1={task.end_time}
                task1={task.task}
                // removeTask={()=> props.removeTask(task.id)}
                />
            ))
            }
        </div>
    );
};

export default Tasks;