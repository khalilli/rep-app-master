import React from 'react';
import {useState, useEffect} from 'react';
import Tasks from '../components/TaskTable/Tasks';
import './DisplayTasks';
import Dropdown from './Dropdown';
import axios from 'axios';
import moment from 'moment';
import { v4 as uuid } from 'uuid';

const DisplayTasks = (props) => {
    const [tasks, setTasks] = useState([]);

    const getData = async(userid) => {
        var url = "http://192.168.14.33/otcs/llisapi.dll?func=ll&objId=113704&objAction=RunReport";
        if(userid){
            url += `&userid=${userid}`;
        }
        url += '&nexturl='+ window.nextUrl;
        const response = await axios.get(url);
        const taskTables = [{},];
        for (var i=0; i<response.data.length-1; i++){
            const Task = {
            id: response.data[i].id,
            date: moment(response.data[i].taskdate).format('LL'),
            data: [{
                id: uuid(),
                stime: response.data[i].start_time,
                etime: response.data[i].end_time,
                tasktitle: response.data[i].task}, ]
            };
            taskTables.unshift(Task);
        } 
            const groupedTables = [];
            taskTables.forEach(function(item) {
            var existing = groupedTables.filter(function(v) {
                return v.id === item.id;
            });
            if (existing.length) {
                var existingIndex = groupedTables.indexOf(existing[0]);
                groupedTables[existingIndex].data = groupedTables[existingIndex].data.concat(item.data);
            } else {
                if (typeof item.data == 'string')
                item.data = [item.data];
                groupedTables.push(item);
            }
            });
            groupedTables.pop();
            setTasks(groupedTables);
    }
    useEffect(() => {
        getData(window.userId);
    }, []);

    return(
        <div>
          <div>
            <Dropdown/>
          </div>
          <Tasks items={tasks} />
        </div>
    );
};
export default DisplayTasks;