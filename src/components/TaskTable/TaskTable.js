import React, { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import { makeStyles } from '@material-ui/core';
import './TaskTable.css';
const useStyles = makeStyles(theme => ({
    removeButton: {
        color: "#DD4A48"
    }
}));
const TaskTable = (props) => {
    const classes = useStyles();

    const [row, setRow] = useState(props.data1);
    console.log("TaskTable", row);
    const removeTask = (index) => {
        console.log(row[index]);
        setRow(props.data1.splice(index,1));
    };

    return(
        <div className='task-table'>
            <div className='task-date'>{props.date1}</div>
            <table>
                <thead>
                    <tr>
                        <th scope="col">Start Time</th>
                        <th scope="col">End Time</th>
                        <th scope="col">Task</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {(props.data1 || []).map((task, index) => (
                       <tr key={index}>
                           <td>{task.stime}</td>
                           <td>{task.etime}</td>
                           <td>{task.tasktitle}</td>
                           <td>
                                {/* <IconButton onClick={props.removeTask}> */}
                                <IconButton onClick={() => removeTask(index)}>
                                    <RemoveCircleIcon className={classes.removeButton} />
                                </IconButton>
                           </td>
                       </tr> 
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TaskTable;