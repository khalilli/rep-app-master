import React from 'react';
import Homepage from "../pages/Homepage";
import Somepage from "../pages/Somepage";

export const publicRoutes = [
    {
        path: window.nextUrl + '?func=ll&objId' + 107301 + '&objAction=RunReport' + '/',
        element: <Homepage/>
    },
    {
        path: window.nextUrl + '/somepage',
        element: <Somepage/>
    }
]