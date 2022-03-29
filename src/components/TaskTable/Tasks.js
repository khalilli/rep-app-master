import React from 'react';
import TaskTable from "./TaskTable";

const Tasks = (props) => {
    return(
        <div>            
            {/* <TaskTable 
            date1={props.items[0].date}
            data1={props.items[0].data}
            /> */}
            {props.items.map((task) => (
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