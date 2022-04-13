import React from 'react';
import TaskTable from "./TaskTable";
import IconButton from '@mui/material/IconButton';
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import { makeStyles } from "@material-ui/core/styles";
import './TaskTable';

const useStyles = makeStyles(theme => ({
    backButton: {
        color: "#041562"
    },
}));

const Tasks = (props) => {
    const classes = useStyles();
    return(
        <div className='tasks'>   
            <IconButton>
                <ArrowCircleLeftIcon className={classes.backButton} />
            </IconButton>         
            {props.items.map((task, id) => (
                <TaskTable 
                key={task.id}
                date1={task.date}
                data1={task.data}
                items1={props.items}
                />
            ))}
        </div>
    );
};

export default Tasks;