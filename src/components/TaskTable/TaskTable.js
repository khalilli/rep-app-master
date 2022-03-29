import React from 'react';
import './TaskTable.css';

const TaskTable = (props) => {
    return(
        <div className='task-table'>
            <div className='task-date'>{props.date1}</div>
            <table>
                <thead>
                    <tr>
                        <th scope="col">Start Time</th>
                        <th scope="col">End Time</th>
                        <th scope="col">Task</th>
                    </tr>
                </thead>
                <tbody>
                    {(props.data1 || []).map((task, index) => (
                       <tr key={index}>
                           <td>{task.stime}</td>
                           <td>{task.etime}</td>
                           <td>{task.tasktitle}</td>
                       </tr> 
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TaskTable;