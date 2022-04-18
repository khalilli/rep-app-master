import React, { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import { makeStyles } from '@material-ui/core';
import './TaskTable.css';
const useStyles = makeStyles(theme => ({
    removeButton: {
        // color: "#DD4A48"
        color: "#d91714"
    }
}));
const TaskTable = (props) => {
    const classes = useStyles();

    const [row, setRow] = useState(props.data1);
    const [showTable, setShowTable] = useState(true);

    const removeTask = (index) => {
        setRow(props.data1.splice(index,1));
        if (props.data1.length === 0){
            setShowTable(false);
        }
        console.log("Data", props.data1);
        console.log("Index", index);
    };
    return(
        <div>
{showTable ? <div className='task-table'>
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
                           <td>{task.stime === '?' ? 'undefined' : task.stime}</td>
                           <td>{task.etime === '?' ? 'undefined' : task.etime}</td>
                           <td>{task.tasktitle === '?' ? 'undefined' : task.tasktitle}</td>
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
            </div> : null}
        </div>
    );
};

export default TaskTable;