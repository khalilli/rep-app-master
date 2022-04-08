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
    const [showTable, setShowTable] = useState(true);

    const removeTask = (index) => {
        console.log("Index and row and id",index, props.data1[index], props.data1[index].id);
        function selectId(x) {
            if (x.data.id === props.data1[index].id)
                return x.id;    
        }
        // function selectId(){
        //     for (i=0;i<props.items1.length;i++){
        //         if (props.items1[i].id === props.data1[index])
        //     }
        // }
        console.log("table index",props.items1.findIndex(selectId));
        console.log("check", props.items1);
        console.log(props.items1[1].data);
        setRow(props.data1.splice(index,1));
        if (props.data1.length === 0){
            setShowTable(false);
        }
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
            </div> : null}
        </div>
    );
};

export default TaskTable;