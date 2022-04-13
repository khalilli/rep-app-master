import React from 'react';
import Homepage from "../pages/Homepage";
import Somepage from "../pages/Somepage";

export const publicRoutes = [
    {
        path: window.baseUrl + '?func=ll&objId' + window.currentWebreportId + '&objAction=RunReport' + '/',
        element: <Homepage/>
    },
    {
        path: window.nextUrl + '/somepage',
        element: <Somepage/>
    }
]