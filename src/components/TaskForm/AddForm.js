import React, { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import AddCircleIcon from '@mui/icons-material/AddCircle';
// import TextField from '@mui/material/TextField';
// import { makeStyles } from "@material-ui/core/styles";
import { makeStyles, TextField } from '@material-ui/core';
import "./AddForm.css";

const useStyles = makeStyles(theme => ({
    textField: {
        margin: theme.spacing(1),
        background: "white",
        boxShadow: "1px 1.3px",
        borderRadius: "6px"
    },
    addButton: {
        color: "white"
    }
}));

const AddForm = (props) => { 
    const classes = useStyles();

    const [inputFields, setInputFields] = useState([
        {stime: '', etime: '', tasktitle: ''},
    ]);
    const [enteredDate, setEnteredDate] = useState('');

    const dateChangeHandler = (event) => {
        setEnteredDate(event.target.value);
    };

    const handleChangeInput = (id, event) => {
        // console.log(index, event.target.value);
        const values = [...inputFields];
        values[id][event.target.name] = event.target.value;
        setInputFields(values);
    };

    const handleAddFields = () => {
        setInputFields([...inputFields, {stime: '', etime: '', tasktitle: ''}]);
    };

    const submitHandler = (event) => {
        event.preventDefault();
        const taskData = {
            date: new Date(enteredDate).toDateString(),
            data: inputFields,
        };
        props.onSaveTask(taskData);
    };
    return(

        <form onSubmit={submitHandler}>
            <div >
                <TextField
                    className={classes.textField}
                    label=""
                    id="outlined-size-small"
                    variant="filled"
                    size="small"
                    type="date"
                    name='date' 
                    value={enteredDate} 
                    onChange={dateChangeHandler}
                    />
            </div>
            {inputFields.map((inputfield, id) => (
                <div key={id} className="new-task__controls">
                            <TextField
                            className={classes.textField}
                            label="From"
                            id="outlined-size-small"
                            variant="filled"
                            size="small"
                            type="time" 
                            name='stime'
                            value={inputFields.stime}
                            onChange={ event => handleChangeInput(id, event)}
                            placeholder="From" />

                            <TextField
                            className={classes.textField}
                            label="To"
                            id="outlined-size-small"
                            variant="filled"
                            size="small"
                            type="time" 
                            name='etime'
                            value={inputFields.etime}
                            onChange={ event => handleChangeInput(id, event)}
                            placeholder="To" />

                            <TextField
                            className={classes.textField}
                            label="Task"
                            id="outlined-size-small"
                            variant="filled"
                            size="small"
                            type="text"
                            name='tasktitle'
                            value={inputFields.tasktitle}
                            onChange={ event => handleChangeInput(id, event)}
                            placeholder="Task" />
                            <IconButton onClick={handleAddFields}>
                                <AddCircleIcon className={classes.addButton} />
                            </IconButton>
                </div>
            ))}
            <button type='submit' className="btn btn-primary">Save</button>
        </form>
    );
};

export default AddForm;