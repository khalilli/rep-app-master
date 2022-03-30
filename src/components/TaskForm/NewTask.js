import React from 'react';
import AddForm from "./AddForm";
import { v4 as uuid } from 'uuid';
import "./NewTask.css";

const NewTask = (props) => {
    const onSaveTaskHandler = (enteredTask) => {
        const Task = {
            id: uuid(),
            ...enteredTask, 
        };
        props.onAddTask(Task);
    };
    return(
        <div className="new-task">
            <h3>Add Your Tasks</h3>
            <AddForm onSaveTask={onSaveTaskHandler} />
        </div>
    );
};

export default NewTask;