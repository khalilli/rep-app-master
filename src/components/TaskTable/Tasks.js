import React from 'react';
import TaskTable from "./TaskTable";
import Grid from '@mui/material/Grid';
const Tasks = (props) => {
    console.log("Tasks js", props.items);
    return(
        <Grid container direction={"column"} spacing={2}>  
            <Grid item>      
                {props.items.map((task, id) => (
                    <TaskTable 
                    key={task.id}
                    date1={task.date}
                    data1={task.data}
                    // removeTask={()=> props.removeTask(task.id)}
                    />
                ))}
            </Grid>        
        </Grid>
    );
};

export default Tasks;