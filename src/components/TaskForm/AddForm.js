import React, { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import TextField from '@mui/material/TextField';
import { makeStyles } from "@material-ui/core/styles";
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import moment from 'moment';
import "./AddForm.css";

const useStyles = makeStyles(theme => ({
    textField: {
        margin: theme.spacing(1),
        borderRadius: "6px"
    },
    addButton: {
        color: "#041562"
    },
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
            date: moment(enteredDate).format('LL'),
            data: inputFields,
        };
        props.onSaveTask(taskData);
    };

    const refresh = () => {
        // window.location.reload(true);
        console.log("hey");
    }
    return(

        <form onSubmit={submitHandler}>
            <Grid container direction={"column"} spacing={2}>
            <Grid item >
                <TextField
                    label="Date"
                    id="date"
                    variant="outlined"
                    size="small"
                    type="date"
                    name="date" 
                    InputLabelProps={{
                        shrink: true,
                      }}
                    value={enteredDate} 
                    onChange={dateChangeHandler}
                    />
            </Grid>
            {inputFields.map((inputfield, id) => (
                <Grid item key={id} className="new-task__controls">
                    <Grid container spacing={2} >
                        <Grid item>
                            <TextField
                            label="From"
                            id="time"
                            variant="outlined"
                            size="small"
                            type="time" 
                            name='stime'
                            InputLabelProps={{
                                shrink: true,
                              }}
                            value={inputFields.stime}
                            onChange={ event => handleChangeInput(id, event)}/>
                        </Grid>
                        <Grid item>
                            <TextField
                            label="To"
                            id="time"
                            variant="outlined"
                            size="small"
                            type="time" 
                            name="etime"
                            InputLabelProps={{
                                shrink: true,
                              }}
                            value={inputFields.etime}
                            onChange={ event => handleChangeInput(id, event)}/>
                        </Grid>
                        <Grid item>
                            <TextField
                            label="Task"
                            id="outlined-size-small"
                            variant="outlined"
                            size="small"
                            type="text"
                            name='tasktitle'
                            value={inputFields.tasktitle}
                            onChange={ event => handleChangeInput(id, event)}/>
                        </Grid>
                        <Grid item>
                            <IconButton onClick={handleAddFields}>
                                <AddCircleIcon className={classes.addButton} />
                            </IconButton>
                        </Grid>

                    </Grid>
                </Grid>
            ))}
                <Grid item>
                {/* { !props.load1 && <Button variant="contained" type='submit'>Save</Button>}
                { props.load1 && <Button variant="contained" type='submit' disabled>Saving...</Button>}
                 */}
                 <Button variant="contained" type='submit' onClick={refresh}>Save</Button>
                </Grid>
            </Grid>
        </form>
    );
};

export default AddForm;