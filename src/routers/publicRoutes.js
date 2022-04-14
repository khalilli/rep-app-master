import React from 'react';
import Homepage from "../pages/Homepage";
import DisplayTasks from "../pages/DisplayTasks";

export const publicRoutes = [
    {
        path: window.baseUrl + '?func=ll&objId' + 107301 + '&objAction=RunReport' + '/homepage',
        element: <Homepage/>
    },
    {
        path: window.baseUrl + '?func=ll&objId' + 107301 + '&objAction=RunReport' + '/displaytasks',
        element: <DisplayTasks/>
    }
]