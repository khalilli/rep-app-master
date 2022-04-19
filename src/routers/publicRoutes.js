import React from 'react';
import { Navigate } from 'react-router-dom';
import Homepage from "../pages/Homepage";
import DisplayTasks from "../pages/DisplayTasks";

export const publicRoutes = [
    {
        path:'/',
        element: (<Navigate to={window.baseUrl + '/homepage' + '?func=ll&objId=' + 107301 + '&objAction=RunReport'} />)
    },
    {
        path: window.baseUrl,
        element: (<Navigate to={window.baseUrl + '/homepage' + '?func=ll&objId=' + 107301 + '&objAction=RunReport'} />)
    },
    {
        path: window.baseUrl + '/homepage',
        element: <Homepage />,
        children: [
            {
                path: 'displaytasks',
                element: <DisplayTasks />

            }
        ]
    }
    // {
    //     path: window.baseUrl + '?func=ll&objId=' + 107301 + '&objAction=RunReport' + '/',
    //     element: <Homepage/>
    // },
    // {
    //     path: window.baseUrl + '?func=ll&objId=' + 107301 + '&objAction=RunReport' + '/displaytasks',
    //     element: <DisplayTasks/>
    // }
]