import React from 'react';
import Homepage from "../pages/Homepage";
import DisplayTasks from "../pages/DisplayTasks";

export const publicRoutes = [
    {
        path: '/otcs/llisapi.dll?func=ll&objId=107301&objAction=RunReport/',
        // path: '/',
        element: <Homepage/>
    },
    {
        path: '/otcs/llisapi.dll?func=ll&objId=107301&objAction=RunReport/displaytasks',
        element: <DisplayTasks/>
    }
]