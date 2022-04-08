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
        <div className='task'>
            <h3>Add Your Tasks</h3>
            <div className="new-task">
                <AddForm onSaveTask={onSaveTaskHandler} />
            </div>
        </div>
    );
};

export default NewTask;