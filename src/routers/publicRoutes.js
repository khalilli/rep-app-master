import React from 'react';
import Homepage from "../pages/Homepage";
import Somepage from "../pages/Somepage";

export const publicRoutes = [
    {
        path: window.baseUrl + '?func=ll&objId' + 107301 + '&objAction=RunReport' + '/',
        element: <Homepage/>
    },
    {
        path: '/somepage',
        element: <Somepage/>
    }
]