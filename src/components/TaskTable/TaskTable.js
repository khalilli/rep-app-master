import React, { useState, useEffect } from 'react';
import IconButton from '@mui/material/IconButton';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import { makeStyles } from '@material-ui/core';
import axios from 'axios';
import './TaskTable.css';
const useStyles = makeStyles(theme => ({
    removeButton: {
        // color: "#DD4A48"
        color: "#EF224B"
    }
}));
const TaskTable = (props) => {
    const classes = useStyles();

    const [rows, setRows] = useState(props.data1);
    const [showTable, setShowTable] = useState(true);

    const setStatus = async(stnum) => {
      var url = "http://192.168.14.33/otcs/llisapi.dll?func=ll&objId=123508&objAction=RunReport";
      if(stnum){
          url += `&stnum=${stnum}`;
      }
      url += '&nexturl='+ window.nextUrl;
      axios.get(url);
    };
    const removeTask = (index) => {
        console.log(index);
        console.log("Array", props.data1);
        console.log(props.data1[index]);
        console.log("Row id", props.data1[index].row_id);
        setStatus('1');
        setRows(props.data1.splice(index,1));
        if (props.data1.length === 0){
            setShowTable(false);
        }
    };
    return (
      <div>
        {showTable ? (
          <div className="task-table">
            <div className="task-date">{props.date1}</div>
            <table>
              <thead>
                <tr>
                  <th scope="col">Start Time</th>
                  <th scope="col">End Time</th>
                  <th scope="col">Task</th>
                  {props.button1 === false ? null : <th></th>}
                </tr>
              </thead>
              <tbody>
                {(props.data1 || []).map((task, index) => (
                  <tr key={index}>
                    {props.button1 === false ? (
                      <td style={{ padding: "10px" }}>
                        {task.stime === "?" ? "undefined" : task.stime}
                      </td>
                    ) : (
                      <td>{task.stime === "?" ? "undefined" : task.stime}</td>
                    )}
                    {props.button1 === false ? (
                      <td style={{ padding: "10px" }}>
                        {task.etime === "?" ? "undefined" : task.etime}
                      </td>
                    ) : (
                      <td>{task.etime === "?" ? "undefined" : task.etime}</td>
                    )}
                    {props.button1 === false ? (
                      <td style={{ padding: "10px" }}>
                        {task.tasktitle === "?" ? "undefined" : task.tasktitle}
                      </td>
                    ) : (
                      <td>
                        {task.tasktitle === "?" ? "undefined" : task.tasktitle}
                      </td>
                    )}
                    {props.button1 === false ? null : (
                      <td>
                        <IconButton onClick={() => removeTask(index)}>
                          <RemoveCircleIcon className={classes.removeButton} />
                        </IconButton>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : null}
      </div>
    );
};

export default TaskTable;