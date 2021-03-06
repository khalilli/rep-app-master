import React, { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import TextField from '@mui/material/TextField';
import { makeStyles } from "@material-ui/core/styles";
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { v4 as uuid } from 'uuid';
import moment from 'moment';
import "./AddForm.css";
import { ThemeProvider, createTheme } from '@mui/material/styles';
const theme = createTheme({
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            background:'#22577E',
          },
        },
      },
    },
});

const useStyles = makeStyles(theme => ({
    textField: {
        margin: theme.spacing(1),
        borderRadius: "6px"
    },
    addButton: {
        color: "#1b4564"
    },
}));

const AddForm = (props) => { 
    const classes = useStyles();

    const [inputFields, setInputFields] = useState([
        {stime: '', etime: '', tasktitle: '', row_id: uuid()},
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
        setInputFields([...inputFields, {stime: '', etime: '', tasktitle: '', row_id: uuid()}]);
    };

    const handleRemoveFields = (id) => {
        const rows = [...inputFields];
        rows.pop();
        setInputFields(rows);
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
        window.location.href = 'http://192.168.14.33/otcs/llisapi.dll/homepage?func=ll&objId=107301&objAction=RunReport';
    }
    return(
        <ThemeProvider theme={theme}>
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
                            multiline
                            maxRows={4}
                            value={inputFields.tasktitle}
                            onChange={ event => handleChangeInput(id, event)}/>
                        </Grid>
                        <Grid item>
                            <IconButton onClick={handleAddFields}>
                                <AddCircleIcon className={classes.addButton} />
                            </IconButton>
                        </Grid>
                        { id+1 === inputFields.length ?  <Grid item>
                            <IconButton onClick={() => handleRemoveFields(id)}>
                                <RemoveCircleIcon className={classes.addButton} />
                            </IconButton>
                        </Grid> : null }

                    </Grid>
                </Grid>
            ))}
                <Grid item>
                 <Button variant="contained" type='submit' onClick={refresh}>Save</Button>
                </Grid>
            </Grid>
        </form>
        </ThemeProvider>
    );
};

export default AddForm;