import React from 'react';
import Homepage from "../pages/Homepage";
import DisplayTasks from "../pages/DisplayTasks";

export const publicRoutes = [
    /*     {
        path:'/',
        element: (<Navigate to={window.baseUrl + '/homepage/displaytasks' + '?func=ll&objId=' + 107301 + '&objAction=RunReport'} />)
    }*/
    {
        path: window.baseUrl + '?func=ll&objId=' + 107301 + '&objAction=RunReport' + '/',
        element: <Homepage/>
    },
    {
        path: window.baseUrl + '?func=ll&objId=' + 107301 + '&objAction=RunReport' + '/displaytasks',
        element: <DisplayTasks/>
    }
]